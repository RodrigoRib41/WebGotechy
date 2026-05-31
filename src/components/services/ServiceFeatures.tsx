import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader';
import { approachItem, approachContainer } from '../effects/ApproachReveal';

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description?: string;
  bullets?: string[];
}

interface ServiceFeaturesProps {
  features: ServiceFeature[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  const { t } = useTranslation();
  // useInView (react-intersection-observer) es más confiable que el whileInView
  // interno de framer-motion para no dejar las tarjetas en opacity:0.
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    fallbackInView: true,
  });
  if (features.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="features-title">
      <div className="container-x">
        <SectionHeader
          eyebrow={t('services.features.eyebrow')}
          title={
            <>
              {t('services.features.titleStart')}{' '}
              <span className="text-secondary">{t('services.features.titleHighlight')}</span>{' '}
              {t('services.features.titleEnd')}
            </>
          }
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={approachContainer}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={`${feature.title}-${i}`}
                variants={approachItem}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(0,243,255,0.12),transparent_60%)]"
                  aria-hidden="true"
                />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/20 transition-all duration-300 ease-smooth group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-secondary/20 group-hover:ring-secondary/50">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {feature.description}
                  </p>
                )}
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
        </motion.div>
      </div>
    </section>
  );
}
