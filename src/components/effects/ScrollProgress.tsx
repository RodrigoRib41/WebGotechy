import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Barra de progreso fija en el top que crece a medida que el usuario scrollea.
 * Anclada a position:fixed, decorativa, pointer-events-none.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-secondary via-secondary-300 to-accent"
      style={{ scaleX }}
    />
  );
}
