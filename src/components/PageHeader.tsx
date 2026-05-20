import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/**
 * Header reutilizable para todas las páginas internas.
 * Provee el hero/intro de cada ruta (/servicios, /clientes, etc).
 */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary via-primary-700 to-primary"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <span className="eyebrow mb-5 inline-flex">{eyebrow}</span>
          )}
          <h1 className="text-display-1 font-display font-extrabold leading-[1.05] text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
