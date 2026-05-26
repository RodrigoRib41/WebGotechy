import Marquee from 'react-fast-marquee';
import { Loader2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useLogos } from '../hooks/useCatalog';
import { cloudinaryService } from '../lib/cloudinary';

export function Clients() {
  const { data: clients, loading } = useLogos('client');

  return (
    <section
      id="clientes"
      className="relative bg-surface-soft py-24 sm:py-28"
      aria-labelledby="clients-title"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow="Clientes"
          title={
            <>
              Empresas <span className="text-gradient">líderes</span> confían en nosotros
            </>
          }
          description="Operamos junto a los principales jugadores de industria en Argentina y la región. Performance probada en producción."
        />

        {loading ? (
          <div className="mt-14 flex h-24 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
          </div>
        ) : clients.length === 0 ? (
          <p className="mt-14 text-center text-sm text-ink-muted">
            Cargá clientes desde el panel /admin para que aparezcan acá.
          </p>
        ) : (
          <>
            <div
              className="relative mt-14 mask-fade-r"
              aria-label="Carrusel de logos de clientes"
            >
              <Marquee
                gradient={false}
                pauseOnHover
                speed={40}
                autoFill
              >
                {clients.map((client, idx) => (
                  <div
                    key={`${client.id}-${idx}`}
                    className="group mx-3 flex h-24 min-w-[200px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-glow-sm sm:min-w-[240px]"
                  >
                    <img
                      src={cloudinaryService.padLogoUrl(client.logo_url, { h: 80, w: 240 })}
                      alt={client.alt ?? `Logo de ${client.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-auto max-w-[180px] object-contain opacity-70 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                      style={{ mixBlendMode: 'lighten' }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>

            <p className="mt-8 text-center text-sm text-ink-muted">
              Y muchas más empresas top de Argentina, Brasil, Chile y México.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
