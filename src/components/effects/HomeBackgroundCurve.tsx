import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Curva serpenteante que recorre el Home de arriba a abajo y se dibuja a
 * medida que el usuario scrollea. Un orbe glowing sigue el extremo dibujado.
 *
 * IMPORTANTE — diseño con secciones light/dark alternadas:
 *   Las secciones tienen bg-white o bg-surface opacos. La curva va como
 *   OVERLAY (pointer-events-none + z-index 10) con `mix-blend-mode: lighten`:
 *     - Sobre fondos OSCUROS: cyan visible (max(cyan, dark) ≈ cyan)
 *     - Sobre fondos CLAROS: invisible (max(cyan, white) = white)
 *   Resultado: la curva sólo "guía" sobre las secciones negras del home,
 *   sin código condicional por sección.
 *
 * Layering:
 *   - HomePage wrapper: position relative, ref para useScroll
 *   - <svg> absolute spanning full home height, preserveAspectRatio=none
 *   - z-index: 10 (encima de secciones, debajo del header sticky en z-50)
 */
export function HomeBackgroundCurve({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement>;
}) {
  const reduced = usePrefersReducedMotion();
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pathLen, setPathLen] = useState(0);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Spring para suavizar la animación de dibujo
  const drawnLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  // Posición del orbe (en px relativos al SVG)
  const orbX = useMotionValue(0);
  const orbY = useMotionValue(0);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  // Medir path + svg (recalcula al cargar contenido async tipo logos/projects)
  useEffect(() => {
    const measure = () => {
      if (pathRef.current) {
        setPathLen(pathRef.current.getTotalLength());
      }
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setSvgSize({ w: rect.width, h: rect.height });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    // Re-medir cuando carga data async (testimonios, projects, posts)
    const ids = [400, 1000, 2000].map((ms) => window.setTimeout(measure, ms));
    return () => {
      window.removeEventListener('resize', measure);
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Actualizar la posición del orbe siguiendo el progreso
  useMotionValueEvent(drawnLength, 'change', (p) => {
    if (!pathRef.current || pathLen === 0 || svgSize.w === 0) return;
    const clamped = Math.max(0.001, Math.min(0.999, p));
    const pt = pathRef.current.getPointAtLength(clamped * pathLen);
    // viewBox 100×1000 → px reales del SVG
    orbX.set((pt.x / 100) * svgSize.w);
    orbY.set((pt.y / 1000) * svgSize.h);
  });

  if (reduced) return null;

  // Path serpenteante: cruza lado a lado 4 veces bajando. Coordenadas en
  // viewBox 100×1000. Usamos preserveAspectRatio=none para estirar al alto
  // total del Home (≈ 6000-8000px).
  const d =
    'M 50 0 ' +
    'C 80 80, 90 160, 70 240 ' +
    'S 10 380, 30 480 ' +
    'S 95 620, 65 720 ' +
    'S 5 850, 45 950 ' +
    'L 50 1000';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-lighten"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="curve-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="8%" stopColor="#00E5FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#33E0FF" stopOpacity="0.55" />
            <stop offset="92%" stopColor="#1DE9B6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1DE9B6" stopOpacity="0" />
          </linearGradient>
          <filter id="curve-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path "fantasma" siempre visible — ayuda a anticipar el recorrido */}
        <path
          d={d}
          fill="none"
          stroke="rgba(0, 229, 255, 0.10)"
          strokeWidth="0.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Path animado: pathLength ligado al scroll del home */}
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="url(#curve-grad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#curve-glow)"
          style={{ pathLength: drawnLength }}
        />
      </svg>

      {/* Orbe glowing que viaja por el extremo dibujado */}
      <motion.div
        style={{ x: orbX, y: orbY, opacity: orbOpacity }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-secondary/40 blur-2xl" />
          <div className="absolute -inset-3 rounded-full bg-secondary/60 blur-lg" />
          <div className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_6px_rgba(0,229,255,0.8)]" />
        </div>
      </motion.div>
    </div>
  );
}
