import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader';
import { approachItem, approachContainer } from '../effects/ApproachReveal';

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
  const { t } = useTranslation();
  if (items.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="techstack-title">
      <div className="container-x">
        <SectionHeader
          eyebrow={t('services.techStack.eyebrow')}
          title={
            <>
              {t('services.techStack.titleStart')}{' '}
              <span className="text-secondary">{t('services.techStack.titleHighlight')}</span>{' '}
              {t('services.techStack.titleEnd')}
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={approachContainer}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
        >
          {items.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={`${tech.label}-${i}`}
                variants={approachItem}
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
        </motion.div>
      </div>
    </section>
  );
}
