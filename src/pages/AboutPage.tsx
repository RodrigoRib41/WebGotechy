import { motion } from 'framer-motion';
import { MapPin, Target, Eye, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { WhyUs } from '../components/WhyUs';
import { OFFICES } from '../data/site';

interface ValueItem {
  title: string;
  body: string;
}

export function AboutPage() {
  const { t } = useTranslation();
  const values = t('about.values.items', { returnObjects: true }) as ValueItem[];

  return (
    <>
      <PageHeader
        eyebrow={t('header.about')}
        title={t('about.pageTitle')}
        subtitle={t('about.pageSubtitle')}
      />

      {/* Misión y Visión */}
      <section className="py-20" aria-labelledby="mission-vision">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Target, key: 'mission' },
              { icon: Eye, key: 'vision' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md sm:p-10"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary shadow-glow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold text-white">
                    {t(`about.${item.key}.title`)}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-white/75">
                    {t(`about.${item.key}.body`)}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-surface-soft py-20" aria-labelledby="values-title">
        <div className="container-x">
          <div className="text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30">
              <Heart className="h-7 w-7" />
            </div>
            <h2
              id="values-title"
              className="mt-5 text-display-2 font-display font-bold text-white"
            >
              {t('about.values.title')}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md"
              >
                <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      {/* Oficinas */}
      <section className="py-20" aria-labelledby="offices-title">
        <div className="container-x">
          <h2
            id="offices-title"
            className="text-center text-display-2 font-display font-bold text-white"
          >
            {t('about.offices')}
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
            {OFFICES.map((o) => (
              <div
                key={o.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur"
              >
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
