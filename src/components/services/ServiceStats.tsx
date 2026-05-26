import { motion } from 'framer-motion';

export interface ServiceStatItem {
  value: string;
  label: string;
}

interface ServiceStatsProps {
  eyebrow?: string;
  title?: string;
  items: ServiceStatItem[];
}

/**
 * Banner de métricas destacadas del servicio (ej: la "rueda" de Signavio).
 * Pensado para 3-4 items; en mobile se apila en 2 columnas.
 */
export function ServiceStats({ eyebrow, title, items }: ServiceStatsProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-16" aria-label={title ?? 'Métricas del producto'}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-primary/40 to-accent/5 p-8 shadow-glow-md backdrop-blur sm:p-12"
        >
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 20%, rgba(0,229,255,0.25), transparent 50%), radial-gradient(circle at 85% 80%, rgba(29,233,182,0.18), transparent 50%)',
            }}
            aria-hidden="true"
          />

          {(eyebrow || title) && (
            <div className="mb-8 text-center">
              {eyebrow && <span className="eyebrow mb-3 inline-flex">{eyebrow}</span>}
              {title && (
                <h2 className="text-display-3 font-display font-bold text-white">{title}</h2>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            {items.map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
                  <span className="text-gradient">{item.value}</span>
                </div>
                <div className="mt-3 text-xs font-medium uppercase tracking-wider text-white/65 sm:text-sm sm:normal-case sm:tracking-normal">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
