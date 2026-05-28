import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader';
import { cn } from '../../utils/cn';
import { approachItem, approachContainer } from '../effects/ApproachReveal';

export interface ServiceFAQItem {
  q: string;
  a: string;
}

interface ServiceFAQProps {
  faq: ServiceFAQItem[];
}

export function ServiceFAQ({ faq }: ServiceFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useTranslation();

  if (faq.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="container-x">
        <SectionHeader
          eyebrow={t('services.faq.eyebrow')}
          title={
            <>
              {t('services.faq.titleStart')}{' '}
              <span className="text-secondary">{t('services.faq.titleHighlight')}</span>{' '}
              {t('services.faq.titleEnd')}
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={approachContainer}
          className="mx-auto mt-12 max-w-3xl space-y-3"
        >
          {faq.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                variants={approachItem}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-white/[0.03] shadow-card backdrop-blur transition-colors',
                  isOpen ? 'border-secondary/40' : 'border-white/10',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="font-display text-base font-semibold text-white sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 transition-all duration-300',
                      isOpen ? 'rotate-180 text-secondary' : 'text-white/55',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-white/75 sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
