import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { PhotoBanner } from '../components/PhotoBanner';
import { Clients } from '../components/Clients';
import { Partners } from '../components/Partners';
import { Testimonials } from '../components/home/Testimonials';
import { AnimatedCounter } from '../components/effects/AnimatedCounter';
import { STATS } from '../data/site';

export function ClientsPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  return (
    <>
      <PageHeader
        eyebrow={t('header.clients')}
        title={t('clients.pageTitle')}
        subtitle={t('clients.pageSubtitle')}
        videoMp4="/videos/tech-network.mp4"
        videoWebm="/videos/tech-network.webm"
        videoPoster="/videos/tech-network-poster.webp"
      />
      <Clients />

      {/* Voces de clientes — mismo componente del Home; si no hay
          testimonios cargados en /admin, no renderiza nada. */}
      <Testimonials />

      <Partners />

      {/* Impacto global — banner fotográfico claro + stats superpuestas
          con contadores animados (patrón del Home) */}
      <section className="relative bg-white text-[#0F1419]" aria-labelledby="clients-metrics">
        <PhotoBanner
          image="/images/banner-impact.webp"
          align="left"
          overlap
          titleId="clients-metrics"
          eyebrow={t('clients.impactBanner.eyebrow')}
          title={
            <>
              {t('clients.impactBanner.titleStart')}{' '}
              <span className="text-brand-600">{t('clients.impactBanner.titleHighlight')}</span>
            </>
          }
          subtitle={t('clients.impactBanner.subtitle')}
        />
        <div className="relative bg-gradient-to-b from-transparent via-[#F7FAFC] to-white pb-20 sm:pb-28">
          <div className="container-x relative -mt-28 sm:-mt-32">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              className="mx-auto grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="rounded-3xl border border-black/5 bg-white p-6 text-center shadow-[0_10px_40px_-15px_rgba(15,20,25,0.15)] transition hover:border-brand-200"
                >
                  <div className="font-mono text-3xl font-bold text-[#0F1419] sm:text-4xl">
                    {s.count !== null ? (
                      <AnimatedCounter end={s.count} suffix={s.suffix} duration={2} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="mt-2 text-sm text-[#0F1419]/60">
                    {isEn ? s.labelEn : s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
