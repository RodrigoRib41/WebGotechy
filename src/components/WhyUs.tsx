import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { PILLARS } from '../data/pillars';
import { STATS } from '../data/site';
import { SectionHeader } from './SectionHeader';
import { AnimatedCounter } from './effects/AnimatedCounter';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function WhyUs() {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="whyus-title"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-primary" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(0,229,255,0.45), transparent 50%), radial-gradient(circle at 80% 80%, rgba(29,233,182,0.35), transparent 50%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="container-x">
        <div className="text-white">
          <SectionHeader
            eyebrow="Por qué elegirnos"
            title={
              <span className="text-white">
                Profundidad técnica, <span className="text-gradient">obsesión por resultados</span>
              </span>
            }
            description={
              <span className="text-white/80">
                No vendemos consultoría: entregamos transformación medible. Equipos
                senior, metodología validada y soporte continuo.
              </span>
            }
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Tilt
                  tiltEnable={!reduced}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable={!reduced}
                  glareMaxOpacity={0.18}
                  glareColor="#00E5FF"
                  glarePosition="all"
                  scale={1.03}
                  transitionSpeed={1100}
                  className="h-full"
                >
                  <div className="group card-glow relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-secondary/40 hover:bg-white/10">
                    <div
                      style={{ transform: 'translateZ(40px)' }}
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-white shadow-glow-md transition-transform duration-300 group-hover:scale-110"
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3
                      style={{ transform: 'translateZ(20px)' }}
                      className="mt-5 font-display text-lg font-semibold text-white"
                    >
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {pillar.description}
                    </p>
                    <div
                      className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-secondary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        {/* Stats grandes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group bg-white/[0.03] px-6 py-7 text-center transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <div className="font-mono text-3xl font-bold text-white sm:text-4xl">
                {s.count !== null ? (
                  <AnimatedCounter end={s.count} suffix={s.suffix} duration={2.4} />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-white/60 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
