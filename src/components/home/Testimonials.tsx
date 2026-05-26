import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTestimonials } from '../../hooks/useCatalog';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../utils/cn';

const AUTO_ROTATE_MS = 7000;

/**
 * Sección "Testimonios" — fondo BLANCO. Muestra 1 testimonio grande
 * centrado, con dots para navegar y autoplay (pausable con interacción).
 * Si no hay testimonios cargados desde /admin, la sección no se renderiza.
 */
export function Testimonials() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const { data: items, loading } = useTestimonials(true);
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate
  useEffect(() => {
    if (reduced || paused || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, items.length]);

  // Reset si cambia la cantidad de items
  useEffect(() => {
    if (idx >= items.length) setIdx(0);
  }, [items.length, idx]);

  if (loading) return null;
  if (items.length === 0) return null;

  const current = items[idx];

  return (
    <section
      className="section-light overflow-hidden"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Geometría sutil */}
      <div className="geo-soft-cyan left-[-10%] top-[20%] h-[400px] w-[400px]" />
      <div className="geo-soft-cyan right-[-10%] bottom-[10%] h-[400px] w-[400px] opacity-60" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="eyebrow-light">{isEn ? 'Testimonials' : 'Testimonios'}</span>
          <h2 id="testimonials-title" className="h2-display mt-5 text-[#0F1419]">
            {isEn ? 'What our clients say' : 'Lo que dicen nuestros clientes'}
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <Quote
            aria-hidden="true"
            className="mx-auto h-14 w-14 text-brand-500 opacity-90"
          />

          <div className="relative mt-8 min-h-[280px] sm:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <blockquote className="mx-auto max-w-3xl font-display text-2xl font-medium leading-relaxed text-[#0F1419] sm:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-10 flex items-center justify-center gap-4">
                  {current.avatar_url ? (
                    <img
                      src={current.avatar_url}
                      alt={current.author_name}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-100"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-sm font-bold uppercase text-brand-700 ring-2 ring-brand-100">
                      {current.author_name.slice(0, 2)}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-semibold text-[#0F1419]">{current.author_name}</div>
                    <div className="text-sm text-[#0F1419]/60">
                      {[current.author_role, current.company].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
                aria-label={isEn ? 'Previous testimonial' : 'Testimonio anterior'}
                className="rounded-full border border-black/10 bg-white p-2 text-[#0F1419]/70 transition hover:border-brand-500 hover:text-brand-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {items.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`${isEn ? 'Go to testimonial' : 'Ir al testimonio'} ${i + 1}`}
                    aria-current={i === idx ? 'true' : undefined}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === idx ? 'w-8 bg-brand-500' : 'w-2 bg-black/15 hover:bg-black/30',
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIdx((i) => (i + 1) % items.length)}
                aria-label={isEn ? 'Next testimonial' : 'Siguiente testimonio'}
                className="rounded-full border border-black/10 bg-white p-2 text-[#0F1419]/70 transition hover:border-brand-500 hover:text-brand-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
