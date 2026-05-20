export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  /** URL pública de imagen de referencia (placeholder Unsplash). Reemplazar antes de prod. */
  image: string;
  imageAlt: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'energia-procesos',
    client: 'Líder energético LATAM',
    industry: 'Energía & Combustibles',
    title: 'Process Intelligence sobre SAP Signavio',
    challenge:
      'Procesos críticos de O2C y P2P sin visibilidad transversal, con pérdidas operativas estimadas en millones por demoras de aprobación.',
    solution:
      'Implementación de Signavio Process Intelligence con conectores SAP S/4 y modelado BPMN del to-be priorizado por valor.',
    metrics: [
      { value: '40%', label: 'Reducción de tiempo de proceso' },
      { value: '+12pp', label: 'Aumento en cumplimiento SLA' },
      { value: '< 6m', label: 'Time-to-value' },
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Tablero de control de procesos industriales',
  },
  {
    id: 'siderurgia-btp',
    client: 'Siderúrgica global',
    industry: 'Manufactura & Metalurgia',
    title: 'Extensiones cloud sobre SAP BTP',
    challenge:
      'Necesidad de extender funcionalidades de SAP S/4HANA sin modificar el core, manteniendo trazabilidad y gobierno.',
    solution:
      'Aplicaciones side-by-side en SAP BTP (CAP + Fiori) con integración por Event Mesh y observabilidad centralizada.',
    metrics: [
      { value: '3x', label: 'Velocidad de releases' },
      { value: '100%', label: 'Core limpio para upgrades' },
      { value: '5 apps', label: 'Live en producción' },
    ],
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Planta industrial moderna',
  },
  {
    id: 'agro-leanix',
    client: 'Agroindustria líder',
    industry: 'Agroindustria',
    title: 'Arquitectura empresarial con LeanIX',
    challenge:
      'Más de 400 aplicaciones sin inventario centralizado, decisiones tecnológicas reactivas y sin alineamiento a capabilities.',
    solution:
      'Implementación de SAP LeanIX, taxonomía de capabilities, encuestas y roadmap de racionalización con prioridades de costo/valor.',
    metrics: [
      { value: '-22%', label: 'Reducción de costo TI' },
      { value: '410', label: 'Apps catalogadas' },
      { value: '1 single', label: 'Source of truth' },
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Dashboard de arquitectura empresarial',
  },
  {
    id: 'farma-ia',
    client: 'Laboratorio farmacéutico',
    industry: 'Pharma & Healthcare',
    title: 'Agentes de IA sobre datos SAP',
    challenge:
      'Equipos comerciales pasaban más de 30% del tiempo extrayendo información de SAP para reportes y consultas operativas.',
    solution:
      'Agentes GenAI conectados a CDS Views y BTP que responden en lenguaje natural, con auditoría y RBAC heredado de SAP.',
    metrics: [
      { value: '8h → 5min', label: 'Tiempo de reportes' },
      { value: '92%', label: 'Adopción interna' },
      { value: 'ROI 7m', label: 'Payback' },
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laboratorio farmacéutico con tecnología',
  },
];
