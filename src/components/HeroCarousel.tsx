import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { heroBanners, type HeroBanner } from '../data/heroBanners';

interface HeroCarouselProps {
  /** Lista de banners. Por defecto usa `heroBanners` (src/data/heroBanners.ts). */
  banners?: HeroBanner[];
  /** Intervalo de autoplay en ms. Por defecto 5000 (5s). */
  autoplayMs?: number;
}

// Entrada escalonada del contenido de cada banner (eyebrow → título → subtítulo → CTA).
const contentContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const contentItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ---- Composición por banner ----------------------------------------------
 * Cada slide posiciona su contenido según el espacio negativo de la foto
 * (`align`) y gradúa el overlay según la luminosidad de la imagen (`tone`).
 * En mobile todo colapsa a abajo-izquierda: es la zona más legible con el
 * gradiente inferior y evita que el texto tape a los protagonistas.
 * Clases estáticas (no template strings) para que Tailwind las compile.
 */
const wrapAlign: Record<HeroBanner['align'], string> = {
  left: 'sm:mr-auto sm:items-start sm:text-left',
  right: 'sm:ml-auto sm:items-end sm:text-right',
  center: 'sm:mx-auto sm:items-center sm:text-center',
};
const ctaAlign: Record<HeroBanner['align'], string> = {
  left: 'sm:justify-start',
  right: 'sm:justify-end',
  center: 'sm:justify-center',
};
// Scrim direccional: empuja la oscuridad hacia el lado donde vive el texto.
const overlayDirectional: Record<HeroBanner['align'], Record<HeroBanner['tone'], string>> = {
  left: {
    light: 'bg-gradient-to-r from-primary/95 via-primary/60 to-primary/10',
    dark: 'bg-gradient-to-r from-primary/75 via-primary/35 to-transparent',
  },
  right: {
    light: 'bg-gradient-to-l from-primary/95 via-primary/60 to-primary/10',
    dark: 'bg-gradient-to-l from-primary/75 via-primary/35 to-transparent',
  },
  center: {
    light: 'bg-gradient-to-t from-primary/95 via-primary/55 to-primary/25',
    dark: 'bg-gradient-to-t from-primary/80 via-primary/35 to-primary/15',
  },
};
// Velo base: las fotos claras necesitan más scrim que las nocturnas.
const overlayBase: Record<HeroBanner['tone'], string> = {
  light: 'bg-primary/40',
  dark: 'bg-primary/15',
};

/**
 * HeroCarousel — carrusel full-bleed de banners para la Home.
 *
 *  - 100% de ancho, full-viewport; autoplay 5s con pausa en hover/focus.
 *  - Flechas laterales + dots; crossfade + Ken Burns sutil.
 *  - Cada banner define su composición (alineación, overlay, CTA) en
 *    src/data/heroBanners.ts — diseñada para su imagen de fondo.
 *  - Honra `prefers-reduced-motion` (desactiva el autoplay).
 */
export function HeroCarousel({ banners = heroBanners, autoplayMs = 5000 }: HeroCarouselProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = banners.length;

  const goTo = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);
  const next = useCallback(() => setActive((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setActive((p) => (p - 1 + count) % count), [count]);

  // Autoplay — se reinicia tras cada cambio (por `active` en deps) y se pausa
  // en hover/focus. No corre con un solo banner ni con reduced-motion.
  useEffect(() => {
    if (isPaused || count <= 1) return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => setActive((p) => (p + 1) % count), autoplayMs);
    return () => window.clearInterval(id);
  }, [isPaused, count, active, autoplayMs]);

  if (count === 0) return null;
  const banner = banners[active];

  return (
    <section
      className="relative isolate flex h-[100svh] max-h-[920px] min-h-[600px] w-full items-end overflow-hidden bg-primary sm:items-center"
      aria-roledescription="carousel"
      aria-label={t('home.heroCarousel.label')}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* ---- Slides apilados (crossfade). Se precargan todas las imágenes. ---- */}
      {banners.map((b, i) => {
        const isActive = i === active;
        return (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-smooth ${
              isActive ? 'z-[1] opacity-100' : 'z-0 opacity-0'
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
            aria-hidden={!isActive}
          >
            {/* Imagen de fondo con zoom sutil (100% activa, 110% inactiva) */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform ease-smooth ${
                isActive ? 'scale-100 duration-[6000ms]' : 'scale-110 duration-1000'
              }`}
              style={{ backgroundImage: `url("${b.image}")` }}
            />
            {/* Overlay en 3 capas: velo base + scrim direccional + vignette
                superior/inferior (legibilidad del header y de los dots) */}
            <div className={`absolute inset-0 ${overlayBase[b.tone]}`} />
            <div className={`absolute inset-0 ${overlayDirectional[b.align][b.tone]}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/70" />
          </div>
        );
      })}

      {/* Grid sutil brandbook + halos cyan/verde (decorativos) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <div aria-hidden="true" className="geo-circle-cyan left-[-10%] top-1/4 z-[1] h-96 w-96" />
      <div aria-hidden="true" className="geo-circle-mint bottom-[-10%] right-[-8%] z-[1] h-[28rem] w-[28rem]" />

      {/* ---- Contenido del banner activo (re-anima al cambiar de slide) ---- */}
      <div className="container-x relative z-10 w-full pb-24 pt-28 sm:py-0">
        <motion.div
          key={active}
          variants={contentContainer}
          initial="hidden"
          animate="show"
          className={`flex w-full max-w-2xl flex-col items-start text-left ${wrapAlign[banner.align]}`}
        >
          <motion.span variants={contentItem} className="eyebrow-dark backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {t(banner.eyebrowKey)}
          </motion.span>

          <motion.h1 variants={contentItem} className="h1-display mt-6 text-balance text-white">
            {t(banner.titleKey)}{' '}
            <span className="text-gradient">{t(banner.titleHighlightKey)}</span>
          </motion.h1>

          <motion.p variants={contentItem} className="body-lg mt-6 max-w-xl text-white/85">
            {t(banner.subtitleKey)}
          </motion.p>

          <motion.div
            variants={contentItem}
            className={`mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center ${ctaAlign[banner.align]}`}
          >
            <Link
              to={banner.ctaHref}
              className={`${banner.ctaVariant === 'accent' ? 'btn-accent' : 'btn-primary'} btn-shine w-full sm:w-auto`}
            >
              {t(banner.ctaKey)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {banner.secondaryCtaKey && banner.secondaryCtaHref && (
              <Link to={banner.secondaryCtaHref} className="btn-secondary w-full sm:w-auto">
                {t(banner.secondaryCtaKey)}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ---- Flechas laterales ---- */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label={t('home.heroCarousel.prev')}
            className="group absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-primary/40 text-white/80 backdrop-blur-md transition-all duration-300 ease-smooth hover:border-secondary/50 hover:bg-primary/60 hover:text-white hover:shadow-glow-sm sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={t('home.heroCarousel.next')}
            className="group absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-primary/40 text-white/80 backdrop-blur-md transition-all duration-300 ease-smooth hover:border-secondary/50 hover:bg-primary/60 hover:text-white hover:shadow-glow-sm sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* ---- Indicadores (dots) ---- */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-2.5">
          {banners.map((b, i) => {
            const isActive = i === active;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t('home.heroCarousel.goTo', { index: i + 1 })}
                aria-current={isActive}
                className={`h-2.5 rounded-full transition-all duration-300 ease-smooth ${
                  isActive
                    ? 'w-8 bg-secondary shadow-glow-sm'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
