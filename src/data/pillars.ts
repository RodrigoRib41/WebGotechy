import type { LucideIcon } from 'lucide-react';
import { Award, ShieldCheck, Users } from 'lucide-react';

export interface Pillar {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export const PILLARS: Pillar[] = [
  {
    icon: Award,
    title: 'Experiencia comprobada',
    titleEn: 'Proven experience',
    description:
      'Más de 20 años entregando proyectos críticos en empresas líderes de Argentina y la región.',
    descriptionEn:
      'Over 20 years delivering mission-critical projects for leading companies in Argentina and the region.',
  },
  {
    icon: ShieldCheck,
    title: 'Al día con el roadmap SAP',
    titleEn: 'Aligned with SAP roadmap',
    description:
      'Silver Partner alineado con la visión de Empresa Autónoma — Joule, Industry AI, Business AI Platform, Clean Core y Cloud ERP en producción real.',
    descriptionEn:
      'Silver Partner aligned with the Autonomous Enterprise vision — Joule, Industry AI, Business AI Platform, Clean Core and Cloud ERP in real production.',
  },
  {
    icon: Users,
    title: 'Equipo multidisciplinario',
    titleEn: 'Multidisciplinary team',
    description:
      'Funcionales, técnicos, arquitectos cloud, científicos de datos e ingenieros de software trabajando como un solo equipo.',
    descriptionEn:
      'Functional, technical, cloud architects, data scientists and software engineers working as one team.',
  },
];
