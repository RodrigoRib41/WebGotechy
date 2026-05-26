import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Props = {
  words: string[];
  intervalMs?: number;
  className?: string;
};

/**
 * Palabra que rota en loop (ej: Innovamos / Transformamos / Optimizamos).
 * Si el usuario prefiere menos movimiento, queda fija en la primera.
 */
export function RotatingWord({ words, intervalMs = 2400, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, words.length, intervalMs]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={`relative inline-block align-bottom ${className ?? ''}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[idx]}
          initial={{ y: '0.6em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.6em', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
