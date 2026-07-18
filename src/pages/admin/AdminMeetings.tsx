import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Ban,
  CalendarClock,
  ExternalLink,
  Loader2,
  Save,
  Video,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { meetingsService } from '../../lib/supabase';
import type { MeetingBookingRow, MeetingSettingsRow } from '../../types/meetings';
import { cn } from '../../utils/cn';

/** Días de semana (convención JS: 0=domingo … 6=sábado). */
const WEEKDAYS: { value: number; label: string }[] = [
  { value: 1, label: 'Lun' },
  { value: 2, label: 'Mar' },
  { value: 3, label: 'Mié' },
  { value: 4, label: 'Jue' },
  { value: 5, label: 'Vie' },
  { value: 6, label: 'Sáb' },
  { value: 0, label: 'Dom' },
];

export function AdminMeetings() {
  const [settings, setSettings] = useState<MeetingSettingsRow | null>(null);
  const [bookings, setBookings] = useState<MeetingBookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toCancel, setToCancel] = useState<MeetingBookingRow | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [s, b] = await Promise.all([
        meetingsService.getSettings(),
        meetingsService.listBookings(),
      ]);
      setSettings(s);
      setBookings(b);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const { upcoming, past } = useMemo(() => {
    const now = new Date().toISOString();
    return {
      upcoming: bookings.filter((b) => b.starts_at >= now),
      past: bookings.filter((b) => b.starts_at < now).reverse(),
    };
  }, [bookings]);

  const onCancel = async () => {
    if (!toCancel) return;
    setCancelling(true);
    try {
      await meetingsService.cancelBooking(toCancel.id);
      toast.success('Reserva cancelada. El horario vuelve a estar libre.');
      if (toCancel.gcal_event_id) {
        toast('Recordá borrar el evento también en Google Calendar.', { icon: '📅', duration: 6000 });
      }
      setToCancel(null);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al cancelar.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <AdminLayout title="Reuniones (Google Meet)">
      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
          <p className="mt-3 text-xs text-red-200/80">
            Si ves "relation does not exist", corré primero la migración SQL de
            <code> supabase/MIGRATIONS.md</code> (sección "Agenda de reuniones").
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          <SettingsCard settings={settings} onSaved={refresh} />

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-white">
              <CalendarClock className="h-5 w-5 text-secondary" />
              Próximas reuniones ({upcoming.length})
            </h2>
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/55">
                No hay reuniones agendadas.
              </div>
            ) : (
              <div className="grid gap-3">
                {upcoming.map((b) => (
                  <BookingRow key={b.id} booking={b} onCancel={() => setToCancel(b)} />
                ))}
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section className="opacity-60">
              <h2 className="mb-3 font-display text-lg font-bold text-white">
                Pasadas ({past.length})
              </h2>
              <div className="grid gap-3">
                {past.slice(0, 10).map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(toCancel)}
        title="¿Cancelar esta reunión?"
        description={
          toCancel
            ? `Vas a cancelar la reunión con ${toCancel.name} (${toCancel.email}). El horario queda libre para otros.`
            : undefined
        }
        loading={cancelling}
        onConfirm={onCancel}
        onCancel={() => !cancelling && setToCancel(null)}
      />
    </AdminLayout>
  );
}

