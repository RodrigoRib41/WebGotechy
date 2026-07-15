import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { Contact } from '../components/Contact';

export function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        eyebrow={t('header.contact')}
        title={t('contact.pageTitle')}
        subtitle={t('contact.pageSubtitle')}
        videoMp4="/videos/tech-network.mp4"
        videoWebm="/videos/tech-network.webm"
      />
      <Contact />
    </>
  );
}
