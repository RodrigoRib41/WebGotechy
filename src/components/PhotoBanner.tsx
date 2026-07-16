import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface PhotoBannerProps {
  /** Foto de fondo (ruta pública, ideal WebP ya optimizada). */
  image: string;
  /** Lado donde vive el texto — elegir según el espacio negativo de la foto. */
  align?: 'left' | 'right' | 'center';
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  /** CTAs opcionales (botones/links) renderizados bajo el subtítulo. */
  cta?: ReactNode;
  /**
   * true → deja aire extra abajo (pb-40/48) para que el contenido siguiente
   * se superponga al borde inferior con -mt (patrón del Home).
   */
  overlap?: boolean;
  /** id para aria-labelledby del título. */
  titleId?: string;
  /** Posición del encuadre de la foto (object-position). */
  objectPosition?: string;
}

/**
 * Banner fotográfico reutilizable — el mismo lenguaje visual de los banners
 * del Home (ServicesPreview / FinalCtaForm): foto full-bleed + velo blanco +
 * scrim direccional hacia el lado del texto + línea de marca cyan→mint como
 * remate inferior. Pensado para SECCIONES CLARAS.
 */
export function PhotoBanner({
  image,
  align = 'left',
  eyebrow,
  title,
  subtitle,
  cta,
  overlap = false,
  titleId,
  objectPosition,
}: PhotoBannerProps) {
  const gradient =
    align === 'left'
      ? 'bg-gradient-to-r from-white via-white/85 to-white/25 sm:via-white/75 sm:to-transparent'
      : align === 'right'
        ? 'bg-gradient-to-l from-white via-white/85 to-white/25 sm:via-white/75 sm:to-transparent'
        : 'bg-gradient-to-t from-white via-white/80 to-white/30';

  const block =
    align === 'left'
      ? 'mr-auto items-start text-left'
      : align === 'right'
        ? 'ml-auto items-start text-left'
        : 'mx-auto items-center text-center';

  return (
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <div className="absolute inset-0 bg-white/30" aria-hidden="true" />
      <div className={cn('absolute inset-0', gradient)} aria-hidden="true" />
      {/* Línea de marca — firma visual compartida con los banners del Home */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary to-accent"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={cn(
            'flex max-w-xl flex-col pt-16 sm:pt-24',
            overlap ? 'pb-40 sm:pb-48' : 'pb-16 sm:pb-24',
            block,
          )}
        >
          {eyebrow && <span className="eyebrow-light">{eyebrow}</span>}
          <h2 id={titleId} className="h2-display mt-5 text-[#0F1419]">
            {title}
          </h2>
          {subtitle && (
            <p className="body-lg mt-5 max-w-lg text-[#0F1419]/70">{subtitle}</p>
          )}
          {cta && <div className="mt-8 flex flex-wrap items-center gap-3">{cta}</div>}
        </motion.div>
      </div>
    </div>
  );
}
