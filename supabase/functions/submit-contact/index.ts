// ============================================================
//  Edge Function: submit-contact
//  Recibe las consultas de los formularios públicos (página de
//  Contacto y CTA final del Home) y las envía por email vía Resend.
//
//  Por qué server-side: el sitio es un SPA estático en Vercel (sin
//  backend propio). Esta función reemplaza el viejo POST a Netlify
//  Forms — valida, frena bots y manda el mail sin exponer el API key.
//
//  Defensa aplicada:
//   - Validación estricta de cada campo (longitudes + formato email).
//   - Honeypot (`botField`): si viene completo, se descarta en silencio.
//   - Rate-limit best-effort por IP (anti-flood / anti-spam).
//   - Escape de HTML del input antes de armar el email (no HTML injection).
//   - El RESEND_API_KEY vive solo en los secrets, nunca en el bundle.
//
//  Secrets requeridos (supabase secrets set ...):
//   - RESEND_API_KEY        API key de https://resend.com
//   - CONTACT_TO_EMAIL      casilla donde caen los leads (ej: contacto@gotechy.com)
//   - CONTACT_FROM_EMAIL    remitente verificado en Resend
//                           (ej: "GoTechy Web <web@gotechy.com>").
//                           Default de prueba: onboarding@resend.dev
//                           (solo entrega al dueño de la cuenta Resend).
// ============================================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Rate-limit en memoria. En Deno Deploy la memoria es por isolate (best-effort):
// frena el caso común de un bot martillando, no es un límite distribuido fuerte.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const RATE_MAX = 5; // máx envíos por IP por ventana
const hits = new Map<string, number[]>();

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  botField?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Método no permitido.' }, 405);
  }

  // 1. Parsear el body.
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Cuerpo inválido.' }, 400);
  }

  // 2. Honeypot: si un bot completó el campo oculto, fingimos éxito y descartamos.
  if (typeof body.botField === 'string' && body.botField.trim() !== '') {
    return json({ ok: true });
  }

  // 3. Validación server-side (no confiamos en el cliente).
  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const phone = clean(body.phone);
  const message = clean(body.message);

  const errors: string[] = [];
  if (name.length < 1 || name.length > 120) errors.push('Nombre inválido.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    errors.push('Email inválido.');
  if (company.length > 150) errors.push('Empresa demasiado larga.');
  if (phone.length > 50) errors.push('Teléfono demasiado largo.');
  if (message.length < 10 || message.length > 5000)
    errors.push('Mensaje inválido (10–5000 caracteres).');
  if (errors.length > 0) return json({ error: errors.join(' ') }, 400);

  // 4. Rate-limit por IP.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  if (isRateLimited(ip)) {
    return json({ error: 'Demasiados envíos. Probá de nuevo en unos minutos.' }, 429);
  }

  // 5. Configuración del proveedor de email.
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('CONTACT_TO_EMAIL');
  const from = Deno.env.get('CONTACT_FROM_EMAIL') ?? 'GoTechy Web <onboarding@resend.dev>';
  if (!apiKey || !to) {
    return json({ error: 'El servicio de contacto no está configurado.' }, 500);
  }

  // 6. Enviar el email (con el input escapado para el cuerpo HTML).
  const subject = `Nueva consulta de ${name} — GoTechy`;
  const html = renderHtml({ name, email, company, phone, message });
  const text = renderText({ name, email, company, phone, message });

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // responder le contesta directo al prospecto
        subject,
        html,
        text,
      }),
    });

    if (!resp.ok) {
      // No filtramos el detalle del proveedor al cliente.
      console.error('[submit-contact] Resend error', resp.status, await resp.text().catch(() => ''));
      return json({ error: 'No se pudo enviar la consulta. Probá más tarde.' }, 502);
    }
  } catch (e) {
    console.error('[submit-contact] fetch error', e);
    return json({ error: 'No se pudo enviar la consulta. Probá más tarde.' }, 502);
  }

  return json({ ok: true });
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

interface Lead {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

function renderHtml(l: Lead): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600;vertical-align:top">${label}</td><td style="padding:4px 0;color:#0f1419">${escapeHtml(value)}</td></tr>`
      : '';
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#0f1419">Nueva consulta desde gotechy.com</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row('Nombre', l.name)}
        ${row('Email', l.email)}
        ${row('Empresa', l.company)}
        ${row('Teléfono', l.phone)}
      </table>
      <p style="margin-top:16px;color:#64748b;font-weight:600">Mensaje</p>
      <p style="white-space:pre-wrap;color:#0f1419">${escapeHtml(l.message)}</p>
    </div>`;
}

function renderText(l: Lead): string {
  return [
    'Nueva consulta desde gotechy.com',
    '',
    `Nombre: ${l.name}`,
    `Email: ${l.email}`,
    l.company ? `Empresa: ${l.company}` : '',
    l.phone ? `Teléfono: ${l.phone}` : '',
    '',
    'Mensaje:',
    l.message,
  ]
    .filter(Boolean)
    .join('\n');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
