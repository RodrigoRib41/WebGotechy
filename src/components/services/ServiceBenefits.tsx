import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { approachItem, approachContainer } from '../effects/ApproachReveal';

export interface ServiceBenefit {
  title: string;
  description?: string;
  metric?: string;
}

interface ServiceBenefitsProps {
  benefits: ServiceBenefit[];
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  const reduced = usePrefersReducedMotion();
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="benefits-title"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent" aria-hidden="true" />
      {/* Halos suaves */}
      <div className="geo-circle-cyan left-[-12%] top-[10%] h-[380px] w-[380px]" />
      <div className="geo-circle-mint right-[-12%] bottom-[5%] h-[340px] w-[340px]" />

      <div className="container-x relative">
        <SectionHeader
          eyebrow={t('services.benefits.eyebrow')}
          title={
            <>
              {t('services.benefits.titleStart')}{' '}
              <span className="text-secondary">{t('services.benefits.titleHighlight')}</span>{' '}
              {t('services.benefits.titleEnd')}
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={approachContainer}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {benefits.map((benefit, i) => (
            <motion.div key={`${benefit.title}-${i}`} variants={approachItem}>
              <Tilt
                tiltEnable={!reduced}
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                glareEnable={!reduced}
                glareMaxOpacity={0.1}
                glareColor="#00F3FF"
                glarePosition="all"
                scale={1.02}
                transitionSpeed={1100}
                className="h-full"
              >
                <div className="group relative flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:border-secondary/40 hover:bg-white/[0.05] hover:shadow-glow-sm">
                  <div
                    style={{ transform: 'translateZ(30px)' }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary ring-1 ring-secondary/30"
                  >
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </div>
                  <div className="min-w-0 flex-1">
                    {benefit.metric && (
                      <div className="font-mono text-2xl font-bold text-secondary-200">
                        {benefit.metric}
                      </div>
                    )}
                    <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
