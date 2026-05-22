import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';

export interface ServiceTechItem {
  label: string;
  icon?: LucideIcon;
  /** URL de logo subido. Si está presente, prevalece sobre `icon`. */
  imageUrl?: string;
}

interface ServiceTechStackProps {
  items: ServiceTechItem[];
}

export function ServiceTechStack({ items }: ServiceTechStackProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="techstack-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Stack tecnológico"
          title={
            <>
              Las <span className="text-gradient">herramientas</span> que usamos
            </>
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {items.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={`${tech.label}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-sm"
              >
                {tech.imageUrl ? (
                  <div className="flex h-12 w-12 items-center justify-center">
                    <img
                      src={tech.imageUrl}
                      alt={tech.label}
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 max-w-12 object-contain"
                    />
                  </div>
                ) : Icon ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                ) : null}
                <span className="text-center text-xs font-semibold text-white/80">
                  {tech.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
