import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowUpCircle,
  BarChart3,
  Bot,
  Boxes,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Database,
  FileText,
  GitBranch,
  GitMerge,
  LayoutGrid,
  Lock,
  MonitorSmartphone,
  Network,
  Plug,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  Workflow,
  Zap,
} from 'lucide-react';

// ===== Types ====================================================

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Sub-bullets opcionales para detallar el alcance de la feature. */
  bullets?: string[];
}

/** Item del stack tecnológico. icon (lucide) o imageUrl (logo subido). */
export interface ServiceTechItem {
  label: string;
  icon?: LucideIcon;
  imageUrl?: string;
}

/** Bloque "Cómo trabajamos" — metodología o approach del servicio. */
export interface ServiceApproachBlock {
  /** Etiqueta sobre el título. Default: "Metodología". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: string[];
  image?: string;
}

/** Item del banner de stats (un número grande + label). */
export interface ServiceStatItem {
  value: string;
  label: string;
}

/** Banner de stats/métricas destacadas del producto. */
export interface ServiceStatsBlock {
  eyebrow?: string;
  title?: string;
  items: ServiceStatItem[];
}

export interface ServiceBenefit {
  title: string;
  description?: string;
  /** Métrica destacada, ej: "40% reducción". Opcional. */
  metric?: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  industry?: string;
  technologies?: string[];
}

export interface ServiceFAQItem {
  q: string;
  a: string;
}

/**
 * Contenido detallado para la página individual del servicio.
 * Opcional: si no está presente, el servicio sólo aparece en el overview
 * pero no tiene página propia accesible.
 */
export interface ServiceDetail {
  tagline: string;
  heroImage?: string;
  overviewImage?: string;
  overviewParagraphs: string[];
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  /** Opcional: banner de stats/métricas del producto (renderizado entre overview y features). */
  stats?: ServiceStatsBlock;
  /** Opcional: bloque de metodología / "Cómo trabajamos". */
  approach?: ServiceApproachBlock;
  /** Opcional: stack tecnológico mostrado como grid de badges. */
  techStack?: ServiceTechItem[];
  /** IDs de otros services en este mismo array — se renderizan como cards linkeables. */
  relatedTechIds: string[];
  faq: ServiceFAQItem[];
  metaTitle: string;
  metaDescription: string;
}

export interface Service {
  id: string;
  /** URL slug usado por la ruta /servicios/:slug. Kebab-case. */
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  accent: 'secondary' | 'accent';
  tags: string[];
  detail?: ServiceDetail;
}

// ===== Data =====================================================

export const SERVICES: Service[] = [
  {
    id: 'ia',
    slug: 'inteligencia-artificial',
    title: 'Inteligencia Artificial',
    short: 'Empresa Autónoma · Joule · Agentes',
    description:
      'Implementamos la visión de Empresa Autónoma de SAP: Joule Assistants y Agentes que coordinan procesos end-to-end sobre tus sistemas SAP y no SAP.',
    icon: Brain,
    accent: 'secondary',
    tags: ['Joule', 'Agents', 'Industry AI', 'GenAI'],
    detail: {
      tagline:
        'Llevamos la Empresa Autónoma de SAP a producción — Joule Assistants, Agentes y escenarios de Industry AI integrados con tus procesos reales.',
      heroImage:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP definió la Empresa Autónoma como la próxima generación del software empresarial: Joule Assistants y Agentes que colaboran con las personas para ejecutar procesos críticos en finanzas, compras, HCM, CX, cadena de suministro e industria. En GoTechy diseñamos, implementamos y operamos esa arquitectura en clientes reales.',
        'Construimos sobre SAP Business AI Platform: integramos asistentes especializados por dominio (Cierre Financiero, Planificación, Compras, Nómina, Servicio al Cliente, Activos, Logística, Fabricación), conectados a Joule Work como capa de interacción unificada y a Joule Studio para extensiones a medida.',
        'Cuando el caso lo requiere, desarrollamos agentes personalizados con SAP Domain Models, Cloud SDK para Python y los protocolos MCP y A2A — interoperando de forma segura con herramientas y agentes de terceros (Claude de Anthropic, modelos abiertos en EU AI Cloud, NVIDIA OpenShell para ejecución segura).',
        'Cubrimos el ciclo completo: descubrimiento de escenarios de mayor ROI, arquitectura, gobernanza con SAP AI Agent Hub, integración con SAP Business Data Cloud, fundamentación en SAP Knowledge Graph, observabilidad y control de costos. Cada agente que entregamos opera con datos confiables, gobernanza explícita y métricas accionables.',
      ],
      features: [
        {
          icon: Bot,
          title: 'Chatbots y Asistentes Inteligentes',
          description:
            'Asistentes conversacionales empresariales que no solo responden — ejecutan acciones reales sobre tus sistemas, con escalamiento inteligente cuando hace falta.',
          bullets: [
            'Integración con sistemas internos (ERP, CRM, bases de datos)',
            'Automatización de tareas operativas',
            'Flujos conversacionales con validaciones y lógica de negocio',
            'Atención al cliente con escalamiento a humanos',
            'Soporte interno para IT, RRHH y operaciones',
          ],
        },
        {
          icon: Network,
          title: 'Agentes Inteligentes y Multi-Agentes',
          description:
            'Agentes capaces de razonar, planificar y ejecutar acciones en múltiples sistemas, con patrones modernos de orquestación y control de contexto.',
          bullets: [
            'Arquitecturas de agentes autónomos',
            'Orquestación de tareas complejas',
            'Agentes especializados por dominio',
            'Integración con herramientas externas y APIs',
            'Flujos multi-agente coordinados',
          ],
        },
        {
          icon: FileText,
          title: 'Lectura Inteligente de Documentos (IDP)',
          description:
            'Automatización del procesamiento documental que reduce tiempos manuales, errores humanos y costos operativos.',
          bullets: [
            'Lectura y análisis de PDFs, contratos, facturas y formularios',
            'Extracción estructurada de datos',
            'Clasificación automática de documentos',
            'Validación contra reglas de negocio',
            'Integración con sistemas administrativos o financieros',
          ],
        },
        {
          icon: Sparkles,
          title: 'Integración de LLM y Arquitecturas RAG',
          description:
            'Modelos de lenguaje de última generación implementados de forma segura y controlada, balanceando precisión, rendimiento y costo.',
          bullets: [
            'Integración de LLM en aplicaciones existentes',
            'Arquitecturas RAG (Retrieval-Augmented Generation)',
            'Control de contexto y memoria conversacional',
            'Optimización de prompts y evaluación de respuestas',
            'Gobernanza y protección de datos sensibles',
          ],
        },
        {
          icon: Server,
          title: 'Servidores MCP y Conectividad Avanzada',
          description:
            'Servidores MCP (Model Context Protocol) para que agentes y asistentes operen activamente — no solo conversen — dentro de tu infraestructura.',
          bullets: [
            'Diseño de herramientas personalizadas para agentes',
            'Exposición controlada de funciones empresariales',
            'Seguridad y control de acceso granular',
            'Arquitecturas extensibles para ecosistemas de IA',
          ],
        },
      ],
      approach: {
        title: 'Cómo trabajamos la IA',
        subtitle:
          'Un enfoque integral que asegura que la IA en producción funcione, sea segura y sea rentable. No alcanzamos una demo: alcanzamos el ROI.',
        image:
          'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1200&q=80',
        items: [
          'Diseño de arquitectura escalable',
          'Evaluación y selección de modelos',
          'Seguridad y gobernanza de datos',
          'Observabilidad y monitoreo de desempeño',
          'Control de costos y optimización continua',
          'Testing y validación de calidad de respuestas',
        ],
      },
      benefits: [
        {
          metric: '100% productivo',
          title: 'Experiencia técnica especializada',
          description:
            'Equipo con experiencia real implementando IA en entornos productivos — agentes, automatización y sistemas empresariales corriendo en producción, no en slides.',
        },
        {
          metric: 'ROI medible',
          title: 'Enfoque estratégico, no experimental',
          description:
            'Diseñamos soluciones aplicables al negocio. Evitamos implementaciones superficiales sin impacto real — cada caso de uso se mide en horas ahorradas o costos evitados.',
        },
        {
          metric: 'Seguridad enterprise',
          title: 'Arquitecturas escalables y seguras',
          description:
            'Construimos soluciones preparadas para crecimiento, con control de acceso, trazabilidad, observabilidad y mantenimiento a largo plazo.',
        },
        {
          metric: 'Evolución continua',
          title: 'Mejora iterativa de modelos y agentes',
          description:
            'La IA requiere optimización constante. Acompañamos ajustando prompts, recalibrando modelos y refinando agentes a medida que crece el caso de uso.',
        },
      ],
      useCases: [
        {
          title: 'Automatización de back office',
          description:
            'Procesamiento automático de facturas, contratos y documentos administrativos. Extracción, validación y entrada a SAP/ERP sin intervención manual.',
          industry: 'Cross-industry',
          technologies: ['IDP', 'RAG', 'LLM'],
        },
        {
          title: 'Asistente conversacional empresarial',
          description:
            'Bots que responden consultas de empleados o clientes sobre políticas internas, productos o procesos — conectados a la base de conocimiento real.',
          industry: 'Servicios',
          technologies: ['Chatbot', 'RAG', 'LLM'],
        },
        {
          title: 'Agente para soporte técnico',
          description:
            'Triage automático de tickets, ejecución de acciones (reset, lookup, escalado) y resolución de incidentes de baja complejidad sin intervención humana.',
          industry: 'IT & Operaciones',
          technologies: ['Agents', 'MCP', 'LLM'],
        },
        {
          title: 'Análisis predictivo y detección de anomalías',
          description:
            'Detección temprana de fraudes, fallas de equipos o caídas de demanda combinando datos históricos y señales en tiempo real.',
          industry: 'Industria & Finanzas',
          technologies: ['ML', 'Embeddings', 'Analytics'],
        },
      ],
      techStack: [
        { label: 'LLMs', icon: Brain },
        { label: 'Frameworks', icon: Boxes },
        { label: 'Vector Databases', icon: Database },
        { label: 'Data Extraction', icon: FileText },
        { label: 'Open LLMs Access', icon: Plug },
        { label: 'Text Embeddings', icon: Sparkles },
        { label: 'Evaluation', icon: Target },
      ],
      relatedTechIds: ['signavio', 'btp', 'nextgen', 'abap'],
      faq: [
        {
          q: '¿Cómo arranca un proyecto de IA en mi empresa?',
          a: 'Con un PoC acotado de 4-6 semanas sobre el caso de mayor valor. Si los resultados validan la hipótesis, escalamos a piloto y luego a producción. Nada se construye sin métricas de éxito definidas desde el día 1.',
        },
        {
          q: '¿Mis datos quedan expuestos al usar LLMs?',
          a: 'No. Trabajamos con esquemas que respetan la privacidad: modelos privados en la nube de tu proveedor, on-premise cuando aplica, y arquitecturas RAG donde el modelo nunca ve el dato sensible directamente.',
        },
        {
          q: '¿Qué pasa si los modelos cambian o aparecen mejores?',
          a: 'La arquitectura está desacoplada del proveedor de LLM. Cambiar de OpenAI a Anthropic, Google o un modelo open-source es transparente para el resto del sistema.',
        },
        {
          q: '¿Necesito un equipo de data science interno?',
          a: 'No es obligatorio. Operamos con tu equipo si existe, o entregamos llave en mano con transferencia de conocimiento y documentación. Lo que sí necesitás es un sponsor del negocio claro.',
        },
        {
          q: '¿Se integra con SAP?',
          a: 'Sí, y es uno de nuestros diferenciales. Conectamos IA con S/4HANA, SAP BTP, Signavio y sistemas custom vía OData, APIs REST y los conectores nativos del ecosistema SAP.',
        },
        {
          q: '¿Cuánto cuesta un proyecto de IA típico?',
          a: 'Depende del alcance, pero un PoC sólido suele estar entre 4-8 semanas de equipo dedicado. La inversión recurrente posterior se justifica con el ROI del caso de uso elegido.',
        },
      ],
      metaTitle: 'IA Empresarial: Chatbots, Agentes e IDP',
      metaDescription:
        'Soluciones de IA aplicada al negocio. Chatbots, agentes autónomos, lectura inteligente de documentos y RAG integrados con SAP por GoTechy.',
    },
  },
  {
    id: 'signavio',
    slug: 'sap-signavio',
    title: 'SAP Signavio',
    short: 'Process Intelligence con IA',
    description:
      'Descubrimiento, gobernanza y transformación de procesos end-to-end — ahora potenciada con Joule, agentes de mejora continua y atomización de reglas de negocio.',
    icon: Workflow,
    accent: 'accent',
    tags: ['Process Mining', 'Joule', 'Governance', 'Atoms'],
    detail: {
      tagline:
        'La columna vertebral de la transformación: Process Intelligence + IA con agentes, atomización de reglas y memoria corporativa para escalar la Empresa Autónoma con gobernanza.',
      heroImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP Signavio es la suite que SAP eligió como base de la Empresa Autónoma: cada Joule Agent que entra en producción necesita procesos modelados, reglas explícitas y trazabilidad. Sin esto, la IA escala sin control. En GoTechy implementamos Signavio como punto de partida real para la transformación con IA.',
        'Cubrimos las siete herramientas de la suite — Process Insights, Process Intelligence, Process Manager, Process Transformation Manager, Process Collaboration Hub, Process Governance y Journey Modeler — combinadas con las nuevas capacidades: Asistente de Transformación de Procesos, Análisis de Causa Raíz asistido por IA, Inteligencia de Red de Procesos y los Value Accelerators por industria.',
        'Trabajamos los Process Atoms — fragmentos reutilizables de reglas, restricciones y objetivos — para que tus agentes de IA operen dentro de los límites del negocio y de la regulación. Sumamos la Memoria Corporativa para centralizar el conocimiento que comparten todos los agentes desplegados en la organización.',
        'Conectamos Signavio con SAP LeanIX (Process Transformation Manager + Fact Sheets), SAP Cloud ALM y los Joule Assistants de cada línea de negocio. Esto convierte el modelado de procesos en una palanca operativa: lo que se diseña se ejecuta, se monitorea y se mejora — con métricas auditables y gobernanza nativa.',
      ],
      stats: {
        eyebrow: 'La suite en números',
        title: 'Lo que cubre SAP Signavio',
        items: [
          { value: '+90', label: 'Flujos de procesos' },
          { value: '+900', label: 'Recomendaciones' },
          { value: '9', label: 'Líneas de negocio' },
          { value: '7', label: 'Procesos End-to-End' },
        ],
      },
      features: [
        {
          icon: Search,
          title: 'Optimizar procesos',
          description:
            'Mediante la minería de procesos permite visualizar los procesos empresariales de forma clara y comprensible mediante diagramas intuitivos que facilitan la identificación de áreas de mejora.',
          bullets: [
            'Discovery automático desde los logs de tus sistemas',
            'Diagramas BPMN 2.0 intuitivos',
            'Visualización de variantes y desviaciones',
            'Identificación inmediata de áreas de mejora',
            'Métricas y KPIs sobre el proceso real',
          ],
        },
        {
          icon: BarChart3,
          title: 'Analizar y optimizar',
          description:
            'Permite analizar el rendimiento de tus procesos actuales, identifica cuellos de botella y puntos de mejora, y simula cambios para optimizar la eficiencia operativa.',
          bullets: [
            'Análisis de performance del proceso actual',
            'Identificación de cuellos de botella y reprocesos',
            'Simulación de cambios "what-if" antes de implementarlos',
            'Recomendaciones accionables de mejora',
            'Benchmarks de industria con SAP Insights',
          ],
        },
        {
          icon: Users,
          title: 'Colaborar',
          description:
            'Fomenta la colaboración entre equipos y partes interesadas al permitirles trabajar juntos en la documentación, análisis y mejora de los procesos empresariales.',
          bullets: [
            'Repositorio central de procesos para toda la organización',
            'Modelado colaborativo en BPMN',
            'Workflows de aprobación y publicación con governance',
            'Comentarios, versionado y trazabilidad',
            'Journey Modeler para alinear CX y operaciones',
          ],
        },
      ],
      benefits: [
        {
          metric: '360° end-to-end',
          title: 'Visibilidad y transparencia',
          description:
            'Facilita la toma de decisiones informadas con datos reales y la alineación estratégica de los procesos con los objetivos del negocio.',
        },
        {
          metric: 'Hasta -40% costos',
          title: 'Optimización de procesos empresariales',
          description:
            'El descubrimiento automático y la simulación what-if permiten eliminar reprocesos, cuellos de botella y maverick buying — con impacto directo en margen.',
        },
        {
          metric: '3x más rápido',
          title: 'Adaptación a cambios dinámicos',
          description:
            'Capacidad para gestionar transformaciones organizacionales y responder con agilidad a nuevos escenarios de mercado, regulación o expansión.',
        },
        {
          metric: 'Gobernanza nativa',
          title: 'Procesos auditables y conformes',
          description:
            'Cada cambio de proceso queda versionado, aprobado y trazable. Listo para auditorías SOX, SOC y normativas sectoriales sin esfuerzo extra.',
        },
      ],
      useCases: [
        {
          title: 'Optimización Order-to-Cash',
          description:
            'Detectamos reprocesos, holds y desviaciones del estándar en el ciclo de venta. Resultados: menos DSO, menos cancelaciones, más cash flow.',
          industry: 'Retail & Manufactura',
          technologies: ['Process Mining', 'SAP S/4HANA', 'Salesforce'],
        },
        {
          title: 'Eficiencia Procure-to-Pay',
          description:
            'Visibilidad sobre tiempos de aprobación, maverick buying y pagos fuera de término. Ahorros directos en working capital.',
          industry: 'Industria & Servicios',
          technologies: ['SAP MM', 'Ariba', 'Process Insights'],
        },
        {
          title: 'Compliance y auditoría',
          description:
            'Demostrar el control interno de procesos críticos con evidencia de minería, no con muestras. Auditorías más rápidas y baratas.',
          industry: 'Banca & Seguros',
          technologies: ['Process Governance', 'SOX', 'GRC'],
        },
        {
          title: 'Preparación para S/4HANA',
          description:
            'Antes del greenfield/brownfield: entender el proceso actual y diseñar el target con datos. Cero sorpresas en go-live.',
          industry: 'Cross-industry',
          technologies: ['SAP Signavio', 'S/4HANA', 'Activate'],
        },
      ],
      relatedTechIds: ['btp', 'leanix', 'pm', 'ia'],
      faq: [
        {
          q: '¿Necesito tener SAP para usar Signavio?',
          a: 'No. Signavio puede conectarse a cualquier sistema que genere logs de eventos: SAP ECC, S/4HANA, Salesforce, Oracle, ServiceNow, sistemas custom, etc. Donde mejor explota es cuando se combinan varias fuentes en un mismo proceso end-to-end.',
        },
        {
          q: '¿En cuánto tiempo veo el primer resultado?',
          a: 'En un Process Mining piloto típico tenés el descubrimiento del proceso actual y los primeros insights accionables en 4 a 6 semanas. El despliegue completo de la suite depende del alcance pero los primeros quick wins son rápidos.',
        },
        {
          q: '¿Qué diferencia hay entre Signavio y otras herramientas de BPM?',
          a: 'Signavio combina modelado, gobierno, descubrimiento automático (Process Mining) y journeys de cliente en una sola plataforma — algo que en el mercado generalmente requiere herramientas separadas. Además es la apuesta estratégica de SAP, lo que asegura integración nativa con S/4HANA.',
        },
        {
          q: '¿Cómo arranca un proyecto con GoTechy?',
          a: 'Empezamos con un workshop de assessment (1-2 semanas) donde identificamos el proceso de mayor impacto y definimos el caso de uso piloto. A partir de ahí proponemos un roadmap con quick wins y objetivos medibles a 90, 180 y 365 días.',
        },
        {
          q: '¿Quién opera la herramienta después de la implementación?',
          a: 'Lo definimos según tu modelo operativo: podemos hacer transferencia full a tu equipo, operar nosotros bajo un esquema gestionado, o un híbrido. La adopción es parte del proyecto, no un anexo.',
        },
        {
          q: '¿Signavio reemplaza a SAP LeanIX?',
          a: 'Son complementarios. LeanIX mira la arquitectura empresarial (qué aplicaciones tengo y cómo se relacionan); Signavio mira los procesos que corren sobre esas aplicaciones. Juntos te dan la foto completa del “qué” y el “cómo”.',
        },
      ],
      metaTitle: 'SAP Signavio: Process Intelligence y Process Mining',
      metaDescription:
        'Descubrí, modelá y optimizá tus procesos end-to-end con SAP Signavio. Implementación, Process Mining y mejora continua por GoTechy.',
    },
  },
  {
    id: 'btp',
    slug: 'sap-btp',
    title: 'SAP BTP',
    short: 'Plataforma de IA, datos e integración',
    description:
      'La base sobre la que vive SAP Business AI Platform, Joule Studio, Integration Suite y Business Data Cloud. Donde se construye el futuro de SAP.',
    icon: Cloud,
    accent: 'secondary',
    tags: ['Business AI Platform', 'Joule Studio', 'BDC', 'Integration Suite'],
    detail: {
      tagline:
        'BTP es el cimiento de la Empresa Autónoma — Business AI Platform, Joule Studio, AI Agent Hub, Business Data Cloud e Integration Suite trabajando como un solo tejido.',
      heroImage:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'BTP se consolidó como la plataforma donde vive todo lo nuevo del ecosistema SAP: SAP Business AI Platform (la base de Joule), Joule Studio (creación de agentes y aplicaciones), SAP Business Data Cloud, SAP Integration Suite con orquestación de agentes, y SAP AI Agent Hub para gobernanza centralizada. En GoTechy diseñamos arquitecturas BTP listas para escalar la Empresa Autónoma.',
        'Implementamos extensiones limpias siguiendo los principios de Clean Core: nada se toca en el ERP; todo lo custom vive en BTP. Esto te permite adoptar las nuevas releases de SAP sin romper desarrollos propios y aprovechar las innovaciones de IA a medida que llegan.',
        'Cubrimos Integration Suite (con las nuevas capacidades de orquestación de agentes, ingestión de datos en tiempo real, gateway de IA y exposición selectiva de APIs para servidores MCP), CAP, Cloud Foundry y Kyma, junto con SAP HANA Cloud como base de datos de IA nativa de BDC.',
        'Para clientes con requisitos de soberanía, implementamos sobre SAP Sovereign Cloud y EU AI Cloud con modelos como Mistral y Cohere, manteniendo control total de infraestructura, datos y gobernanza local.',
      ],
      features: [
        {
          icon: Plug,
          title: 'Integración',
          description:
            'Conectamos tus sistemas y aplicaciones para asegurar un flujo de información sin interrupciones, mejorando la eficiencia operativa y facilitando la toma de decisiones informadas.',
        },
        {
          icon: ArrowUpCircle,
          title: 'Despliegue de aplicaciones SAP',
          description:
            'Disponibilizamos los productos de SAP BTP que ya contrataste, en conformidad con las mejores prácticas de SAP, para que tu empresa pueda comenzar a aprovecharlos de inmediato.',
        },
        {
          icon: Code2,
          title: 'Desarrollo de aplicaciones',
          description:
            'Creamos soluciones a medida que se alinean perfectamente con los objetivos y procesos de tu empresa, utilizando las herramientas avanzadas de SAP BTP para garantizar aplicaciones robustas y escalables.',
        },
        {
          icon: Workflow,
          title: 'Flujo de trabajo',
          description:
            'Optimizamos y automatizamos tus procesos de negocio para mejorar la productividad y reducir los tiempos de ciclo, asegurando que tus operaciones sean más ágiles y efectivas.',
        },
        {
          icon: BarChart3,
          title: 'Gestión y análisis de datos',
          description:
            'Implementamos estrategias de gestión de datos que te permiten obtener insights valiosos y en tiempo real, apoyando decisiones estratégicas y operativas basadas en datos precisos.',
        },
        {
          icon: Bot,
          title: 'Automatización',
          description:
            'Utilizamos las capacidades de automatización de SAP BTP para reducir la carga de trabajo manual, minimizar errores y liberar recursos para tareas de mayor valor añadido.',
        },
        {
          icon: Users,
          title: 'Soporte y consultoría',
          description:
            'Ofrecemos soporte continuo y servicios de consultoría para asegurar que tu empresa maximice el valor de SAP BTP, adaptándose a las tendencias del mercado y manteniendo una ventaja competitiva.',
        },
      ],
      benefits: [
        {
          metric: 'API-first',
          title: 'Integración perfecta',
          description:
            'Integration Suite con orquestación de agentes, eventos en tiempo real y exposición selectiva de APIs vía MCP — conexión nativa entre sistemas SAP y no SAP.',
        },
        {
          metric: '10x más rápido',
          title: 'Desarrollo ágil de aplicaciones',
          description:
            'Joule Studio combina low-code y pro-code con SAP Domain Models. Desarrolladores describen la intención en lenguaje natural y obtienen aplicaciones, agentes y extensiones listos para producción.',
        },
        {
          metric: 'Tiempo real',
          title: 'Análisis avanzado de datos',
          description:
            'SAP Business Data Cloud + SAP HANA Cloud nativos: vectores, grafos, relacional y espacial en una sola base. Información estratégica en tiempo real sin importar dónde residan los datos.',
        },
        {
          metric: 'IA gobernada',
          title: 'Automatización inteligente',
          description:
            'Agentes Joule, modelos abiertos (Claude, Mistral, Cohere) y SAP-RPT-1.5 — todo orquestado bajo SAP AI Agent Hub para gobernanza centralizada y observabilidad por agente.',
        },
        {
          metric: 'Cloud nativo',
          title: 'Escalabilidad y flexibilidad',
          description:
            'Cloud Foundry, Kyma y Sovereign Cloud para clientes con requisitos de soberanía. Empezás chico y escalás horizontalmente sin reescribir.',
        },
      ],
      useCases: [
        {
          title: 'Extensiones side-by-side de S/4HANA',
          description:
            'Lógica de negocio custom que extiende S/4HANA sin tocar el core. Compatible con futuros upgrades.',
          industry: 'Cross-industry',
          technologies: ['CAP', 'BTP', 'Fiori'],
        },
        {
          title: 'Integraciones B2B y EDI',
          description:
            'Conectamos a clientes, proveedores y marketplaces con un iPaaS unificado y monitoreo end-to-end.',
          industry: 'Manufactura & Logística',
          technologies: ['Integration Suite', 'AS2', 'EDI'],
        },
        {
          title: 'Portales de empleados y clientes',
          description:
            'Self-service portals construidos sobre BTP que se integran con SuccessFactors, S/4HANA y CRMs.',
          industry: 'RRHH & Customer Service',
          technologies: ['Build Apps', 'Fiori', 'UI5'],
        },
        {
          title: 'Plataforma de IA empresarial',
          description:
            'Base para casos de IA productivos: modelos, datos, governance y despliegue, todo gestionado dentro del estándar SAP.',
          industry: 'Cross-industry',
          technologies: ['AI Core', 'HANA Cloud', 'BTP'],
        },
      ],
      relatedTechIds: ['signavio', 'fiori', 'leanix', 'ia'],
      faq: [
        {
          q: '¿BTP reemplaza el on-premise de SAP?',
          a: 'No. BTP es complementario al ERP (sea ECC o S/4HANA). Es donde construís lo nuevo — apps, integraciones, IA — para que el core quede limpio.',
        },
        {
          q: '¿Cuánto cuesta BTP?',
          a: 'Modelo pay-per-use por servicio. Hay un plan free tier para arrancar y los costos crecen con el consumo. Te ayudamos con el sizing y el cost forecast desde el día 1.',
        },
        {
          q: '¿Necesito reescribir mis customizaciones ABAP?',
          a: 'No de entrada, pero BTP es la oportunidad de mover lentamente la lógica custom fuera del core. Lo hacemos en fases, priorizando lo que más valor da.',
        },
        {
          q: '¿Qué lenguajes y frameworks soporta?',
          a: 'CAP (Node.js / Java), SAP UI5, Fiori Elements, Build Apps (low-code), workflows BPMN y Python para ML. Todo cloud-native.',
        },
        {
          q: '¿Cómo se gestiona la seguridad?',
          a: 'Identity Authentication y Authorization de SAP, integración con tu IdP (Azure AD, Okta, etc.), Cloud Connector para conectar a sistemas on-prem de forma segura.',
        },
      ],
      metaTitle: 'SAP BTP: Business Technology Platform',
      metaDescription:
        'Implementación de SAP BTP — integraciones, extensiones, IA y aplicaciones cloud-native. Acelerá la innovación sin tocar el core de S/4HANA.',
    },
  },
  {
    id: 'leanix',
    slug: 'sap-leanix',
    title: 'SAP LeanIX',
    short: 'Enterprise Architecture + IA Agent Hub',
    description:
      'Visibilidad de capabilities, aplicaciones y dependencias — el lugar desde donde se gobierna también el inventario de agentes de IA de toda la empresa.',
    icon: LayoutGrid,
    accent: 'accent',
    tags: ['EA', 'AI Agent Hub', 'Fact Sheets', 'Governance'],
    detail: {
      tagline:
        'La arquitectura como palanca: catálogo, gobernanza y ahora también el control central de agentes, LLMs y servidores MCP en toda la organización.',
      heroImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP LeanIX dejó de ser solo una herramienta de Enterprise Architecture: con SAP AI Agent Hub se convirtió en el centro de gobernanza de la IA empresarial — inventario centralizado de agentes, LLMs y servidores MCP, sin importar en qué plataforma corran. En GoTechy implementamos LeanIX como columna vertebral del control de cambio en organizaciones que escalan IA.',
        'Cubrimos las capacidades clave de la plataforma: el Enterprise Architect Assistant que mantiene los datos arquitectónicos al día, la integración con Signavio Process Transformation Manager para conectar arquitectura con procesos, el alineamiento con SAP Cloud ALM y los Fact Sheets enriquecidos con datos de procesos.',
        'Implementamos las nuevas funcionalidades de gobernanza de IA: registro y observabilidad de agentes, evaluación de riesgo y verificación formal antes de producción, integración con SAP Cloud Identity Services para control de acceso, análisis de ejecución con Signavio y mapeo a unidades de negocio vía SuccessFactors.',
        'Sin LeanIX, escalar agentes es jugar a la ruleta. Con LeanIX, cada agente que entra a producción está catalogado, evaluado, monitoreado y vinculado a un dueño funcional. Eso es lo que diferencia un POC de IA de una operación autónoma sostenible.',
      ],
      features: [
        {
          icon: Network,
          title: 'Modelado de plataformas',
          description:
            'Conecta componentes de TI y aplicaciones a conceptos estratégicos, brindando a los CIOs información sobre los elementos críticos que respaldan las plataformas de la organización.',
          bullets: [
            'Application Portfolio Management vivo',
            'Mapeo de aplicaciones a capabilities de negocio',
            'Análisis de dependencias entre componentes',
            'Inventario de tecnologías y su ciclo de vida',
            'Vista ejecutiva del landscape completo',
          ],
        },
        {
          icon: Boxes,
          title: 'Meta Model predefinido',
          description:
            'Proporciona una estructura estandarizada para documentar todos los elementos de la arquitectura empresarial, basada en las mejores prácticas de más de 1.000 clientes.',
          bullets: [
            'Estructura estandarizada lista para usar',
            'Best practices de 1.000+ clientes globales',
            'Aplicaciones, tecnologías, capabilities y procesos pre-modelados',
            'Adaptable a tu modelo de negocio',
            'Reduce el time-to-value a semanas',
          ],
        },
        {
          icon: Sparkles,
          title: 'Integración con herramientas de IA',
          description:
            'Ofrece funciones como el Inventory Builder, que acelera la creación del inventario de TI mediante inteligencia artificial.',
          bullets: [
            'Inventory Builder con IA para el inventario inicial',
            'Detección automática desde SSO, CMDB y cloud providers',
            'Continuous discovery del landscape',
            'Recomendaciones automatizadas de catalogación',
            'Mantenimiento mínimo del repositorio',
          ],
        },
      ],
      benefits: [
        {
          metric: '+50% más rápido',
          title: 'Acelerar las transformaciones',
          description:
            'Lenguaje común y fuente única de verdad para toda la organización — decisiones de arquitectura que antes tomaban semanas, ahora salen en días.',
        },
        {
          metric: '360° riesgo',
          title: 'Identificar y gestionar riesgos',
          description:
            'Visibilidad multidimensional sobre aplicaciones, tecnologías y dependencias para detectar obsolescencias, deuda técnica y riesgos de seguridad antes de que impacten el negocio.',
        },
        {
          metric: 'Roadmaps medibles',
          title: 'Apoyar la transformación ágil',
          description:
            'Hojas de ruta, planificación de escenarios y análisis de impacto — alineados con SAP Cloud ALM y Signavio para conectar arquitectura, procesos y ejecución.',
        },
        {
          metric: 'IA bajo control',
          title: 'Gobernanza centralizada de agentes',
          description:
            'SAP AI Agent Hub dentro de LeanIX: registro, observabilidad y verificación de cada agente, LLM y servidor MCP — sin importar la plataforma donde corra.',
        },
      ],
      useCases: [
        {
          title: 'Cloud Readiness Assessment',
          description:
            'Evaluamos el portfolio completo y priorizamos qué aplicaciones migrar, refactorizar o retirar antes del move to cloud.',
          industry: 'Cross-industry',
          technologies: ['LeanIX', 'AWS', 'Azure'],
        },
        {
          title: 'M&A consolidation',
          description:
            'Mergers y adquisiciones: identificamos overlap funcional, dependencias y duplicación para acelerar la consolidación post-deal.',
          industry: 'Corporate',
          technologies: ['APM', 'EA'],
        },
        {
          title: 'Preparación para S/4HANA',
          description:
            'Antes del proyecto de migración: foto completa del landscape, dependencias y custom code a refactorizar.',
          industry: 'SAP customers',
          technologies: ['LeanIX', 'Signavio', 'S/4HANA'],
        },
        {
          title: 'Gestión de deuda técnica',
          description:
            'Identificación, cuantificación y plan de pago de la deuda técnica con visibilidad ejecutiva.',
          industry: 'Cross-industry',
          technologies: ['LeanIX', 'TBM'],
        },
      ],
      relatedTechIds: ['signavio', 'btp', 'basis', 'pm'],
      faq: [
        {
          q: '¿Cuánto tiempo lleva implementar LeanIX?',
          a: 'Con el Meta Model predefinido y el Inventory Builder, una implementación inicial de calidad lleva 6-10 semanas hasta tener el primer reporting ejecutivo.',
        },
        {
          q: '¿Cómo se carga el inventario inicial?',
          a: 'Combinamos el Inventory Builder con IA, integraciones con CMDB/SSO/cloud providers y workshops con stakeholders. No es manual.',
        },
        {
          q: '¿Quién mantiene el inventario actualizado después?',
          a: 'LeanIX se conecta a las fuentes de verdad técnicas (Azure, AWS, ServiceNow, GitHub, etc.) y se actualiza automáticamente. El mantenimiento manual es mínimo.',
        },
        {
          q: '¿Cómo se diferencia de un CMDB?',
          a: 'El CMDB se enfoca en lo técnico/operacional (servers, configs). LeanIX agrega la perspectiva de negocio: capabilities, costos, ciclo de vida y estrategia. Se complementan.',
        },
        {
          q: '¿Necesito tener todo SAP para usarlo?',
          a: 'No. LeanIX cubre todo el portfolio de TI, sea SAP o no. Donde se potencia es al combinarlo con Signavio y S/4HANA.',
        },
      ],
      metaTitle: 'SAP LeanIX: Enterprise Architecture Management',
      metaDescription:
        'Visibilidad total del portfolio de aplicaciones y arquitectura empresarial con SAP LeanIX. Decisiones de cloud, M&A y S/4HANA con datos por GoTechy.',
    },
  },
  {
    id: 'basis',
    slug: 'sap-basis',
    title: 'SAP Basis',
    short: 'Cloud ERP, RISE y Clean Core',
    description:
      'Operación, performance y migraciones a Cloud ERP — con los nuevos asistentes Joule de migración y modernización que aceleran la adopción del Clean Core.',
    icon: Server,
    accent: 'secondary',
    tags: ['Cloud ERP', 'RISE', 'Clean Core', '24/7 Ops'],
    detail: {
      tagline:
        'El camino a Cloud ERP con asistentes Joule de migración y modernización — Clean Core como principio, no como aspiración.',
      heroImage:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'Operamos, migramos y modernizamos sistemas SAP a lo largo de todo su ciclo de vida — desde implementación hasta upgrades, alta disponibilidad, DR y soporte 24/7. Con más de 20 años en el ecosistema y SLAs personalizados para clientes enterprise críticos.',
        'SAP incorporó los asistentes Joule de migración y modernización dentro de RISE with SAP Advanced Cloud Transformation: análisis automatizado de sistemas, detección y corrección de código personalizado, aplicación de best practices y testing/validación automatizados. En GoTechy aprovechamos estos asistentes para acortar drásticamente los tiempos de transición a SAP Cloud ERP — público o privado.',
        'Aplicamos los cinco principios de Clean Core en cada migración: el ERP queda estándar, las extensiones viven en BTP, y las puertas de calidad de RISE with SAP miden objetivamente la preparación para IA. Esto permite que cada release nueva de SAP (Joule, Industry AI, BDC) llegue al cliente sin reescribir nada.',
        'Cubrimos toda la stack técnica: instalación, configuración, performance tuning, seguridad, observabilidad, migraciones a S/4HANA y arquitecturas híbridas. Sumamos servicios alineados al Max Success Plan de SAP para coordinar adopción, gobernanza y soporte premium en transformaciones complejas.',
      ],
      features: [
        {
          icon: Server,
          title: 'Implementaciones técnicas y soporte post-implementación',
          description:
            'Realizamos implementaciones técnicas de sistemas SAP — incluyendo sizing, instalación, configuración técnica y soporte continuo — para asegurar una transición sin problemas y garantizar que tu sistema funcione de manera eficiente.',
        },
        {
          icon: ArrowUpCircle,
          title: 'Actualización de stack o versión de sistemas',
          description:
            'Realizamos actualizaciones de stack y de versión de sistemas SAP, asegurando que tu infraestructura esté siempre al día con las últimas mejoras y parches de seguridad.',
        },
        {
          icon: Database,
          title: 'Actualización de bases de datos',
          description:
            'Actualizamos las bases de datos sobre las que corren tus sistemas SAP para que cuentes con las últimas mejoras y correcciones.',
        },
        {
          icon: ShieldCheck,
          title: 'Backup y restauración de bases de datos',
          description:
            'Configuramos backups periódicos de las bases de datos de tus sistemas SAP, protegiendo tus datos ante posibles fallas. En caso de requerir el regreso a un estado anterior, efectuamos restauraciones de bases de datos.',
        },
        {
          icon: GitMerge,
          title: 'Migraciones homogéneas y heterogéneas',
          description:
            'Llevamos a cabo migraciones de sistemas SAP, ya sea dentro del mismo entorno (homogéneas) o hacia diferentes plataformas (heterogéneas), minimizando riesgos y asegurando la integridad de los datos.',
        },
        {
          icon: Activity,
          title: 'Esquemas de alta disponibilidad',
          description:
            'Diseñamos e implementamos arquitecturas de alta disponibilidad para tus sistemas SAP, garantizando la continuidad operativa y minimizando el tiempo de inactividad.',
        },
        {
          icon: Lock,
          title: 'Gestión integral de seguridad y perfiles',
          description:
            'Ofrecemos una gestión completa de la seguridad de tu entorno SAP, incluyendo la administración de perfiles y roles de usuario, para proteger tu información crítica.',
        },
        {
          icon: Wrench,
          title: 'Soporte y mantenimiento',
          description:
            'Proporcionamos soporte técnico y mantenimiento preventivo y correctivo, asegurando que tus sistemas SAP operen de manera óptima y resolviendo cualquier incidencia que pueda surgir.',
        },
        {
          icon: BarChart3,
          title: 'Monitoreo y reportes',
          description:
            'Monitoreamos la integridad y el rendimiento de tus sistemas SAP y generamos reportes técnicos y ejecutivos para que te mantengas al tanto del estado de tu plataforma y puedas tomar decisiones informadas.',
        },
        {
          icon: Users,
          title: 'Coaching de proyectos',
          description:
            'Brindamos asesoramiento y coaching para proyectos SAP, apoyando a tu equipo en la planificación, ejecución y gestión de proyectos para garantizar su éxito.',
        },
      ],
      benefits: [
        {
          metric: '20+ años',
          title: 'De experiencia en el ecosistema SAP',
          description:
            'Equipo de profesionales con experiencia probada operando ecosistemas SAP críticos en clientes enterprise.',
        },
        {
          metric: '24/7',
          title: 'SLA personalizados',
          description:
            'Acuerdos de nivel de servicio adaptados a los requerimientos específicos de cada cliente y a la criticidad real de cada sistema — con guardia activa para entornos productivos.',
        },
        {
          metric: 'Clean Core',
          title: 'Mejores prácticas de SAP',
          description:
            'Aplicamos los cinco principios de Clean Core y las metodologías oficiales de SAP — asegurando calidad, certificabilidad y compatibilidad con futuros releases.',
        },
        {
          metric: '99.9% uptime',
          title: 'Confiabilidad y sustentabilidad',
          description:
            'Operación continua de infraestructura SAP crítica con alta disponibilidad, planes de DR, monitoreo proactivo y mantenimiento preventivo.',
        },
      ],
      useCases: [
        {
          title: 'Operación delegada de SAP',
          description:
            'Managed service de operación, monitoreo y soporte L1-L3 con SLAs claros.',
          industry: 'Cross-industry',
          technologies: ['SAP Basis', 'SolMan', 'S/4HANA'],
        },
        {
          title: 'Migración a S/4HANA',
          description:
            'Conversiones brownfield y greenfield con metodología SAP Activate. Dry-runs, pre-checks y cutover ensayado.',
          industry: 'SAP customers',
          technologies: ['S/4HANA', 'HANA', 'Basis'],
        },
        {
          title: 'Setup de alta disponibilidad y DR',
          description:
            'Arquitecturas de HA y DR para sistemas críticos. Pruebas de failover periódicas como parte del SLA.',
          industry: 'Industria & Banca',
          technologies: ['HANA', 'Replication', 'DR'],
        },
        {
          title: 'Performance tuning y troubleshooting',
          description:
            'Diagnóstico y resolución de problemas de performance en sistemas productivos.',
          industry: 'Cross-industry',
          technologies: ['Basis', 'HANA', 'Workload analysis'],
        },
      ],
      relatedTechIds: ['btp', 'leanix', 'abap', 'pm'],
      faq: [
        {
          q: '¿Operan sistemas en cualquier nube?',
          a: 'Sí: AWS, Azure, GCP y SAP RISE, además de on-premise y nubes privadas. La metodología es la misma, cambian las herramientas y los runbooks.',
        },
        {
          q: '¿Cuál es el modelo de contrato típico?',
          a: 'Contratos mensuales con SLA y horas de cobertura definidas. Modelos full-managed, híbrido o staff augmentation según necesidad.',
        },
        {
          q: '¿Cómo es el handover si ya tengo un proveedor actual?',
          a: 'Plan de transición ordenado de 4-8 semanas: inventario, documentación, runbooks, accesos y shadow period antes del go-live operacional.',
        },
        {
          q: '¿Hacen migraciones a S/4HANA llave en mano?',
          a: 'Sí. Combinamos Basis (capa técnica), funcional y PM. Conversion, greenfield o selective data transition según el caso.',
        },
        {
          q: '¿Qué pasa si hay un incidente fuera de horario?',
          a: 'Con SLA 24/7 hay un equipo de guardia con tiempos de respuesta acordados. Para SLAs business hours respondemos en horario laboral.',
        },
      ],
      metaTitle: 'SAP Basis: Operación, Infraestructura y Migraciones',
      metaDescription:
        'Operación y soporte de sistemas SAP 24/7 — Basis, migraciones a S/4HANA, HA y DR. Más de 20 años con SLAs personalizados por GoTechy.',
    },
  },
  {
    id: 'fiori',
    slug: 'sap-fiori',
    title: 'SAP Fiori',
    short: 'UX moderna + Joule Work',
    description:
      'Apps Fiori transaccionales combinadas con Joule Work — la nueva capa de interacción que SAP definió como la cara visible de la Empresa Autónoma.',
    icon: MonitorSmartphone,
    accent: 'accent',
    tags: ['Fiori Elements', 'UI5', 'Joule Work', 'UX'],
    detail: {
      tagline:
        'La experiencia de usuario completa: Fiori para transacciones estructuradas + Joule Work como capa adaptativa basada en intención.',
      heroImage:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP redefinió la experiencia de usuario con Joule Work — un espacio de trabajo dinámico que interpreta la intención del usuario en lenguaje natural (texto y voz) y coordina agentes para ejecutar tareas en sistemas SAP y no SAP. Joule Work complementa Fiori: las transacciones estructuradas siguen siendo el dominio de Fiori; los flujos multi-paso, multi-sistema, multi-dominio los resuelve Joule.',
        'En GoTechy diseñamos e implementamos la combinación correcta para cada cliente: apps Fiori estándar y custom con SAPUI5/Fiori Elements para operaciones core, y la integración progresiva de Joule Work (web, móvil y desktop) para que los usuarios deleguen tareas rutinarias y se enfoquen en decisiones.',
        'Cubrimos el Fiori Launchpad como punto de entrada unificado, desarrollos custom con UI5/Fiori Elements y la incorporación de la voz inteligente (alianza SAP-LiveKit) para empleados que trabajan fuera del teclado — campo, planta, retail, logística.',
        'El diferencial real ya no es solo "menos clicks". Es: lo que antes requería navegar 7 transacciones, hoy se resuelve diciéndole a Joule cuál es tu objetivo. Esa transición es la que ayudamos a planificar y entregar sin romper lo que ya funciona.',
      ],
      features: [
        {
          icon: Rocket,
          title: 'Implementación',
          description:
            'Despliegue completo de SAP Fiori adaptado a las necesidades de tu empresa, desde la activación del Launchpad hasta el rollout a usuarios.',
          bullets: [
            'Activación y configuración del Fiori Launchpad',
            'Catalogación de apps estándar relevantes',
            'Roles, autorizaciones y SSO con tu IdP',
            'Plan de adopción y rollout por área',
            'Transferencia de conocimiento al equipo interno',
          ],
        },
        {
          icon: Code2,
          title: 'Desarrollo de aplicaciones personalizadas',
          description:
            'Creación de soluciones a medida para optimizar tus procesos, utilizando Fiori Elements y SAPUI5 según el caso.',
          bullets: [
            'Fiori Elements (apps generadas por metadata)',
            'SAPUI5 / OpenUI5 custom para procesos específicos',
            'Diseño UX alineado al design system de Fiori',
            'Backend OData v4 / RAP a medida',
            'Apps responsive — desktop, tablet y mobile',
          ],
        },
        {
          icon: ArrowUpCircle,
          title: 'Actualizaciones',
          description:
            'Mantenimiento y mejora continua para asegurar el mejor rendimiento y compatibilidad con nuevos releases de SAP.',
          bullets: [
            'Upgrades de versión de UI5',
            'Actualización de catálogos estándar',
            'Compatibilidad con nuevos releases SAP',
            'Refactor de apps custom legacy',
            'Mantenimiento preventivo y proactivo',
          ],
        },
        {
          icon: Zap,
          title: 'Optimización del rendimiento',
          description:
            'Ajustes técnicos para mejorar la velocidad y eficiencia de tus aplicaciones Fiori, con foco en la experiencia del usuario final.',
          bullets: [
            'Análisis de tiempos de carga y LCP',
            'Optimización OData v4 vs. v2',
            'Lazy loading, bundling y caching',
            'Tuning del SAP Gateway',
            'Mejores prácticas de SAPUI5',
          ],
        },
        {
          icon: Wrench,
          title: 'Resolución de problemas',
          description:
            'Asistencia experta para solucionar errores y garantizar un funcionamiento óptimo de tus apps Fiori en producción.',
          bullets: [
            'Soporte L2 / L3 especializado',
            'Diagnóstico y resolución de incidencias',
            'Hotfixes a apps custom',
            'Análisis de logs y troubleshooting',
            'SLA personalizado según criticidad',
          ],
        },
      ],
      benefits: [
        {
          metric: 'Cualquier device',
          title: 'Accesibilidad desde cualquier dispositivo',
          description:
            'Acceso a SAP desde computadoras, tablets y móviles sin desarrollo separado — y con voz inteligente para empleados que trabajan fuera del teclado (campo, planta, logística).',
        },
        {
          metric: '-50% onboarding',
          title: 'Interfaz intuitiva y moderna',
          description:
            'Facilita la adopción del sistema por parte de los usuarios, reduciendo drásticamente la curva de aprendizaje y el tiempo de onboarding de nuevos empleados.',
        },
        {
          metric: '-40% clicks',
          title: 'Mayor eficiencia y productividad',
          description:
            'Navegación simplificada y accesos rápidos permiten realizar tareas en menos tiempo, con menos pantallas y menos confusión.',
        },
        {
          metric: '-60% errores',
          title: 'Menos errores operativos',
          description:
            'Procesos guiados, validaciones inline y estandarización en la visualización ayudan a reducir drásticamente fallos humanos en operaciones críticas.',
        },
        {
          metric: '+ROI del ERP',
          title: 'Mejor experiencia del usuario',
          description:
            'Diseño centrado en las necesidades del usuario hace que SAP sea ágil y satisfactorio. Más adopción significa más retorno real de la inversión en el ERP.',
        },
      ],
      useCases: [
        {
          title: 'Modernización de transacciones SAP',
          description:
            'Reemplazo de transacciones SAP GUI por apps Fiori intuitivas. Aprobaciones, consultas y workflows del día a día.',
          industry: 'Cross-industry',
          technologies: ['Fiori Elements', 'UI5', 'OData'],
        },
        {
          title: 'Self-service B2B/B2C',
          description:
            'Portales para clientes y socios con consultas de pedidos, status, pagos y soporte conectados directo a SAP.',
          industry: 'Distribución & Retail',
          technologies: ['Fiori', 'BTP', 'UI5'],
        },
        {
          title: 'Apps mobile para campo',
          description:
            'Técnicos, choferes y operarios con apps que funcionan offline y se sincronizan al volver a conexión.',
          industry: 'Logística & Servicios',
          technologies: ['Fiori Mobile', 'UI5', 'BTP'],
        },
        {
          title: 'Aprobaciones y workflows',
          description:
            'Inbox unificado de aprobaciones con experiencia consistente en mobile y desktop.',
          industry: 'Cross-industry',
          technologies: ['Fiori', 'Workflow', 'S/4HANA'],
        },
      ],
      relatedTechIds: ['abap', 'btp', 'nextgen', 'signavio'],
      faq: [
        {
          q: '¿Fiori reemplaza a SAP GUI?',
          a: 'Reemplaza los casos de uso de día a día (consultas, aprobaciones, workflows). Los procesos técnicos y de configuración profunda siguen siendo más eficientes en SAP GUI.',
        },
        {
          q: '¿Necesito S/4HANA para Fiori?',
          a: 'No. Fiori también funciona sobre ECC con el Fiori Front-End Server. Es además una excelente forma de "modernizar" un ECC mientras planeás la migración.',
        },
        {
          q: '¿Cuánto cuesta desarrollar una app Fiori custom?',
          a: 'Una app simple (1-2 pantallas) puede estar lista en 2-4 semanas. Apps complejas con lógica de negocio importante llevan 6-12 semanas.',
        },
        {
          q: '¿Cómo se gestiona la seguridad y los roles?',
          a: 'Roles SAP estándar y autorizaciones se mapean al launchpad. SSO con tu IdP corporativo (Azure AD, Okta).',
        },
        {
          q: '¿Las apps Fiori funcionan offline?',
          a: 'Las apps mobile pueden funcionar con datos cacheados y sincronización cuando vuelve la conexión. Lo definimos en el diseño según el caso de uso.',
        },
      ],
      metaTitle: 'SAP Fiori: UX Moderna y Adopción Real',
      metaDescription:
        'Apps SAP Fiori responsive y modernas que los usuarios usan. Fiori Elements, UI5, Launchpad y custom development por GoTechy.',
    },
  },
  {
    id: 'abap',
    slug: 'desarrollo-abap',
    title: 'Desarrollo ABAP',
    short: 'Clean Core + RAP + Domain Models',
    description:
      'ABAP RAP y extensiones limpias side-by-side — el camino que SAP definió para que tu código sobreviva a Cloud ERP y a la era de los Joule Agents.',
    icon: Code2,
    accent: 'secondary',
    tags: ['Clean Core', 'RAP', 'CDS Views', 'Domain Models'],
    detail: {
      tagline:
        'Desarrollo ABAP alineado a los principios de Clean Core: extensiones que no rompen al upgradear y que conviven con SAP Domain Models e IA generativa de código.',
      heroImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'Especialistas en SAP ABAP — clásico, RAP (RESTful ABAP Programming), CDS Views y AMDPs — para extender, optimizar y modernizar el sistema sin comprometer la trayectoria a Cloud ERP. Nuestro equipo aplica los cinco principios de Clean Core en cada commit.',
        'SAP introdujo los Domain Models: modelos de IA entrenados específicamente con código, datos y patrones de SAP S/4HANA, capaces de generar ABAP limpio y compatible con el core desde lenguaje natural. En GoTechy adoptamos estas capacidades — vía Joule Studio — para acelerar el desarrollo manteniendo la gobernanza.',
        'Trabajamos con User Exits, BAdIs, Enhancements y CDS Views para extender el estándar sin tocarlo. Para extensiones complejas, las llevamos a SAP BTP como side-by-side: ese es el patrón que sobrevive cada upgrade y deja al ERP listo para adoptar Joule Assistants y nuevos releases sin reescribir.',
        'Cuando el caso lo requiere, integramos ABAP con desarrollo agentico: APIs OData consumidas por agentes Joule, contextos publicados vía MCP para que la IA opere con datos de tu instancia, y validación de cambios con SAP Cloud ALM. Lo viejo y lo nuevo conviviendo sin fricción.',
      ],
      features: [
        {
          icon: Code2,
          title: 'Desarrollo y optimización de programas ABAP',
          description:
            'Creación de reportes, formularios, interfaces y mejoras en el rendimiento del código existente, siguiendo normas de calidad y best practices.',
          bullets: [
            'Reports ALV, SmartForms y Adobe Forms',
            'Formularios e interfaces personalizadas',
            'Mejoras de rendimiento sobre código legacy',
            'Refactor con foco en mantenibilidad',
            'Code reviews y validación con ATC',
          ],
        },
        {
          icon: Wrench,
          title: 'Ampliaciones y mejoras',
          description:
            'User Exits, BAdIs, Enhancements y BTEs para adaptar procesos estándar de SAP a los requerimientos del negocio — sin tocar el core.',
          bullets: [
            'User Exits clásicos sobre ECC',
            'BAdIs (Business Add-Ins) en S/4HANA',
            'Implicit y Explicit Enhancements',
            'BTEs (Business Transaction Events)',
            'Customización 100% upgrade-safe',
          ],
        },
        {
          icon: Network,
          title: 'Integraciones',
          description:
            'Desarrollo de APIs, Web Services y conectores para la integración de SAP con sistemas externos y plataformas B2B.',
          bullets: [
            'APIs REST y Web Services SOAP',
            'BAPIs y BAPIs remotas (RFC)',
            'IDOCs para integración EDI/B2B',
            'Conectores con marketplaces y bancos',
            'Middleware y mensajería',
          ],
        },
        {
          icon: GitMerge,
          title: 'Migración y adaptación a S/4HANA',
          description:
            'Conversión de código a ABAP en S/4HANA y uso de nuevas tecnologías como CDS Views y AMDPs para máxima performance.',
          bullets: [
            'Análisis con SAP Readiness Check',
            'Conversión a sintaxis S/4HANA',
            'Reemplazo de tablas obsoletas',
            'Modelado moderno con CDS Views',
            'Procedimientos optimizados con AMDPs',
          ],
        },
        {
          icon: Workflow,
          title: 'Desarrollo en SAP Fiori / UI5',
          description:
            'Aplicaciones web modernas y responsivas basadas en ABAP RAP y OData, listas para consumirse desde el Fiori Launchpad.',
          bullets: [
            'ABAP RAP (RESTful ABAP Programming)',
            'Servicios OData v2 y v4',
            'Backend para apps Fiori Elements',
            'Integración con Fiori Launchpad',
            'Custom apps SAPUI5',
          ],
        },
        {
          icon: Zap,
          title: 'Automatización de procesos',
          description:
            'Creación de programas batch, BAPIs y herramientas de optimización de tareas repetitivas — para liberar al equipo de trabajo manual.',
          bullets: [
            'Programas batch (background jobs)',
            'BAPIs custom para procesos repetitivos',
            'Workflow SAP estándar',
            'Job scheduling y monitoreo',
            'Reducción medible de tareas manuales',
          ],
        },
      ],
      approach: {
        eyebrow: 'Áreas de aplicación',
        title: 'Módulos y sistemas SAP que cubrimos',
        subtitle:
          'Brindamos soluciones ABAP para distintos módulos y sistemas SAP del ecosistema enterprise.',
        image:
          'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
        items: [
          'SAP ERP y S/4HANA (MM, FICO, SD, PP, entre otros)',
          'SAP Transportation Management (SAP TM)',
          'SAP Extended Warehouse Management (SAP EWM)',
          'SAP Global Trade Services (SAP GTS)',
          'SAP Business Technology Platform (BTP) — ABAP en Cloud',
        ],
      },
      benefits: [
        {
          metric: 'Senior team',
          title: 'Equipo experimentado y certificado',
          description:
            'Sólida experiencia en el ecosistema SAP, con desarrolladores especializados en módulos críticos y proyectos enterprise — incluyendo ABAP RAP y BTP.',
        },
        {
          metric: 'ATC + tests',
          title: 'Mejores prácticas y normas de calidad',
          description:
            'Code reviews obligatorios, ATC (ABAP Test Cockpit) con reglas custom, unit testing, integración con SAP Cloud ALM y CI/CD cuando aplica.',
        },
        {
          metric: 'Clean Core',
          title: 'Código eficiente, seguro y escalable',
          description:
            'Extension points oficiales, CDS Views, AMDPs optimizados y arquitecturas side-by-side en BTP — pensadas para sobrevivir cada upgrade sin reescribir.',
        },
        {
          metric: 'Scrum / Kanban',
          title: 'Metodologías ágiles',
          description:
            'Iteraciones cortas con valor demostrable, gestión transparente del backlog y entregas predecibles que se ajustan al ritmo real del negocio.',
        },
      ],
      useCases: [
        {
          title: 'Customización funcional de S/4HANA',
          description:
            'Adaptación de procesos estándar a la operación real del cliente sin modificar el core.',
          industry: 'Cross-industry',
          technologies: ['ABAP', 'BAdI', 'CDS'],
        },
        {
          title: 'Integraciones con sistemas externos',
          description:
            'Interfaces robustas con sistemas legacy, marketplaces, bancos, fiscales y proveedores B2B.',
          industry: 'Cross-industry',
          technologies: ['BAPIs', 'IDOCs', 'OData'],
        },
        {
          title: 'Migración de código a S/4HANA',
          description:
            'Análisis con SAP Readiness Check, ajustes obligatorios y refactor a las nuevas estructuras.',
          industry: 'SAP brownfield',
          technologies: ['ABAP', 'Custom Code', 'S/4HANA'],
        },
        {
          title: 'Backend de apps Fiori custom',
          description:
            'Servicios OData v4 desarrollados con RAP como backend de apps Fiori modernas.',
          industry: 'Cross-industry',
          technologies: ['ABAP RAP', 'OData', 'Fiori'],
        },
      ],
      relatedTechIds: ['fiori', 'btp', 'basis', 'pm'],
      faq: [
        {
          q: '¿ABAP sigue siendo relevante con cloud y S/4HANA?',
          a: 'Más que antes. S/4HANA está construido sobre ABAP y BTP soporta ABAP Cloud. Lo que cambió son las prácticas (CDS, RAP), no el lenguaje.',
        },
        {
          q: '¿Hacen modificaciones al estándar?',
          a: 'Las evitamos. Usamos User Exits, BAdIs, Enhancements y CDS extensions. Sólo modificamos el estándar si SAP no provee otra opción (raro) y siempre dejamos trazabilidad.',
        },
        {
          q: '¿Cómo aseguran la calidad del código?',
          a: 'Code reviews obligatorios, ATC (ABAP Test Cockpit) con reglas custom del cliente, unit testing con ABAP Unit y CI/CD cuando aplica.',
        },
        {
          q: '¿Pueden refactorizar código legacy a S/4HANA?',
          a: 'Sí. Es uno de los servicios más demandados. Combinamos análisis automatizado (Custom Code Analyzer) con refactor manual de lo crítico.',
        },
        {
          q: '¿Trabajan con equipos mixtos junto al cliente?',
          a: 'Sí. Modelos staff augmentation, equipos dedicados, llave en mano o factory. Lo definimos según madurez interna.',
        },
      ],
      metaTitle: 'Desarrollo ABAP: Custom Dev, RAP y CDS',
      metaDescription:
        'Desarrollo ABAP profesional para SAP ECC y S/4HANA. Reports, interfaces, RAP, CDS, BAdIs y migración de código por GoTechy.',
    },
  },
  {
    id: 'nextgen',
    slug: 'next-gen-development',
    title: 'Next Gen Development',
    short: 'Joule Studio + Java/Node/Python/Agentic',
    description:
      'Desarrollo full-stack y agentico: Joule Studio pro-code, protocolos MCP/A2A y ecosistema abierto para conectar SAP con todo lo demás.',
    icon: Rocket,
    accent: 'accent',
    tags: ['Joule Studio', 'MCP', 'A2A', 'Python', 'React'],
    detail: {
      tagline:
        'Desarrollo moderno y agentico: Joule Studio con marcos de agentes preferidos (LangGraph, AutoGen, LlamaIndex), Python SDK, MCP, A2A y orquestación visual con n8n.',
      heroImage:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
      overviewParagraphs: [
        'El desarrollo empresarial ya no es solo "Java + APIs". Hoy se construyen agentes que razonan sobre datos SAP, se conectan vía MCP a herramientas internas y dialogan con agentes de terceros vía A2A. En GoTechy combinamos lo mejor de los dos mundos: full-stack moderno (Java, Node, Python, React, Angular) y desarrollo agentico sobre Joule Studio.',
        'Usamos Joule Studio en modo pro-code con SAP Cloud SDK para Python y los frameworks de agentes que prefiere cada equipo — LangGraph, AutoGen, LlamaIndex. Los agentes que entregamos entienden nativamente el código, los modelos de datos y los procesos SAP gracias a los SAP Domain Models, no como genéricos de internet.',
        'Para orquestación visual de flujos agenticos, aprovechamos la alianza SAP-n8n integrada en Joule Studio. Para experiencias front-end más allá de Fiori, usamos Vercel + Next.js cuando el caso pide velocidad y diseño custom. Y para razonamiento avanzado, integramos modelos como Claude (Anthropic) o los soberanos de la EU AI Cloud (Mistral, Cohere).',
        'Construimos productos completos: portales B2B/B2C, comprobantes fiscales digitales, gestores de logística, integraciones con TMS, servicios cloud-native y ahora también agentes empresariales con gobernanza vía SAP AI Agent Hub. Código limpio, testeado, observable y listo para producción.',
      ],
      features: [
        {
          icon: Server,
          title: 'Backend en Java / Spring Boot',
          description:
            'APIs REST, microservicios y aplicaciones empresariales con Spring Boot, Hibernate y el stack Java tradicional.',
        },
        {
          icon: Code2,
          title: 'Backend en Node.js / Python',
          description:
            'Servicios livianos en Node.js (Express, NestJS) y Python (FastAPI, Django) cuando el caso lo justifica.',
        },
        {
          icon: Sparkles,
          title: 'Frontends en React / Angular',
          description:
            'SPAs modernas, responsive y accesibles. Design systems consistentes con la marca del cliente.',
        },
        {
          icon: GitBranch,
          title: 'Microservicios y APIs',
          description:
            'Arquitecturas desacopladas con comunicación vía REST, gRPC o eventos. Listas para escalar.',
        },
        {
          icon: Workflow,
          title: 'CI/CD y testing',
          description:
            'Pipelines de CI/CD, pruebas unitarias, integración y e2e. Calidad como parte del proceso, no como auditoría posterior.',
        },
        {
          icon: ShieldCheck,
          title: 'Seguridad y escalabilidad',
          description:
            'OAuth2/OIDC, encriptación, secrets management y auditoría. Apps diseñadas para crecer con el negocio.',
        },
      ],
      benefits: [
        {
          metric: 'OData + MCP',
          title: 'Integración nativa con SAP',
          description:
            'Conectamos apps modernas y agentes con S/4HANA, BTP y sistemas SAP vía OData, APIs, protocolos MCP/A2A y conectores propios.',
        },
        {
          metric: '-50% time-to-market',
          title: 'Time-to-market acelerado',
          description:
            'Stack moderno + Joule Studio + metodologías ágiles + componentes reusables entregan más rápido que el ciclo clásico de desarrollo.',
        },
        {
          metric: 'Cloud-native',
          title: 'Soluciones escalables y seguras',
          description:
            'Apps diseñadas desde el día 1 para crecer con el negocio. Arquitecturas de microservicios, containers y autoscaling en SAP BTP o hyperscalers.',
        },
        {
          metric: '100% reviewed',
          title: 'Calidad garantizada',
          description:
            'Code reviews obligatorios, testing automatizado (unit, integration, e2e) y revisiones exhaustivas. La calidad se construye, no se audita después.',
        },
        {
          metric: 'Flexible',
          title: 'Equipos flexibles',
          description:
            'Desde proyectos llave en mano hasta expansión de tu equipo interno con desarrolladores senior — modalidad team-as-a-service o staff augmentation.',
        },
        {
          metric: 'SLA garantizado',
          title: 'Soporte continuo',
          description:
            'Acompañamiento post-go-live con SLAs definidos, mantenimiento evolutivo y mejora continua del producto entregado.',
        },
      ],
      useCases: [
        {
          title: 'Comprobantes Digitales (e-invoice)',
          description:
            'Plataforma de gestión de documentos electrónicos fiscales y no fiscales integrada con SAP y entidades fiscales locales.',
          industry: 'Cross-industry',
          technologies: ['Java', 'Spring Boot', 'SAP'],
        },
        {
          title: 'Gestión de logística y TM',
          description:
            'Sistemas de optimización de viajes y transporte con integración SAP y dashboards para operación en tiempo real.',
          industry: 'Logística',
          technologies: ['Java', 'React', 'SAP TM'],
        },
        {
          title: 'Portales B2B y B2C',
          description:
            'Portales modernos para clientes y socios con integración directa a SAP para pedidos, status y pagos.',
          industry: 'Distribución & Retail',
          technologies: ['React', 'Node.js', 'SAP'],
        },
        {
          title: 'Sistema de vouchers y promociones',
          description:
            'Creación, administración y seguimiento de vouchers con reglas de negocio y reporting integrado.',
          industry: 'Retail & Servicios',
          technologies: ['Spring Boot', 'React', 'PostgreSQL'],
        },
      ],
      relatedTechIds: ['btp', 'fiori', 'ia', 'abap'],
      faq: [
        {
          q: '¿Por qué desarrollar fuera de ABAP si tengo SAP?',
          a: 'Para casos que requieren UX moderna, integración con sistemas no-SAP, alto throughput o escalado horizontal independiente del ERP.',
        },
        {
          q: '¿Cómo se integra con SAP?',
          a: 'Vía OData, APIs REST, BAPIs/IDOCs y BTP. Tenemos conectores propios probados en producción para los casos más comunes.',
        },
        {
          q: '¿Qué pasa con el mantenimiento después del go-live?',
          a: 'Modelos de soporte mensual con SLA y horas de evolución. Te dejamos en posición de operar internamente si lo preferís.',
        },
        {
          q: '¿Hacen apps mobile nativas?',
          a: 'Hacemos PWAs (Progressive Web Apps) y React Native. La mayoría de los casos enterprise se cubren bien con esos enfoques.',
        },
        {
          q: '¿Y la propiedad intelectual del código?',
          a: 'El código es del cliente. Entregamos repos, documentación, runbooks y todo lo necesario para que puedas operar y evolucionar sin nosotros si lo decidís.',
        },
      ],
      metaTitle: 'Next Gen Development: Java, Node, Python, React',
      metaDescription:
        'Desarrollo full-stack moderno integrado con SAP — Java, Spring Boot, Node, Python, React y Angular. Microservicios, APIs y portales por GoTechy.',
    },
  },
  {
    id: 'pm',
    slug: 'gestion-proyectos',
    title: 'Gestión de Proyectos',
    short: 'SAP Activate + Autonomous Project Delivery',
    description:
      'Liderazgo end-to-end de programas SAP con SAP Activate, gobierno claro y los nuevos asistentes Joule de gestión de proyectos para entrega continua.',
    icon: Briefcase,
    accent: 'secondary',
    tags: ['Activate', 'Agile', 'Joule PM Assistant', 'PMO'],
    detail: {
      tagline:
        'Project management de SAP enterprise potenciado por Autonomous Project Delivery — Asistente de Gestión de Proyectos, Asistente de Facturación y métricas de valor en tiempo real.',
      heroImage:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'Lideramos programas SAP end-to-end con SAP Activate, la metodología oficial — combinada con prácticas ágiles cuando el caso lo requiere. Gobierno claro, KPIs accionables, gestión activa de riesgos y cambios, y roadmaps medibles alineados a objetivos de negocio.',
        'SAP definió Autonomous Project Delivery como uno de los escenarios iniciales de Industry AI. Adoptamos los asistentes Joule de gestión de proyectos: configuración rápida de proyectos a partir de datos históricos, asignación inteligente de recursos, soporte conversacional para hojas de horas, cambios de proyecto y facturación más precisa y puntual.',
        'Conectamos la ejecución del proyecto con SAP Signavio Process Transformation Manager y SAP Cloud ALM para que el valor entregado (monetario y no monetario) se capture en tiempo real, no en una hoja de cálculo paralela. Cada hito que cerramos tiene métricas auditables vinculadas a la inversión.',
        'Lideramos con visión estratégica y aterrizamos con disciplina técnica: el equipo correcto, las metodologías correctas y los asistentes correctos para que la transformación entregue resultados sostenibles — no esfuerzos puntuales que no escalan.',
      ],
      features: [
        {
          icon: Target,
          title: 'Roadmaps claros y medibles',
          description:
            'Definimos roadmaps con KPIs que permiten evaluar avances de forma constante y transparente, conectando hitos técnicos con objetivos de negocio.',
          bullets: [
            'Hitos y entregables claros por fase',
            'KPIs y métricas accionables para el sponsor',
            'Tracking de avance vs. baseline',
            'Reporting ejecutivo continuo',
            'Visibilidad transparente para todos los stakeholders',
          ],
        },
        {
          icon: Users,
          title: 'Coordinación efectiva entre actores',
          description:
            'Logramos una coordinación efectiva entre todos los actores del proyecto, generando alineación y fluidez en la comunicación interna y externa.',
          bullets: [
            'Stakeholders mapeados y comprometidos',
            'RACI claro y respetado',
            'Comunicación fluida interna y externa',
            'Ritualidad: standups, status reviews, retros',
            'Escalación clara cuando hace falta',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Gestión activa de riesgos y cambios',
          description:
            'Gestionamos activamente riesgos y cambios, anticipando desvíos y adaptándonos con agilidad para mantener el foco en el valor de negocio.',
          bullets: [
            'Identificación temprana de riesgos',
            'Plan de mitigación por riesgo crítico',
            'Comité de cambios con governance',
            'Re-baseline cuando el contexto lo amerita',
            'Foco en valor, no en el plan original',
          ],
        },
      ],
      approach: {
        title: 'Cómo lideramos los proyectos',
        subtitle:
          'Combinamos SAP Activate con prácticas ágiles según el caso — sin dogmatismo metodológico, con foco en valor de negocio.',
        image:
          'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80',
        items: [
          'SAP Activate como framework base',
          'Scrum y Kanban en iteraciones cortas',
          'Híbrido ágil/tradicional según contexto',
          'Gestión proactiva de riesgos y cambios',
          'KPIs medibles desde el día 1',
          'Foco en valor, no en el plan original',
        ],
      },
      benefits: [
        {
          metric: 'Tiempo real',
          title: 'Mayor visibilidad y control',
          description:
            'Avance real del proyecto en dashboards y KPIs — lo que está pasando, no lo que el equipo dice que pasa. Integrado con SAP Cloud ALM y Signavio para trazabilidad completa.',
        },
        {
          metric: '-70% desvíos',
          title: 'Reducción de riesgos',
          description:
            'Gestión proactiva y planificada que anticipa desvíos antes de que se vuelvan incidentes — comité de riesgos activo y planes de mitigación documentados.',
        },
        {
          metric: 'Líder técnico',
          title: 'Equipos alineados y motivados',
          description:
            'Liderazgo claro y técnico que conecta los objetivos del negocio con la ejecución diaria — sin gaps entre estrategia, plan y entrega.',
        },
        {
          metric: 'On-time, on-budget',
          title: 'Entregas predecibles',
          description:
            'Metodología SAP Activate aplicada con disciplina + asistentes Joule para gestión de hojas de horas, facturación y cambios — proyectos que cierran cuando deben, con el alcance comprometido.',
        },
      ],
      useCases: [
        {
          title: 'Implementaciones de S/4HANA',
          description:
            'Liderazgo end-to-end de proyectos de implementación, conversion y greenfield de S/4HANA.',
          industry: 'SAP customers',
          technologies: ['SAP Activate', 'Agile', 'PMO'],
        },
        {
          title: 'Rollouts globales',
          description:
            'Despliegues multi-país y multi-empresa con templates corporativos y adaptaciones locales.',
          industry: 'Multinacionales',
          technologies: ['PMO', 'Template & Roll-out'],
        },
        {
          title: 'Programas de transformación digital',
          description:
            'Coordinación de portfolios de proyectos: Signavio, BTP, IA, Fiori. Visión unificada con foco en business outcomes.',
          industry: 'Cross-industry',
          technologies: ['Program Management'],
        },
        {
          title: 'Recovery de proyectos en problemas',
          description:
            'Diagnóstico, replanning y estabilización de proyectos que están atrasados, fuera de presupuesto o desalineados.',
          industry: 'Cross-industry',
          technologies: ['PMO', 'Risk Management'],
        },
      ],
      relatedTechIds: ['signavio', 'leanix', 'basis', 'btp'],
      faq: [
        {
          q: '¿En qué se diferencia SAP Activate de Scrum tradicional?',
          a: 'SAP Activate es específico para proyectos SAP, con entregables y fit-gap analysis estandarizados. Scrum es genérico. Los combinamos: estructura de Activate con prácticas ágiles de Scrum.',
        },
        {
          q: '¿Es solo para proyectos SAP?',
          a: 'Lideramos también iniciativas no-SAP, pero el diferencial es nuestra experiencia con el ecosistema SAP. En proyectos puramente non-SAP usamos PMI/Scrum/Kanban según el caso.',
        },
        {
          q: '¿Cómo se mide el éxito de un PMO?',
          a: 'KPIs definidos al inicio: budget vs. actual, schedule, scope creep, quality (defectos), satisfacción de stakeholders. Reportamos contra esos números, no contra "sensaciones".',
        },
        {
          q: '¿Pueden tomar un proyecto que ya está en problemas?',
          a: 'Sí. Hacemos un assessment rápido (1-2 semanas), identificamos los issues críticos, proponemos un replanning y lo ejecutamos. Es uno de los pedidos más comunes.',
        },
        {
          q: '¿Qué tamaño de proyectos lideran?',
          a: 'Desde proyectos boutique de 6-8 semanas hasta programas multi-año con presupuestos de varios millones. La metodología se adapta al tamaño.',
        },
        {
          q: '¿Cómo trabajan con el equipo interno del cliente?',
          a: 'Nuestro PMO entra como liderazgo del proyecto. El cliente mantiene la decisión estratégica y nos delega la ejecución y la coordinación.',
        },
      ],
      metaTitle: 'Gestión de Proyectos SAP: PMO y SAP Activate',
      metaDescription:
        'PMO experto para implementaciones SAP, rollouts y transformaciones — SAP Activate, ágil, gestión de riesgos y entregas predecibles por GoTechy.',
    },
  },
];

// ===== Helpers ==================================================

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRelatedServices(ids: string[]): Service[] {
  return ids
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is Service => Boolean(s));
}
