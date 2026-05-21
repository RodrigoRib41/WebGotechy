import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { blogService } from '../lib/supabase';
import type { BlogPost } from '../types/blog';

export function BlogPostPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    blogService
      .getPostBySlug(slug)
      .then((p) => {
        if (!active) return;
        setPost(p);
        setLoading(false);
        if (p && p.status === 'published') {
          // Fire and forget; no bloquea el render.
          void blogService.incrementViews(p.id);
        }
      })
      .catch((e: unknown) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Error');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageHeader title="Cargando…" />
        <section className="pb-28">
          <div className="container-x flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
          </div>
        </section>
      </>
    );
  }

  if (error || !post || post.status !== 'published') {
    return (
      <>
        <PageHeader title={post?.title ?? 'Artículo no encontrado'} />
        <section className="pb-28">
          <div className="container-x mx-auto max-w-3xl">
            <Link
              to="/blogtechy"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-300 hover:text-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('blog.backToBlog')}
            </Link>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-card backdrop-blur">
              <p className="text-white/70">
                {error ?? 'Este artículo no existe o no está publicado.'}
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  const safeHtml = DOMPurify.sanitize(post.content);

  return (
    <>
      <PageHeader eyebrow={post.tags?.[0]} title={post.title} subtitle={post.excerpt ?? undefined} />

      <section className="pb-28">
        <div className="container-x mx-auto max-w-3xl">
          <Link
            to="/blogtechy"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-300 hover:text-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55">
            <span>
              Por <span className="font-semibold text-white/80">{post.author}</span>
            </span>
            <span className="text-white/25">·</span>
            <span>
              {format(new Date(post.published_at ?? post.created_at), "d 'de' MMMM, yyyy", {
                locale: es,
              })}
            </span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="text-white/25">·</span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary/15 px-2 py-0.5 text-[11px] font-medium text-secondary-200 ring-1 ring-secondary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="mt-8 w-full rounded-2xl border border-white/10 object-cover"
            />
          )}

          <article
            className="prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>
      </section>
    </>
  );
}