// ============================================================
//  Configuración de la agenda
// ============================================================
function SettingsCard({
  settings,
  onSaved,
}: {
  settings: MeetingSettingsRow | null;
  onSaved: () => Promise<void>;
}) {
  const [enabled, setEnabled] = useState(settings?.enabled ?? true);
  const [startTime, setStartTime] = useState((settings?.start_time ?? '09:00').slice(0, 5));
  const [endTime, setEndTime] = useState((settings?.end_time ?? '18:00').slice(0, 5));
  const [hasSecond, setHasSecond] = useState(
    Boolean(settings?.start_time2 && settings?.end_time2),
  );
  const [startTime2, setStartTime2] = useState((settings?.start_time2 ?? '14:00').slice(0, 5));
  const [endTime2, setEndTime2] = useState((settings?.end_time2 ?? '18:00').slice(0, 5));
  const [slotMinutes, setSlotMinutes] = useState(settings?.slot_minutes ?? 30);
  const [weekdays, setWeekdays] = useState<number[]>(settings?.allowed_weekdays ?? [1, 2, 3, 4, 5]);
  const [minNotice, setMinNotice] = useState(settings?.min_notice_hours ?? 24);
  const [maxAhead, setMaxAhead] = useState(settings?.max_days_ahead ?? 30);
  const [saving, setSaving] = useState(false);

  const toggleDay = (d: number) =>
    setWeekdays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const save = async () => {
    if (startTime >= endTime) return toast.error('La franja 1 es inválida (inicio ≥ fin).');
    if (hasSecond) {
      if (startTime2 >= endTime2)
        return toast.error('La franja 2 es inválida (inicio ≥ fin).');
      // Sin solapamiento entre franjas (en cualquier orden).
      if (startTime2 < endTime && endTime2 > startTime)
        return toast.error('Las dos franjas no pueden solaparse.');
    }
    if (weekdays.length === 0) return toast.error('Habilitá al menos un día.');
    setSaving(true);
    try {
      await meetingsService.updateSettings({
        enabled,
        start_time: startTime,
        end_time: endTime,
        start_time2: hasSecond ? startTime2 : null,
        end_time2: hasSecond ? endTime2 : null,
        slot_minutes: slotMinutes,
        allowed_weekdays: weekdays,
        min_notice_hours: minNotice,
        max_days_ahead: maxAhead,
      });
      toast.success('Configuración guardada.');
      await onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <Video className="h-5 w-5 text-secondary" />
          Configuración de la agenda
        </h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 accent-secondary"
          />
          Agendado habilitado en /contacto
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Franja 1 — desde">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="input-base"
          />
        </Field>
        <Field label="Franja 1 — hasta">
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="input-base"
          />
        </Field>
        <Field label="Duración del slot (min)">
          <select
            value={slotMinutes}
            onChange={(e) => setSlotMinutes(parseInt(e.target.value, 10))}
            className="input-base"
          >
            {[15, 30, 45, 60, 90].map((m) => (
              <option key={m} value={m}>
                {m} minutos
              </option>
            ))}
          </select>
        </Field>
        <Field label="Antelación mínima (horas)" hint="Margen antes del primer slot">
          <input
            type="number"
            min={0}
            max={168}
            value={minNotice}
            onChange={(e) => setMinNotice(parseInt(e.target.value, 10) || 0)}
            className="input-base"
          />
        </Field>
      </div>

      {/* Segunda franja opcional (p. ej. cortar al mediodía: 10-12 y 14-18) */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <label className="flex cursor-pointer flex-wrap items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={hasSecond}
            onChange={(e) => setHasSecond(e.target.checked)}
            className="h-4 w-4 accent-secondary"
          />
          Segunda franja horaria
          <span className="text-xs text-white/45">
            p. ej. para cortar al mediodía: 10:00-12:00 y 14:00-18:00
          </span>
        </label>
        {hasSecond && (
          <div className="mt-3 grid max-w-md gap-4 sm:grid-cols-2">
            <Field label="Franja 2 — desde">
              <input
                type="time"
                value={startTime2}
                onChange={(e) => setStartTime2(e.target.value)}
                className="input-base"
              />
            </Field>
            <Field label="Franja 2 — hasta">
              <input
                type="time"
                value={endTime2}
                onChange={(e) => setEndTime2(e.target.value)}
                className="input-base"
              />
            </Field>
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Días habilitados">
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => toggleDay(d.value)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-semibold transition',
                  weekdays.includes(d.value)
                    ? 'bg-secondary/20 text-secondary-200 ring-1 ring-secondary/40'
                    : 'bg-white/5 text-white/50 ring-1 ring-white/10 hover:text-white',
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Máx. días hacia adelante" hint="Hasta cuándo se puede agendar">
          <input
            type="number"
            min={1}
            max={90}
            value={maxAhead}
            onChange={(e) => setMaxAhead(parseInt(e.target.value, 10) || 30)}
            className="input-base"
          />
        </Field>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className={cn('btn-primary !text-sm', saving && 'opacity-60')}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Guardar configuración
        </button>
      </div>
    </section>
  );
}

// ============================================================
//  Fila de reserva
// ============================================================
function BookingRow({
  booking,
  onCancel,
}: {
  booking: MeetingBookingRow;
  onCancel?: () => void;
}) {
  const start = new Date(booking.starts_at);
  const cancelled = booking.status === 'cancelled';
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-card backdrop-blur sm:flex-row sm:items-center',
        cancelled && 'opacity-50',
      )}
    >
      <div className="min-w-[180px] shrink-0">
        <div className="font-display text-base font-bold text-white">
          {format(start, "EEE d MMM yyyy", { locale: es })}
        </div>
        <div className="font-mono text-sm text-secondary-300">
          {format(start, 'HH:mm')} — {format(new Date(booking.ends_at), 'HH:mm')} hs
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white">{booking.name}</span>
          <span className="text-xs text-white/55">{booking.email}</span>
          {booking.company && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/70">
              {booking.company}
            </span>
          )}
          {cancelled && (
            <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300 ring-1 ring-red-400/30">
              Cancelada
            </span>
          )}
        </div>
        {booking.notes && (
          <p className="mt-1 line-clamp-2 text-xs text-white/55">{booking.notes}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {booking.meet_link && !cancelled && (
          <a
            href={booking.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1.5 text-xs font-semibold text-secondary-200 ring-1 ring-secondary/30 transition hover:bg-secondary/25"
          >
            <Video className="h-3.5 w-3.5" /> Meet
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {onCancel && !cancelled && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
          >
            <Ban className="h-3.5 w-3.5" /> Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/55">{label}</span>
        {hint && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
