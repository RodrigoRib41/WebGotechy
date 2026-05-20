import { cn } from '../utils/cn';

interface LogoProps {
  className?: string;
  /** Wordmark blanco para fondos oscuros (default en tema oscuro) */
  light?: boolean;
  /** Tamaño del logo en px (cuadrado). Default: 36px */
  size?: number;
}

/**
 * Logo GoTechy.
 * Usa el isotipo oficial (G + flecha cyan) servido desde /public/images
 * y el wordmark en blanco para que destaque sobre el fondo oscuro.
 */
export function Logo({ className, light = true, size = 40 }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/images/Secundario-Color_Logo-SortIcon.jpg"
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        className="shrink-0 object-contain"
        style={{ width: size, height: size, mixBlendMode: 'lighten' }}
      />
      <span
        className={cn(
          'font-display text-xl font-bold tracking-tight',
          light ? 'text-white' : 'text-primary',
        )}
      >
        Go<span className="text-secondary">Techy</span>
      </span>
    </div>
  );
}
