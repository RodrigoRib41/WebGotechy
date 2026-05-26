import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Globe } from 'lucide-react';
import { format, type Locale } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { useEvents } from '../../hooks/useCatalog';
import type { EventKind, EventRow } from '../../types/events';

const KIND_LABEL_ES: Record<EventKind, string> = { event: 'Event', webinar: 'Webinar' };
const KIND_LABEL_EN: Record<EventKind, string> = { event: 'Event', webinar: 'Webinar' };

/**
 * Sección "Eventos y Webinars" — fondo BLANCO, consistente con el resto del
 * Home (eyebrow + h2-display con gradient + subtítulo + cards).
 *
 * Cada evento es una row tipo card-light horizontal con date-badge cyan
 * a la izquierda, info en el medio y CTA a la derecha. Si no hay eventos
 * publicados/futuros, no se renderiza.
 */
export function Events() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const { data: events, loading } = useEvents(true, true);

  if (loading) return null;
  if (events.length === 0) return null;

  const kindLabel = isEn ? KIND_LABEL_EN : KIND_LABEL_ES;
  const locale = isEn ? enUS : es;

  return (
    <section className="section-light overflow-hidden" aria-labelledby="events-title">
      {/* Geometría suave en una esquina, igual que otras secciones light */}
      <div className="geo-soft-cyan -top-32 right-[-10%] h-[400px] w-[400px]" />

      <div className="container-x relative">
        {/* Header standard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow-light">{isEn ? 'Agenda' : 'Agenda'}</span>
          <h2 id="events-title" className="h2-display mt-5 text-[#0F1419]">
            {isEn ? (
              <>
                Upcoming events &{' '}
                <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  webinars
                </span>
              </>
            ) : (
              <>
                Próximos eventos y{' '}
                <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  webinars
                </span>
              </>
            )}
          </h2>
          <p className="body-lg mx-auto mt-5 max-w-xl text-[#0F1419]/65">
            {isEn
              ? 'Real cases, live demos and technical deep dives from our team and partners.'
              : 'Casos reales, demos en vivo y deep dives técnicos junto a nuestro equipo y partners.'}
          </p>
        </motion.div>

        {/* Cards verticales */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto mt-14 max-w-5xl space-y-4"
        >
          {events.map((ev) => (
            <motion.li
              key={ev.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <EventCard event={ev} locale={locale} kindLabel={kindLabel} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

// ============================================================
//  EventCard — fila horizontal estilo card-light
// ============================================================
interface EventCardProps {
  event: EventRow;
  locale: Locale;
  kindLabel: Record<EventKind, string>;
}

function EventCard({ event, locale, kindLabel }: EventCardProps) {
  const { month, dayRange } = splitDateRange(event.start_date, event.end_date, locale);
  const hasCta = Boolean(event.cta_url);

  // El card es un <a> si hay CTA URL, sino un <div>. Hace que toda la fila
  // sea clickeable cuando hay link.
  const Wrapper: React.ElementType = hasCta ? 'a' : 'div';
  const wrapperProps = hasCta
    ? { href: event.cta_url!, target: '_blank', rel: 'noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="card-light card-light-hover group flex flex-col gap-5 sm:flex-row sm:items-center"
    >
      {/* Date badge */}
      <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-center sm:justify-center sm:gap-0 sm:rounded-2xl sm:bg-brand-50 sm:px-5 sm:py-4 sm:ring-1 sm:ring-brand-100">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
          {month}
        </div>
        <div className="font-display text-3xl font-bold leading-none text-brand-700 sm:mt-1.5">
          {dayRange}
        </div>
      </div>

      {/* Contenido */}
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
          {kindLabel[event.kind]}
        </div>
        <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug text-[#0F1419] sm:text-xl">
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-1.5 text-[15px] leading-relaxed text-[#0F1419]/65">
            {event.description}
          </p>
        )}
        {(event.location || event.languages.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#0F1419]/55">
            {event.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
            )}
            {event.languages.length > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {event.languages.join(' · ')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      {hasCta && (
        <div className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 transition-all group-hover:gap-3 group-hover:text-brand-600">
          {event.cta_label}
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </Wrapper>
  );
}

// ============================================================
//  Helpers — splitDateRange devuelve mes + rango de días por separado
//  para renderizar el badge en dos líneas (ej: MAY / 19-21).
// ============================================================
function splitDateRange(
  start: string,
  end: string | null,
  locale: Locale,
): { month: string; dayRange: string } {
  const s = new Date(start + 'T00:00:00');
  if (!end) {
    return {
      month: format(s, 'MMM', { locale }).toUpperCase(),
      dayRange: format(s, 'd', { locale }),
    };
  }
  const e = new Date(end + 'T00:00:00');
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return {
      month: format(s, 'MMM', { locale }).toUpperCase(),
      dayRange: `${format(s, 'd', { locale })}-${format(e, 'd', { locale })}`,
    };
  }
  // Rango cruza meses: mostramos el mes inicial en el badge y el rango en el texto.
  return {
    month: format(s, 'MMM', { locale }).toUpperCase(),
    dayRange: `${format(s, 'd', { locale })}-${format(e, 'd MMM', { locale })}`,
  };
}
