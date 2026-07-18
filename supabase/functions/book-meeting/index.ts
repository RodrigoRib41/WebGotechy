// ============================================================
//  Edge Function: book-meeting
//  Reserva un slot y crea la reunión de Google Meet.
//
//  Flujo:
//   1. Validación (honeypot, campos, rate-limit por IP).
//   2. Validar el slot contra `meeting_settings` (día permitido, franja,
//      alineación a la grilla, margen mínimo de 24h) — server-side, no
//      se confía en el cliente.
//   3. Colisiones: reservas confirmadas + freeBusy de Google Calendar.
//   4. INSERT de la reserva. El índice único parcial sobre `starts_at`
//      (status='confirmed') frena la carrera de dos clientes reservando
//      el mismo slot a la vez → el segundo recibe "slot ocupado".
//   5. (Opcional) Evento en Google Calendar con link de Meet + invitación
//      automática al cliente (sendUpdates=all). Si los secrets de Google
//      no están, degrada limpio: reserva + emails sin link de Meet.
//   6. Emails vía Resend: confirmación al cliente + aviso interno.
//
//  Secrets (además de los de Google en _shared/meetings.ts):
//   - RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL (los mismos
//     de submit-contact).
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  type BusyInterval,
  type MeetingSettings,
  getGoogleAccessToken,
  googleBusyIntervals,
  googleCalendarId,
  isValidSlotStart,
  overlaps,
} from '../_shared/meetings.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Rate-limit best-effort por IP (memoria por isolate).
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hora
const RATE_MAX = 3; // máx reservas por IP por ventana
const hits = new Map<string, number[]>();

