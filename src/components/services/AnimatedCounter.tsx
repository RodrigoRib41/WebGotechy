import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  /** Valor con sufijo opcional, ej: "15+", "120+", "24/7", "40+". */
  value: string;
  durationMs?: number;
}

/**
 * Anima un número de 0 al target la primera vez que entra en viewport.
 * Valores sin parte numérica clara (ej: "24/7") se renderizan tal cual.
 */
export function AnimatedCounter({ value, durationMs = 1500 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [displayed, setDisplayed] = useState(0);

  // Parse "+90", "15+", "99.9%", "40" → prefijo + numérico + sufijo.
  // "24/7" → no animable (se renderiza tal cual).
  const match = /^(\D*?)(\d+)(.*)$/.exec(value.trim());
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2], 10) : null;
  const suffix = match ? match[3] : '';
  const animatable = target !== null && !value.includes('/');

  useEffect(() => {
    if (!animatable || !inView || target === null) return;
    let rafId = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayed(target);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animatable, inView, target, durationMs]);

  if (!animatable) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {displayed}
      {suffix}
    </span>
  );
}
