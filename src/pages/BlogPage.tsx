import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookOpen, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { PageHeader } from '../components/PageHeader';
import { usePublishedPosts } from '../hooks/usePosts';
import { localizeBlogPost } from '../types/blog';

export function BlogPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const locale = isEn ? enUS : es;
  const { posts: rawPosts, loading, error } = usePublishedPosts();
  const posts = rawPosts.map((p) => localizeBlogPost(p, isEn));

  return (
    <>
      <PageHeader
        eyebrow={t('header.blog')}
        title={t('blog.pageTitle')}
        subtitle={t('blog.pageSubtitle')}
        videoMp4="/videos/tech-network.mp4"
        videoWebm="/videos/tech-network.webm"
        videoPoster="/videos/tech-network-poster.webp"
      />
      <section className="pb-28">
        <div className="container-x">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-secondary" />
            </div>
          ) : error ? (
            <div className="mx-auto max-w-md rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-center text-sm text-red-200">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-card backdrop-blur">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-white">
                {t('blog.empty')}
              </h2>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to={`/blogtechy/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition hover:-translate-y-1 hover:border-secondary/40 hover:shadow-glow-md"
                >
                  {p.featured_image ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={p.featured_image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary-700 to-primary">
                      <BookOpen className="h-10 w-10 text-secondary/60" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50">
                      <span>
                        {format(new Date(p.published_at ?? p.created_at), "d MMM yyyy", {
                          locale,
                        })}
                      </span>
                      {p.tags?.[0] && (
                        <>
                          <span className="text-white/20">·</span>
                          <span className="text-secondary-300">{p.tags[0]}</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-secondary-200">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-white/70">{p.excerpt}</p>
                    )}
                    <div className="mt-4 text-xs text-white/55">
                      {t('blog.by')} <span className="font-semibold text-white/75">{p.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
