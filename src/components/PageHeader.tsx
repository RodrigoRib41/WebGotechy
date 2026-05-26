import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  /**
   * Palabra/frase del título a resaltar con gradient cyan→mint. Opcional.
   * Ejemplo: title="Servicios SAP" highlight="SAP" renderiza "Servicios SAP"
   * con "SAP" en gradient. Si no se pasa, todo el título queda en blanco.
   */
  highlight?: string;
  subtitle?: ReactNode;
}

/**
 * Header reutilizable para todas las páginas internas. Provee el hero/intro
 * de cada ruta. Hereda el lenguaje visual del Home:
 *   - Eyebrow pill (eyebrow-dark)
 *   - Tipografía h1-display con gradient brand opcional en una palabra
 *   - Decoraciones geométricas (halos cyan + mint) en las esquinas
 *   - Grid sutil + mesh gradient como textura de fondo
 *   - Fade-in stagger en la entrada
 */
export function PageHeader({ eyebrow, title, highlight, subtitle }: PageHeaderProps) {
  // Renderiza el título dividido si hay `highlight` que aparece en el título.
  const renderedTitle = (() => {
    if (!highlight || !title.includes(highlight)) {
      return <span className="text-white">{title}</span>;
    }
    const [before, ...rest] = title.split(highlight);
    const after = rest.join(highlight);
    return (
      <>
        {before && <span className="text-white">{before}</span>}
        <span className="bg-gradient-to-r from-secondary-200 via-secondary to-accent bg-clip-text text-transparent">
          {highlight}
        </span>
        {after && <span className="text-white">{after}</span>}
      </>
    );
  })();

  return (
    <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Capas de fondo */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary via-primary-700 to-primary"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Halos geométricos cyan + mint */}
      <div
        aria-hidden="true"
        className="geo-circle-cyan left-[-15%] top-[-15%] h-[420px] w-[420px]"
      />
      <div
        aria-hidden="true"
        className="geo-circle-mint right-[-15%] bottom-[-25%] h-[380px] w-[380px]"
      />

      <div className="container-x">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <span className="eyebrow-dark mb-5 inline-flex">{eyebrow}</span>
            </motion.div>
          )}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-display-1 font-display font-extrabold leading-[1.05]"
          >
            {renderedTitle}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
