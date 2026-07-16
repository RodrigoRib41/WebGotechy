// ============================================================
//  Helpers compartidos por `meeting-availability` y `book-meeting`.
//
//  Convenciones:
//   - Los días de semana usan la convención JS: 0=domingo … 6=sábado.
//   - Los slots viajan como ISO UTC; el front los muestra en la zona
//     horaria del visitante.
//   - La "franja" (start_time/end_time) se interpreta en la zona horaria
//     configurada en `meeting_settings.timezone`.
// ============================================================

export interface MeetingSettings {
  enabled: boolean;
  timezone: string;
  start_time: string; // 'HH:MM' o 'HH:MM:SS'
  end_time: string;
  slot_minutes: number;
  allowed_weekdays: number[];
  min_notice_hours: number;
  max_days_ahead: number;
}

export interface BusyInterval {
  start: number; // epoch ms
  end: number;
}

/** Offset (ms) de una zona horaria respecto de UTC en un instante dado. */
function tzOffsetMs(timeZone: string, utcDate: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(utcDate).map((p) => [p.type, p.value]),
  ) as Record<string, string>;
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return asUtc - utcDate.getTime();
}

/** Convierte una fecha+hora "de pared" en una zona horaria a un Date UTC. */
export function zonedToUtc(
  y: number,
  m: number, // 1-12
  d: number,
  hh: number,
  mm: number,
  timeZone: string,
): Date {
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm));
  // Dos pasadas para cubrir bordes de DST.
  const off1 = tzOffsetMs(timeZone, guess);
  const adjusted = new Date(guess.getTime() - off1);
  const off2 = tzOffsetMs(timeZone, adjusted);
  return new Date(guess.getTime() - off2);
}

/** 'YYYY-MM-DD' de un instante, expresado en una zona horaria. */
export function dateStrInTz(utc: Date, timeZone: string): string {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return dtf.format(utc); // en-CA → YYYY-MM-DD
}

function parseHM(t: string): { h: number; m: number } {
  const [h, m] = t.split(':').map((x) => parseInt(x, 10));
  return { h: h || 0, m: m || 0 };
}

/** Día de semana (0=dom…6=sáb) de una fecha calendario pura. */
export function weekdayOf(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

export function overlaps(aStart: number, aEnd: number, busy: BusyInterval[]): boolean {
  return busy.some((b) => aStart < b.end && aEnd > b.start);
}

export interface DaySlots {
  date: string; // YYYY-MM-DD en la tz configurada
  slots: string[]; // ISO UTC de inicio de cada slot disponible
}

/**
 * Genera los slots disponibles según settings, a partir de `now`,
 * descontando los intervalos ocupados.
 */
export function computeAvailability(
  settings: MeetingSettings,
  busy: BusyInterval[],
  now: Date,
): DaySlots[] {
  const minStart = now.getTime() + settings.min_notice_hours * 3600_000;
  const windowEnd = now.getTime() + settings.max_days_ahead * 86400_000;
  const { h: sh, m: sm } = parseHM(settings.start_time);
  const { h: eh, m: em } = parseHM(settings.end_time);
  const franjaMin = eh * 60 + em - (sh * 60 + sm);
  if (franjaMin <= 0 || settings.slot_minutes <= 0) return [];

  const days: DaySlots[] = [];
  let dateStr = dateStrInTz(now, settings.timezone);

  for (let i = 0; i <= settings.max_days_ahead; i++, dateStr = addDays(dateStr, 1)) {
    if (!settings.allowed_weekdays.includes(weekdayOf(dateStr))) continue;

    const [y, m, d] = dateStr.split('-').map(Number);
    const slots: string[] = [];
    for (let t = 0; t + settings.slot_minutes <= franjaMin; t += settings.slot_minutes) {
      const total = sh * 60 + sm + t;
      const start = zonedToUtc(y, m, d, Math.floor(total / 60), total % 60, settings.timezone);
      const startMs = start.getTime();
      const endMs = startMs + settings.slot_minutes * 60_000;
      if (startMs < minStart || startMs > windowEnd) continue;
      if (overlaps(startMs, endMs, busy)) continue;
      slots.push(start.toISOString());
    }
    if (slots.length > 0) days.push({ date: dateStr, slots });
  }
  return days;
}

/**
 * Valida que un inicio de slot propuesto sea legítimo según settings
 * (día permitido, dentro de la franja, alineado a la grilla y con el
 * margen mínimo de anticipación). No chequea colisiones — eso es aparte.
 */
export function isValidSlotStart(
  settings: MeetingSettings,
  startsAt: Date,
  now: Date,
): boolean {
  const startMs = startsAt.getTime();
  if (Number.isNaN(startMs)) return false;
  if (startMs < now.getTime() + settings.min_notice_hours * 3600_000) return false;
  if (startMs > now.getTime() + settings.max_days_ahead * 86400_000) return false;

  const dateStr = dateStrInTz(startsAt, settings.timezone);
  if (!settings.allowed_weekdays.includes(weekdayOf(dateStr))) return false;

  // Alineación con la grilla de la franja horaria.
  const { h: sh, m: sm } = parseHM(settings.start_time);
  const { h: eh, m: em } = parseHM(settings.end_time);
  const [y, m, d] = dateStr.split('-').map(Number);
  const franjaStart = zonedToUtc(y, m, d, sh, sm, settings.timezone).getTime();
  const franjaEnd = zonedToUtc(y, m, d, eh, em, settings.timezone).getTime();
  const offsetMin = (startMs - franjaStart) / 60_000;
  if (offsetMin < 0 || !Number.isInteger(offsetMin)) return false;
  if (offsetMin % settings.slot_minutes !== 0) return false;
  if (startMs + settings.slot_minutes * 60_000 > franjaEnd) return false;
  return true;
}

// ============================================================
//  Google Calendar (OAuth refresh token) — opcional.
//  Si los secrets no están configurados, todo devuelve null y el
//  sistema degrada limpio (reserva + email sin link de Meet).
// ============================================================

export async function getGoogleAccessToken(): Promise<string | null> {
  const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
  const refreshToken = Deno.env.get('GOOGLE_REFRESH_TOKEN');
  if (!clientId || !clientSecret || !refreshToken) return null;
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    if (!res.ok) {
      console.error('[google] token refresh failed', res.status, await res.text().catch(() => ''));
      return null;
    }
    const j = await res.json();
    return (j.access_token as string) ?? null;
  } catch (e) {
    console.error('[google] token refresh error', e);
    return null;
  }
}

export function googleCalendarId(): string {
  return Deno.env.get('GOOGLE_CALENDAR_ID') ?? 'primary';
}

/** Intervalos ocupados del calendario de Google (freeBusy). Best-effort. */
export async function googleBusyIntervals(
  accessToken: string,
  timeMin: Date,
  timeMax: Date,
): Promise<BusyInterval[]> {
  try {
    const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: googleCalendarId() }],
      }),
    });
    if (!res.ok) {
      console.error('[google] freeBusy failed', res.status, await res.text().catch(() => ''));
      return [];
    }
    const j = await res.json();
    const cal = j.calendars?.[googleCalendarId()] ?? Object.values(j.calendars ?? {})[0];
    const busy = (cal?.busy ?? []) as { start: string; end: string }[];
    return busy.map((b) => ({
      start: new Date(b.start).getTime(),
      end: new Date(b.end).getTime(),
    }));
  } catch (e) {
    console.error('[google] freeBusy error', e);
    return [];
  }
}
