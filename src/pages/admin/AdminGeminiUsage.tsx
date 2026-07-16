import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Coins,
  Gauge,
  Info,
  Loader2,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { chatbotService } from '../../lib/supabase';
import type { ChatbotUsageDailyRow } from '../../types/chatbot';
import { cn } from '../../utils/cn';

// Límites del tier gratuito de Gemini para el modelo del bot
// (gemini-flash-lite-latest). Google los ajusta cada tanto: verificarlos en
// https://ai.google.dev/gemini-api/docs/rate-limits y actualizar acá.
const FREE_TIER_REQUESTS_PER_DAY = 1000;
const FREE_TIER_REQUESTS_PER_MINUTE = 15;
const FREE_TIER_TOKENS_PER_MINUTE = 250_000;

const HISTORY_DAYS = 14;

/** Día de cuota vigente: Google reinicia a medianoche hora del Pacífico. */
function quotaDay(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(date);
}

/** "YYYY-MM-DD" → Date local (evita el corrimiento de new Date(iso) a UTC). */
function parseDay(day: string): Date {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const EMPTY_DAY: Omit<ChatbotUsageDailyRow, 'day'> = {
  total: 0,
  ok_count: 0,
  rate_limited_count: 0,
  error_count: 0,
  prompt_tokens: 0,
  output_tokens: 0,
};

export function AdminGeminiUsage() {
  const [rows, setRows] = useState<ChatbotUsageDailyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setRows(await chatbotService.listUsageDaily(HISTORY_DAYS));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Serie continua de 14 días (la RPC omite los días sin llamadas).
  const days = useMemo(() => {
    const byDay = new Map(rows.map((r) => [r.day, r]));
    const out: ChatbotUsageDailyRow[] = [];
    for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
      const day = quotaDay(new Date(Date.now() - i * 86_400_000));
      if (out.length > 0 && out[out.length - 1].day === day) continue; // borde DST
      out.push(byDay.get(day) ?? { day, ...EMPTY_DAY });
    }
    return out;
  }, [rows]);

  const today = days[days.length - 1] ?? { day: quotaDay(new Date()), ...EMPTY_DAY };

  return (
    <AdminLayout
      title="Consumo de Gemini"
      actions={
        <button
          type="button"
          onClick={() => {
            setRefreshing(true);
            void refresh();
          }}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-60"
        >
          <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
          Actualizar
        </button>
      }
    >
      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
          <p className="mt-3 text-xs text-red-200/80">
            Si ves "relation does not exist" o "function ... does not exist", corré primero
            la migración SQL de <code>supabase/MIGRATIONS.md</code> (sección "Medidor de
            consumo de Gemini") y re-desplegá la función <code>chat-assistant</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          <QuotaMeterCard today={today} />
          <KpiRow today={today} />
          <HistoryCard days={days} todayDay={today.day} />
          <NotesCard />
        </div>
      )}
    </AdminLayout>
  );
}

// ============================================================
//  Medidor de la cuota diaria
// ============================================================
function QuotaMeterCard({ today }: { today: ChatbotUsageDailyRow }) {
  const pct = (today.total / FREE_TIER_REQUESTS_PER_DAY) * 100;

  const severity =
    pct >= 100
      ? {
          icon: XCircle,
          label: 'Cuota diaria agotada',
          text: 'text-red-300',
          fill: 'bg-red-400',
          track: 'bg-red-400/15',
        }
      : pct >= 90
        ? {
            icon: AlertTriangle,
            label: 'Límite casi agotado',
            text: 'text-red-300',
            fill: 'bg-red-400',
            track: 'bg-red-400/15',
          }
        : pct >= 70
          ? {
              icon: AlertTriangle,
              label: 'Acercándose al límite',
              text: 'text-amber-300',
              fill: 'bg-amber-400',
              track: 'bg-amber-400/15',
            }
          : {
              icon: CheckCircle2,
              label: 'Consumo normal',
              text: 'text-secondary-200',
              fill: 'bg-secondary',
              track: 'bg-secondary/15',
            };
  const SeverityIcon = severity.icon;
  const pctLabel = pct > 0 && pct < 1 ? '<1' : String(Math.round(pct));

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <Gauge className="h-5 w-5 text-secondary" />
            Cuota diaria del tier gratuito
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/55">
            Consultas a Gemini en el día de cuota vigente. Google la reinicia a medianoche
            hora del Pacífico (~4-5 h en Argentina).
          </p>
        </div>
        <div className={cn('flex items-center gap-1.5 text-sm font-semibold', severity.text)}>
          <SeverityIcon className="h-4 w-4" />
          {severity.label}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-3xl font-semibold text-white">
            {today.total.toLocaleString('es-AR')}
            <span className="ml-2 text-sm font-normal text-white/45">
              de {FREE_TIER_REQUESTS_PER_DAY.toLocaleString('es-AR')} consultas
            </span>
          </div>
          <div className="text-sm text-white/55">{pctLabel}%</div>
        </div>
        <div
          role="meter"
          aria-valuemin={0}
          aria-valuemax={FREE_TIER_REQUESTS_PER_DAY}
          aria-valuenow={Math.min(today.total, FREE_TIER_REQUESTS_PER_DAY)}
          aria-label="Consultas del día contra el límite diario gratuito"
          className={cn('mt-3 h-3 w-full overflow-hidden rounded-full', severity.track)}
        >
          <div
            className={cn('h-full rounded-full transition-all', severity.fill)}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>

      {today.rate_limited_count > 0 && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-xs text-amber-200">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Gemini rechazó {today.rate_limited_count.toLocaleString('es-AR')} consulta
          {today.rate_limited_count === 1 ? '' : 's'} hoy con error 429: puede ser un pico
          de mensajes por minuto o la cuota diaria agotada. El widget le pide al visitante
          que reintente.
        </p>
      )}
    </section>
  );
}

