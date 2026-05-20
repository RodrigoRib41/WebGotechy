import type { LucideIcon } from 'lucide-react';
import { Award, ShieldCheck, Users, HeadphonesIcon } from 'lucide-react';

export interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PILLARS: Pillar[] = [
  {
    icon: Award,
    title: 'Experiencia comprobada',
    description:
      'Más de 15 años entregando proyectos SAP críticos en empresas líderes de Argentina y la región.',
  },
  {
    icon: ShieldCheck,
    title: 'Certificaciones SAP oficiales',
    description:
      'Consultores certificados en Signavio, BTP, LeanIX, Fiori, Basis y S/4HANA. Partner activo de SAP.',
  },
  {
    icon: Users,
    title: 'Equipo multidisciplinario',
    description:
      'Funcionales, técnicos, arquitectos cloud, científicos de datos e ingenieros de software trabajando como un solo equipo.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte continuo 24/7',
    description:
      'Operación gestionada, SLAs definidos y guardia activa para procesos de negocio críticos.',
  },
];
