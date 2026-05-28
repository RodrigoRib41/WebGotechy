import { motion } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  Headphones,
  Rocket,
  ShieldCheck,
  GraduationCap,
  Handshake,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Sección "SAP Silver Partner" para la página Nosotros.
 *
 * Layout 2 columnas en desktop: badge oficial a la izquierda, contenido y
 * pilares a la derecha. En mobile stack.
 *
 * Imagen esperada en `/public/images/sap-silver-partner.png` (el badge
 * oficial de SAP). Si no existe el archivo, la columna izquierda muestra un
 * fallback con el ícono Award + texto. Conviene guardar el badge en esa
 * ruta para que se vea bien.
 */

type Pillar = {
  icon: typeof Award;
  title: string;
  description: string;
  /** Color accent del ícono. */
  accent?: 'secondary' | 'accent';
};

const PILLARS_ES: Pillar[] = [
  {
    icon: BadgeCheck,
    title: 'Consultores certificados',
    description:
      'Equipo formado oficialmente por SAP en S/4HANA, BTP, Signavio, Fiori, ABAP y módulos funcionales.',
    accent: 'secondary',
  },
  {
    icon: Rocket,
    title: 'Acceso temprano al roadmap',
    description:
      'Llegamos primero a las nuevas releases de SAP. Te asesoramos con la hoja de ruta antes que el mercado.',
    accent: 'accent',
  },
  {
    icon: Headphones,
    title: 'Soporte directo de SAP',
    description:
      'Canal de escalamiento Partner Edge para resolver incidentes críticos con prioridad ante SAP global.',
    accent: 'secondary',
  },
  {
    icon: Handshake,
    title: 'Go-to-market conjunto',
    description:
      'Trabajamos co-mano-a-mano con los equipos de SAP en pre-ventas, demos y arquitecturas de referencia.',
    accent: 'accent',
  },
  {
    icon: GraduationCap,
    title: 'SAP Learning Hub',
    description:
      'Acceso permanente al catálogo de capacitaciones y certificaciones oficiales para mantener al equipo al día.',
    accent: 'secondary',
  },
  {
    icon: ShieldCheck,
    title: 'Calidad validada',
    description:
      'El status Silver lo otorga SAP tras evaluar resultados, certificaciones del equipo y satisfacción de clientes.',
    accent: 'accent',
  },
];

const PILLARS_EN: Pillar[] = [
  {
    icon: BadgeCheck,
    title: 'Certified consultants',
    description:
      'Team officially trained by SAP in S/4HANA, BTP, Signavio, Fiori, ABAP and functional modules.',
    accent: 'secondary',
  },
  {
    icon: Rocket,
    title: 'Early access to roadmap',
    description:
      'We reach SAP releases first. We advise on your roadmap before the market catches up.',
    accent: 'accent',
  },
  {
    icon: Headphones,
    title: 'Direct SAP support',
    description:
      'Partner Edge escalation channel to resolve critical incidents with priority from SAP global.',
    accent: 'secondary',
  },
  {
    icon: Handshake,
    title: 'Joint go-to-market',
    description:
      'We work hand-in-hand with SAP teams on pre-sales, demos and reference architectures.',
    accent: 'accent',
  },
  {
    icon: GraduationCap,
    title: 'SAP Learning Hub',
    description:
      'Permanent access to the official training catalog and certifications to keep our team current.',
    accent: 'secondary',
  },
  {
    icon: ShieldCheck,
    title: 'Validated quality',
    description:
      'Silver status is awarded by SAP after evaluating outcomes, team certifications and client satisfaction.',
    accent: 'accent',
  },
];

export function SapPartnerBadge() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');
  const pillars = isEn ? PILLARS_EN : PILLARS_ES;

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="sap-partner-title"
    >
      {/* Halos decorativos cyan + mint */}
      <div className="geo-circle-cyan left-[-12%] top-[10%] h-[420px] w-[420px]" />
      <div className="geo-circle-mint right-[-12%] bottom-[5%] h-[380px] w-[380px]" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Columna izquierda — Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Glow detrás del badge */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-full bg-gradient-to-br from-secondary/30 via-accent/20 to-secondary/30 blur-3xl"
              />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-glow-md backdrop-blur sm:p-10">
                <img
                  src="/images/sap-silver-partner.png"
                  alt={
                    isEn
                      ? 'SAP Silver Partner — official badge'
                      : 'SAP Silver Partner — insignia oficial'
                  }
                  className="h-40 w-auto sm:h-48"
                  onError={(e) => {
                    // Fallback si la imagen no está cargada todavía: ocultar y mostrar el ícono inline
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const fallback = (e.currentTarget as HTMLImageElement)
                      .nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback (oculto por default) */}
                <div
                  style={{ display: 'none' }}
                  className="h-40 w-40 flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#2680C7] to-[#0F4C75] text-white sm:h-48 sm:w-48"
                >
                  <Award className="h-12 w-12" />
                  <div className="text-center">
                    <div className="font-display text-xl font-bold">SAP</div>
                    <div className="text-xs uppercase tracking-widest opacity-90">
                      Silver Partner
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha — Contenido */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow-dark">{t('about.sapPartner.officialRecognition')}</span>
              <h2
                id="sap-partner-title"
                className="mt-5 text-display-2 font-display font-bold text-white"
              >
                {t('about.sapPartner.weAre')}{' '}
                <span className="text-secondary">{t('about.sapPartner.partnerLevel')}</span>
              </h2>
            </motion.div>

            {/* Grid de pilares (lo que conlleva) */}
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {pillars.map((p) => {
                const Icon = p.icon;
                const isAccent = p.accent === 'accent';
                return (
                  <motion.li
                    key={p.title}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                    }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-glow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={
                          isAccent
                            ? 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30 transition-transform duration-300 group-hover:scale-110'
                            : 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30 transition-transform duration-300 group-hover:scale-110'
                        }
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
