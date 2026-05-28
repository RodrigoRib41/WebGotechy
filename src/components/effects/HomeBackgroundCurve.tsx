import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Curva decorativa que recorre un contenedor y se dibuja con el scroll.
 *
 * Layering — pensada para sentirse "detrás del contenido":
 *   - Render como overlay (z-10) con mix-blend-lighten: técnicamente está
 *     encima de las secciones (necesario porque las secciones tienen bg
 *     opaco), pero el blend mode + baja intensidad la hace funcionar como
 *     watermark de fondo. Las secciones (cards, texto, botones) dominan
 *     visualmente; la curva queda como decoración ambiental.
 *   - pointer-events-none → nunca bloquea interacción
 *
 * Inicio:
 *   - Todos los paths arrancan en y=120 (12% del viewBox) — así la curva
 *     emerge DESPUÉS del hero, no compite con su tipografía.
 *
 * Props:
 *   - targetRef: el contenedor cuya altura/scroll usar
 *   - variant: nombre del path a usar (5 variantes disponibles)
 *   - withBranding: si renderiza "Go" arriba y "Techy" abajo formando GoTechy
 *   - thickenWithScroll: si el grosor crece con el scroll (Home)
 */
export type CurveVariant = 'serpentine' | 'wave' | 'spiral' | 'zigzag' | 'arc';

/**
 * Cinco familias de curvas. ViewBox 100×1000. Todas arrancan en y=120 para
 * que el inicio quede debajo del hero. Terminan en y=1000.
 */
const CURVE_PATHS: Record<CurveVariant, string> = {
  // Serpenteo clásico — 4 cruces lado a lado
  serpentine:
    'M 50 120 ' +
    'C 80 200, 90 280, 70 360 ' +
    'S 10 500, 30 600 ' +
    'S 95 740, 65 840 ' +
    'S 5 950, 45 990 ' +
    'L 50 1000',
  // Onda amplia — 2 grandes curvas tipo sine wave
  wave:
    'M 50 120 ' +
    'C 95 280, 5 460, 50 620 ' +
    'S 95 880, 50 1000',
  // Espiral apretada — más curvas, menor amplitud
  spiral:
    'M 50 120 ' +
    'C 75 220, 25 320, 50 420 ' +
    'S 80 600, 50 700 ' +
    'S 20 880, 50 970 ' +
    'L 50 1000',
  // Zigzag — cruces más bruscos
  zigzag:
    'M 30 120 ' +
    'C 85 200, 15 320, 80 420 ' +
    'S 20 620, 75 720 ' +
    'S 25 900, 50 1000',
  // Arco profundo — gran curva que cruza una sola vez
  arc:
    'M 50 120 ' +
    'C 90 320, 10 560, 50 800 ' +
    'L 50 1000',
};

interface Props {
  targetRef: React.RefObject<HTMLElement>;
  variant?: CurveVariant;
  /** Si renderiza "Go" arriba y "Techy" abajo formando la marca. */
  withBranding?: boolean;
  /**
   * Si true, el trazo arranca visible y se vuelve cada vez más grueso a
   * medida que el scroll progresa — con un salto dramático en el último
   * tramo. Pensado para el Home (recorrido largo, con narrativa).
   */
  thickenWithScroll?: boolean;
}

export function HomeBackgroundCurve({
  targetRef,
  variant = 'serpentine',
  withBranding = false,
  thickenWithScroll = false,
}: Props) {
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const drawnLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  // Grosor dinámico — curva no-lineal: crecimiento suave hasta 50%, acelera
  // de 50-80%, salto fuerte en 80-100%. Rango moderado para que la curva
  // no compita visualmente con el contenido — se siente como decoración.
  const dynamicStrokeWidth = useTransform(
    drawnLength,
    [0, 0.5, 0.8, 1],
    [1.6, 2.4, 3.2, 4.5],
  );

  if (reduced) return null;

  const d = CURVE_PATHS[variant];

  const strokeWidthProp = thickenWithScroll ? dynamicStrokeWidth : 1.2;

  // Ghost path — silueta tenue siempre visible
  const ghostStroke = thickenWithScroll
    ? 'rgba(0, 243, 255, 0.18)'
    : 'rgba(0, 243, 255, 0.08)';
  const ghostWidth = thickenWithScroll ? '1.0' : '0.5';

  // Gradient opacities — moderadas para que se sienta más como background
  const stopStart = thickenWithScroll ? '0.35' : '0';
  const stopEarly = thickenWithScroll ? '0.6' : '0.45';
  const stopMid = thickenWithScroll ? '0.55' : '0.4';
  const stopLate = thickenWithScroll ? '0.6' : '0.45';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-lighten"
    >
      {/* "Go" — arranque de la curva, centrado arriba */}
      {withBranding && (
        <div className="absolute inset-x-0 top-0 flex justify-center pt-24 sm:pt-28">
          <span
            className="select-none bg-gradient-to-b from-secondary-200/55 via-secondary/35 to-transparent bg-clip-text font-display font-black leading-none text-transparent"
            style={{ fontSize: 'clamp(5rem, 14vw, 14rem)' }}
          >
            Go
          </span>
        </div>
      )}

      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`curve-grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F3FF" stopOpacity={stopStart} />
            <stop offset="8%" stopColor="#00F3FF" stopOpacity={stopEarly} />
            <stop offset="50%" stopColor="#2EF1FF" stopOpacity={stopMid} />
            <stop offset="92%" stopColor="#00FF92" stopOpacity={stopLate} />
            <stop offset="100%" stopColor="#00FF92" stopOpacity={thickenWithScroll ? '0.4' : '0'} />
          </linearGradient>
          <filter id={`curve-glow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={thickenWithScroll ? '1.5' : '1.0'} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path "fantasma" siempre visible */}
        <path
          d={d}
          fill="none"
          stroke={ghostStroke}
          strokeWidth={ghostWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Path animado: pathLength ligado al scroll. */}
        <motion.path
          d={d}
          fill="none"
          stroke={`url(#curve-grad-${variant})`}
          strokeWidth={strokeWidthProp}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter={`url(#curve-glow-${variant})`}
          style={{ pathLength: drawnLength }}
        />
      </svg>

      {/* "Techy" — final de la curva, centrado abajo */}
      {withBranding && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-24 sm:pb-28">
          <span
            className="select-none bg-gradient-to-t from-accent/55 via-accent/35 to-transparent bg-clip-text font-display font-black leading-none text-transparent"
            style={{ fontSize: 'clamp(5rem, 14vw, 14rem)' }}
          >
            Techy
          </span>
        </div>
      )}
    </div>
  );
}