interface BookPayload {
  startsAt?: string;
  name?: string;
  email?: string;
  company?: string;
  notes?: string;
  botField?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);

  let body: BookPayload;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Cuerpo inválido.' }, 400);
  }

  // Honeypot: fingir éxito y descartar.
  if (typeof body.botField === 'string' && body.botField.trim() !== '') {
    return json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const notes = clean(body.notes);

  const errors: string[] = [];
  if (name.length < 1 || name.length > 120) errors.push('Nombre inválido.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    errors.push('Email inválido.');
  if (company.length > 150) errors.push('Empresa demasiado larga.');
  if (notes.length > 2000) errors.push('Notas demasiado largas.');
  const startsAt = new Date(clean(body.startsAt));
  if (Number.isNaN(startsAt.getTime())) errors.push('Horario inválido.');
  if (errors.length > 0) return json({ error: errors.join(' ') }, 400);

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  if (isRateLimited(ip)) {
    return json({ error: 'Demasiados intentos. Probá de nuevo más tarde.' }, 429);
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // 1. Settings + token de Google en paralelo (el token después también se
  //    usa para crear el evento de Meet); luego validación del slot.
  const [settingsRes, token] = await Promise.all([
    supabase.from('meeting_settings').select('*').eq('id', 1).maybeSingle(),
    getGoogleAccessToken(),
  ]);
  const { data: settings, error: sErr } = settingsRes;
  if (sErr || !settings) {
    console.error('[book-meeting] settings error', sErr);
    return json({ error: 'El agendado no está configurado.' }, 500);
  }
  const cfg = settings as MeetingSettings;
  if (!cfg.enabled) return json({ error: 'El agendado está deshabilitado.' }, 400);

  const now = new Date();
  if (!isValidSlotStart(cfg, startsAt, now)) {
    return json({ error: 'El horario elegido no está disponible.', code: 'invalid_slot' }, 400);
  }
  const endsAt = new Date(startsAt.getTime() + cfg.slot_minutes * 60_000);

  // 2. Colisiones (reservas de la web + Google Calendar), en paralelo.
  const [nearbyRes, googleBusy] = await Promise.all([
    supabase
      .from('meeting_bookings')
      .select('starts_at, ends_at')
      .eq('status', 'confirmed')
      .gte('ends_at', startsAt.toISOString())
      .lte('starts_at', endsAt.toISOString()),
    token
      ? googleBusyIntervals(token, startsAt, endsAt)
      : Promise.resolve([] as BusyInterval[]),
  ]);
  const { data: nearby, error: nErr } = nearbyRes;
  if (nErr) {
    console.error('[book-meeting] collision query error', nErr);
    return json({ error: 'No se pudo verificar la disponibilidad.' }, 500);
  }
  const busy: BusyInterval[] = (nearby ?? []).map((b) => ({
    start: new Date(b.starts_at).getTime(),
    end: new Date(b.ends_at).getTime(),
  }));
  busy.push(...googleBusy);
  if (overlaps(startsAt.getTime(), endsAt.getTime(), busy)) {
    return json({ error: 'Ese horario acaba de ocuparse. Elegí otro.', code: 'slot_taken' }, 409);
  }

  // 3. Insertar la reserva (el índice único frena carreras).
  const { data: booking, error: iErr } = await supabase
    .from('meeting_bookings')
    .insert({
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      name,
      email,
      company: company || null,
      notes: notes || null,
      status: 'confirmed',
    })
    .select()
    .single();
  if (iErr) {
    // 23505 = unique_violation → otro cliente ganó el slot.
    if ((iErr as { code?: string }).code === '23505') {
      return json({ error: 'Ese horario acaba de ocuparse. Elegí otro.', code: 'slot_taken' }, 409);
    }
    console.error('[book-meeting] insert error', iErr);
    return json({ error: 'No se pudo crear la reserva. Probá más tarde.' }, 500);
  }

  // 4. Evento en Google Calendar con Meet (best-effort).
  let meetLink: string | null = null;
  if (token) {
    try {
      const calId = encodeURIComponent(googleCalendarId());
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calId}/events?conferenceDataVersion=1&sendUpdates=all`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summary: `GoTechy × ${name}${company ? ` (${company})` : ''}`,
            description: [
              'Reunión agendada desde gotechy.com.',
              '',
              `Nombre: ${name}`,
              `Email: ${email}`,
              company ? `Empresa: ${company}` : '',
              notes ? `Notas: ${notes}` : '',
            ]
              .filter(Boolean)
              .join('\n'),
            start: { dateTime: startsAt.toISOString(), timeZone: cfg.timezone },
            end: { dateTime: endsAt.toISOString(), timeZone: cfg.timezone },
            attendees: [{ email }],
            conferenceData: {
              createRequest: {
                requestId: booking.id,
                conferenceSolutionKey: { type: 'hangoutsMeet' },
              },
            },
          }),
        },
      );
      if (res.ok) {
        const ev = await res.json();
        meetLink =
          ev.hangoutLink ??
          ev.conferenceData?.entryPoints?.find(
            (e: { entryPointType?: string; uri?: string }) => e.entryPointType === 'video',
          )?.uri ??
          null;
        await supabase
          .from('meeting_bookings')
          .update({ meet_link: meetLink, gcal_event_id: ev.id ?? null })
          .eq('id', booking.id);
      } else {
        console.error('[book-meeting] gcal event failed', res.status, await res.text().catch(() => ''));
      }
    } catch (e) {
      console.error('[book-meeting] gcal event error', e);
    }
  }

  // 5. Emails vía Resend (best-effort — Google ya invita si hay meetLink).
  await sendEmails({ name, email, company, notes, startsAt, endsAt, meetLink, tz: cfg.timezone });

  return json({ ok: true, meetLink });
});

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function clean(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface EmailCtx {
  name: string;
  email: string;
  company: string;
  notes: string;
  startsAt: Date;
  endsAt: Date;
  meetLink: string | null;
  tz: string;
}

async function sendEmails(ctx: EmailCtx): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('CONTACT_TO_EMAIL');
  const from = Deno.env.get('CONTACT_FROM_EMAIL') ?? 'GoTechy Web <onboarding@resend.dev>';
  if (!apiKey || !to) return;

  const fmt = new Intl.DateTimeFormat('es-AR', {
    timeZone: ctx.tz,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const when = `${fmt.format(ctx.startsAt)} (${ctx.tz})`;

  const linkHtml = ctx.meetLink
    ? `<p><a href="${escapeHtml(ctx.meetLink)}" style="color:#0284c7;font-weight:600">Unirse a la reunión de Google Meet</a></p>`
    : `<p style="color:#64748b">Te va a llegar la invitación con el link de Google Meet por email.</p>`;

  const send = (payload: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((e) => {
      console.error('[book-meeting] resend error', e);
      return null;
    });

  // Confirmación al cliente.
  await send({
    from,
    to: [ctx.email],
    reply_to: to,
    subject: 'Tu reunión con GoTechy está confirmada',
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0f1419">¡Reunión confirmada!</h2>
        <p style="color:#0f1419">Hola ${escapeHtml(ctx.name)}, agendamos tu reunión con el equipo de GoTechy.</p>
        <p style="color:#0f1419"><strong>${escapeHtml(when)}</strong></p>
        ${linkHtml}
        <p style="color:#64748b;font-size:13px">Si necesitás reprogramar, respondé este email.</p>
      </div>`,
  });

  // Aviso interno.
  await send({
    from,
    to: [to],
    reply_to: ctx.email,
    subject: `Nueva reunión agendada — ${ctx.name}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0f1419">Nueva reunión desde gotechy.com</h2>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600">Cuándo</td><td style="color:#0f1419">${escapeHtml(when)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600">Nombre</td><td style="color:#0f1419">${escapeHtml(ctx.name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600">Email</td><td style="color:#0f1419">${escapeHtml(ctx.email)}</td></tr>
          ${ctx.company ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600">Empresa</td><td style="color:#0f1419">${escapeHtml(ctx.company)}</td></tr>` : ''}
          ${ctx.notes ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600">Notas</td><td style="color:#0f1419">${escapeHtml(ctx.notes)}</td></tr>` : ''}
        </table>
        ${ctx.meetLink ? `<p><a href="${escapeHtml(ctx.meetLink)}">${escapeHtml(ctx.meetLink)}</a></p>` : '<p style="color:#b45309">⚠ Sin link de Meet (Google Calendar no configurado o falló). Crear la reunión manualmente.</p>'}
      </div>`,
  });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
