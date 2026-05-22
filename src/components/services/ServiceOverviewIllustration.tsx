import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ServiceOverviewIllustrationProps {
  /** Icono principal del servicio (centrado y agrandado). */
  Icon: LucideIcon;
  /** Iconos de features para los chips satelitales (usamos los primeros 3). */
  featureIcons: LucideIcon[];
  accent: 'secondary' | 'accent';
}

/**
 * Composición visual on-brand para el overview de cada servicio.
 * Mezcla gradient mesh + grid + glow del estilo del sitio con los iconos
 * propios del servicio dispuestos como un mini dashboard abstracto.
 *
 * Reutilizable: no necesita ningún asset extra ni config — sólo el icono principal
 * y la lista de feature icons. Cada servicio queda visualmente distinto sin tener
 * que diseñar una ilustración a medida.
 */
export function ServiceOverviewIllustration({
  Icon,
  featureIcons,
  accent,
}: ServiceOverviewIllustrationProps) {
  const accentBg = accent === 'secondary' ? 'bg-secondary/15' : 'bg-accent/15';
  const accentText = accent === 'secondary' ? 'text-secondary' : 'text-accent';
  const accentGlow =
    accent === 'secondary' ? 'shadow-glow-md' : 'shadow-glow-accent';

  // Tomamos los primeros 3 feature icons; si hay menos, repetimos el principal.
  const chips: LucideIcon[] = [
    featureIcons[0] ?? Icon,
    featureIcons[1] ?? Icon,
    featureIcons[2] ?? Icon,
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Capas decorativas de fondo */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-primary/70 via-transparent to-secondary/10"
        aria-hidden="true"
      />

      {/* Glow blobs */}
      <div
        className={cn(
          'pointer-events-none absolute -left-10 top-1/3 h-40 w-40 rounded-full blur-3xl opacity-50',
          accent === 'secondary' ? 'bg-secondary/40' : 'bg-accent/40',
        )}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-1/4 h-48 w-48 rounded-full bg-accent/25 blur-3xl opacity-50"
        aria-hidden="true"
      />

      {/* Card principal flotante */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            'relative flex h-28 w-28 items-center justify-center rounded-3xl border border-white/15 bg-primary/80 backdrop-blur-xl ring-1 ring-white/5',
            accentGlow,
          )}
        >
          <Icon className={cn('h-12 w-12', accentText)} strokeWidth={1.5} />
          {/* Ring pulsante */}
          <div
            className={cn(
              'pointer-events-none absolute inset-0 rounded-3xl ring-2',
              accent === 'secondary' ? 'ring-secondary/30' : 'ring-accent/30',
            )}
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      {/* Chips satelitales: top-left, top-right, bottom */}
      {chips.map((ChipIcon, i) => {
        const positions = [
          'left-[14%] top-[18%]',
          'right-[14%] top-[22%]',
          'left-1/2 bottom-[14%] -translate-x-1/2',
        ];
        const floatDelays = [0, 1.5, 3];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className={cn('absolute', positions[i])}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelays[i],
              }}
              className={cn(
                'flex items-center gap-2 rounded-xl border border-white/10 bg-primary/70 px-3 py-2 backdrop-blur-md shadow-card',
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-lg',
                  accentBg,
                  accentText,
                )}
              >
                <ChipIcon className="h-4 w-4" strokeWidth={2} />
              </div>
              {/* Mock "barras de progreso" decorativas */}
              <div className="flex flex-col gap-1">
                <span className="block h-1 w-12 rounded-full bg-white/30" />
                <span className="block h-1 w-8 rounded-full bg-white/15" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Líneas SVG conectando el centro con cada chip */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="overview-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(0,229,255)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(29,233,182)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="22" y1="24" x2="50" y2="50" stroke="url(#overview-line)" strokeWidth="0.5" strokeDasharray="1 1.5" />
        <line x1="78" y1="26" x2="50" y2="50" stroke="url(#overview-line)" strokeWidth="0.5" strokeDasharray="1 1.5" />
        <line x1="50" y1="84" x2="50" y2="50" stroke="url(#overview-line)" strokeWidth="0.5" strokeDasharray="1 1.5" />
      </svg>

      {/* Puntitos decorativos */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { top: '12%', left: '40%' },
          { top: '30%', left: '70%' },
          { top: '70%', left: '22%' },
          { top: '78%', left: '64%' },
        ].map((p, i) => (
          <motion.span
            key={i}
            className={cn(
              'absolute block h-1.5 w-1.5 rounded-full',
              accent === 'secondary' ? 'bg-secondary' : 'bg-accent',
            )}
            style={p}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
