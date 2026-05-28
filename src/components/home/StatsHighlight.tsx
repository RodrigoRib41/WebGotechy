import { motion } from 'framer-motion';
import { Award, Briefcase, Users, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STATS } from '../../data/site';
import { AnimatedCounter } from '../effects/AnimatedCounter';
import { ArrowMark } from '../brand';

/**
 * Sección "Stats destacados" — fondo OSCURO. Counter animations + iconos
 * geométricos cyan + formas circulares de fondo (referencia al isotipo del
 * logo). Pensada para sentar autoridad: "esto somos en números".
 */
const ICONS = [Award, Briefcase, Users, Headphones];

export function StatsHighlight() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');

  return (
    <section className="section-dark overflow-hidden" aria-labelledby="stats-title">
      {/* Iluminaciones circulares brandbook (pág. 26) */}
      <div className="geo-circle-cyan left-[-15%] top-[10%] h-[500px] w-[500px]" />
      <div className="geo-circle-mint right-[-15%] bottom-[5%] h-[450px] w-[450px]" />

      {/* Grid sutil para textura */}
      <div
        className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Flecha ornamental brandbook — esquina derecha */}
      <div className="pointer-events-none absolute -right-16 top-20 opacity-[0.05]" aria-hidden="true">
        <ArrowMark size={320} outline color="#00F3FF" strokeWidth={3} />
      </div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow-dark">{t('home.stats.eyebrow')}</span>
          <h2 id="stats-title" className="h2-display mt-5 text-white">
            {/* Brandbook: títulos solo blanco o celeste */}
            {t('home.stats.titleStart')}{' '}
            <span className="text-secondary">{t('home.stats.titleHighlight')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur sm:grid-cols-4"
        >
          {STATS.map((s, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative bg-white/[0.02] p-8 text-center transition-colors duration-300 hover:bg-white/[0.06]"
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 font-mono text-4xl font-bold text-white sm:text-5xl">
                  {s.count !== null ? (
                    <AnimatedCounter end={s.count} suffix={s.suffix} duration={2.4} />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="mt-3 text-sm font-medium text-white/65 sm:text-[15px]">
                  {isEn ? s.labelEn : s.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
