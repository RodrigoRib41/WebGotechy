import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SITE } from '../../data/site';
import { approachItem } from '../effects/ApproachReveal';

interface ServiceCTAProps {
  serviceName: string;
}

/**
 * Selección curada de logos reales que viven en /public/images/.
 * 5 marcas reconocibles del portfolio de clientes.
 */
const TRUST_LOGOS = [
  { src: '/images/Tenaris.png', alt: 'Tenaris' },
  { src: '/images/gerdau.png', alt: 'Gerdau' },
  { src: '/images/ledesma.png', alt: 'Ledesma' },
  { src: '/images/roemmers.jpg', alt: 'Roemmers' },
  { src: '/images/molinos.webp', alt: 'Molinos' },
];

export function ServiceCTA({ serviceName }: ServiceCTAProps) {
  const { t } = useTranslation();
  return (
    <section className="pb-24 sm:pb-32" aria-labelledby="service-cta">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-3xl border border-secondary/30 bg-gradient-to-br from-secondary/15 via-primary to-accent/10 p-10 shadow-glow-lg sm:p-14">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(0,243,255,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,255,146,0.25), transparent 50%)',
            }}
            aria-hidden="true"
          />

          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.18 } },
              }}
            >
              <motion.h2
                variants={approachItem}
                id="service-cta"
                className="text-display-3 font-display font-bold text-white"
              >
                {t('services.cta.titleStart')}{' '}
                <span className="text-secondary">{serviceName}</span>
                {t('services.cta.titleEnd')}
              </motion.h2>
              <motion.p variants={approachItem} className="mt-3 max-w-xl text-base text-white/80">
                {t('services.cta.subtitle')}
              </motion.p>
              <motion.div
                variants={approachItem}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Link to="/contacto" className="btn-primary">
                  {t('services.cta.scheduleMeeting')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/proyectos" className="btn-secondary">
                  {t('services.cta.viewCases')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
              }}
              className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8"
            >
              <motion.a
                variants={approachItem}
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-secondary/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-white/55">{t('services.cta.email')}</div>
                  <div className="truncate text-sm font-semibold text-white group-hover:text-secondary-200">
                    {SITE.email}
                  </div>
                </div>
              </motion.a>
              <motion.a
                variants={approachItem}
                href={`tel:+${SITE.phoneRaw}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-secondary/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-white/55">{t('services.cta.phone')}</div>
                  <div className="truncate text-sm font-semibold text-white group-hover:text-secondary-200">
                    {SITE.phone}
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </div>

          {/* Trust strip: logos reales de clientes en grayscale */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45"
            >
              {t('services.cta.trustStrip')}
            </motion.div>
            <div className="grid grid-cols-3 items-center gap-6 sm:grid-cols-5">
              {TRUST_LOGOS.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-7 max-w-[110px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
