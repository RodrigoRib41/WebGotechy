import { useState } from 'react';
import { CLIENTS } from '../data/clients';
import { SectionHeader } from './SectionHeader';

export function Clients() {
  const [paused, setPaused] = useState(false);
  // Duplicamos la lista para lograr loop infinito sin saltos.
  const loop = [...CLIENTS, ...CLIENTS];

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
                key={`${client.name}-${idx}`}
                className="group flex h-24 min-w-[180px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-glow-sm sm:min-w-[220px]"
              >
                <span
                  className="font-display text-xl font-bold tracking-tight text-white/70 transition-all duration-300 group-hover:scale-105 sm:text-2xl"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = client.brandColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                  }}
                >
                  {client.wordmark}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          Y muchas más empresas top de Argentina, Brasil, Chile y México.
        </p>
      </div>
    </section>
  );
}
