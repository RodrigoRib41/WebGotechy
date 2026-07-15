import { cn } from '../utils/cn';

interface LogoProps {
  className?: string;
  /** Variante blanca para fondos oscuros (default). `false` usa el logo negro. */
  light?: boolean;
  /** Alto del logo en px. El ancho se deriva del aspect ratio (1016:245). */
  size?: number;
}

/**
 * Logo GoTechy — wordmark completo oficial.
 * `logo-gotechy-blanco.png`: blanco con la flecha del G en cyan (fondos oscuros).
 * `Principal-Negro-...png`: negro (fondos claros).
 */
const RATIO = 1016 / 245;

export function Logo({ className, light = true, size = 36 }: LogoProps) {
  return (
    <img
      src={
        light
          ? '/images/logo-gotechy-blanco.png'
          : '/images/Principal-Negro-FondoBlanco_Logo-removebg-preview.png'
      }
      alt="GoTechy"
      width={Math.round(size * RATIO)}
      height={size}
      decoding="async"
      className={cn('w-auto object-contain', className)}
      style={{ height: size }}
    />
  );
}
