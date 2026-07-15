import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SERVICES, localizeService } from '../../data/services';
import { cn } from '../../utils/cn';

/**
 * Sección "Servicios" del Home — banner fotográfico + grid superpuesto.
 *
 * Composición:
 *  1. Banner full-bleed con Hero4 (persona + ventana luminosa). La persona
 *     vive a la izquierda, así que el copy va a la DERECHA sobre un scrim
 *     blanco degradado que garantiza contraste. Línea de marca cyan→mint
 *     como remate inferior del banner.
 *  2. Las cards de servicios se superponen al borde inferior del banner
 *     (-mt) — el overlap elimina el aire muerto y le da profundidad al
 *     layout, estilo Stripe.
 */
export function ServicesPreview() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const items = SERVICES.slice(0, 9).map((s) => localizeService(s, isEn));

  return (
    <section className="relative bg-white text-[#0F1419]" aria-labelledby="services-preview-title">
      {/* ---- Banner fotográfico ---- */}
      <div className="relative overflow-hidden">
        <img
          src="/images/Hero4.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[25%_30%]"
        />
        {/* Scrims: velo base + degradado hacia el lado del texto (derecha) */}
        <div className="absolute inset-0 bg-white/30" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-l from-white via-white/85 to-white/25 sm:via-white/75 sm:to-transparent"
          aria-hidden="true"
        />
        {/* Línea de marca en el borde inferior del banner */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary to-accent"
          aria-hidden="true"
        />

        <div className="container-x relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="ml-auto flex max-w-xl flex-col items-start pb-40 pt-16 sm:pb-48 sm:pt-24"
          >
            <span className="eyebrow-light">{t('home.highlights.eyebrow')}</span>
            <h2 id="services-preview-title" className="h2-display mt-5 text-[#0F1419]">
              {t('home.highlights.title')}{' '}
              <span className="text-brand-600">{t('home.highlights.titleHighlight')}</span>
            </h2>
            <p className="body-lg mt-5 max-w-lg text-[#0F1419]/70">
              {t('home.highlights.subtitle')}
            </p>
            <Link to="/servicios" className="btn-primary-light mt-8">
              {t('home.highlights.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ---- Grid de cards superpuesto al banner ---- */}
      <div className="relative bg-gradient-to-b from-transparent via-[#F7FAFC] to-white pb-20 sm:pb-28">
        <div className="geo-soft-cyan -top-10 left-[-12%] h-[380px] w-[380px]" />

        <div className="container-x relative -mt-28 sm:-mt-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <Link
                    to={`/servicios/${service.slug}`}
                    className="card-light card-light-hover group block h-full"
                  >
                    <div
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
                        service.accent === 'accent'
                          ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                          : 'bg-brand-50 text-brand-600 ring-1 ring-brand-200',
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-[#0F1419]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#0F1419]/60">
                      {service.short}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      {t('home.highlights.viewMore')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
