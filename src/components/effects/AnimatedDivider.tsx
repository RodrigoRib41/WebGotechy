import { motion } from 'framer-motion';

/**
 * Línea decorativa que se "dibuja" de centro hacia afuera al entrar en viewport.
 * Separa secciones con un acento naranja sutil (#FF6D00), a juego con la curva
 * que recorre las páginas de servicios.
 */
export function AnimatedDivider() {
  return (
    <div className="container-x py-2" aria-hidden="true">
      <div className="relative mx-auto h-px max-w-5xl">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
          className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6D00]/40 to-transparent"
        />
        {/* Punto de luz central */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6D00] shadow-[0_0_24px_-8px_rgba(255,109,0,0.45)]"
        />
      </div>
    </div>
  );
}
