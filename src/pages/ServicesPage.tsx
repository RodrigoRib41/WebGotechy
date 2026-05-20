import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { Services } from '../components/Services';

export function ServicesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        eyebrow={t('header.services')}
        title={t('services.pageTitle')}
        subtitle={t('services.pageSubtitle')}
      />
      <Services />
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <div className="relative isolate overflow-hidden rounded-3xl border border-secondary/30 bg-gradient-to-br from-secondary/15 via-primary to-accent/10 p-10 text-center shadow-glow-lg sm:p-14">
            <div
              className="absolute inset-0 -z-10 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, rgba(0,229,255,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(29,233,182,0.25), transparent 50%)',
              }}
              aria-hidden="true"
            />
            <h2 className="text-display-3 font-display font-bold text-white">
              {t('home.finalCta.title')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/80">
              {t('home.finalCta.subtitle')}
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/contacto" className="btn-primary">
                {t('services.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
