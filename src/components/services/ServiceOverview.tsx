import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { ServiceOverviewIllustration } from './ServiceOverviewIllustration';
import { approachItem } from '../effects/ApproachReveal';

interface ServiceOverviewProps {
  paragraphs: string[];
  Icon: LucideIcon;
  /** Iconos de las features del servicio (usados por la ilustración fallback). */
  featureIcons: LucideIcon[];
  accent: 'secondary' | 'accent';
  /** Foto opcional. Si no se pasa o falla la carga, se renderiza la ilustración SVG on-brand. */
  image?: string;
}

export function ServiceOverview({
  paragraphs,
  Icon,
  featureIcons,
  accent,
  image,
}: ServiceOverviewProps) {
  const [imageOk, setImageOk] = useState(true);
  const { t } = useTranslation();
  const showImage = Boolean(image) && imageOk;

  return (
    <section className="relative py-20 sm:py-28" aria-label="Descripción del servicio">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Texto con "approach reveal" stagger — cada párrafo se acerca desde lejos */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.18 } },
            }}
          >
            <motion.span variants={approachItem} className="eyebrow mb-6 inline-flex">
              {t('services.overview.eyebrow')}
            </motion.span>
            <div className="space-y-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={approachItem}
                  className={
                    i === 0
                      ? 'text-lg font-medium text-white sm:text-xl'
                      : undefined
                  }
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-card backdrop-blur"
          >
            {showImage ? (
              <>
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => setImageOk(false)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/70 via-transparent to-secondary/10"
                  aria-hidden="true"
                />
              </>
            ) : (
              <ServiceOverviewIllustration
                Icon={Icon}
                featureIcons={featureIcons}
                accent={accent}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
