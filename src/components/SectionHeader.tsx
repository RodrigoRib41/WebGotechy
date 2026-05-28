import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { approachItem } from './effects/ApproachReveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}

/**
 * Encabezado de sección con efecto "aparece desde lejos":
 * eyebrow → título → descripción se acercan desde el fondo (escala chica + blur)
 * hasta su tamaño real, encadenados con stagger.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.18 } },
      }}
      className={`flex max-w-3xl flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <motion.span variants={approachItem} className="eyebrow">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={approachItem}
        className="text-display-2 font-display font-bold text-white"
        style={{ transformOrigin: 'center center' }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={approachItem}
          className="text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
