import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getHomeServices, localizeService } from '../../data/services';
import { cn } from '../../utils/cn';

/**
 * Sección "Servicios" del Home — banner fotográfico + grid superpuesto.
 *
 * Composición:
 *  1. Banner full-bleed con Hero7 (dos personas revisando una tablet contra el
 *     ventanal). Los protagonistas viven a la DERECHA y los dos tercios
 *     restantes son cielo/ciudad sin detalle, así que el copy va a la
 *     IZQUIERDA sobre un scrim blanco degradado hacia ese lado.
 *     object-position al 30%: arriba de ~900px de ancho la foto entra completa
 *     y el eje X es indistinto, pero por debajo (mobile/tablet) el recorte se
 *     queda en el ventanal — ahí el copy ocupa todo el ancho y los
 *     protagonistas le quedarían justo debajo del texto.
 *  2. Las cards se superponen al borde inferior del banner (-mt) y usan la
 *     variante `card-glass-light`: vidrio esmerilado que sobre la foto se lee
 *     como los paneles del ventanal y sobre el fondo claro queda casi blanco.
 *     Cada card es flex-col con el "Ver más" pineado abajo (mt-auto), así el
 *     pie se alinea entre columnas aunque los textos midan distinto.
 *  3. El grid es flex-wrap centrado en vez de `grid-cols-3`: con 7 servicios
 *     la última fila queda incompleta, y así el sobrante se centra solo sin
 *     depender de la cantidad exacta de items.
 */
export function ServicesPreview() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const items = getHomeServices().map((s) => localizeService(s, isEn));

  return (
    <section className="relative bg-white text-[#0F1419]" aria-labelledby="services-preview-title">
      {/* ---- Banner fotográfico ---- */}
      <div className="relative overflow-hidden">
        <img
          src="/images/Hero7.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[30%_42%]"
        />
        {/* Scrims: velo base + degradado hacia el lado del texto (izquierda).
            Más suave que en otros banners porque el ventanal ya es casi blanco
            de por sí: con un scrim fuerte ese lado se volvía una mancha lisa. */}
        <div className="absolute inset-0 bg-white/15" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/20 sm:via-white/65 sm:to-transparent"
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
            className="flex max-w-xl flex-col items-start pb-40 pt-16 sm:pb-48 sm:pt-24"
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
        <div className="geo-soft-cyan -top-10 right-[-12%] h-[380px] w-[380px]" />

        <div className="container-x relative -mt-28 sm:-mt-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="flex flex-wrap justify-center gap-5"
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
                  className="w-full sm:w-[calc(50%_-_0.625rem)] lg:w-[calc(33.333%_-_0.834rem)]"
                >
                  <Link
                    to={`/servicios/${service.slug}`}
                    className="card-glass-light group flex h-full flex-col"
                  >
                    <div
                      className={cn(
                        'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
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
                      {service.pitch ?? service.short}
                    </p>
                    {/* mt-auto: pinea el pie abajo para que se alinee entre
                        columnas aunque el pitch mida distinto en cada card. */}
                    <span className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
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
