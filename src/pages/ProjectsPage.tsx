import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { PhotoBanner } from '../components/PhotoBanner';
import { Projects } from '../components/Projects';

export function ProjectsPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        eyebrow={t('header.projects')}
        title={t('projects.pageTitle')}
        subtitle={t('projects.pageSubtitle')}
        videoMp4="/videos/tech-network.mp4"
        videoWebm="/videos/tech-network.webm"
        videoPoster="/videos/tech-network-poster.webp"
      />
      <Projects />
      {/* Remate de la página: banner CTA estilo Home → contacto / agendar */}
      <section className="bg-white text-[#0F1419]" aria-labelledby="projects-cta-title">
        <PhotoBanner
          image="/images/banner-handshake.webp"
          align="left"
          titleId="projects-cta-title"
          eyebrow={t('projects.ctaBanner.eyebrow')}
          title={
            <>
              {t('projects.ctaBanner.titleStart')}{' '}
              <span className="text-brand-600">{t('projects.ctaBanner.titleHighlight')}</span>
            </>
          }
          subtitle={t('projects.ctaBanner.subtitle')}
          cta={
            <Link to="/contacto" className="btn-primary-light">
              {t('projects.ctaBanner.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </section>
    </>
  );
}
