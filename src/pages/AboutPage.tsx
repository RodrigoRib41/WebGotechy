import { motion } from 'framer-motion';
import { MapPin, Target, Eye, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';
import { PageHeader } from '../components/PageHeader';
import { WhyUs } from '../components/WhyUs';
import { SapPartnerBadge } from '../components/about/SapPartnerBadge';
import { OFFICES } from '../data/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface ValueItem {
  title: string;
  body: string;
}

export function AboutPage() {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const values = t('about.values.items', { returnObjects: true }) as ValueItem[];

  return (
    <>
      <PageHeader
        eyebrow={t('header.about')}
        title={t('about.pageTitle')}
        subtitle={t('about.pageSubtitle')}
      />

      <SapPartnerBadge />

      {/* Misión y Visión */}
      <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="mission-vision">
        <div className="geo-circle-cyan left-[-10%] top-[10%] h-[400px] w-[400px]" />
        <div className="container-x relative">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Target, key: 'mission' },
              { icon: Eye, key: 'vision' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Tilt
                    tiltEnable={!reduced}
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    glareEnable={!reduced}
                    glareMaxOpacity={0.15}
                    glareColor="#00F3FF"
                    glarePosition="all"
                    scale={1.02}
                    transitionSpeed={1100}
                    className="h-full"
                  >
                    <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur transition-all duration-300 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md sm:p-10">
                      <div
                        style={{ transform: 'translateZ(40px)' }}
                        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary shadow-glow-sm"
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h2
                        style={{ transform: 'translateZ(20px)' }}
                        className="mt-6 font-display text-2xl font-bold text-white"
                      >
                        {t(`about.${item.key}.title`)}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-white/75">
                        {t(`about.${item.key}.body`)}
                      </p>
                    </article>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section
        className="relative overflow-hidden bg-surface-soft py-20 sm:py-28"
        aria-labelledby="values-title"
      >
        <div className="geo-circle-mint right-[-12%] top-[10%] h-[400px] w-[400px]" />
        <div className="geo-circle-cyan left-[-8%] bottom-[5%] h-[320px] w-[320px]" />

        <div className="container-x relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30">
              <Heart className="h-7 w-7" />
            </div>
            <h2
              id="values-title"
              className="mt-5 text-display-2 font-display font-bold text-white"
            >
              {t('about.values.title')}
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
              >
                <Tilt
                  tiltEnable={!reduced}
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  glareEnable={!reduced}
                  glareMaxOpacity={0.12}
                  glareColor="#00F3FF"
                  glarePosition="all"
                  scale={1.02}
                  transitionSpeed={1100}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md">
                    <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{v.body}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WhyUs />

      {/* Oficinas */}
      <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="offices-title">
        <div className="geo-circle-cyan right-[-10%] top-[5%] h-[360px] w-[360px]" />

        <div className="container-x relative">
          <motion.h2
            id="offices-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="text-center text-display-2 font-display font-bold text-white"
          >
            {t('about.offices')}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2"
          >
            {OFFICES.map((o) => (
              <motion.div
                key={o.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
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
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition hover:border-secondary/40 hover:bg-white/[0.06]">
                    <div className="flex items-center gap-2 text-secondary-300">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-wider">{o.city}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {o.address}
                      <br />
                      {o.postal} — {o.country}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
