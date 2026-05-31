import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { approachItem } from '../effects/ApproachReveal';

interface ServiceHeroProps {
  title: string;
  tagline: string;
  Icon: LucideIcon;
  image?: string;
  accent: 'secondary' | 'accent';
  breadcrumb: { label: string; to: string }[];
  tags?: string[];
}

export function ServiceHero({
  title,
  tagline,
  Icon,
  image,
  accent,
  breadcrumb,
  tags,
}: ServiceHeroProps) {
  const [imageOk, setImageOk] = useState(true);
  const { t } = useTranslation();
  const showImage = Boolean(image) && imageOk;
  const iconBg = accent === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent';

  return (
    <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary via-primary-700 to-primary"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-40" aria-hidden="true" />
      <div className="animated-mesh absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-x">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-white/55">
            {breadcrumb.map((item, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <li key={item.to} className="flex items-center gap-1.5">
                  {isLast ? (
                    <span className="text-secondary-200" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        to={item.to}
                        className="rounded transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                      <span aria-hidden="true" className="text-white/30">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Hero del servicio con efecto "aparece desde lejos" stagger */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={approachItem}
              className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
            >
              <Icon className="h-7 w-7" />
            </motion.div>
            <motion.h1
              variants={approachItem}
              className="text-display-1 font-display font-extrabold leading-[1.05] text-white"
            >
              {title}
            </motion.h1>
            <motion.p
              variants={approachItem}
              className="mt-5 max-w-xl text-lg leading-relaxed text-white/75"
            >
              {tagline}
            </motion.p>

            {tags && tags.length > 0 && (
              <motion.div variants={approachItem} className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={approachItem} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/contacto" className="btn-primary">
                {t('services.hero.scheduleDemo')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contacto" className="btn-secondary">
                <FileDown className="h-4 w-4" />
                {t('services.hero.talkToSpecialist')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Imagen / decoración — glow celeste + flotación sutil + duotono brandbook */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-full min-h-[300px] lg:block"
          >
            {/* Glow celeste detrás */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-secondary/15 blur-3xl"
              aria-hidden="true"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="group absolute inset-0"
            >
              <div
                className={`absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-glow-md backdrop-blur ${
                  showImage ? 'img-duotone img-duotone-hover' : ''
                }`}
              >
                {showImage ? (
                  <img
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                    onError={() => setImageOk(false)}
                    className="absolute inset-0 h-full w-full object-contain object-center p-4 transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden="true" />
                    <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-32 w-32 text-secondary/20" />
                    </div>
                  </>
                )}
                <div
                  className="absolute inset-x-0 bottom-0 z-[5] h-1/3 bg-gradient-to-t from-primary/40 to-transparent transition-opacity duration-500 group-hover:opacity-40"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
