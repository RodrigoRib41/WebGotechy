import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../../data/services';
import { cn } from '../../utils/cn';

/**
 * Sección "Servicios Preview" — fondo BLANCO, grid limpio, cards minimalistas.
 * Muestra los primeros 9 servicios (grid 3x3 desktop / stack mobile). Inspirado
 * en Stripe/Linear: respiración, sin ruido, hover sutil.
 */
export function ServicesPreview() {
  const { t } = useTranslation();
  const items = SERVICES.slice(0, 9);

  return (
    <section className="section-light" aria-labelledby="services-preview-title">
      {/* Decoración geométrica sutil */}
      <div className="geo-soft-cyan -top-32 right-[-10%] h-[400px] w-[400px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow-light">{t('home.highlights.eyebrow', 'Servicios')}</span>
          <h2 id="services-preview-title" className="h2-display mt-5 text-[#0F1419]">
            Soluciones SAP que{' '}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              impulsan resultados
            </span>
          </h2>
          <p className="body-lg mx-auto mt-5 max-w-xl text-[#0F1419]/65">
            {t('home.highlights.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
                    Ver más
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Link to="/servicios" className="btn-primary-light">
            {t('home.highlights.cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
