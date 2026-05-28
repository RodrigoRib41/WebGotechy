import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { approachItem } from '../effects/ApproachReveal';

interface ServiceApproachProps {
  /** Etiqueta sobre el título. Default: "Metodología". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: string[];
  image?: string;
}

/**
 * Sección "Cómo trabajamos" / metodología.
 * Texto + lista de items + imagen lateral opcional. Si la imagen falla o no se
 * provee, se renderiza un panel decorativo on-brand.
 */
export function ServiceApproach({
  eyebrow,
  title,
  subtitle,
  items,
  image,
}: ServiceApproachProps) {
  const [imageOk, setImageOk] = useState(true);
  const { t } = useTranslation();
  const eyebrowText = eyebrow ?? t('services.approach.eyebrow');
  const showImage = Boolean(image) && imageOk;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="approach-title">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent"
        aria-hidden="true"
      />
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Imagen / panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="relative order-1 aspect-[5/4] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-card backdrop-blur lg:order-none"
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
                  className="absolute inset-0 bg-gradient-to-tr from-primary/75 via-transparent to-secondary/10"
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden="true" />
                <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
              </>
            )}
          </motion.div>

          {/* Texto + lista — efecto "aparece desde lejos" stagger */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.18 } },
            }}
          >
            <motion.span variants={approachItem} className="eyebrow mb-4 inline-flex">
              {eyebrowText}
            </motion.span>
            <motion.h2
              variants={approachItem}
              id="approach-title"
              className="text-display-2 font-display font-bold text-white"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                variants={approachItem}
                className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.ul
              variants={approachItem}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.12 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition-colors hover:border-secondary/40 hover:bg-white/[0.05]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary ring-1 ring-secondary/30">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-white/85">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
