import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useLogos } from '../hooks/useCatalog';
import { cloudinaryService } from '../lib/cloudinary';

export function Partners() {
  const [paused, setPaused] = useState(false);
  const { data: partners, loading } = useLogos('partner');

  const loop = partners.length > 0 ? [...partners, ...partners] : [];

  return (
    <section
      id="partners"
      className="relative py-24 sm:py-28"
      aria-labelledby="partners-title"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow="Partners"
          title={
            <>
              Trabajamos junto a <span className="text-gradient">los mejores</span>
            </>
          }
          description="Nuestra red de partners estratégicos amplifica el valor que entregamos. Alianzas seleccionadas para cubrir cada capa del ecosistema SAP."
        />

        {loading ? (
          <div className="mt-14 flex h-24 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
          </div>
        ) : partners.length === 0 ? (
          <p className="mt-14 text-center text-sm text-ink-muted">
            Cargá partners desde el panel /admin para que aparezcan acá.
          </p>
        ) : (
          <div
            className="relative mt-14 mask-fade-r"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            aria-label="Carrusel de logos de partners"
          >
            <div
              className="flex w-max gap-6 animate-scroll-x"
              style={{ animationPlayState: paused ? 'paused' : 'running' }}
            >
              {loop.map((partner, idx) => (
                <div
                  key={`${partner.id}-${idx}`}
                  className="group flex h-24 min-w-[200px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-glow-sm sm:min-w-[240px]"
                >
                  <img
                    src={cloudinaryService.padLogoUrl(partner.logo_url, { h: 80, w: 240 })}
                    alt={partner.alt ?? `Logo de ${partner.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto max-w-[180px] object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                    style={{ mixBlendMode: 'lighten' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
