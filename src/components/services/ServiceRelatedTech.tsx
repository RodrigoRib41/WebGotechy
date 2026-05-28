import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../data/services';
import { SectionHeader } from '../SectionHeader';
import { approachItem, approachContainer } from '../effects/ApproachReveal';

interface ServiceRelatedTechProps {
  services: Service[];
}

export function ServiceRelatedTech({ services }: ServiceRelatedTechProps) {
  const { t } = useTranslation();
  if (services.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="related-title">
      <div className="container-x">
        <SectionHeader
          eyebrow={t('services.relatedTech.eyebrow')}
          title={
            <>
              {t('services.relatedTech.titleStart')}{' '}
              <span className="text-secondary">{t('services.relatedTech.titleHighlight')}</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={approachContainer}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const target = service.detail ? `/servicios/${service.slug}` : '/servicios';
            return (
              <motion.div key={service.id} variants={approachItem}>
                <Link
                  to={target}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.05] hover:shadow-glow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-sm font-semibold text-white">
                      {service.title}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-white/55">{service.short}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-secondary" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
