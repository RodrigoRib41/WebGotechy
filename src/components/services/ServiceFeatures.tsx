import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets?: string[];
}

interface ServiceFeaturesProps {
  features: ServiceFeature[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="features-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Características"
          title={
            <>
              Qué incluye <span className="text-gradient">esta solución</span>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={`${feature.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.12),transparent_60%)]"
                  aria-hidden="true"
                />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {feature.description}
                </p>
                {feature.bullets && feature.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {feature.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2.5 text-sm text-white/70">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary"
                          strokeWidth={3}
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
