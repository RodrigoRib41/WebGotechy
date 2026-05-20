import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Building2 } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { SectionHeader } from './SectionHeader';
import { cn } from '../utils/cn';

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(PROJECTS[0]?.id ?? null);

  return (
    <section id="proyectos" className="relative py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Casos de éxito"
          title={
            <>
              Proyectos que <span className="text-gradient">movieron la aguja</span>
            </>
          }
          description="Cada implementación se mide por su impacto en el negocio. Estos son algunos de los resultados que entregamos en producción."
        />

        <div className="mt-16 grid gap-8">
          {PROJECTS.map((project, idx) => {
            const isOpen = expanded === project.id;
            const reverse = idx % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-card backdrop-blur md:grid-cols-2"
              >
                {/* Imagen */}
                <div
                  className={cn(
                    'relative h-64 overflow-hidden md:h-auto',
                    reverse && 'md:order-2',
                  )}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary-200 backdrop-blur ring-1 ring-secondary/30">
                    <Building2 className="h-3.5 w-3.5" />
                    {project.industry}
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary-300">
                    {project.client}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-[26px]">
                    {project.title}
                  </h3>

                  {/* Métricas */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
                      >
                        <div className="font-mono text-lg font-bold text-white">{m.value}</div>
                        <div className="mt-0.5 text-[11px] leading-snug text-white/60">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                              Desafío
                            </div>
                            <p className="mt-1 text-sm leading-relaxed text-white/80">
                              {project.challenge}
                            </p>
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                              Solución
                            </div>
                            <p className="mt-1 text-sm leading-relaxed text-white/80">
                              {project.solution}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : project.id)}
                    aria-expanded={isOpen}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-secondary hover:text-secondary-200"
                  >
                    {isOpen ? 'Ocultar detalles' : 'Leer más'}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
