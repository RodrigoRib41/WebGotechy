import { useTranslation } from 'react-i18next';
import { useLogos } from '../../hooks/useCatalog';
import { cloudinaryService } from '../../lib/cloudinary';

/**
 * Franja fina de prueba social inmediatamente debajo del hero: hasta 6 logos
 * de clientes en escala de grises (color al hover). Refuerza confianza en los
 * primeros segundos sin competir con el carrusel — patrón clásico B2B.
 * La sección ClientsLight (más abajo) mantiene el marquee completo.
 * Si no hay logos cargados, no se renderiza.
 */
export function ClientsStrip() {
  const { t } = useTranslation();
  const { data: clients, loading } = useLogos('client');
  const items = clients.slice(0, 6);

  if (loading || items.length === 0) return null;

  return (
    <section aria-label={t('home.clients.title')} className="border-b border-[#0F1419]/10 bg-white">
      <div className="container-x flex flex-col items-center gap-5 py-7 sm:flex-row sm:justify-between sm:gap-10 sm:py-8">
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F1419]/45">
          {t('home.clients.title')}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 sm:justify-end">
          {items.map((c) => (
            <img
              key={c.id}
              src={cloudinaryService.padLogoUrl(c.logo_url, { h: 48, w: 140 })}
              alt={c.alt ?? `Logo de ${c.name}`}
              loading="lazy"
              decoding="async"
              className="h-8 w-auto max-w-[120px] object-contain opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-9"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
