// ============================================================
//  Edge Function: meeting-availability
//  Devuelve los slots DISPONIBLES para agendar una reunión.
//
//  Por qué server-side: el cliente nunca ve las reservas de otros
//  (ni nombres ni emails) — solo recibe la lista de horarios libres
//  ya computada. Las reglas (franja, días, margen de 24h, colisiones)
//  viven en un solo lugar: `_shared/meetings.ts`.
//
//  Fuentes de "ocupado":
//   - Reservas confirmadas en `meeting_bookings`.
//   - (Opcional) freeBusy del Google Calendar configurado — así las
//     reuniones agendadas a mano por el equipo también bloquean slots.
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  type BusyInterval,
  type MeetingSettings,
  computeAvailability,
  getGoogleAccessToken,
  googleBusyIntervals,
} from '../_shared/meetings.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // 1. Configuración + token de Google en paralelo (el token no depende de
  //    los settings, y con el caché en memoria suele resolver al instante).
  const [settingsRes, token] = await Promise.all([
    supabase.from('meeting_settings').select('*').eq('id', 1).maybeSingle(),
    getGoogleAccessToken(),
  ]);
  const { data: settings, error: sErr } = settingsRes;
  if (sErr) {
    console.error('[meeting-availability] settings error', sErr);
    return json({ error: 'No se pudo cargar la configuración.' }, 500);
  }
  if (!settings || !settings.enabled) {
    return json({ enabled: false, timezone: null, slotMinutes: null, days: [] });
  }
  const cfg = settings as MeetingSettings;

  const now = new Date();
  const windowEnd = new Date(now.getTime() + cfg.max_days_ahead * 86400_000);

  // 2. Ocupado: reservas confirmadas de la web + freeBusy de Google
  //    Calendar (best-effort), también en paralelo.
  const [bookingsRes, googleBusy] = await Promise.all([
    supabase
      .from('meeting_bookings')
      .select('starts_at, ends_at')
      .eq('status', 'confirmed')
      .gte('starts_at', now.toISOString())
      .lte('starts_at', windowEnd.toISOString()),
    token ? googleBusyIntervals(token, now, windowEnd) : Promise.resolve([] as BusyInterval[]),
  ]);
  const { data: bookings, error: bErr } = bookingsRes;
  if (bErr) {
    console.error('[meeting-availability] bookings error', bErr);
    return json({ error: 'No se pudo calcular la disponibilidad.' }, 500);
  }
  const busy: BusyInterval[] = (bookings ?? []).map((b) => ({
    start: new Date(b.starts_at).getTime(),
    end: new Date(b.ends_at).getTime(),
  }));
  busy.push(...googleBusy);

  // 3. Computar slots libres.
  const days = computeAvailability(cfg, busy, now);

  return json({
    enabled: true,
    timezone: cfg.timezone,
    slotMinutes: cfg.slot_minutes,
    days,
  });
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
