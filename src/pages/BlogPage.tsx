import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

/**
 * Blog público — stub para Fase 1.
 * En Fase 2 se conecta a Supabase y muestra grid de artículos publicados.
 */
export function BlogPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        eyebrow={t('header.blog')}
        title={t('blog.pageTitle')}
        subtitle={t('blog.pageSubtitle')}
      />
      <section className="pb-28">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-card backdrop-blur">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-white">
              {t('blog.empty')}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
