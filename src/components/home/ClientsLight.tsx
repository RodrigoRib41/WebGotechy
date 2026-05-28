import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLogos } from '../../hooks/useCatalog';
import { cloudinaryService } from '../../lib/cloudinary';

/**
 * Sección "Clientes" — fondo BLANCO, sin bordes, logos grayscale que se
 * colorean al hover. Clean look estilo Stripe.
 */
export function ClientsLight() {
  const { t } = useTranslation();
  const { data: clients, loading } = useLogos('client');

  return (
    <section className="section-light" aria-labelledby="clients-light-title">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow-light">{t('home.clients.eyebrow')}</span>
          <h2 id="clients-light-title" className="h2-display mt-5 text-[#0F1419]">
            {t('home.clients.titleStart')}{' '}
            <span className="text-brand-600">{t('home.clients.titleHighlight')}</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-14 flex h-20 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        ) : clients.length === 0 ? null : (
          <div className="relative mt-14 mask-fade-r" aria-label="Carrusel de logos de clientes">
            <Marquee gradient={false} pauseOnHover speed={40} autoFill>
              {clients.map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="mx-6 flex h-20 min-w-[160px] items-center justify-center sm:min-w-[200px]"
                >
                  <img
                    src={cloudinaryService.padLogoUrl(client.logo_url, { h: 64, w: 200 })}
                    alt={client.alt ?? `Logo de ${client.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-auto max-w-[160px] object-contain opacity-60 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
}
