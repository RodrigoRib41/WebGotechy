import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary via-primary-700 to-primary" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-40" aria-hidden="true" />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <div className="font-mono text-7xl font-bold text-gradient sm:text-9xl">
            404
          </div>
          <h1 className="mt-6 text-display-2 font-display font-bold text-white">
            Página no encontrada
          </h1>
          <p className="mt-4 text-base text-white/70">
            La ruta que buscás no existe o fue movida.
          </p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            <Home className="h-4 w-4" />
            {t('header.home')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
