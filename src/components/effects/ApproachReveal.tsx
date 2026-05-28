import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface ApproachRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Delay en segundos antes de iniciar (útil para encadenar elementos). */
  delay?: number;
  /** Escala inicial: cuán "lejos" empieza el texto. 0.5–0.7 funciona bien. */
  fromScale?: number;
  /** Blur inicial en px (efecto de profundidad de campo). */
  fromBlur?: number;
  /** Stagger entre hijos cuando el wrapper actúa como contenedor. */
  stagger?: number;
  /** Si true, los hijos heredan variants — útil para títulos+subtítulos en cadena. */
  staggerChildren?: boolean;
  /** Disparo único o cada vez que entra al viewport. */
  once?: boolean;
}

/**
 * "Aparece desde lejos" — el contenido entra desde el fondo (escala chica + blur
 * + transparencia) y se acerca a la cámara hasta su tamaño real. Perfecto para
 * encabezados de sección que deben sentirse cinematográficos.
 *
 * Honora prefers-reduced-motion vía framer-motion automáticamente cuando el
 * sistema lo solicita (las animaciones se acortan al mínimo).
 */
export function ApproachReveal({
  children,
  delay = 0,
  fromScale = 0.5,
  fromBlur, // mantenido por compatibilidad, ya no se usa por seguridad de render
  stagger = 0.2,
  staggerChildren = false,
  once = true,
  className,
  ...rest
}: ApproachRevealProps) {
  // Suppress unused warning while keeping prop in signature for backward-compat.
  void fromBlur;

  const variants: Variants = staggerChildren
    ? {
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }
    : {
        hidden: { opacity: 0, scale: fromScale, y: 32 },
        show: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1], delay },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.05 }}
      variants={variants}
      className={className}
      style={{ transformOrigin: 'center center' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Variant individual para usar como hijo de un contenedor con staggerChildren.
 * Arranca lejos (escala chica + traslación vertical) y se acerca lentamente.
 *
 * NOTA: No usamos `filter: blur` porque rompe el renderizado de textos con
 * `bg-clip-text` (Safari + Chromium con ciertas GPUs los muestran en blanco /
 * invisibles). El efecto "desde lejos" lo logramos con scale+opacity+y, que
 * es bulletproof en todos los navegadores.
 */
export const approachItem: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 32 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Helper: contenedor con stagger por defecto que combina bien con approachItem.
 */
export const approachContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};
