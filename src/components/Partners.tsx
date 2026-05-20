import { useState } from 'react';
import { PARTNERS } from '../data/partners';
import { SectionHeader } from './SectionHeader';

export function Partners() {
  const [paused, setPaused] = useState(false);
  // Duplicamos la lista para loop infinito sin saltos.
  const loop = [...PARTNERS, ...PARTNERS];

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
                key={`${partner.name}-${idx}`}
                className="group flex h-24 min-w-[180px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-glow-sm sm:min-w-[220px]"
              >
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 max-w-[140px] object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-14 sm:max-w-[160px]"
                  style={{ mixBlendMode: 'lighten' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
