import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

interface ServiceHorizonteProps {
  /** Texto (ya localizado) sobre las novedades del ecosistema SAP que vienen. */
  text: string;
}

/**
 * Bloque "Horizonte SAP" — caja de acento celeste con las novedades del
 * ecosistema SAP que se vienen. Tono: "esto llega, estamos preparados para
 * acompañarte". Nunca menciona fechas ni años (el contenido lo garantiza).
 *
 * Reveal con useInView (react-intersection-observer) — más confiable que el
 * whileInView interno de framer-motion para no dejar el bloque en opacity:0.
 */
export function ServiceHorizonte({ text }: ServiceHorizonteProps) {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    fallbackInView: true,
  });

  return (
    <section className="relative py-12 sm:py-16" aria-label="Horizonte SAP">
      <div className="container-x">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="animated-mesh relative overflow-hidden rounded-2xl border border-secondary/20 bg-secondary/[0.05] p-6 shadow-glow-sm backdrop-blur sm:p-8"
        >
          {/* Glow celeste sutil del brandbook */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden="true"
          />
          {/* Badge con pulso sutil */}
          <span className="relative inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <motion.span
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inline-flex h-full w-full rounded-full bg-secondary"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            {t('services.horizonte.label')}
          </span>
          <p className="relative mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            {text}
          </p>
          <p className="relative mt-3 text-xs leading-relaxed text-white/50">
            {t('services.horizonte.disclaimer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
