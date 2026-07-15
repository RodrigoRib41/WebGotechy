import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
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
    </>
  );
}
