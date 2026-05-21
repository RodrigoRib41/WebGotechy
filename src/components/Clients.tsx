import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useLogos } from '../hooks/useCatalog';
import { cloudinaryService } from '../lib/cloudinary';

export function Clients() {
  const [paused, setPaused] = useState(false);
  const { data: clients, loading } = useLogos('client');

  // Duplicamos la lista para loop infinito sin saltos.
  const loop = clients.length > 0 ? [...clients, ...clients] : [];

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
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              aria-label="Carrusel de logos de clientes"
            >
              <div
                className="flex w-max gap-6 animate-scroll-x"
                style={{ animationPlayState: paused ? 'paused' : 'running' }}
              >
                {loop.map((client, idx) => (
                  <div
                    key={`${client.id}-${idx}`}
                    className="group flex h-24 min-w-[200px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-glow-sm sm:min-w-[240px]"
                  >
                    <img
                      src={cloudinaryService.padLogoUrl(client.logo_url, { h: 80, w: 240 })}
                      alt={client.alt ?? `Logo de ${client.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-auto max-w-[180px] object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                      style={{ mixBlendMode: 'lighten' }}
                    />
                  </div>
                ))}
              </div>
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