// ============================================================
//  KPIs del día
// ============================================================
function KpiRow({ today }: { today: ChatbotUsageDailyRow }) {
  const tokens = today.prompt_tokens + today.output_tokens;
  const compact = new Intl.NumberFormat('es-AR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  const tiles = [
    {
      icon: Activity,
      label: 'Respuestas OK hoy',
      value: today.ok_count.toLocaleString('es-AR'),
      sub: 'llamadas completadas',
    },
    {
      icon: Coins,
      label: 'Tokens hoy',
      value: compact.format(tokens),
      sub: `entrada ${compact.format(today.prompt_tokens)} · salida ${compact.format(today.output_tokens)}`,
    },
    {
      icon: AlertTriangle,
      label: 'Rechazos por cuota hoy',
      value: today.rate_limited_count.toLocaleString('es-AR'),
      sub: 'error 429 de Gemini',
      alert: today.rate_limited_count > 0 ? ('warning' as const) : undefined,
    },
    {
      icon: XCircle,
      label: 'Errores hoy',
      value: today.error_count.toLocaleString('es-AR'),
      sub: 'fallas de la API',
      alert: today.error_count > 0 ? ('danger' as const) : undefined,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {tiles.map((t) => {
        const Icon = t.icon;
        return (
          <div
            key={t.label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/55">
              <Icon
                className={cn(
                  'h-4 w-4',
                  t.alert === 'danger'
                    ? 'text-red-300'
                    : t.alert === 'warning'
                      ? 'text-amber-300'
                      : 'text-secondary',
                )}
              />
              {t.label}
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">{t.value}</div>
            <div className="mt-1 text-xs text-white/45">{t.sub}</div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
//  Historial de 14 días — chart de columnas + tabla
// ============================================================
function HistoryCard({ days, todayDay }: { days: ChatbotUsageDailyRow[]; todayDay: string }) {
  const max = Math.max(...days.map((d) => d.total), 0);
  // Techo "redondo" del eje: 1/2/5 × 10^k por encima del máximo.
  const niceMax = useMemo(() => {
    if (max <= 10) return 10;
    const pow = 10 ** Math.floor(Math.log10(max));
    for (const step of [1, 2, 5, 10]) {
      if (max <= step * pow) return step * pow;
    }
    return 10 * pow;
  }, [max]);

  const hasData = days.some((d) => d.total > 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
        <BarChart3 className="h-5 w-5 text-secondary" />
        Últimos {HISTORY_DAYS} días
      </h2>
      <p className="mt-1 text-sm text-white/55">
        Consultas a Gemini por día de cuota. Pasá el mouse por una barra para ver el
        detalle.
      </p>

      {!hasData ? (
        <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-sm text-white/55">
          Sin consumo registrado todavía. El registro arranca con la primera consulta al
          bot después de aplicar la migración y re-desplegar <code>chat-assistant</code>.
        </div>
      ) : (
        <>
          {/* Chart de columnas (una sola serie → sin leyenda) */}
          <div className="mt-6">
            <div className="relative h-44">
              {/* Gridlines recesivas + ticks del eje Y */}
              {[1, 0.5].map((f) => (
                <div
                  key={f}
                  className="absolute inset-x-0 border-t border-white/10"
                  style={{ bottom: `${f * 100}%` }}
                >
                  <span className="absolute -top-2 right-0 text-[10px] tabular-nums text-white/40 sm:right-auto sm:-left-1 sm:-translate-x-full">
                    {(niceMax * f).toLocaleString('es-AR')}
                  </span>
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 border-t border-white/15" />

              <div className="absolute inset-0 flex items-end gap-[3px] sm:gap-1.5 sm:pl-8">
                {days.map((d, i) => {
                  const isToday = d.day === todayDay;
                  // Anclado hacia adentro del chart para que no desborde.
                  const tooltipSide = i < days.length / 2 ? 'left-0' : 'right-0';
                  return (
                    <div
                      key={d.day}
                      className="group relative flex h-full max-w-[32px] flex-1 items-end justify-center"
                    >
                      {/* Valor directo solo en el día vigente */}
                      {isToday && d.total > 0 && (
                        <span className="absolute bottom-full mb-6 hidden text-[10px] font-semibold text-white/70 sm:block">
                          {d.total.toLocaleString('es-AR')}
                        </span>
                      )}
                      <div
                        className={cn(
                          'w-full max-w-[24px] rounded-t-[4px] transition',
                          isToday ? 'bg-secondary' : 'bg-secondary/60',
                          'group-hover:bg-secondary-300',
                        )}
                        style={{
                          height: `${(d.total / niceMax) * 100}%`,
                          minHeight: d.total > 0 ? 3 : 0,
                        }}
                      />
                      {/* Tooltip */}
                      <div
                        className={cn(
                          'pointer-events-none absolute bottom-full z-10 mb-2 hidden whitespace-nowrap rounded-xl border border-white/10 bg-gt-dark-soft px-3 py-2 text-xs shadow-elevated group-hover:block',
                          tooltipSide,
                        )}
                      >
                        <div className="font-semibold text-white">
                          {format(parseDay(d.day), "EEEE d 'de' MMMM", { locale: es })}
                          {isToday && ' · hoy'}
                        </div>
                        <div className="mt-1 space-y-0.5 tabular-nums text-white/70">
                          <div>{d.total.toLocaleString('es-AR')} consultas</div>
                          <div>
                            {(d.prompt_tokens + d.output_tokens).toLocaleString('es-AR')}{' '}
                            tokens
                          </div>
                          {(d.rate_limited_count > 0 || d.error_count > 0) && (
                            <div className="text-amber-300">
                              {d.rate_limited_count} × 429 · {d.error_count} errores
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Eje X */}
            <div className="mt-2 flex gap-[3px] sm:gap-1.5 sm:pl-8">
              {days.map((d, i) => (
                <div
                  key={d.day}
                  className="max-w-[32px] flex-1 text-center text-[10px] text-white/40"
                >
                  {d.day === todayDay ? (
                    <span className="font-semibold text-white/70">Hoy</span>
                  ) : (
                    <span className={cn(i % 2 !== days.length % 2 && 'hidden sm:inline')}>
                      {format(parseDay(d.day), 'd/M')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vista de tabla (detalle diario) */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-white/50">
                  <th className="px-4 py-2.5 font-semibold">Día</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Consultas</th>
                  <th className="px-4 py-2.5 text-right font-semibold">OK</th>
                  <th className="px-4 py-2.5 text-right font-semibold">429</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Errores</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Tok. entrada</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Tok. salida</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[...days].reverse().map((d) => (
                  <tr key={d.day} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-2 text-white/75">
                      {format(parseDay(d.day), 'd MMM', { locale: es })}
                      {d.day === todayDay && (
                        <span className="ml-2 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold text-secondary-200">
                          hoy
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right text-white/85">
                      {d.total.toLocaleString('es-AR')}
                    </td>
                    <td className="px-4 py-2 text-right text-white/60">
                      {d.ok_count.toLocaleString('es-AR')}
                    </td>
                    <td
                      className={cn(
                        'px-4 py-2 text-right',
                        d.rate_limited_count > 0 ? 'text-amber-300' : 'text-white/60',
                      )}
                    >
                      {d.rate_limited_count.toLocaleString('es-AR')}
                    </td>
                    <td
                      className={cn(
                        'px-4 py-2 text-right',
                        d.error_count > 0 ? 'text-red-300' : 'text-white/60',
                      )}
                    >
                      {d.error_count.toLocaleString('es-AR')}
                    </td>
                    <td className="px-4 py-2 text-right text-white/60">
                      {d.prompt_tokens.toLocaleString('es-AR')}
                    </td>
                    <td className="px-4 py-2 text-right text-white/60">
                      {d.output_tokens.toLocaleString('es-AR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

// ============================================================
//  Notas
// ============================================================
function NotesCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-xs leading-relaxed text-white/50">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
        <Info className="h-4 w-4 text-secondary" />
        Cómo leer este panel
      </div>
      <ul className="mt-3 list-disc space-y-1.5 pl-5">
        <li>
          El consumo se registra en la tabla <code>chatbot_usage</code> cada vez que la
          Edge Function <code>chat-assistant</code> llama a Gemini (se conserva 90 días).
          Google no expone la cuota restante por API, así que este medidor es el registro
          propio del sitio.
        </li>
        <li>
          Límites del tier gratuito del modelo del bot:{' '}
          {FREE_TIER_REQUESTS_PER_DAY.toLocaleString('es-AR')} consultas/día,{' '}
          {FREE_TIER_REQUESTS_PER_MINUTE} consultas/minuto y{' '}
          {FREE_TIER_TOKENS_PER_MINUTE.toLocaleString('es-AR')} tokens/minuto. Si Google
          los cambia, se actualizan las constantes en{' '}
          <code>src/pages/admin/AdminGeminiUsage.tsx</code>.
        </li>
        <li>
          Los "rechazos por cuota" (429) no descuentan cuota: son consultas que Gemini no
          aceptó. Si aparecen seguido, conviene revisar si el límite diario quedó corto o
          si hubo un pico de tráfico.
        </li>
      </ul>
    </section>
  );
}
