import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { Clients } from '../components/Clients';
import { Partners } from '../components/Partners';
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

      <Partners />

      <section className="bg-surface-soft py-20" aria-labelledby="clients-metrics">
        <div className="container-x">
          <h2
            id="clients-metrics"
            className="text-center text-display-3 font-display font-bold text-white"
          >
            {t('clients.metricsTitle')}
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-card backdrop-blur"
              >
                <div className="font-mono text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-2 text-sm text-white/65">
                  {isEn ? s.labelEn : s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
