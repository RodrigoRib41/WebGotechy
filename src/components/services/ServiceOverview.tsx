import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  /** Relación de aspecto del marco. Default '4/3'. */
  aspect?: '5/4' | '4/3' | '3/4' | '1/1';
}

export function ServiceOverview({
  paragraphs,
  Icon,
  featureIcons,
  accent,
  image,
  aspect = '4/3',
}: ServiceOverviewProps) {
  const [imageOk, setImageOk] = useState(true);
  const { t } = useTranslation();
  const showImage = Boolean(image) && imageOk;
  const aspectClass =
    aspect === '4/3'
      ? 'aspect-[4/3]'
      : aspect === '3/4'
        ? 'aspect-[3/4]'
        : aspect === '1/1'
          ? 'aspect-square'
          : 'aspect-[5/4]';

  // Parallax sutil: la imagen se desplaza levemente más lento que el scroll.
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28" aria-label="Descripción del servicio">
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow celeste detrás */}
            <div
              className="pointer-events-none absolute -inset-5 rounded-[2.25rem] bg-secondary/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className={`group relative ${aspectClass} overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-glow-md backdrop-blur`}
            >
              {showImage ? (
                <>
                  <motion.div style={{ y: imageY }} className="absolute inset-0">
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={() => setImageOk(false)}
                      className="h-full w-full object-contain object-center p-3 transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                    />
                  </motion.div>
                  <div
                    className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-tr from-primary/25 via-transparent to-secondary/10"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
