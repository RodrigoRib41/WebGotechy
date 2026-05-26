import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { SectionHeader } from '../SectionHeader';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface ServiceUseCase {
  title: string;
  description: string;
  industry?: string;
  technologies?: string[];
}

interface ServiceUseCasesProps {
  useCases: ServiceUseCase[];
}

export function ServiceUseCases({ useCases }: ServiceUseCasesProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="usecases-title"
    >
      <div className="geo-circle-mint left-[-10%] top-[10%] h-[360px] w-[360px]" />
      <div className="geo-circle-cyan right-[-10%] bottom-[5%] h-[400px] w-[400px]" />

      <div className="container-x relative">
        <SectionHeader
          eyebrow="Casos de uso"
          title={
            <>
              Dónde <span className="text-gradient">aplica</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {useCases.map((uc, i) => (
            <motion.div
              key={`${uc.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Tilt
                tiltEnable={!reduced}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={!reduced}
                glareMaxOpacity={0.12}
                glareColor="#00E5FF"
                glarePosition="all"
                scale={1.02}
                transitionSpeed={1100}
                className="h-full"
              >
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-card backdrop-blur transition-all duration-300 ease-smooth hover:border-secondary/40 hover:shadow-glow-md">
                  {uc.industry && (
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary-200 ring-1 ring-secondary/30"
                    >
                      <Building2 className="h-3.5 w-3.5" />
                      {uc.industry}
                    </div>
                  )}
                  <h3
                    style={{ transform: 'translateZ(15px)' }}
                    className="font-display text-xl font-semibold text-white"
                  >
                    {uc.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{uc.description}</p>

                  {uc.technologies && uc.technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {uc.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <span
                    className="pointer-events-none absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-secondary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </article>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
