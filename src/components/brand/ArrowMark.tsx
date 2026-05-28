import { CSSProperties } from 'react';
import { cn } from '../../utils/cn';

interface ArrowMarkProps {
  /** Tamaño en px o string (ej. '100%'). */
  size?: number | string;
  /** Opacidad del color (0-1). */
  opacity?: number;
  /** Modo outline (true) o relleno (false). */
  outline?: boolean;
  /** Color del trazo/relleno. Defaults a celeste de marca #00F3FF. */
  color?: string;
  /** Grosor del stroke cuando outline=true. */
  strokeWidth?: number;
  /** Rotación en grados (solo múltiplos de 90° según brandbook). */
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
}

/**
 * Flecha del isotipo GoTechy — elemento distintivo del brandbook 2025.
 *
 * Reglas brandbook (pág. 24-25):
 *  - Apunta arriba-derecha en estado base.
 *  - Solo se rota en múltiplos de 90°.
 *  - Se admite en outline o relleno.
 *  - Nunca distorsionar ni estirar.
 */
export function ArrowMark({
  size = 100,
  opacity = 1,
  outline = false,
  color = '#00F3FF',
  strokeWidth = 6,
  rotate = 0,
  className,
  style,
  'aria-hidden': ariaHidden = true,
}: ArrowMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-hidden={ariaHidden}
      className={cn('select-none', className)}
      style={{ opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {/* Flecha chunky arriba-derecha: brazo en L + cabeza triangular */}
      <path
        d="M 18 88 L 18 52 Q 18 44 26 44 L 50 44 L 50 28 L 84 56 L 50 84 L 50 68 Q 50 64 46 64 L 34 64 L 34 88 Z"
        fill={outline ? 'none' : color}
        stroke={outline ? color : 'none'}
        strokeWidth={outline ? strokeWidth : 0}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
