import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STATS } from '../data/site';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');

  return (
    <section
      className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary via-primary-700 to-primary"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
        aria-hidden="true"
      />

      <motion.div
        aria-hidden="true"
        className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item} className="mx-auto flex justify-center">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {t('home.hero.eyebrow')}
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 text-display-1 font-display font-extrabold leading-[1.05] text-white"
          >
            {t('home.hero.title')}{' '}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                {t('home.hero.titleHighlight')}
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6 Q 75 0 150 6 T 298 6"
                  stroke="url(#hg)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#1DE9B6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{' '}
            {t('home.hero.titleEnd')}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link to="/servicios" className="btn-primary w-full sm:w-auto">
              {t('home.hero.primaryCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/proyectos" className="btn-secondary w-full sm:w-auto">
              <PlayCircle className="h-4 w-4" />
              {t('home.hero.secondaryCta')}
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 backdrop-blur"
              >
                <div className="font-mono text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">
                  {isEn ? s.labelEn : s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface"
        aria-hidden="true"
      />
    </section>
  );
}
