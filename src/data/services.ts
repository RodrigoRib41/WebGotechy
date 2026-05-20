import type { LucideIcon } from 'lucide-react';
import {
  Brain,
  Workflow,
  Cloud,
  LayoutGrid,
  Server,
  MonitorSmartphone,
  Code2,
  Rocket,
  Briefcase,
} from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  accent: 'secondary' | 'accent';
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    short: 'Automatización inteligente',
    description:
      'Modelos de IA aplicada y agentes que potencian la toma de decisiones y automatizan flujos críticos del negocio.',
    icon: Brain,
    accent: 'secondary',
    tags: ['GenAI', 'ML', 'Agents'],
  },
  {
    id: 'signavio',
    title: 'SAP Signavio',
    short: 'Process Intelligence',
    description:
      'Modelado, descubrimiento y mejora continua de procesos end-to-end con la suite Signavio.',
    icon: Workflow,
    accent: 'accent',
    tags: ['Process Mining', 'BPMN', 'Governance'],
  },
  {
    id: 'btp',
    title: 'SAP BTP',
    short: 'Business Technology Platform',
    description:
      'Extensiones, integración y aplicaciones cloud-native sobre la plataforma estratégica de SAP.',
    icon: Cloud,
    accent: 'secondary',
    tags: ['CAP', 'Integration Suite', 'CF/Kyma'],
  },
  {
    id: 'leanix',
    title: 'SAP LeanIX',
    short: 'Enterprise Architecture',
    description:
      'Arquitectura empresarial moderna: visibilidad de capabilities, aplicaciones y dependencias tecnológicas.',
    icon: LayoutGrid,
    accent: 'accent',
    tags: ['EA', 'Application Portfolio', 'TBM'],
  },
  {
    id: 'basis',
    title: 'SAP Basis',
    short: 'Infraestructura y administración',
    description:
      'Operación, performance y migraciones — incluyendo S/4HANA y arquitecturas híbridas.',
    icon: Server,
    accent: 'secondary',
    tags: ['S/4HANA', 'Migrations', '24/7 Ops'],
  },
  {
    id: 'fiori',
    title: 'SAP Fiori',
    short: 'UX moderna para SAP',
    description:
      'Diseñamos e implementamos apps Fiori que reducen fricción y elevan la productividad del usuario final.',
    icon: MonitorSmartphone,
    accent: 'accent',
    tags: ['Fiori Elements', 'UI5', 'UX'],
  },
  {
    id: 'abap',
    title: 'Desarrollo ABAP',
    short: 'Custom dev y RAP',
    description:
      'Desarrollo ABAP clásico y on-stack RAP para extender SAP sin comprometer la actualización del core.',
    icon: Code2,
    accent: 'secondary',
    tags: ['RAP', 'OData', 'CDS Views'],
  },
  {
    id: 'nextgen',
    title: 'Next Gen Development',
    short: 'Java, Node.js, Python',
    description:
      'Plataformas modernas full-stack: APIs, microservicios y frontends que se integran nativamente con SAP.',
    icon: Rocket,
    accent: 'accent',
    tags: ['Java', 'Node', 'Python', 'React'],
  },
  {
    id: 'pm',
    title: 'Gestión de Proyectos',
    short: 'PMO híbrida y ágil',
    description:
      'Liderazgo end-to-end de programas SAP con metodologías híbridas, gobierno claro y KPIs accionables.',
    icon: Briefcase,
    accent: 'secondary',
    tags: ['Activate', 'Agile', 'PMO'],
  },
];
