import { ArrowMark } from './ArrowMark';
import { cn } from '../../utils/cn';

interface ArrowPatternProps {
  /** Densidad: cantidad de flechas por eje. */
  density?: number;
  /** Tamaño de cada flecha. */
  arrowSize?: number;
  /** Opacidad base. */
  opacity?: number;
  /** Color de las flechas. */
  color?: string;
  className?: string;
}

/**
 * Trama decorativa de flechas — brandbook pág. 25.
 * Las flechas solo rotan en múltiplos de 90°. Mezcla outline y fill.
 */
export function ArrowPattern({
  density = 5,
  arrowSize = 90,
  opacity = 0.04,
  color = '#00F3FF',
  className,
}: ArrowPatternProps) {
  const rotations: Array<0 | 90 | 180 | 270> = [0, 90, 180, 270];
  const cells: Array<{ x: number; y: number; rotate: 0 | 90 | 180 | 270; outline: boolean }> = [];
  for (let row = 0; row < density; row++) {
    for (let col = 0; col < density; col++) {
      const idx = row * density + col;
      cells.push({
        x: (col / density) * 100,
        y: (row / density) * 100,
        rotate: rotations[(idx * 7) % rotations.length],
        outline: idx % 2 === 0,
      });
    }
  }

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${c.y}%`,
            left: `${c.x}%`,
            width: arrowSize,
            height: arrowSize,
          }}
        >
          <ArrowMark
            size={arrowSize}
            opacity={opacity}
            outline={c.outline}
            color={color}
            rotate={c.rotate}
            strokeWidth={4}
          />
        </div>
      ))}
    </div>
  );
}
