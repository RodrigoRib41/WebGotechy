import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { SERVICES } from '../data/services';
import { SectionHeader } from './SectionHeader';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { cn } from '../utils/cn';

const grid = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function Services() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="servicios"
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="services-title"
    >
      {/* Halos decorativos cyan/mint */}
      <div className="geo-circle-cyan left-[-12%] top-[10%] h-[420px] w-[420px]" />
      <div className="geo-circle-mint right-[-12%] bottom-[5%] h-[380px] w-[380px]" />

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Servicios"
          title={
            <>
              Una <span className="text-gradient">stack completa</span> al servicio de tu negocio
            </>
          }
          description="Desde la arquitectura empresarial hasta la operación diaria. Cubrimos cada capa del ecosistema SAP con equipos certificados y metodología propia."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const accentColor = service.accent === 'secondary' ? 'secondary' : 'accent';
            return (
              <motion.div key={service.id} variants={card}>
                <Tilt
                  tiltEnable={!reduced}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={!reduced}
                  glareMaxOpacity={0.12}
                  glareColor={service.accent === 'secondary' ? '#00E5FF' : '#1DE9B6'}
                  glarePosition="all"
                  scale={1.02}
                  transitionSpeed={1100}
                  className="h-full"
                >
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-md">
                    {/* Glow gradient en hover */}
                    <div
                      className={cn(
                        'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                        accentColor === 'secondary'
                          ? 'bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.14),transparent_60%)]'
                          : 'bg-[radial-gradient(circle_at_top_left,rgba(29,233,182,0.14),transparent_60%)]',
                      )}
                      aria-hidden="true"
                    />

                    <div
                      style={{ transform: 'translateZ(30px)' }}
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                        accentColor === 'secondary'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-accent/10 text-accent',
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3
                      style={{ transform: 'translateZ(15px)' }}
                      className="mt-5 font-display text-lg font-semibold text-white"
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-white/65">{service.short}</p>

                    {/* Descripción expandible al hover */}
                    <div className="mt-3 grid grid-rows-[0fr] transition-all duration-500 ease-smooth group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="text-sm leading-relaxed text-white/75">{service.description}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {service.detail && (
                      <Link
                        to={`/servicios/${service.slug}`}
                        className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-200"
                        aria-label={`Ver más sobre ${service.title}`}
                      >
                        Ver más
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}

                    {/* Decoración sutil esquina inferior */}
                    <span
                      className={cn(
                        'pointer-events-none absolute -bottom-1 -right-1 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100',
                        accentColor === 'secondary' ? 'bg-secondary/30' : 'bg-accent/30',
                      )}
                      aria-hidden="true"
                    />
                  </article>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
