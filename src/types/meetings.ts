// ============================================================
//  Agenda de reuniones (Google Meet) — tipos compartidos.
//  Los días de semana usan la convención JS: 0=domingo … 6=sábado.
// ============================================================

export interface MeetingSettingsRow {
  id: number;
  enabled: boolean;
  /** IANA timezone en la que se interpreta la franja. */
  timezone: string;
  /** 'HH:MM:SS' (Postgres time). */
  start_time: string;
  end_time: string;
  slot_minutes: number;
  allowed_weekdays: number[];
  min_notice_hours: number;
  max_days_ahead: number;
  updated_at: string;
}

export type MeetingSettingsUpdate = Partial<
  Omit<MeetingSettingsRow, 'id' | 'updated_at'>
>;

export type BookingStatus = 'confirmed' | 'cancelled';

export interface MeetingBookingRow {
  id: string;
  starts_at: string;
  ends_at: string;
  name: string;
  email: string;
  company: string | null;
  notes: string | null;
  meet_link: string | null;
  gcal_event_id: string | null;
  status: BookingStatus;
  created_at: string;
}

/** Respuesta de la Edge Function `meeting-availability`. */
export interface AvailabilityDay {
  /** YYYY-MM-DD en la timezone configurada. */
  date: string;
  /** ISO UTC del inicio de cada slot disponible. */
  slots: string[];
}

export interface AvailabilityResponse {
  enabled: boolean;
  timezone: string | null;
  slotMinutes: number | null;
  days: AvailabilityDay[];
}

/** Payload de la Edge Function `book-meeting`. */
export interface BookMeetingPayload {
  startsAt: string;
  name: string;
  email: string;
  company?: string;
  notes?: string;
  botField?: string;
}

export interface BookMeetingResponse {
  ok?: boolean;
  meetLink?: string | null;
  error?: string;
  code?: 'slot_taken' | 'invalid_slot';
}
