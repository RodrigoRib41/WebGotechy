import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, PlayCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STATS } from '../data/site';
import { ParticlesBackground } from './effects/ParticlesBackground';
import { VideoBackground } from './effects/VideoBackground';
import { AnimatedCounter } from './effects/AnimatedCounter';
import { ArrowMark, ArrowPattern } from './brand';

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

// Variants para revelar palabra por palabra dentro del título
const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const word = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Hero — sección OSCURA full-viewport. Look Stripe/Linear: respiración,
 * jerarquía tipográfica clara, decoración sutil (video opcional + partículas
 * tenues + dos halos cyan/mint flotantes). Sin cubos 3D ni elementos
 * agresivos. La curva guía y los efectos showy se quitaron.
 */
export function Hero() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');

  return (
    <section
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-28 pb-20 sm:pt-32"
      aria-labelledby="hero-title"
    >
      {/* Capas de fondo — gradiente circular oficial brandbook */}
      <div className="absolute inset-0 -z-10 gt-bg-gradient-hero" aria-hidden="true" />
      <VideoBackground
        webm="/videos/hero-tech.webm"
        mp4="/videos/hero-tech.mp4"
        opacity={0.15}
        className="-z-10"
      />
      <div
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
        aria-hidden="true"
      />
      <ParticlesBackground opacity={0.25} density={0.00004} className="-z-10" />

      {/* Trama de flechas (brandbook pág. 24-25) */}
      <ArrowPattern
        density={6}
        arrowSize={120}
        opacity={0.035}
        className="-z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      {/* Flecha grande ornamental — apunta arriba-derecha (brandbook obligatorio) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 -z-10"
        animate={{ x: [0, 8, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowMark size={460} opacity={0.05} outline color="#00F3FF" strokeWidth={3} />
      </motion.div>

      {/* Halos suaves brandbook: cyan + verde (iluminaciones circulares) */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        animate={{ x: [0, -28, 0], y: [0, 22, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item} className="mx-auto flex justify-center">
            <span className="eyebrow-dark">
              <Sparkles className="h-3.5 w-3.5" />
              {t('home.hero.eyebrow')}
            </span>
          </motion.div>

          {/* Título con revelado palabra-por-palabra (stagger + blur) */}
          <motion.h1
            id="hero-title"
            variants={titleContainer}
            className="h1-display mt-7 flex flex-wrap justify-center gap-x-3 gap-y-1 text-white"
          >
            {t('home.hero.title')
              .split(' ')
              .filter(Boolean)
              .map((w, i) => (
                <motion.span
                  key={`tw-${i}`}
                  variants={word}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}

            {/* Highlight con shimmer + glow + flecha animada */}
            <motion.span
              variants={word}
              className="relative inline-flex items-center gap-2"
            >
              <span className="relative inline-block">
                {/* Glow pulse detrás del highlight */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-secondary/30 blur-2xl"
                  animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.08, 0.95] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Texto highlight con gradient shimmer continuo */}
                <span
                  className="relative bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #00F3FF 0%, #FFFFFF 35%, #00F3FF 55%, #00FF92 80%, #00F3FF 100%)',
                  }}
                >
                  {t('home.hero.titleHighlight')}
                </span>
                {/* Underline animado */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 6 Q 75 0 150 6 T 298 6"
                    stroke="url(#hg)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.9, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00F3FF" />
                      <stop offset="100%" stopColor="#00FF92" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {/* Flecha del isotipo subiendo — refuerza "escalar/scale" */}
              <motion.span
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, x: -8, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ y: [0, -6, 0], x: [0, 6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowMark size={42} color="#00F3FF" />
                </motion.span>
              </motion.span>
            </motion.span>

            {t('home.hero.titleEnd') && (
              <motion.span variants={word} className="inline-block">
                {t('home.hero.titleEnd')}
              </motion.span>
            )}
          </motion.h1>

          {/* Subtitle con stagger por cláusulas + key terms en celeste */}
          <motion.p
            variants={item}
            className="body-lg mx-auto mt-7 max-w-2xl text-white/75"
          >
            {(() => {
              const subtitle = t('home.hero.subtitle');
              // Resaltar palabras clave en celeste, sin romper la jerarquía
              const keyTerms = [
                'end-to-end',
                'transformación digital',
                'digital transformation',
                'automatización',
                'automation',
                'innovación continua',
                'continuous innovation',
              ];
              const pattern = new RegExp(`(${keyTerms.join('|')})`, 'gi');
              const parts = subtitle.split(pattern);
              return parts.map((p, i) =>
                keyTerms.some((k) => k.toLowerCase() === p.toLowerCase()) ? (
                  <span key={i} className="font-semibold text-secondary-200">
                    {p}
                  </span>
                ) : (
                  <span key={i}>{p}</span>
                ),
              );
            })()}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link to="/servicios" className="btn-primary btn-shine w-full sm:w-auto">
              {t('home.hero.primaryCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/proyectos" className="btn-secondary w-full sm:w-auto">
              <PlayCircle className="h-4 w-4" />
              {t('home.hero.secondaryCta')}
            </Link>
          </motion.div>

          {/* Stats inline — minimalistas, sin tilt agresivo */}
          <motion.div
            variants={item}
            className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <div className="font-mono text-3xl font-bold text-white sm:text-4xl">
                  {s.count !== null ? (
                    <AnimatedCounter end={s.count} suffix={s.suffix} duration={2} />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="text-xs text-white/55 sm:text-sm">
                  {isEn ? s.labelEn : s.label}
                </div>
                {i < STATS.length - 1 && (
                  <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 sm:inline-block" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator sutil */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 pt-2"
        >
          <ChevronDown className="h-4 w-4 text-white/55" />
        </motion.div>
      </motion.div>
    </section>
  );
}
