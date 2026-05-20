import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';

/**
 * Detalle de artículo — stub para Fase 1.
 * En Fase 2 lee post desde Supabase usando el slug.
 */
export function BlogPostPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <PageHeader title={slug ?? 'Artículo'} />
      <section className="pb-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/blogtechy"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-300 hover:text-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('blog.backToBlog')}
            </Link>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-card backdrop-blur">
              <p className="text-white/70">
                {t('blog.empty')}{' '}
                <span className="font-mono text-xs">(slug: {slug})</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
