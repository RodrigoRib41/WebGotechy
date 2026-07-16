import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck2,
  Clock,
  Loader2,
  Video,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { meetingsService } from '../../lib/supabase';
import type { AvailabilityResponse } from '../../types/meetings';
import { PhotoBanner } from '../PhotoBanner';
import { cn } from '../../utils/cn';

type Step = 'loading' | 'idle' | 'submitting' | 'success' | 'hidden';

/**
 * Agendador de reuniones (Google Meet) — página de Contacto.
 *
 * Sección CLARA con banner fotográfico (patrón del Home) y el card del
 * agendador superpuesto al borde inferior del banner.
 *
 * El visitante elige un día y un horario LIBRE (la disponibilidad la computa
 * la Edge Function `meeting-availability`: franja y días del admin, margen
 * mínimo de 24h, sin slots que pisen otras reuniones). Después completa sus
 * datos y `book-meeting` crea la reserva + el evento de Meet.
 *
 * Los horarios se muestran en la zona horaria del visitante (con aclaración).
 * Si el agendado está deshabilitado o falla la carga, la sección no se
 * renderiza (la página de contacto sigue completa con el formulario).
 */
export function MeetingScheduler() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const locale = isEn ? 'en-US' : 'es-AR';

  const [step, setStep] = useState<Step>('loading');
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const a = await meetingsService.availability();
      if (!a.enabled || a.days.length === 0) {
        setStep('hidden');
        return;
      }
      setAvailability(a);
      setDayIdx(0);
      setStep('idle');
    } catch {
      setStep('hidden'); // degrada limpio: sin sección
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // El layout scrollea al top en cada navegación (useScrollToTop) y esta
  // sección carga async → honramos el ancla #agendar recién cuando existe.
  useEffect(() => {
    if (step === 'idle' && window.location.hash === '#agendar') {
      document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const visitorTz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  const days = availability?.days ?? [];
  const selectedDay = days[dayIdx];

  const dayLabel = useCallback(
    (dateStr: string) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(Date.UTC(y, m - 1, d, 12));
      return {
        weekday: date.toLocaleDateString(locale, { weekday: 'short', timeZone: 'UTC' }),
        day: date.toLocaleDateString(locale, { day: 'numeric', timeZone: 'UTC' }),
        month: date.toLocaleDateString(locale, { month: 'short', timeZone: 'UTC' }),
      };
    },
    [locale],
  );

  const timeLabel = useCallback(
    (iso: string) =>
      new Date(iso).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    [locale],
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slot) return;
    setError(null);
    setStep('submitting');
    try {
      const botField = (new FormData(e.currentTarget).get('bot-field') as string) ?? '';
      const res = await meetingsService.book({
        startsAt: slot,
        name,
        email,
        company,
        notes,
        botField,
      });
      if (res.ok) {
        setMeetLink(res.meetLink ?? null);
        setStep('success');
        return;
      }
      // Slot ocupado en el medio → recargar disponibilidad y avisar.
      if (res.code === 'slot_taken' || res.code === 'invalid_slot') {
        setSlot(null);
        await load();
        setStep('idle');
        setError(t('meeting.slotTaken'));
        return;
      }
      setStep('idle');
      setError(res.error ?? t('meeting.errorGeneric'));
    } catch {
      setStep('idle');
      setError(t('meeting.errorGeneric'));
    }
  };

  if (step === 'hidden' || step === 'loading') return null;

  return (
    <section
      id="agendar"
      className="relative bg-white text-[#0F1419]"
      aria-labelledby="meeting-title"
    >
      {/* ---- Banner fotográfico (reunión en oficina) ---- */}
      <PhotoBanner
        image="/images/banner-meeting.webp"
        align="left"
        overlap
        titleId="meeting-title"
        eyebrow={t('meeting.eyebrow')}
        title={
          <>
            {t('meeting.titleStart')}{' '}
            <span className="text-brand-600">{t('meeting.titleHighlight')}</span>
          </>
        }
        subtitle={t('meeting.subtitle')}
      />

      {/* ---- Agendador superpuesto al banner ---- */}
      <div className="relative bg-gradient-to-b from-transparent via-[#F7FAFC] to-white pb-20 sm:pb-28">
        <div className="container-x relative -mt-28 sm:-mt-32">
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              {step === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-brand-200 bg-white p-10 text-center shadow-lg"
                >
                  <CalendarCheck2 className="mx-auto h-14 w-14 text-brand-500" />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#0F1419]">
                    {t('meeting.successTitle')}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-[#0F1419]/65">
                    {slot &&
                      new Date(slot).toLocaleString(locale, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                    · {t('meeting.successBody')}
                  </p>
                  {meetLink && (
                    <a
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-light mt-6 inline-flex"
                    >
                      <Video className="h-4 w-4" />
                      {t('meeting.joinLink')}
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="picker"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(15,20,25,0.12)] sm:p-8"
                >
                  {/* 1 — Día */}
                  <StepLabel n={1} label={t('meeting.pickDay')} />
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                    {days.map((d, i) => {
                      const l = dayLabel(d.date);
                      const active = i === dayIdx;
                      return (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => {
                            setDayIdx(i);
                            setSlot(null);
                          }}
                          className={cn(
                            'flex min-w-[76px] shrink-0 flex-col items-center rounded-2xl border px-3 py-2.5 transition',
                            active
                              ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-[0_6px_20px_-8px_rgba(0,229,255,0.5)]'
                              : 'border-black/10 bg-white text-[#0F1419]/55 hover:border-brand-300 hover:text-[#0F1419]',
                          )}
                        >
                          <span className="text-[11px] font-semibold uppercase tracking-wider">
                            {l.weekday}
                          </span>
                          <span className="font-display text-xl font-bold">{l.day}</span>
                          <span className="text-[11px] uppercase">{l.month}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 2 — Horario */}
                  <StepLabel n={2} label={t('meeting.pickTime')} className="mt-6" />
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#0F1419]/45">
                    <Clock className="h-3 w-3" />
                    {t('meeting.timezoneNote', { tz: visitorTz })}
                    {availability?.slotMinutes &&
                      ` · ${t('meeting.duration', { min: availability.slotMinutes })}`}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {selectedDay?.slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlot(s)}
                        className={cn(
                          'rounded-xl border px-2 py-2.5 font-mono text-sm transition',
                          slot === s
                            ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-[0_6px_20px_-8px_rgba(0,229,255,0.5)]'
                            : 'border-black/10 bg-white text-[#0F1419]/65 hover:border-brand-300 hover:text-[#0F1419]',
                        )}
                      >
                        {timeLabel(s)}
                      </button>
                    ))}
                  </div>

                  {/* 3 — Datos */}
                  {slot && (
                    <motion.form
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={onSubmit}
                      noValidate
                      className="mt-7 border-t border-black/10 pt-6"
                    >
                      <StepLabel n={3} label={t('meeting.yourData')} />
                      <p className="hidden">
                        <label>
                          No completar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                        </label>
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t('meeting.fieldName')}
                          className="input-light"
                          maxLength={120}
                        />
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('meeting.fieldEmail')}
                          className="input-light"
                          maxLength={200}
                        />
                      </div>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t('meeting.fieldCompany')}
                        className="input-light mt-4"
                        maxLength={150}
                      />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t('meeting.fieldNotes')}
                        rows={3}
                        className="input-light mt-4 resize-y"
                        maxLength={2000}
                      />

                      {error && (
                        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-xs text-[#0F1419]/55">
                          {new Date(slot).toLocaleString(locale, {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <button
                          type="submit"
                          disabled={step === 'submitting' || !name.trim() || !email.trim()}
                          className={cn(
                            'btn-primary-light w-full sm:w-auto',
                            (step === 'submitting' || !name.trim() || !email.trim()) &&
                              'opacity-60',
                          )}
                        >
                          {step === 'submitting' ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t('meeting.booking')}
                            </>
                          ) : (
                            <>
                              {t('meeting.confirm')}
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {!slot && error && (
                    <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ n, label, className }: { n: number; label: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 font-mono text-xs font-bold text-brand-700 ring-1 ring-brand-200">
        {n}
      </span>
      <span className="text-sm font-semibold uppercase tracking-wider text-[#0F1419]/70">
        {label}
      </span>
    </div>
  );
}
