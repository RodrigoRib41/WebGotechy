import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';

export interface ServiceBenefit {
  title: string;
  description?: string;
  metric?: string;
}

interface ServiceBenefitsProps {
  benefits: ServiceBenefit[];
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <section
      className="relative py-20 sm:py-28"
      aria-labelledby="benefits-title"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent" aria-hidden="true" />
      <div className="container-x">
        <SectionHeader
          eyebrow="Beneficios"
          title={
            <>
              Resultados <span className="text-gradient">medibles</span> para tu negocio
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <motion.div
              key={`${benefit.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group relative flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:border-secondary/40 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary ring-1 ring-secondary/30">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
