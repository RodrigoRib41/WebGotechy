import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';

interface ServiceCTAProps {
  serviceName: string;
}

/**
 * Selección curada de logos reales que viven en /public/images/.
 * 5 marcas reconocibles del portfolio de clientes.
 */
const TRUST_LOGOS = [
  { src: '/images/Tenaris.png', alt: 'Tenaris' },
  { src: '/images/gerdau.png', alt: 'Gerdau' },
  { src: '/images/ledesma.png', alt: 'Ledesma' },
  { src: '/images/roemmers.jpg', alt: 'Roemmers' },
  { src: '/images/molinos.webp', alt: 'Molinos' },
];

export function ServiceCTA({ serviceName }: ServiceCTAProps) {
  return (
    <section className="pb-24 sm:pb-32" aria-labelledby="service-cta">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-3xl border border-secondary/30 bg-gradient-to-br from-secondary/15 via-primary to-accent/10 p-10 shadow-glow-lg sm:p-14">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(0,229,255,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(29,233,182,0.25), transparent 50%)',
            }}
            aria-hidden="true"
          />

          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="service-cta" className="text-display-3 font-display font-bold text-white">
                ¿Listo para transformar tu negocio con{' '}
                <span className="text-gradient">{serviceName}</span>?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/80">
                Agendá una sesión con nuestro equipo. Te mostramos en vivo qué podemos hacer
                con tu caso puntual.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/contacto" className="btn-primary">
                  Agendar reunión
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/proyectos" className="btn-secondary">
                  Ver casos de éxito
                </Link>
              </div>
            </div>

            <div className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-secondary/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-white/55">Email</div>
                  <div className="truncate text-sm font-semibold text-white group-hover:text-secondary-200">
                    {SITE.email}
                  </div>
                </div>
              </a>
              <a
                href={`tel:+${SITE.phoneRaw}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-secondary/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-white/55">Teléfono</div>
                  <div className="truncate text-sm font-semibold text-white group-hover:text-secondary-200">
                    {SITE.phone}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Trust strip: logos reales de clientes en grayscale */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Empresas que confían en GoTechy
            </div>
            <div className="grid grid-cols-3 items-center gap-6 sm:grid-cols-5">
              {TRUST_LOGOS.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-7 max-w-[110px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
