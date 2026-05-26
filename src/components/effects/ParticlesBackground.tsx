import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Props = {
  /** Densidad de partículas relativa al área (default 0.00006 = ~70 en una pantalla 1080p) */
  density?: number;
  /** Distancia máxima a la que se dibuja una línea entre partículas */
  linkDistance?: number;
  /** Opacidad máxima de las partículas (0–1) */
  opacity?: number;
  /** Color base RGB */
  color?: string;
  className?: string;
};

/**
 * Fondo de partículas conectadas, render en <canvas>.
 * No usa libs externas (mantenemos bundle chico). Respeta prefers-reduced-motion.
 * Pensado para overlay decorativo: pointer-events-none y opacity baja por default.
 */
export function ParticlesBackground({
  density = 0.00006,
  linkDistance = 130,
  opacity = 0.5,
  color = '0, 229, 255',
  className = '',
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;
    const effectiveDensity = isMobile ? density * 0.5 : density;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(20, Math.floor(width * height * effectiveDensity));
      particles = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.35 * opacity;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      ctx.fillStyle = `rgba(${color}, ${0.6 * opacity})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [density, linkDistance, opacity, color, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
