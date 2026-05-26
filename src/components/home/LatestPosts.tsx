import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { usePublishedPosts } from '../../hooks/usePosts';

/**
 * Sección "Últimos posts" — fondo OSCURO. 3 cards con imagen + título +
 * extracto. Hover: imagen zoom suave. Si no hay posts publicados, no se
 * renderiza la sección.
 */
export function LatestPosts() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const locale = isEn ? enUS : es;
  const { posts, loading } = usePublishedPosts();
  const items = posts.slice(0, 3);

  if (!loading && items.length === 0) return null;

  return (
    <section className="section-dark overflow-hidden" aria-labelledby="latest-posts-title">
      <div className="geo-circle-cyan left-[-12%] bottom-[-10%] h-[450px] w-[450px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <span className="eyebrow-dark">{isEn ? 'BlogTechy' : 'BlogTechy'}</span>
            <h2 id="latest-posts-title" className="h2-display mt-5 text-white">
              {isEn ? (
                <>
                  Latest from{' '}
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    our blog
                  </span>
                </>
              ) : (
                <>
                  Lo último en{' '}
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    nuestro blog
                  </span>
                </>
              )}
            </h2>
          </div>
          <Link
            to="/blogtechy"
            className="group hidden items-center gap-2 text-sm font-semibold text-secondary-300 transition hover:text-secondary sm:inline-flex"
          >
            {isEn ? 'View all' : 'Ver todo'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((post) => (
            <motion.article
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Link
                to={`/blogtechy/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40"
              >
                <div className="relative h-48 overflow-hidden bg-primary-700">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FileText className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <span className="absolute left-4 top-4 inline-flex rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.published_at && (
                    <time
                      dateTime={post.published_at}
                      className="text-xs uppercase tracking-wider text-white/45"
                    >
                      {format(new Date(post.published_at), 'd MMM yyyy', { locale })}
                    </time>
                  )}
                  <h3 className="mt-2 font-display text-lg font-semibold text-white group-hover:text-secondary-200">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-secondary-300">
                    {isEn ? 'Read article' : 'Leer artículo'}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link to="/blogtechy" className="btn-secondary">
            {isEn ? 'View BlogTechy' : 'Ver BlogTechy'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
