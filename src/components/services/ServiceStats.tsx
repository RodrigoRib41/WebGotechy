import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { approachItem } from '../effects/ApproachReveal';
import { AnimatedCounter } from './AnimatedCounter';

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
  const { t } = useTranslation();
  if (items.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-16" aria-label={title ?? t('services.stats.labelDefault')}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-primary/40 to-accent/5 p-8 shadow-glow-md backdrop-blur sm:p-12"
        >
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 20%, rgba(0,243,255,0.25), transparent 50%), radial-gradient(circle at 85% 80%, rgba(0,255,146,0.18), transparent 50%)',
            }}
            aria-hidden="true"
          />

          {(eyebrow || title) && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.18 } },
              }}
              className="mb-8 text-center"
            >
              {eyebrow && (
                <motion.span variants={approachItem} className="eyebrow mb-3 inline-flex">
                  {eyebrow}
                </motion.span>
              )}
              {title && (
                <motion.h2
                  variants={approachItem}
                  className="text-display-3 font-display font-bold text-white"
                >
                  {title}
                </motion.h2>
              )}
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.22 } },
            }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6"
          >
            {items.map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                variants={approachItem}
                className="text-center"
              >
                <div className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
                  <span className="text-gradient">
                    <AnimatedCounter value={item.value} />
                  </span>
                </div>
                <div className="mt-3 text-xs font-medium uppercase tracking-wider text-white/65 sm:text-sm sm:normal-case sm:tracking-normal">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
