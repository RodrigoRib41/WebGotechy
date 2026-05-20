import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { Clients } from '../components/Clients';
import { Partners } from '../components/Partners';
import { WhyUs } from '../components/WhyUs';
import { SERVICES } from '../data/services';
import { cn } from '../utils/cn';

/**
 * Home — Hero + 4 servicios destacados + Clientes (carrusel) + WhyUs + CTA final.
 * Las secciones extensas (Services, Projects, Contact) tienen su propia ruta dedicada.
 */
export function HomePage() {
  const { t } = useTranslation();
  const featured = SERVICES.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Highlights de servicios — 4 cards compactos */}
      <section className="relative py-24 sm:py-28" aria-labelledby="highlights-title">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="highlights-title"
              className="text-display-2 font-display font-bold text-white"
            >
              {t('home.highlights.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              {t('home.highlights.subtitle')}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featured.map((service) => {
              const Icon = service.icon;
              const isAccent = service.accent === 'accent';
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md"
                >
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                      isAccent
                        ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                        : 'bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30',
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {service.short}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-12 flex justify-center">
            <Link to="/servicios" className="btn-primary">
              {t('home.highlights.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Clients />

      <Partners />

      <WhyUs />

      {/* CTA final */}
      <section className="relative isolate overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary-700 to-primary" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(0,229,255,0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(29,233,182,0.3), transparent 50%)',
          }}
          aria-hidden="true"
        />
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-display-2 font-display font-bold text-white">
              {t('home.finalCta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
              {t('home.finalCta.subtitle')}
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/contacto" className="btn-primary">
                {t('home.finalCta.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
