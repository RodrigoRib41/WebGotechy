import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useCatalog';

/**
 * Sección "Casos de éxito" — fondo OSCURO, cards horizontales premium con
 * glassmorphism. Usa la data de projects ya existente. Muestra hasta 3.
 * Si no hay proyectos publicados, la sección no se renderiza.
 */
export function CaseStudies() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const { data: projects, loading } = useProjects();
  const items = projects.slice(0, 3);

  if (!loading && items.length === 0) return null;

  return (
    <section className="section-dark overflow-hidden" aria-labelledby="cases-title">
      {/* Decoraciones */}
      <div className="geo-circle-cyan right-[-10%] top-[5%] h-[400px] w-[400px]" />
      <div className="geo-circle-mint left-[-10%] bottom-[15%] h-[350px] w-[350px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <span className="eyebrow-dark">{isEn ? 'Case studies' : 'Casos de éxito'}</span>
            <h2 id="cases-title" className="h2-display mt-5 text-white">
              {isEn ? (
                <>
                  Real projects.{' '}
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    Measurable impact.
                  </span>
                </>
              ) : (
                <>
                  Proyectos reales.{' '}
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    Impacto medible.
                  </span>
                </>
              )}
            </h2>
          </div>
          <Link
            to="/proyectos"
            className="group hidden items-center gap-2 text-sm font-semibold text-secondary-300 transition hover:text-secondary sm:inline-flex"
          >
            {isEn ? 'View all' : 'Ver todos'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="mt-16 flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            {items.map((p) => (
              <motion.article
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40"
              >
                <div className="relative h-48 overflow-hidden bg-primary-700">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.image_alt ?? p.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Briefcase className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                  {p.industry && (
                    <span className="absolute left-4 top-4 inline-flex rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
                      {p.industry}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {p.client && (
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary-300">
                      {p.client}
                    </div>
                  )}
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">
                    {p.challenge || p.solution}
                  </p>

                  {p.metrics && p.metrics.length > 0 && (
                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-5">
                      {p.metrics.slice(0, 3).map((m, i) => (
                        <div key={i}>
                          <div className="font-mono text-lg font-bold text-secondary-200">
                            {m.value}
                          </div>
                          <div className="text-[11px] uppercase tracking-wider text-white/45">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/proyectos`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-secondary-300 transition group-hover:text-secondary"
                  >
                    {isEn ? 'View case' : 'Ver caso'}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        <div className="mt-10 flex justify-center sm:hidden">
          <Link to="/proyectos" className="btn-secondary">
            {isEn ? 'View all cases' : 'Ver todos los casos'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
