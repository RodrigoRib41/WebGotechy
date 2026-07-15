import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TEAM, type TeamMember } from '../../data/team';

/**
 * Sección "Nuestro equipo" — página Nosotros.
 * Grid de cards glassy consistente con el resto del sitio. Cada card muestra
 * la foto del miembro; si el archivo no existe todavía, cae a un avatar con
 * iniciales sobre gradiente de marca (degrada limpio, sin imágenes rotas).
 */

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function MemberCard({ member, role }: { member: TeamMember; role: string }) {
  const [photoOk, setPhotoOk] = useState(true);
  const showPhoto = Boolean(member.photo) && photoOk;

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-sm">
      {/* Foto (aspect 4:5) o avatar de iniciales */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {showPhoto ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoOk(false)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/25 via-primary-700 to-accent/20">
            <span className="font-display text-5xl font-bold text-white/85">
              {initialsOf(member.name)}
            </span>
          </div>
        )}
        {/* Gradiente inferior para transición suave hacia el pie de card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/80 to-transparent"
        />
      </div>

      <div className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-white">
            {member.name}
          </h3>
          <p className="mt-1 text-sm text-secondary-300">{role}</p>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${member.name}`}
            className="mt-0.5 shrink-0 rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-secondary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export function TeamSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');

  if (TEAM.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden bg-surface-soft py-20 sm:py-28"
      aria-labelledby="team-title"
    >
      <div className="geo-circle-cyan right-[-10%] top-[15%] h-[380px] w-[380px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="team-title" className="text-display-2 font-display font-bold text-white">
            {t('about.team')}
          </h2>
          <p className="body-lg mt-4 text-white/70">{t('about.teamSubtitle')}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {TEAM.map((m) => (
            <motion.div
              key={`${m.name}-${m.role}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <MemberCard member={m} role={isEn ? m.role_en : m.role} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
