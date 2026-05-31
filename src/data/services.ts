import type { LucideIcon } from 'lucide-react';
import {
  Activity,
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
// Todos los campos de texto admiten una variante `_en` opcional.
// `getLocalizedService()` se encarga de seleccionar la variante correcta y
// hacer fallback al español si la EN no está cargada.

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  title_en?: string;
  /** Opcional: las tarjetas de "Capacidades" pueden ser solo título + icono. */
  description?: string;
  description_en?: string;
  /** Sub-bullets opcionales para detallar el alcance de la feature. */
  bullets?: string[];
  bullets_en?: string[];
}

/** Item del stack tecnológico. icon (lucide) o imageUrl (logo subido). */
export interface ServiceTechItem {
  label: string;
  label_en?: string;
  icon?: LucideIcon;
  imageUrl?: string;
}

/** Bloque "Cómo trabajamos" — metodología o approach del servicio. */
export interface ServiceApproachBlock {
  /** Etiqueta sobre el título. Default: "Metodología". */
  eyebrow?: string;
  eyebrow_en?: string;
  title: string;
  title_en?: string;
  subtitle?: string;
  subtitle_en?: string;
  items: string[];
  items_en?: string[];
  image?: string;
}

/** Item del banner de stats (un número grande + label). */
export interface ServiceStatItem {
  value: string;
  label: string;
  label_en?: string;
}

/** Banner de stats/métricas destacadas del producto. */
export interface ServiceStatsBlock {
  eyebrow?: string;
  eyebrow_en?: string;
  title?: string;
  title_en?: string;
  items: ServiceStatItem[];
}

export interface ServiceBenefit {
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  /** Métrica destacada, ej: "40% reducción". Opcional. */
  metric?: string;
  metric_en?: string;
}

export interface ServiceUseCase {
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  industry?: string;
  industry_en?: string;
  technologies?: string[];
}

export interface ServiceFAQItem {
  q: string;
  q_en?: string;
  a: string;
  a_en?: string;
}

/**
 * Bloque "Horizonte SAP" — novedades del ecosistema SAP que vienen.
 * Tono: "esto llega, estamos preparados para acompañarte". Sin fechas ni años.
 */
export interface ServiceHorizonte {
  text: string;
  text_en?: string;
}

/**
 * Contenido detallado para la página individual del servicio.
 * Opcional: si no está presente, el servicio sólo aparece en el overview
 * pero no tiene página propia accesible.
 */
export interface ServiceDetail {
  tagline: string;
  tagline_en?: string;
  heroImage?: string;
  overviewImage?: string;
  overviewParagraphs: string[];
  overviewParagraphs_en?: string[];
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  /** Opcional: banner de stats/métricas del producto (renderizado entre overview y features). */
  stats?: ServiceStatsBlock;
  /** Opcional: bloque de metodología / "Cómo trabajamos". */
  approach?: ServiceApproachBlock;
  /** Opcional: stack tecnológico mostrado como grid de badges. */
  techStack?: ServiceTechItem[];
  /** Opcional: bloque "Horizonte SAP" con las novedades que vienen del ecosistema. */
  horizonte?: ServiceHorizonte;
  /** IDs de otros services en este mismo array — se renderizan como cards linkeables. */
  relatedTechIds: string[];
  faq: ServiceFAQItem[];
  metaTitle: string;
  metaTitle_en?: string;
  metaDescription: string;
  metaDescription_en?: string;
}

export interface Service {
  id: string;
  /** URL slug usado por la ruta /servicios/:slug. Kebab-case. */
  slug: string;
  title: string;
  title_en?: string;
  short: string;
  short_en?: string;
  description: string;
  description_en?: string;
  icon: LucideIcon;
  accent: 'secondary' | 'accent';
  tags: string[];
  tags_en?: string[];
  detail?: ServiceDetail;
}

// ===== Data =====================================================

export const SERVICES: Service[] = [
  {
    id: 'ia',
    slug: 'inteligencia-artificial',
    title: 'Inteligencia Artificial',
    title_en: 'Artificial Intelligence',
    short: 'Empresa Autónoma · Joule · Agentes',
    short_en: 'Autonomous Enterprise · Joule · Agents',
    description:
      'Implementamos la visión de Empresa Autónoma de SAP: Joule Assistants y Agentes que coordinan procesos end-to-end sobre tus sistemas SAP y no SAP.',
    description_en:
      'We implement SAP\'s Autonomous Enterprise vision: Joule Assistants and Agents that coordinate end-to-end processes across your SAP and non-SAP systems.',
    icon: Brain,
    accent: 'secondary',
    tags: ['Joule', 'Agents', 'Industry AI', 'GenAI'],
    detail: {
      tagline:
        'IA aplicada al negocio. No al hype, sí a los resultados.',
      tagline_en:
        'AI applied to business. Not to the hype — to results.',
      heroImage: '/images/IA-1.jpg',
      overviewImage: '/images/IA-2.webp',
      overviewParagraphs: [
        'Implementamos soluciones de IA que automatizan tareas, predicen resultados y mejoran decisiones dentro del ecosistema SAP y sistemas conectados.',
        'Desde la automatización de documentos hasta asistentes inteligentes integrados en los procesos diarios.',
        'Cada proyecto arranca con un objetivo de negocio medible: empezamos por el escenario de mayor retorno, lo validamos con un piloto acotado y recién ahí escalamos a producción con datos confiables y gobernanza.',
      ],
      overviewParagraphs_en: [
        'We implement AI solutions that automate tasks, predict outcomes and improve decisions across the SAP ecosystem and connected systems.',
        'From document automation to intelligent assistants embedded in everyday processes.',
        'Every project starts from a measurable business goal: we begin with the highest-return scenario, validate it with a focused pilot, and only then scale to production with trusted data and governance.',
      ],
      features: [
        { icon: Workflow, title: 'Automatización inteligente de procesos', title_en: 'Intelligent process automation' },
        { icon: BarChart3, title: 'Modelos predictivos sobre datos SAP', title_en: 'Predictive models on SAP data' },
        { icon: FileText, title: 'Document processing con IA (facturas, órdenes)', title_en: 'AI document processing (invoices, orders)' },
        { icon: Bot, title: 'Chatbots y asistentes empresariales', title_en: 'Enterprise chatbots and assistants' },
        { icon: Plug, title: 'Integración con SAP BTP AI Services', title_en: 'Integration with SAP BTP AI Services' },
        { icon: Brain, title: 'Consultoría de adopción de IA', title_en: 'AI adoption consulting' },
      ],
      approach: {
        title: 'Cómo trabajamos la IA',
        title_en: 'How we work with AI',
        subtitle:
          'Un enfoque integral que asegura que la IA en producción funcione, sea segura y sea rentable. No alcanzamos una demo: alcanzamos el ROI.',
        subtitle_en:
          'A comprehensive approach that ensures AI in production works, is secure and is profitable. We don\'t aim for a demo: we aim for ROI.',
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
        items_en: [
          'Scalable architecture design',
          'Model evaluation and selection',
          'Data security and governance',
          'Observability and performance monitoring',
          'Cost control and continuous optimization',
          'Testing and response quality validation',
        ],
      },
      benefits: [
        {
          metric: '100% productivo',
          metric_en: '100% productive',
          title: 'Experiencia técnica especializada',
          title_en: 'Specialized technical expertise',
          description:
            'Equipo con experiencia real implementando IA en entornos productivos — agentes, automatización y sistemas empresariales corriendo en producción, no en slides.',
          description_en:
            'Team with real experience implementing AI in production environments — agents, automation and enterprise systems running in production, not in slides.',
        },
        {
          metric: 'ROI medible',
          metric_en: 'Measurable ROI',
          title: 'Enfoque estratégico, no experimental',
          title_en: 'Strategic, not experimental, approach',
          description:
            'Diseñamos soluciones aplicables al negocio. Evitamos implementaciones superficiales sin impacto real — cada caso de uso se mide en horas ahorradas o costos evitados.',
          description_en:
            'We design solutions that apply to the business. We avoid superficial implementations with no real impact — each use case is measured in hours saved or costs avoided.',
        },
        {
          metric: 'Seguridad enterprise',
          metric_en: 'Enterprise security',
          title: 'Arquitecturas escalables y seguras',
          title_en: 'Scalable and secure architectures',
          description:
            'Construimos soluciones preparadas para crecimiento, con control de acceso, trazabilidad, observabilidad y mantenimiento a largo plazo.',
          description_en:
            'We build solutions ready to grow, with access control, traceability, observability and long-term maintenance.',
        },
        {
          metric: 'Evolución continua',
          metric_en: 'Continuous evolution',
          title: 'Mejora iterativa de modelos y agentes',
          title_en: 'Iterative improvement of models and agents',
          description:
            'La IA requiere optimización constante. Acompañamos ajustando prompts, recalibrando modelos y refinando agentes a medida que crece el caso de uso.',
          description_en:
            'AI requires constant optimization. We accompany you by tuning prompts, recalibrating models and refining agents as the use case grows.',
        },
      ],
      useCases: [
        {
          title: 'Automatización de back office',
          title_en: 'Back-office automation',
          description:
            'Procesamiento automático de facturas, contratos y documentos administrativos. Extracción, validación y entrada a SAP/ERP sin intervención manual.',
          description_en:
            'Automatic processing of invoices, contracts and administrative documents. Extraction, validation and entry into SAP/ERP without manual intervention.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['IDP', 'RAG', 'LLM'],
        },
        {
          title: 'Asistente conversacional empresarial',
          title_en: 'Enterprise conversational assistant',
          description:
            'Bots que responden consultas de empleados o clientes sobre políticas internas, productos o procesos — conectados a la base de conocimiento real.',
          description_en:
            'Bots that answer employee or customer questions about internal policies, products or processes — connected to the real knowledge base.',
          industry: 'Servicios',
          industry_en: 'Services',
          technologies: ['Chatbot', 'RAG', 'LLM'],
        },
        {
          title: 'Agente para soporte técnico',
          title_en: 'Agent for technical support',
          description:
            'Triage automático de tickets, ejecución de acciones (reset, lookup, escalado) y resolución de incidentes de baja complejidad sin intervención humana.',
          description_en:
            'Automatic ticket triage, action execution (reset, lookup, escalation) and resolution of low-complexity incidents without human intervention.',
          industry: 'IT & Operaciones',
          industry_en: 'IT & Operations',
          technologies: ['Agents', 'MCP', 'LLM'],
        },
        {
          title: 'Análisis predictivo y detección de anomalías',
          title_en: 'Predictive analysis and anomaly detection',
          description:
            'Detección temprana de fraudes, fallas de equipos o caídas de demanda combinando datos históricos y señales en tiempo real.',
          description_en:
            'Early detection of fraud, equipment failures or demand drops by combining historical data and real-time signals.',
          industry: 'Industria & Finanzas',
          industry_en: 'Industry & Finance',
          technologies: ['ML', 'Embeddings', 'Analytics'],
        },
      ],
      techStack: [
        { label: 'LLMs', icon: Brain },
        { label: 'Frameworks', icon: Boxes },
        { label: 'Vector Databases', icon: Database },
        { label: 'Data Extraction', label_en: 'Data Extraction', icon: FileText },
        { label: 'Open LLMs Access', icon: Plug },
        { label: 'Text Embeddings', icon: Sparkles },
        { label: 'Evaluation', icon: Target },
      ],
      horizonte: {
        text:
          'SAP presenta la Empresa Autónoma: un modelo en el que Joule Work, la Autonomous Suite y la SAP Business AI Platform trabajan juntos para que los equipos deleguen tareas rutinarias a asistentes y agentes, y se concentren en decisiones estratégicas. SAP y Anthropic colaboran para integrar Claude como capacidad central de razonamiento en la plataforma SAP Business AI, operando en finanzas, RRHH, compras y cadena de suministro con comprensión del contexto empresarial de SAP. Acompañamos a las organizaciones en su camino hacia este nuevo modelo de trabajo.',
        text_en:
          'SAP introduces the Autonomous Enterprise: a model where Joule Work, the Autonomous Suite and the SAP Business AI Platform work together so teams can delegate routine tasks to assistants and agents and focus on strategic decisions. SAP and Anthropic are collaborating to integrate Claude as a core reasoning capability within the SAP Business AI platform, operating across finance, HR, procurement and supply chain with an understanding of SAP\'s business context. We guide organizations on their path toward this new way of working.',
      },
      relatedTechIds: ['signavio', 'btp', 'nextgen', 'abap'],
      faq: [
        {
          q: '¿Cómo arranca un proyecto de IA en mi empresa?',
          q_en: 'How does an AI project start at my company?',
          a: 'Con un PoC acotado de 4-6 semanas sobre el caso de mayor valor. Si los resultados validan la hipótesis, escalamos a piloto y luego a producción. Nada se construye sin métricas de éxito definidas desde el día 1.',
          a_en: 'With a focused 4-6 week PoC on the highest-value case. If results validate the hypothesis, we scale to a pilot and then to production. Nothing is built without success metrics defined from day 1.',
        },
        {
          q: '¿Mis datos quedan expuestos al usar LLMs?',
          q_en: 'Are my data exposed when using LLMs?',
          a: 'No. Trabajamos con esquemas que respetan la privacidad: modelos privados en la nube de tu proveedor, on-premise cuando aplica, y arquitecturas RAG donde el modelo nunca ve el dato sensible directamente.',
          a_en: 'No. We work with privacy-respecting schemes: private models in your provider\'s cloud, on-premise when applicable, and RAG architectures where the model never sees sensitive data directly.',
        },
        {
          q: '¿Qué pasa si los modelos cambian o aparecen mejores?',
          q_en: 'What happens if models change or better ones appear?',
          a: 'La arquitectura está desacoplada del proveedor de LLM. Cambiar de OpenAI a Anthropic, Google o un modelo open-source es transparente para el resto del sistema.',
          a_en: 'The architecture is decoupled from the LLM provider. Switching from OpenAI to Anthropic, Google or an open-source model is transparent to the rest of the system.',
        },
        {
          q: '¿Necesito un equipo de data science interno?',
          q_en: 'Do I need an internal data science team?',
          a: 'No es obligatorio. Operamos con tu equipo si existe, o entregamos llave en mano con transferencia de conocimiento y documentación. Lo que sí necesitás es un sponsor del negocio claro.',
          a_en: 'Not required. We operate with your team if you have one, or deliver turnkey with knowledge transfer and documentation. What you do need is a clear business sponsor.',
        },
        {
          q: '¿Se integra con SAP?',
          q_en: 'Does it integrate with SAP?',
          a: 'Sí, y es uno de nuestros diferenciales. Conectamos IA con S/4HANA, SAP BTP, Signavio y sistemas custom vía OData, APIs REST y los conectores nativos del ecosistema SAP.',
          a_en: 'Yes, and it\'s one of our differentiators. We connect AI to S/4HANA, SAP BTP, Signavio and custom systems via OData, REST APIs and SAP\'s native ecosystem connectors.',
        },
        {
          q: '¿Cuánto cuesta un proyecto de IA típico?',
          q_en: 'How much does a typical AI project cost?',
          a: 'Depende del alcance, pero un PoC sólido suele estar entre 4-8 semanas de equipo dedicado. La inversión recurrente posterior se justifica con el ROI del caso de uso elegido.',
          a_en: 'It depends on scope, but a solid PoC is usually 4-8 weeks of dedicated team work. The recurring investment afterwards is justified by the ROI of the chosen use case.',
        },
      ],
      metaTitle: 'IA Empresarial: Chatbots, Agentes e IDP',
      metaTitle_en: 'Enterprise AI: Chatbots, Agents and IDP',
      metaDescription:
        'Soluciones de IA aplicada al negocio. Chatbots, agentes autónomos, lectura inteligente de documentos y RAG integrados con SAP por GoTechy.',
      metaDescription_en:
        'AI solutions applied to business. Chatbots, autonomous agents, intelligent document processing and RAG integrated with SAP by GoTechy.',
    },
  },
  {
    id: 'signavio',
    slug: 'sap-signavio',
    title: 'SAP Signavio',
    title_en: 'SAP Signavio',
    short: 'Process Intelligence con IA',
    short_en: 'AI-powered Process Intelligence',
    description:
      'Descubrimiento, gobernanza y transformación de procesos end-to-end — ahora potenciada con Joule, agentes de mejora continua y atomización de reglas de negocio.',
    description_en:
      'End-to-end process discovery, governance and transformation — now powered by Joule, continuous-improvement agents and atomized business rules.',
    icon: Workflow,
    accent: 'accent',
    tags: ['Process Mining', 'Joule', 'Governance', 'Atoms'],
    detail: {
      tagline:
        'Visibilidad total de tus procesos. Mejora lo que realmente ocurre.',
      tagline_en:
        'Total visibility into your processes. Improve what actually happens.',
      heroImage:
        '/images/SAPSignavio-1.png',
      overviewImage: '/images/SAPSignavio-2.png',
      overviewParagraphs: [
        'Implementamos SAP Signavio para que identifiques cuellos de botella, modeles procesos y tomes decisiones basadas en datos reales.',
        'Transformamos el proceso teórico en inteligencia operativa que impulsa mejoras medibles y sostenibles.',
        'Conectamos el modelado con la ejecución: lo que se diseña se mide, se monitorea y se mejora, con métricas auditables y trazabilidad de punta a punta.',
      ],
      overviewParagraphs_en: [
        'We implement SAP Signavio so you can spot bottlenecks, model processes and make decisions based on real data.',
        'We turn the theoretical process into operational intelligence that drives measurable, sustainable improvement.',
        'We connect modeling with execution: what gets designed is measured, monitored and improved — with auditable metrics and end-to-end traceability.',
      ],
      stats: {
        eyebrow: 'La suite en números',
        eyebrow_en: 'The suite in numbers',
        title: 'Lo que cubre SAP Signavio',
        title_en: 'What SAP Signavio covers',
        items: [
          { value: '+90', label: 'Flujos de procesos', label_en: 'Process flows' },
          { value: '+900', label: 'Recomendaciones', label_en: 'Recommendations' },
          { value: '9', label: 'Líneas de negocio', label_en: 'Lines of business' },
          { value: '7', label: 'Procesos End-to-End', label_en: 'End-to-End processes' },
        ],
      },
      features: [
        { icon: Search, title: 'Process Mining sobre datos SAP', title_en: 'Process Mining on SAP data' },
        { icon: Workflow, title: 'Modelado colaborativo BPMN 2.0', title_en: 'Collaborative BPMN 2.0 modeling' },
        { icon: Activity, title: 'Simulación de escenarios de mejora', title_en: 'Improvement scenario simulation' },
        { icon: BarChart3, title: 'KPIs y dashboards en tiempo real', title_en: 'Real-time KPIs and dashboards' },
        { icon: GitBranch, title: 'Journey Modeler end-to-end', title_en: 'End-to-end Journey Modeler' },
        { icon: Users, title: 'Gestión del cambio organizacional', title_en: 'Organizational change management' },
      ],
      benefits: [
        {
          metric: '360° end-to-end',
          metric_en: '360° end-to-end',
          title: 'Visibilidad y transparencia',
          title_en: 'Visibility and transparency',
          description:
            'Facilita la toma de decisiones informadas con datos reales y la alineación estratégica de los procesos con los objetivos del negocio.',
          description_en:
            'Enables informed decision-making with real data and strategic alignment of processes with business objectives.',
        },
        {
          metric: 'Hasta -40% costos',
          metric_en: 'Up to -40% costs',
          title: 'Optimización de procesos empresariales',
          title_en: 'Business process optimization',
          description:
            'El descubrimiento automático y la simulación what-if permiten eliminar reprocesos, cuellos de botella y maverick buying — con impacto directo en margen.',
          description_en:
            'Automatic discovery and what-if simulation eliminate reworks, bottlenecks and maverick buying — with direct margin impact.',
        },
        {
          metric: '3x más rápido',
          metric_en: '3x faster',
          title: 'Adaptación a cambios dinámicos',
          title_en: 'Adaptation to dynamic change',
          description:
            'Capacidad para gestionar transformaciones organizacionales y responder con agilidad a nuevos escenarios de mercado, regulación o expansión.',
          description_en:
            'Ability to manage organizational transformations and respond with agility to new market, regulatory or expansion scenarios.',
        },
        {
          metric: 'Gobernanza nativa',
          metric_en: 'Native governance',
          title: 'Procesos auditables y conformes',
          title_en: 'Auditable and compliant processes',
          description:
            'Cada cambio de proceso queda versionado, aprobado y trazable. Listo para auditorías SOX, SOC y normativas sectoriales sin esfuerzo extra.',
          description_en:
            'Every process change is versioned, approved and traceable. Ready for SOX, SOC and industry regulatory audits with no extra effort.',
        },
      ],
      useCases: [
        {
          title: 'Optimización Order-to-Cash',
          title_en: 'Order-to-Cash optimization',
          description:
            'Detectamos reprocesos, holds y desviaciones del estándar en el ciclo de venta. Resultados: menos DSO, menos cancelaciones, más cash flow.',
          description_en:
            'We detect reworks, holds and standard deviations in the sales cycle. Results: lower DSO, fewer cancellations, more cash flow.',
          industry: 'Retail & Manufactura',
          industry_en: 'Retail & Manufacturing',
          technologies: ['Process Mining', 'SAP S/4HANA', 'Salesforce'],
        },
        {
          title: 'Eficiencia Procure-to-Pay',
          title_en: 'Procure-to-Pay efficiency',
          description:
            'Visibilidad sobre tiempos de aprobación, maverick buying y pagos fuera de término. Ahorros directos en working capital.',
          description_en:
            'Visibility into approval times, maverick buying and overdue payments. Direct savings on working capital.',
          industry: 'Industria & Servicios',
          industry_en: 'Industry & Services',
          technologies: ['SAP MM', 'Ariba', 'Process Insights'],
        },
        {
          title: 'Compliance y auditoría',
          title_en: 'Compliance and audit',
          description:
            'Demostrar el control interno de procesos críticos con evidencia de minería, no con muestras. Auditorías más rápidas y baratas.',
          description_en:
            'Prove internal control of critical processes with mining evidence, not samples. Faster and cheaper audits.',
          industry: 'Banca & Seguros',
          industry_en: 'Banking & Insurance',
          technologies: ['Process Governance', 'SOX', 'GRC'],
        },
        {
          title: 'Preparación para S/4HANA',
          title_en: 'Preparation for S/4HANA',
          description:
            'Antes del greenfield/brownfield: entender el proceso actual y diseñar el target con datos. Cero sorpresas en go-live.',
          description_en:
            'Before greenfield/brownfield: understand the current process and design the target with data. Zero surprises on go-live.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['SAP Signavio', 'S/4HANA', 'Activate'],
        },
      ],
      horizonte: {
        text:
          'Signavio incorpora asistentes y agentes Joule que permiten a usuarios sin experiencia analítica realizar análisis sofisticados en lenguaje natural. El nuevo Asistente para la Transformación de Procesos combina múltiples agentes especializados para guiar a las organizaciones en su transformación. Además, los Process Atoms definen reglas y restricciones para que los agentes de IA operen dentro de los límites regulatorios y operativos de tu empresa, y la Corporate Memory centraliza el conocimiento organizacional para gobernar la ejecución de múltiples agentes a escala.',
        text_en:
          'Signavio adds Joule assistants and agents that let users with no analytics background run sophisticated analyses in natural language. The new Process Transformation Assistant combines multiple specialized agents to guide organizations through their transformation. Process Atoms define rules and constraints so AI agents operate within your company\'s regulatory and operational limits, and Corporate Memory centralizes organizational knowledge to govern the execution of multiple agents at scale.',
      },
      relatedTechIds: ['btp', 'leanix', 'pm', 'ia'],
      faq: [
        {
          q: '¿Necesito tener SAP para usar Signavio?',
          q_en: 'Do I need to have SAP to use Signavio?',
          a: 'No. Signavio puede conectarse a cualquier sistema que genere logs de eventos: SAP ECC, S/4HANA, Salesforce, Oracle, ServiceNow, sistemas custom, etc. Donde mejor explota es cuando se combinan varias fuentes en un mismo proceso end-to-end.',
          a_en: 'No. Signavio can connect to any system that generates event logs: SAP ECC, S/4HANA, Salesforce, Oracle, ServiceNow, custom systems, etc. It shines when several sources are combined into a single end-to-end process.',
        },
        {
          q: '¿En cuánto tiempo veo el primer resultado?',
          q_en: 'How long until I see the first result?',
          a: 'En un Process Mining piloto típico tenés el descubrimiento del proceso actual y los primeros insights accionables en 4 a 6 semanas. El despliegue completo de la suite depende del alcance pero los primeros quick wins son rápidos.',
          a_en: 'In a typical Process Mining pilot you get current process discovery and the first actionable insights in 4 to 6 weeks. Full suite deployment depends on scope but the first quick wins arrive fast.',
        },
        {
          q: '¿Qué diferencia hay entre Signavio y otras herramientas de BPM?',
          q_en: 'What\'s the difference between Signavio and other BPM tools?',
          a: 'Signavio combina modelado, gobierno, descubrimiento automático (Process Mining) y journeys de cliente en una sola plataforma — algo que en el mercado generalmente requiere herramientas separadas. Además es la apuesta estratégica de SAP, lo que asegura integración nativa con S/4HANA.',
          a_en: 'Signavio combines modeling, governance, automatic discovery (Process Mining) and customer journeys on a single platform — something that normally requires separate tools in the market. It\'s also SAP\'s strategic bet, ensuring native integration with S/4HANA.',
        },
        {
          q: '¿Cómo arranca un proyecto con GoTechy?',
          q_en: 'How does a project with GoTechy start?',
          a: 'Empezamos con un workshop de assessment (1-2 semanas) donde identificamos el proceso de mayor impacto y definimos el caso de uso piloto. A partir de ahí proponemos un roadmap con quick wins y objetivos medibles a 90, 180 y 365 días.',
          a_en: 'We start with an assessment workshop (1-2 weeks) where we identify the highest-impact process and define the pilot use case. From there we propose a roadmap with quick wins and measurable goals at 90, 180 and 365 days.',
        },
        {
          q: '¿Quién opera la herramienta después de la implementación?',
          q_en: 'Who operates the tool after implementation?',
          a: 'Lo definimos según tu modelo operativo: podemos hacer transferencia full a tu equipo, operar nosotros bajo un esquema gestionado, o un híbrido. La adopción es parte del proyecto, no un anexo.',
          a_en: 'We define it based on your operating model: full handover to your team, operate it ourselves as a managed service, or a hybrid. Adoption is part of the project, not an annex.',
        },
        {
          q: '¿Signavio reemplaza a SAP LeanIX?',
          q_en: 'Does Signavio replace SAP LeanIX?',
          a: 'Son complementarios. LeanIX mira la arquitectura empresarial (qué aplicaciones tengo y cómo se relacionan); Signavio mira los procesos que corren sobre esas aplicaciones. Juntos te dan la foto completa del “qué” y el “cómo”.',
          a_en: 'They\'re complementary. LeanIX looks at enterprise architecture (which applications I have and how they relate); Signavio looks at the processes that run on those applications. Together they give you the complete picture of "what" and "how".',
        },
      ],
      metaTitle: 'SAP Signavio: Process Intelligence y Process Mining',
      metaTitle_en: 'SAP Signavio: Process Intelligence and Process Mining',
      metaDescription:
        'Descubrí, modelá y optimizá tus procesos end-to-end con SAP Signavio. Implementación, Process Mining y mejora continua por GoTechy.',
      metaDescription_en:
        'Discover, model and optimize your end-to-end processes with SAP Signavio. Implementation, Process Mining and continuous improvement by GoTechy.',
    },
  },
  {
    id: 'btp',
    slug: 'sap-btp',
    title: 'SAP BTP',
    title_en: 'SAP BTP',
    short: 'Plataforma de IA, datos e integración',
    short_en: 'AI, data and integration platform',
    description:
      'La base sobre la que vive SAP Business AI Platform, Joule Studio, Integration Suite y Business Data Cloud. Donde se construye el futuro de SAP.',
    description_en:
      'The foundation that hosts SAP Business AI Platform, Joule Studio, Integration Suite and Business Data Cloud. Where the future of SAP is built.',
    icon: Cloud,
    accent: 'secondary',
    tags: ['Business AI Platform', 'Joule Studio', 'BDC', 'Integration Suite'],
    detail: {
      tagline:
        'La plataforma que conecta, automatiza y extiende tu ecosistema SAP.',
      tagline_en:
        'The platform that connects, automates and extends your SAP ecosystem.',
      heroImage:
        '/images/SAPBTP-1.png',
      overviewImage: '/images/SAPBTP-2.png',
      overviewParagraphs: [
        'Implementamos SAP BTP para integrar sistemas, automatizar procesos y desarrollar aplicaciones personalizadas.',
        'Conectamos entornos on-premise y cloud en una plataforma unificada que permite innovar sin reemplazar lo que ya funciona.',
        'Aplicamos el principio de Clean Core: el ERP queda estándar y todo lo custom vive en BTP, para que adoptes cada nueva versión de SAP sin romper tus desarrollos.',
      ],
      overviewParagraphs_en: [
        'We implement SAP BTP to integrate systems, automate processes and build custom applications.',
        'We connect on-premise and cloud environments in a unified platform that lets you innovate without replacing what already works.',
        'We apply the Clean Core principle: the ERP stays standard and everything custom lives in BTP, so you can adopt every new SAP release without breaking your developments.',
      ],
      features: [
        { icon: Plug, title: 'Integración de sistemas y APIs', title_en: 'System and API integration' },
        { icon: Code2, title: 'Desarrollo de extensiones y apps custom', title_en: 'Custom extensions and app development' },
        { icon: Workflow, title: 'Automatización con SAP Build Process Automation', title_en: 'Automation with SAP Build Process Automation' },
        { icon: BarChart3, title: 'Gestión de datos y analíticas', title_en: 'Data management and analytics' },
        { icon: Network, title: 'Conectividad con sistemas externos', title_en: 'Connectivity with external systems' },
        { icon: Wrench, title: 'Soporte y evolución continua', title_en: 'Ongoing support and evolution' },
      ],
      benefits: [
        {
          metric: 'API-first',
          metric_en: 'API-first',
          title: 'Integración perfecta',
          title_en: 'Seamless integration',
          description:
            'Integration Suite con orquestación de agentes, eventos en tiempo real y exposición selectiva de APIs vía MCP — conexión nativa entre sistemas SAP y no SAP.',
          description_en:
            'Integration Suite with agent orchestration, real-time events and selective API exposure via MCP — native connection between SAP and non-SAP systems.',
        },
        {
          metric: '10x más rápido',
          metric_en: '10x faster',
          title: 'Desarrollo ágil de aplicaciones',
          title_en: 'Agile application development',
          description:
            'Joule Studio combina low-code y pro-code con SAP Domain Models. Desarrolladores describen la intención en lenguaje natural y obtienen aplicaciones, agentes y extensiones listos para producción.',
          description_en:
            'Joule Studio combines low-code and pro-code with SAP Domain Models. Developers describe their intent in natural language and get applications, agents and extensions ready for production.',
        },
        {
          metric: 'Tiempo real',
          metric_en: 'Real-time',
          title: 'Análisis avanzado de datos',
          title_en: 'Advanced data analytics',
          description:
            'SAP Business Data Cloud + SAP HANA Cloud nativos: vectores, grafos, relacional y espacial en una sola base. Información estratégica en tiempo real sin importar dónde residan los datos.',
          description_en:
            'Native SAP Business Data Cloud + SAP HANA Cloud: vectors, graphs, relational and spatial in a single database. Strategic information in real time, no matter where the data lives.',
        },
        {
          metric: 'IA gobernada',
          metric_en: 'Governed AI',
          title: 'Automatización inteligente',
          title_en: 'Intelligent automation',
          description:
            'Agentes Joule, modelos abiertos (Claude, Mistral, Cohere) y SAP-RPT-1.5 — todo orquestado bajo SAP AI Agent Hub para gobernanza centralizada y observabilidad por agente.',
          description_en:
            'Joule agents, open models (Claude, Mistral, Cohere) and SAP-RPT-1.5 — all orchestrated under SAP AI Agent Hub for centralized governance and per-agent observability.',
        },
        {
          metric: 'Cloud nativo',
          metric_en: 'Cloud-native',
          title: 'Escalabilidad y flexibilidad',
          title_en: 'Scalability and flexibility',
          description:
            'Cloud Foundry, Kyma y Sovereign Cloud para clientes con requisitos de soberanía. Empezás chico y escalás horizontalmente sin reescribir.',
          description_en:
            'Cloud Foundry, Kyma and Sovereign Cloud for customers with sovereignty requirements. Start small and scale horizontally without rewrites.',
        },
      ],
      useCases: [
        {
          title: 'Extensiones side-by-side de S/4HANA',
          title_en: 'Side-by-side extensions for S/4HANA',
          description:
            'Lógica de negocio custom que extiende S/4HANA sin tocar el core. Compatible con futuros upgrades.',
          description_en:
            'Custom business logic that extends S/4HANA without touching the core. Compatible with future upgrades.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['CAP', 'BTP', 'Fiori'],
        },
        {
          title: 'Integraciones B2B y EDI',
          title_en: 'B2B and EDI integrations',
          description:
            'Conectamos a clientes, proveedores y marketplaces con un iPaaS unificado y monitoreo end-to-end.',
          description_en:
            'We connect customers, suppliers and marketplaces with a unified iPaaS and end-to-end monitoring.',
          industry: 'Manufactura & Logística',
          industry_en: 'Manufacturing & Logistics',
          technologies: ['Integration Suite', 'AS2', 'EDI'],
        },
        {
          title: 'Portales de empleados y clientes',
          title_en: 'Employee and customer portals',
          description:
            'Self-service portals construidos sobre BTP que se integran con SuccessFactors, S/4HANA y CRMs.',
          description_en:
            'Self-service portals built on BTP that integrate with SuccessFactors, S/4HANA and CRMs.',
          industry: 'RRHH & Customer Service',
          industry_en: 'HR & Customer Service',
          technologies: ['Build Apps', 'Fiori', 'UI5'],
        },
        {
          title: 'Plataforma de IA empresarial',
          title_en: 'Enterprise AI platform',
          description:
            'Base para casos de IA productivos: modelos, datos, governance y despliegue, todo gestionado dentro del estándar SAP.',
          description_en:
            'Foundation for production AI use cases: models, data, governance and deployment, all managed within the SAP standard.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['AI Core', 'HANA Cloud', 'BTP'],
        },
      ],
      horizonte: {
        text:
          'SAP BTP evoluciona hacia el núcleo de la Empresa Autónoma. Con Joule Studio integrado, los desarrolladores pueden crear agentes, flujos de trabajo y extensiones usando lenguaje natural, respetando el Clean Core y los estándares de gobernanza SAP. La Integration Suite suma orquestación de agentes, ingesta de datos en tiempo real y un AI Gateway para conectar IA con sistemas SAP y de terceros de forma controlada.',
        text_en:
          'SAP BTP is evolving into the core of the Autonomous Enterprise. With Joule Studio built in, developers can create agents, workflows and extensions using natural language while respecting Clean Core and SAP governance standards. The Integration Suite adds agent orchestration, real-time data ingestion and an AI Gateway to connect AI with SAP and third-party systems in a controlled way.',
      },
      relatedTechIds: ['signavio', 'fiori', 'leanix', 'ia'],
      faq: [
        {
          q: '¿BTP reemplaza el on-premise de SAP?',
          q_en: 'Does BTP replace SAP on-premise?',
          a: 'No. BTP es complementario al ERP (sea ECC o S/4HANA). Es donde construís lo nuevo — apps, integraciones, IA — para que el core quede limpio.',
          a_en: 'No. BTP is complementary to the ERP (whether ECC or S/4HANA). It\'s where you build the new stuff — apps, integrations, AI — so the core stays clean.',
        },
        {
          q: '¿Cuánto cuesta BTP?',
          q_en: 'How much does BTP cost?',
          a: 'Modelo pay-per-use por servicio. Hay un plan free tier para arrancar y los costos crecen con el consumo. Te ayudamos con el sizing y el cost forecast desde el día 1.',
          a_en: 'Pay-per-use model per service. There\'s a free tier to get started and costs grow with consumption. We help you with sizing and cost forecasting from day 1.',
        },
        {
          q: '¿Necesito reescribir mis customizaciones ABAP?',
          q_en: 'Do I need to rewrite my ABAP customizations?',
          a: 'No de entrada, pero BTP es la oportunidad de mover lentamente la lógica custom fuera del core. Lo hacemos en fases, priorizando lo que más valor da.',
          a_en: 'Not upfront, but BTP is the opportunity to gradually move custom logic out of the core. We do it in phases, prioritizing what brings the most value.',
        },
        {
          q: '¿Qué lenguajes y frameworks soporta?',
          q_en: 'What languages and frameworks does it support?',
          a: 'CAP (Node.js / Java), SAP UI5, Fiori Elements, Build Apps (low-code), workflows BPMN y Python para ML. Todo cloud-native.',
          a_en: 'CAP (Node.js / Java), SAP UI5, Fiori Elements, Build Apps (low-code), BPMN workflows and Python for ML. All cloud-native.',
        },
        {
          q: '¿Cómo se gestiona la seguridad?',
          q_en: 'How is security managed?',
          a: 'Identity Authentication y Authorization de SAP, integración con tu IdP (Azure AD, Okta, etc.), Cloud Connector para conectar a sistemas on-prem de forma segura.',
          a_en: 'SAP Identity Authentication and Authorization, integration with your IdP (Azure AD, Okta, etc.), Cloud Connector to securely connect to on-prem systems.',
        },
      ],
      metaTitle: 'SAP BTP: Business Technology Platform',
      metaTitle_en: 'SAP BTP: Business Technology Platform',
      metaDescription:
        'Implementación de SAP BTP — integraciones, extensiones, IA y aplicaciones cloud-native. Acelerá la innovación sin tocar el core de S/4HANA.',
      metaDescription_en:
        'SAP BTP implementation — integrations, extensions, AI and cloud-native applications. Accelerate innovation without touching the S/4HANA core.',
    },
  },
  {
    id: 'leanix',
    slug: 'sap-leanix',
    title: 'SAP LeanIX',
    title_en: 'SAP LeanIX',
    short: 'Enterprise Architecture + IA Agent Hub',
    short_en: 'Enterprise Architecture + AI Agent Hub',
    description:
      'Visibilidad de capabilities, aplicaciones y dependencias — el lugar desde donde se gobierna también el inventario de agentes de IA de toda la empresa.',
    description_en:
      'Visibility into capabilities, applications and dependencies — also the place to govern the AI agent inventory of the entire enterprise.',
    icon: LayoutGrid,
    accent: 'accent',
    tags: ['EA', 'AI Agent Hub', 'Fact Sheets', 'Governance'],
    detail: {
      tagline:
        'Conocé tu arquitectura tecnológica. Decidí con claridad.',
      tagline_en:
        'Know your technology architecture. Decide with clarity.',
      heroImage:
        '/images/LEANIX-1.png',
      overviewImage: '/images/LEANIX-2.png',
      overviewParagraphs: [
        'Implementamos SAP LeanIX para mapear, analizar y optimizar el portfolio de aplicaciones de tu empresa.',
        'Eliminá redundancias, gestioná deuda técnica y planificá tu roadmap tecnológico con visibilidad real sobre cada sistema y su ciclo de vida.',
        'Convertimos un inventario disperso en una única fuente de verdad: cada aplicación queda documentada, evaluada y con un dueño asignado, lista para sostener decisiones de arquitectura con datos.',
      ],
      overviewParagraphs_en: [
        'We implement SAP LeanIX to map, analyze and optimize your company\'s application portfolio.',
        'Eliminate redundancies, manage technical debt and plan your technology roadmap with real visibility into every system and its lifecycle.',
        'We turn a scattered inventory into a single source of truth: every application is documented, assessed and assigned an owner — ready to back architecture decisions with data.',
      ],
      features: [
        { icon: LayoutGrid, title: 'Application Portfolio Management', title_en: 'Application Portfolio Management' },
        { icon: Network, title: 'Mapeo de arquitectura empresarial', title_en: 'Enterprise architecture mapping' },
        { icon: Cloud, title: 'Evaluación de cloud readiness', title_en: 'Cloud readiness assessment' },
        { icon: GitBranch, title: 'Gestión del ciclo de vida de aplicaciones', title_en: 'Application lifecycle management' },
        { icon: Plug, title: 'Integración nativa con Signavio y BTP', title_en: 'Native integration with Signavio and BTP' },
        { icon: BarChart3, title: 'Reporting para CIOs y equipos técnicos', title_en: 'Reporting for CIOs and technical teams' },
      ],
      benefits: [
        {
          metric: '+50% más rápido',
          metric_en: '+50% faster',
          title: 'Acelerar las transformaciones',
          title_en: 'Accelerate transformations',
          description:
            'Lenguaje común y fuente única de verdad para toda la organización — decisiones de arquitectura que antes tomaban semanas, ahora salen en días.',
          description_en:
            'Common language and single source of truth for the entire organization — architecture decisions that used to take weeks now ship in days.',
        },
        {
          metric: '360° riesgo',
          metric_en: '360° risk',
          title: 'Identificar y gestionar riesgos',
          title_en: 'Identify and manage risks',
          description:
            'Visibilidad multidimensional sobre aplicaciones, tecnologías y dependencias para detectar obsolescencias, deuda técnica y riesgos de seguridad antes de que impacten el negocio.',
          description_en:
            'Multidimensional visibility into applications, technologies and dependencies to detect obsolescence, technical debt and security risks before they impact the business.',
        },
        {
          metric: 'Roadmaps medibles',
          metric_en: 'Measurable roadmaps',
          title: 'Apoyar la transformación ágil',
          title_en: 'Support agile transformation',
          description:
            'Hojas de ruta, planificación de escenarios y análisis de impacto — alineados con SAP Cloud ALM y Signavio para conectar arquitectura, procesos y ejecución.',
          description_en:
            'Roadmaps, scenario planning and impact analysis — aligned with SAP Cloud ALM and Signavio to connect architecture, processes and execution.',
        },
        {
          metric: 'IA bajo control',
          metric_en: 'AI under control',
          title: 'Gobernanza centralizada de agentes',
          title_en: 'Centralized agent governance',
          description:
            'SAP AI Agent Hub dentro de LeanIX: registro, observabilidad y verificación de cada agente, LLM y servidor MCP — sin importar la plataforma donde corra.',
          description_en:
            'SAP AI Agent Hub inside LeanIX: registration, observability and verification of every agent, LLM and MCP server — regardless of the platform it runs on.',
        },
      ],
      useCases: [
        {
          title: 'Cloud Readiness Assessment',
          title_en: 'Cloud Readiness Assessment',
          description:
            'Evaluamos el portfolio completo y priorizamos qué aplicaciones migrar, refactorizar o retirar antes del move to cloud.',
          description_en:
            'We evaluate the full portfolio and prioritize which applications to migrate, refactor or retire before moving to cloud.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['LeanIX', 'AWS', 'Azure'],
        },
        {
          title: 'M&A consolidation',
          title_en: 'M&A consolidation',
          description:
            'Mergers y adquisiciones: identificamos overlap funcional, dependencias y duplicación para acelerar la consolidación post-deal.',
          description_en:
            'Mergers and acquisitions: we identify functional overlap, dependencies and duplication to accelerate post-deal consolidation.',
          industry: 'Corporate',
          industry_en: 'Corporate',
          technologies: ['APM', 'EA'],
        },
        {
          title: 'Preparación para S/4HANA',
          title_en: 'S/4HANA preparation',
          description:
            'Antes del proyecto de migración: foto completa del landscape, dependencias y custom code a refactorizar.',
          description_en:
            'Before the migration project: a complete snapshot of the landscape, dependencies and custom code to refactor.',
          industry: 'SAP customers',
          industry_en: 'SAP customers',
          technologies: ['LeanIX', 'Signavio', 'S/4HANA'],
        },
        {
          title: 'Gestión de deuda técnica',
          title_en: 'Technical debt management',
          description:
            'Identificación, cuantificación y plan de pago de la deuda técnica con visibilidad ejecutiva.',
          description_en:
            'Identification, quantification and pay-down plan for technical debt with executive visibility.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['LeanIX', 'TBM'],
        },
      ],
      horizonte: {
        text:
          'El Asistente de Arquitectura Empresarial de LeanIX convierte documentos internos en datos estructurados y enriquece las fichas técnicas con investigación externa de forma automática. Integrado con SAP AI Agent Hub, los equipos pueden inventariar, evaluar y gobernar todos los agentes de IA de la organización con visibilidad completa de quién los usa, qué hacen y cómo se alinean con la arquitectura empresarial.',
        text_en:
          'LeanIX\'s Enterprise Architecture Assistant turns internal documents into structured data and automatically enriches fact sheets with external research. Integrated with SAP AI Agent Hub, teams can inventory, assess and govern every AI agent in the organization with full visibility into who uses them, what they do and how they align with the enterprise architecture.',
      },
      relatedTechIds: ['signavio', 'btp', 'basis', 'pm'],
      faq: [
        {
          q: '¿Cuánto tiempo lleva implementar LeanIX?',
          q_en: 'How long does it take to implement LeanIX?',
          a: 'Con el Meta Model predefinido y el Inventory Builder, una implementación inicial de calidad lleva 6-10 semanas hasta tener el primer reporting ejecutivo.',
          a_en: 'With the predefined Meta Model and the Inventory Builder, a quality initial implementation takes 6-10 weeks until you have the first executive reporting.',
        },
        {
          q: '¿Cómo se carga el inventario inicial?',
          q_en: 'How is the initial inventory loaded?',
          a: 'Combinamos el Inventory Builder con IA, integraciones con CMDB/SSO/cloud providers y workshops con stakeholders. No es manual.',
          a_en: 'We combine the AI-powered Inventory Builder, integrations with CMDB/SSO/cloud providers and stakeholder workshops. It\'s not manual.',
        },
        {
          q: '¿Quién mantiene el inventario actualizado después?',
          q_en: 'Who keeps the inventory updated afterwards?',
          a: 'LeanIX se conecta a las fuentes de verdad técnicas (Azure, AWS, ServiceNow, GitHub, etc.) y se actualiza automáticamente. El mantenimiento manual es mínimo.',
          a_en: 'LeanIX connects to the technical sources of truth (Azure, AWS, ServiceNow, GitHub, etc.) and updates automatically. Manual maintenance is minimal.',
        },
        {
          q: '¿Cómo se diferencia de un CMDB?',
          q_en: 'How does it differ from a CMDB?',
          a: 'El CMDB se enfoca en lo técnico/operacional (servers, configs). LeanIX agrega la perspectiva de negocio: capabilities, costos, ciclo de vida y estrategia. Se complementan.',
          a_en: 'The CMDB focuses on the technical/operational (servers, configs). LeanIX adds the business perspective: capabilities, costs, lifecycle and strategy. They complement each other.',
        },
        {
          q: '¿Necesito tener todo SAP para usarlo?',
          q_en: 'Do I need to have everything in SAP to use it?',
          a: 'No. LeanIX cubre todo el portfolio de TI, sea SAP o no. Donde se potencia es al combinarlo con Signavio y S/4HANA.',
          a_en: 'No. LeanIX covers the full IT portfolio, SAP or not. Where it really shines is in combination with Signavio and S/4HANA.',
        },
      ],
      metaTitle: 'SAP LeanIX: Enterprise Architecture Management',
      metaTitle_en: 'SAP LeanIX: Enterprise Architecture Management',
      metaDescription:
        'Visibilidad total del portfolio de aplicaciones y arquitectura empresarial con SAP LeanIX. Decisiones de cloud, M&A y S/4HANA con datos por GoTechy.',
      metaDescription_en:
        'Total visibility into the application portfolio and enterprise architecture with SAP LeanIX. Cloud, M&A and S/4HANA decisions backed by data, from GoTechy.',
    },
  },
  {
    id: 'basis',
    slug: 'sap-basis',
    title: 'SAP Basis',
    title_en: 'SAP Basis',
    short: 'Cloud ERP, RISE y Clean Core',
    short_en: 'Cloud ERP, RISE and Clean Core',
    description:
      'Operación, performance y migraciones a Cloud ERP — con los nuevos asistentes Joule de migración y modernización que aceleran la adopción del Clean Core.',
    description_en:
      'Operations, performance and Cloud ERP migrations — with the new Joule migration and modernization assistants that speed up Clean Core adoption.',
    icon: Server,
    accent: 'secondary',
    tags: ['Cloud ERP', 'RISE', 'Clean Core', '24/7 Ops'],
    detail: {
      tagline:
        'Tu infraestructura SAP, estable, segura y en buenas manos.',
      tagline_en:
        'Your SAP infrastructure — stable, secure and in good hands.',
      heroImage:
        '/images/SAPBASIS-1.png',
      overviewImage: '/images/SAPBASIS-2.png',
      overviewParagraphs: [
        'Administramos y monitoreamos tu entorno SAP de punta a punta.',
        'Desde la operación diaria hasta upgrades y migraciones complejas, garantizamos disponibilidad, seguridad y rendimiento óptimo con SLAs adaptados a los requerimientos de tu negocio.',
        'Operamos con guardia activa para los entornos productivos críticos y más de 20 años de experiencia en el ecosistema, para que tu equipo se enfoque en el negocio y no en apagar incendios.',
      ],
      overviewParagraphs_en: [
        'We administer and monitor your SAP environment end to end.',
        'From daily operations to complex upgrades and migrations, we guarantee availability, security and optimal performance with SLAs adapted to your business requirements.',
        'We run active on-call for critical production environments, backed by 20+ years in the ecosystem, so your team focuses on the business instead of firefighting.',
      ],
      features: [
        { icon: Server, title: 'Administración SAP (ECC, S/4HANA, BTP)', title_en: 'SAP administration (ECC, S/4HANA, BTP)' },
        { icon: Activity, title: 'Monitoreo proactivo y soporte continuo', title_en: 'Proactive monitoring and ongoing support' },
        { icon: Lock, title: 'Gestión de seguridad y perfiles de usuario', title_en: 'Security and user profile management' },
        { icon: GitMerge, title: 'Upgrades, migraciones y aplicación de patches', title_en: 'Upgrades, migrations and patching' },
        { icon: ShieldCheck, title: 'SLAs personalizados', title_en: 'Customized SLAs' },
        { icon: BarChart3, title: 'Reportes técnicos y ejecutivos', title_en: 'Technical and executive reporting' },
      ],
      benefits: [
        {
          metric: '20+ años',
          metric_en: '20+ years',
          title: 'De experiencia en el ecosistema SAP',
          title_en: 'Of experience in the SAP ecosystem',
          description:
            'Equipo de profesionales con experiencia probada operando ecosistemas SAP críticos en clientes enterprise.',
          description_en:
            'A team of professionals with proven experience operating critical SAP ecosystems at enterprise customers.',
        },
        {
          metric: '24/7',
          metric_en: '24/7',
          title: 'SLA personalizados',
          title_en: 'Customized SLAs',
          description:
            'Acuerdos de nivel de servicio adaptados a los requerimientos específicos de cada cliente y a la criticidad real de cada sistema — con guardia activa para entornos productivos.',
          description_en:
            'Service-level agreements adapted to each customer\'s specific requirements and the real criticality of each system — with active on-call for production environments.',
        },
        {
          metric: 'Clean Core',
          metric_en: 'Clean Core',
          title: 'Mejores prácticas de SAP',
          title_en: 'SAP best practices',
          description:
            'Aplicamos los cinco principios de Clean Core y las metodologías oficiales de SAP — asegurando calidad, certificabilidad y compatibilidad con futuros releases.',
          description_en:
            'We apply the five Clean Core principles and SAP\'s official methodologies — ensuring quality, certifiability and compatibility with future releases.',
        },
        {
          metric: '99.9% uptime',
          metric_en: '99.9% uptime',
          title: 'Confiabilidad y sustentabilidad',
          title_en: 'Reliability and sustainability',
          description:
            'Operación continua de infraestructura SAP crítica con alta disponibilidad, planes de DR, monitoreo proactivo y mantenimiento preventivo.',
          description_en:
            'Continuous operation of critical SAP infrastructure with high availability, DR plans, proactive monitoring and preventive maintenance.',
        },
      ],
      useCases: [
        {
          title: 'Operación delegada de SAP',
          title_en: 'Delegated SAP operations',
          description:
            'Managed service de operación, monitoreo y soporte L1-L3 con SLAs claros.',
          description_en:
            'Managed service for operations, monitoring and L1-L3 support with clear SLAs.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['SAP Basis', 'SolMan', 'S/4HANA'],
        },
        {
          title: 'Migración a S/4HANA',
          title_en: 'Migration to S/4HANA',
          description:
            'Conversiones brownfield y greenfield con metodología SAP Activate. Dry-runs, pre-checks y cutover ensayado.',
          description_en:
            'Brownfield and greenfield conversions with SAP Activate methodology. Dry-runs, pre-checks and rehearsed cutover.',
          industry: 'SAP customers',
          industry_en: 'SAP customers',
          technologies: ['S/4HANA', 'HANA', 'Basis'],
        },
        {
          title: 'Setup de alta disponibilidad y DR',
          title_en: 'High availability and DR setup',
          description:
            'Arquitecturas de HA y DR para sistemas críticos. Pruebas de failover periódicas como parte del SLA.',
          description_en:
            'HA and DR architectures for critical systems. Periodic failover testing as part of the SLA.',
          industry: 'Industria & Banca',
          industry_en: 'Industry & Banking',
          technologies: ['HANA', 'Replication', 'DR'],
        },
        {
          title: 'Performance tuning y troubleshooting',
          title_en: 'Performance tuning and troubleshooting',
          description:
            'Diagnóstico y resolución de problemas de performance en sistemas productivos.',
          description_en:
            'Diagnosis and resolution of performance issues in production systems.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Basis', 'HANA', 'Workload analysis'],
        },
      ],
      horizonte: {
        text:
          'SAP Cloud ALM se consolida como la plataforma central de operaciones para entornos cloud, con capacidades de resolución de casos asistida por agentes de IA que analizan incidentes, detectan duplicados y acortan los tiempos de resolución. Acompañamos esa transición para que no pierdas visibilidad ni control durante el cambio.',
        text_en:
          'SAP Cloud ALM is consolidating as the central operations platform for cloud environments, with AI-agent-assisted case resolution that analyzes incidents, detects duplicates and shortens resolution times. We support that transition so you don\'t lose visibility or control during the change.',
      },
      relatedTechIds: ['btp', 'leanix', 'abap', 'pm'],
      faq: [
        {
          q: '¿Operan sistemas en cualquier nube?',
          q_en: 'Do you operate systems on any cloud?',
          a: 'Sí: AWS, Azure, GCP y SAP RISE, además de on-premise y nubes privadas. La metodología es la misma, cambian las herramientas y los runbooks.',
          a_en: 'Yes: AWS, Azure, GCP and SAP RISE, plus on-premise and private clouds. The methodology is the same; the tools and runbooks change.',
        },
        {
          q: '¿Cuál es el modelo de contrato típico?',
          q_en: 'What is the typical contract model?',
          a: 'Contratos mensuales con SLA y horas de cobertura definidas. Modelos full-managed, híbrido o staff augmentation según necesidad.',
          a_en: 'Monthly contracts with defined SLA and coverage hours. Fully managed, hybrid or staff augmentation models depending on the need.',
        },
        {
          q: '¿Cómo es el handover si ya tengo un proveedor actual?',
          q_en: 'What does the handover look like if I already have a current provider?',
          a: 'Plan de transición ordenado de 4-8 semanas: inventario, documentación, runbooks, accesos y shadow period antes del go-live operacional.',
          a_en: 'An orderly 4-8 week transition plan: inventory, documentation, runbooks, access and a shadow period before the operational go-live.',
        },
        {
          q: '¿Hacen migraciones a S/4HANA llave en mano?',
          q_en: 'Do you do turnkey S/4HANA migrations?',
          a: 'Sí. Combinamos Basis (capa técnica), funcional y PM. Conversion, greenfield o selective data transition según el caso.',
          a_en: 'Yes. We combine Basis (technical layer), functional and PM. Conversion, greenfield or selective data transition depending on the case.',
        },
        {
          q: '¿Qué pasa si hay un incidente fuera de horario?',
          q_en: 'What happens if there\'s an out-of-hours incident?',
          a: 'Con SLA 24/7 hay un equipo de guardia con tiempos de respuesta acordados. Para SLAs business hours respondemos en horario laboral.',
          a_en: 'With a 24/7 SLA there is an on-call team with agreed response times. For business-hours SLAs we respond during business hours.',
        },
      ],
      metaTitle: 'SAP Basis: Operación, Infraestructura y Migraciones',
      metaTitle_en: 'SAP Basis: Operations, Infrastructure and Migrations',
      metaDescription:
        'Operación y soporte de sistemas SAP 24/7 — Basis, migraciones a S/4HANA, HA y DR. Más de 20 años con SLAs personalizados por GoTechy.',
      metaDescription_en:
        '24/7 SAP systems operation and support — Basis, S/4HANA migrations, HA and DR. Over 20 years with customized SLAs by GoTechy.',
    },
  },
  {
    id: 'fiori',
    slug: 'sap-fiori',
    title: 'SAP Fiori',
    title_en: 'SAP Fiori',
    short: 'UX moderna + Joule Work',
    short_en: 'Modern UX + Joule Work',
    description:
      'Apps Fiori transaccionales combinadas con Joule Work — la nueva capa de interacción que SAP definió como la cara visible de la Empresa Autónoma.',
    description_en:
      'Transactional Fiori apps combined with Joule Work — the new interaction layer SAP defined as the visible face of the Autonomous Enterprise.',
    icon: MonitorSmartphone,
    accent: 'accent',
    tags: ['Fiori Elements', 'UI5', 'Joule Work', 'UX'],
    detail: {
      tagline:
        'SAP en cualquier dispositivo. Simple, rápido, sin fricciones.',
      tagline_en:
        'SAP on any device. Simple, fast, frictionless.',
      heroImage:
        '/images/SAPFIORI-1.png',
      overviewImage: '/images/SAPFIORI-2.png',
      overviewParagraphs: [
        'Modernizamos la experiencia de usuario de SAP con Fiori.',
        'Interfaces intuitivas y responsive que reducen la curva de aprendizaje, mejoran la productividad y hacen que el trabajo en SAP sea más ágil desde cualquier dispositivo.',
        'Combinamos apps estándar y desarrollos a medida sobre SAPUI5 y Fiori Elements, integrados con S/4HANA y BTP, para que cada rol acceda exactamente a lo que necesita.',
      ],
      overviewParagraphs_en: [
        'We modernize the SAP user experience with Fiori.',
        'Intuitive, responsive interfaces that reduce the learning curve, boost productivity and make working in SAP more agile from any device.',
        'We combine standard apps and custom development on SAPUI5 and Fiori Elements, integrated with S/4HANA and BTP, so every role gets exactly what it needs.',
      ],
      features: [
        { icon: Rocket, title: 'Implementación y configuración de SAP Fiori', title_en: 'SAP Fiori implementation and configuration' },
        { icon: Code2, title: 'Desarrollo de apps personalizadas (Fiori Elements / RAP)', title_en: 'Custom app development (Fiori Elements / RAP)' },
        { icon: MonitorSmartphone, title: 'Fiori Launchpad y UX design', title_en: 'Fiori Launchpad and UX design' },
        { icon: Plug, title: 'Integración con S/4HANA y BTP', title_en: 'Integration with S/4HANA and BTP' },
        { icon: Zap, title: 'Optimización de rendimiento', title_en: 'Performance optimization' },
        { icon: Wrench, title: 'Soporte y actualizaciones continuas', title_en: 'Ongoing support and updates' },
      ],
      benefits: [
        {
          metric: 'Cualquier device',
          metric_en: 'Any device',
          title: 'Accesibilidad desde cualquier dispositivo',
          title_en: 'Accessible from any device',
          description:
            'Acceso a SAP desde computadoras, tablets y móviles sin desarrollo separado — y con voz inteligente para empleados que trabajan fuera del teclado (campo, planta, logística).',
          description_en:
            'Access SAP from computers, tablets and mobile without separate development — and with intelligent voice for employees who work away from the keyboard (field, plant, logistics).',
        },
        {
          metric: '-50% onboarding',
          metric_en: '-50% onboarding',
          title: 'Interfaz intuitiva y moderna',
          title_en: 'Intuitive and modern interface',
          description:
            'Facilita la adopción del sistema por parte de los usuarios, reduciendo drásticamente la curva de aprendizaje y el tiempo de onboarding de nuevos empleados.',
          description_en:
            'Makes user adoption easier, drastically reducing the learning curve and onboarding time for new employees.',
        },
        {
          metric: '-40% clicks',
          metric_en: '-40% clicks',
          title: 'Mayor eficiencia y productividad',
          title_en: 'Higher efficiency and productivity',
          description:
            'Navegación simplificada y accesos rápidos permiten realizar tareas en menos tiempo, con menos pantallas y menos confusión.',
          description_en:
            'Simplified navigation and quick access let you complete tasks in less time, with fewer screens and less confusion.',
        },
        {
          metric: '-60% errores',
          metric_en: '-60% errors',
          title: 'Menos errores operativos',
          title_en: 'Fewer operational errors',
          description:
            'Procesos guiados, validaciones inline y estandarización en la visualización ayudan a reducir drásticamente fallos humanos en operaciones críticas.',
          description_en:
            'Guided processes, inline validations and visual standardization drastically reduce human errors in critical operations.',
        },
        {
          metric: '+ROI del ERP',
          metric_en: '+ERP ROI',
          title: 'Mejor experiencia del usuario',
          title_en: 'Better user experience',
          description:
            'Diseño centrado en las necesidades del usuario hace que SAP sea ágil y satisfactorio. Más adopción significa más retorno real de la inversión en el ERP.',
          description_en:
            'User-centered design makes SAP agile and satisfying. More adoption means more real return on the ERP investment.',
        },
      ],
      useCases: [
        {
          title: 'Modernización de transacciones SAP',
          title_en: 'Modernization of SAP transactions',
          description:
            'Reemplazo de transacciones SAP GUI por apps Fiori intuitivas. Aprobaciones, consultas y workflows del día a día.',
          description_en:
            'Replacement of SAP GUI transactions with intuitive Fiori apps. Approvals, queries and day-to-day workflows.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Fiori Elements', 'UI5', 'OData'],
        },
        {
          title: 'Self-service B2B/B2C',
          title_en: 'B2B/B2C self-service',
          description:
            'Portales para clientes y socios con consultas de pedidos, status, pagos y soporte conectados directo a SAP.',
          description_en:
            'Portals for customers and partners with order, status, payment and support queries connected directly to SAP.',
          industry: 'Distribución & Retail',
          industry_en: 'Distribution & Retail',
          technologies: ['Fiori', 'BTP', 'UI5'],
        },
        {
          title: 'Apps mobile para campo',
          title_en: 'Mobile apps for the field',
          description:
            'Técnicos, choferes y operarios con apps que funcionan offline y se sincronizan al volver a conexión.',
          description_en:
            'Technicians, drivers and operators with apps that work offline and sync when the connection comes back.',
          industry: 'Logística & Servicios',
          industry_en: 'Logistics & Services',
          technologies: ['Fiori Mobile', 'UI5', 'BTP'],
        },
        {
          title: 'Aprobaciones y workflows',
          title_en: 'Approvals and workflows',
          description:
            'Inbox unificado de aprobaciones con experiencia consistente en mobile y desktop.',
          description_en:
            'Unified approvals inbox with a consistent experience on mobile and desktop.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Fiori', 'Workflow', 'S/4HANA'],
        },
      ],
      horizonte: {
        text:
          'Joule Work redefine la interacción con SAP más allá de las interfaces transaccionales. Los usuarios expresan sus objetivos en lenguaje natural y los asistentes coordinan agentes para ejecutar tareas en múltiples sistemas sin necesidad de navegar entre pantallas. Además, SAP y Vercel colaboran para ofrecer experiencias web más flexibles que combinan los estándares Fiori con la velocidad del desarrollo moderno.',
        text_en:
          'Joule Work redefines interaction with SAP beyond transactional interfaces. Users express their goals in natural language and assistants coordinate agents to execute tasks across multiple systems without navigating between screens. SAP and Vercel are also collaborating to deliver more flexible web experiences that combine Fiori standards with the speed of modern development.',
      },
      relatedTechIds: ['abap', 'btp', 'nextgen', 'signavio'],
      faq: [
        {
          q: '¿Fiori reemplaza a SAP GUI?',
          q_en: 'Does Fiori replace SAP GUI?',
          a: 'Reemplaza los casos de uso de día a día (consultas, aprobaciones, workflows). Los procesos técnicos y de configuración profunda siguen siendo más eficientes en SAP GUI.',
          a_en: 'It replaces the day-to-day use cases (queries, approvals, workflows). Deep configuration and technical processes are still more efficient in SAP GUI.',
        },
        {
          q: '¿Necesito S/4HANA para Fiori?',
          q_en: 'Do I need S/4HANA for Fiori?',
          a: 'No. Fiori también funciona sobre ECC con el Fiori Front-End Server. Es además una excelente forma de "modernizar" un ECC mientras planeás la migración.',
          a_en: 'No. Fiori also works on ECC via the Fiori Front-End Server. It\'s also a great way to "modernize" an ECC while you plan the migration.',
        },
        {
          q: '¿Cuánto cuesta desarrollar una app Fiori custom?',
          q_en: 'How much does it cost to develop a custom Fiori app?',
          a: 'Una app simple (1-2 pantallas) puede estar lista en 2-4 semanas. Apps complejas con lógica de negocio importante llevan 6-12 semanas.',
          a_en: 'A simple app (1-2 screens) can be ready in 2-4 weeks. Complex apps with significant business logic take 6-12 weeks.',
        },
        {
          q: '¿Cómo se gestiona la seguridad y los roles?',
          q_en: 'How are security and roles managed?',
          a: 'Roles SAP estándar y autorizaciones se mapean al launchpad. SSO con tu IdP corporativo (Azure AD, Okta).',
          a_en: 'Standard SAP roles and authorizations are mapped to the launchpad. SSO with your corporate IdP (Azure AD, Okta).',
        },
        {
          q: '¿Las apps Fiori funcionan offline?',
          q_en: 'Do Fiori apps work offline?',
          a: 'Las apps mobile pueden funcionar con datos cacheados y sincronización cuando vuelve la conexión. Lo definimos en el diseño según el caso de uso.',
          a_en: 'Mobile apps can work with cached data and sync when the connection comes back. We define this at design time depending on the use case.',
        },
      ],
      metaTitle: 'SAP Fiori: UX Moderna y Adopción Real',
      metaTitle_en: 'SAP Fiori: Modern UX and Real Adoption',
      metaDescription:
        'Apps SAP Fiori responsive y modernas que los usuarios usan. Fiori Elements, UI5, Launchpad y custom development por GoTechy.',
      metaDescription_en:
        'Responsive, modern SAP Fiori apps that users actually use. Fiori Elements, UI5, Launchpad and custom development by GoTechy.',
    },
  },
  {
    id: 'abap',
    slug: 'desarrollo-abap',
    title: 'Desarrollo ABAP',
    title_en: 'ABAP Development',
    short: 'Clean Core + RAP + Domain Models',
    short_en: 'Clean Core + RAP + Domain Models',
    description:
      'ABAP RAP y extensiones limpias side-by-side — el camino que SAP definió para que tu código sobreviva a Cloud ERP y a la era de los Joule Agents.',
    description_en:
      'ABAP RAP and clean side-by-side extensions — the path SAP defined so your code survives Cloud ERP and the Joule Agents era.',
    icon: Code2,
    accent: 'secondary',
    tags: ['Clean Core', 'RAP', 'CDS Views', 'Domain Models'],
    detail: {
      tagline:
        'Customizaciones SAP limpias, eficientes y listas para S/4HANA.',
      tagline_en:
        'Clean, efficient SAP customizations, ready for S/4HANA.',
      heroImage:
        '/images/SAPABAP-1.png',
      overviewImage: '/images/SAPABAP-2.png',
      overviewParagraphs: [
        'Desarrollamos y optimizamos código ABAP alineado a las mejores prácticas SAP.',
        'Desde reportes y formularios hasta integraciones complejas y migraciones a S/4HANA, aseguramos soluciones escalables y fáciles de mantener.',
        'Extendemos el estándar sin tocarlo —User Exits, BAdIs, CDS y RAP— y llevamos lo complejo a BTP, de modo que tus customizaciones sobrevivan cada upgrade.',
      ],
      overviewParagraphs_en: [
        'We develop and optimize ABAP code aligned with SAP best practices.',
        'From reports and forms to complex integrations and S/4HANA migrations, we deliver scalable solutions that are easy to maintain.',
        'We extend the standard without touching it — User Exits, BAdIs, CDS and RAP — and move the complex pieces to BTP, so your customizations survive every upgrade.',
      ],
      features: [
        { icon: Code2, title: 'Desarrollo ABAP OO y ABAP RESTful (RAP)', title_en: 'ABAP OO and RESTful ABAP (RAP) development' },
        { icon: Database, title: 'CDS Views y AMDPs para HANA', title_en: 'CDS Views and AMDPs for HANA' },
        { icon: Network, title: 'APIs, Web Services y conectores', title_en: 'APIs, Web Services and connectors' },
        { icon: Wrench, title: 'User Exits, BAdIs y Enhancements', title_en: 'User Exits, BAdIs and Enhancements' },
        { icon: GitMerge, title: 'Migración y adaptación a S/4HANA', title_en: 'Migration and adaptation to S/4HANA' },
        { icon: Zap, title: 'Automatización de procesos batch', title_en: 'Batch process automation' },
      ],
      approach: {
        eyebrow: 'Áreas de aplicación',
        eyebrow_en: 'Application areas',
        title: 'Módulos y sistemas SAP que cubrimos',
        title_en: 'SAP modules and systems we cover',
        subtitle:
          'Brindamos soluciones ABAP para distintos módulos y sistemas SAP del ecosistema enterprise.',
        subtitle_en:
          'We provide ABAP solutions across different modules and systems in the enterprise SAP ecosystem.',
        image:
          'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
        items: [
          'SAP ERP y S/4HANA (MM, FICO, SD, PP, entre otros)',
          'SAP Transportation Management (SAP TM)',
          'SAP Extended Warehouse Management (SAP EWM)',
          'SAP Global Trade Services (SAP GTS)',
          'SAP Business Technology Platform (BTP) — ABAP en Cloud',
        ],
        items_en: [
          'SAP ERP and S/4HANA (MM, FICO, SD, PP, among others)',
          'SAP Transportation Management (SAP TM)',
          'SAP Extended Warehouse Management (SAP EWM)',
          'SAP Global Trade Services (SAP GTS)',
          'SAP Business Technology Platform (BTP) — ABAP in Cloud',
        ],
      },
      benefits: [
        {
          metric: 'Senior team',
          metric_en: 'Senior team',
          title: 'Equipo experimentado y certificado',
          title_en: 'Experienced and certified team',
          description:
            'Sólida experiencia en el ecosistema SAP, con desarrolladores especializados en módulos críticos y proyectos enterprise — incluyendo ABAP RAP y BTP.',
          description_en:
            'Solid experience in the SAP ecosystem, with developers specialized in critical modules and enterprise projects — including ABAP RAP and BTP.',
        },
        {
          metric: 'ATC + tests',
          metric_en: 'ATC + tests',
          title: 'Mejores prácticas y normas de calidad',
          title_en: 'Best practices and quality standards',
          description:
            'Code reviews obligatorios, ATC (ABAP Test Cockpit) con reglas custom, unit testing, integración con SAP Cloud ALM y CI/CD cuando aplica.',
          description_en:
            'Mandatory code reviews, ATC (ABAP Test Cockpit) with custom rules, unit testing, integration with SAP Cloud ALM and CI/CD when applicable.',
        },
        {
          metric: 'Clean Core',
          metric_en: 'Clean Core',
          title: 'Código eficiente, seguro y escalable',
          title_en: 'Efficient, secure and scalable code',
          description:
            'Extension points oficiales, CDS Views, AMDPs optimizados y arquitecturas side-by-side en BTP — pensadas para sobrevivir cada upgrade sin reescribir.',
          description_en:
            'Official extension points, CDS Views, optimized AMDPs and side-by-side architectures on BTP — designed to survive every upgrade without rewriting.',
        },
        {
          metric: 'Scrum / Kanban',
          metric_en: 'Scrum / Kanban',
          title: 'Metodologías ágiles',
          title_en: 'Agile methodologies',
          description:
            'Iteraciones cortas con valor demostrable, gestión transparente del backlog y entregas predecibles que se ajustan al ritmo real del negocio.',
          description_en:
            'Short iterations with demonstrable value, transparent backlog management and predictable deliveries that match the real pace of the business.',
        },
      ],
      useCases: [
        {
          title: 'Customización funcional de S/4HANA',
          title_en: 'Functional customization of S/4HANA',
          description:
            'Adaptación de procesos estándar a la operación real del cliente sin modificar el core.',
          description_en:
            'Adaptation of standard processes to the customer\'s real operation without modifying the core.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['ABAP', 'BAdI', 'CDS'],
        },
        {
          title: 'Integraciones con sistemas externos',
          title_en: 'Integrations with external systems',
          description:
            'Interfaces robustas con sistemas legacy, marketplaces, bancos, fiscales y proveedores B2B.',
          description_en:
            'Robust interfaces with legacy systems, marketplaces, banks, tax authorities and B2B providers.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['BAPIs', 'IDOCs', 'OData'],
        },
        {
          title: 'Migración de código a S/4HANA',
          title_en: 'Code migration to S/4HANA',
          description:
            'Análisis con SAP Readiness Check, ajustes obligatorios y refactor a las nuevas estructuras.',
          description_en:
            'Analysis with SAP Readiness Check, mandatory adjustments and refactor to the new structures.',
          industry: 'SAP brownfield',
          industry_en: 'SAP brownfield',
          technologies: ['ABAP', 'Custom Code', 'S/4HANA'],
        },
        {
          title: 'Backend de apps Fiori custom',
          title_en: 'Backend for custom Fiori apps',
          description:
            'Servicios OData v4 desarrollados con RAP como backend de apps Fiori modernas.',
          description_en:
            'OData v4 services developed with RAP as the backend for modern Fiori apps.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['ABAP RAP', 'OData', 'Fiori'],
        },
      ],
      horizonte: {
        text:
          'Los Domain Models de SAP son modelos de IA entrenados con conocimiento específico del ecosistema SAP: código, datos, procesos y arquitectura. Permiten a los desarrolladores en Joule Studio generar extensiones Clean Core a partir de lenguaje natural, con comprensión real del contexto SAP. ABAP Cloud y Clean Core son la dirección oficial: las extensiones del futuro corren en BTP y respetan el núcleo limpio. Preparamos tu código para esa transición.',
        text_en:
          'SAP\'s Domain Models are AI models trained on specific SAP-ecosystem knowledge: code, data, processes and architecture. They let developers in Joule Studio generate Clean Core extensions from natural language, with real understanding of the SAP context. ABAP Cloud and Clean Core are the official direction: tomorrow\'s extensions run on BTP and respect the clean core. We prepare your code for that transition.',
      },
      relatedTechIds: ['fiori', 'btp', 'basis', 'pm'],
      faq: [
        {
          q: '¿ABAP sigue siendo relevante con cloud y S/4HANA?',
          q_en: 'Is ABAP still relevant with cloud and S/4HANA?',
          a: 'Más que antes. S/4HANA está construido sobre ABAP y BTP soporta ABAP Cloud. Lo que cambió son las prácticas (CDS, RAP), no el lenguaje.',
          a_en: 'More than ever. S/4HANA is built on ABAP and BTP supports ABAP Cloud. What has changed is the practices (CDS, RAP), not the language.',
        },
        {
          q: '¿Hacen modificaciones al estándar?',
          q_en: 'Do you modify the standard?',
          a: 'Las evitamos. Usamos User Exits, BAdIs, Enhancements y CDS extensions. Sólo modificamos el estándar si SAP no provee otra opción (raro) y siempre dejamos trazabilidad.',
          a_en: 'We avoid it. We use User Exits, BAdIs, Enhancements and CDS extensions. We only modify the standard if SAP provides no other option (rare), and we always leave traceability.',
        },
        {
          q: '¿Cómo aseguran la calidad del código?',
          q_en: 'How do you ensure code quality?',
          a: 'Code reviews obligatorios, ATC (ABAP Test Cockpit) con reglas custom del cliente, unit testing con ABAP Unit y CI/CD cuando aplica.',
          a_en: 'Mandatory code reviews, ATC (ABAP Test Cockpit) with customer-specific rules, unit testing with ABAP Unit and CI/CD when applicable.',
        },
        {
          q: '¿Pueden refactorizar código legacy a S/4HANA?',
          q_en: 'Can you refactor legacy code to S/4HANA?',
          a: 'Sí. Es uno de los servicios más demandados. Combinamos análisis automatizado (Custom Code Analyzer) con refactor manual de lo crítico.',
          a_en: 'Yes. It\'s one of the most in-demand services. We combine automated analysis (Custom Code Analyzer) with manual refactoring of the critical parts.',
        },
        {
          q: '¿Trabajan con equipos mixtos junto al cliente?',
          q_en: 'Do you work in mixed teams with the customer?',
          a: 'Sí. Modelos staff augmentation, equipos dedicados, llave en mano o factory. Lo definimos según madurez interna.',
          a_en: 'Yes. Staff augmentation, dedicated teams, turnkey or factory models. We define this based on internal maturity.',
        },
      ],
      metaTitle: 'Desarrollo ABAP: Custom Dev, RAP y CDS',
      metaTitle_en: 'ABAP Development: Custom Dev, RAP and CDS',
      metaDescription:
        'Desarrollo ABAP profesional para SAP ECC y S/4HANA. Reports, interfaces, RAP, CDS, BAdIs y migración de código por GoTechy.',
      metaDescription_en:
        'Professional ABAP development for SAP ECC and S/4HANA. Reports, interfaces, RAP, CDS, BAdIs and code migration by GoTechy.',
    },
  },
  {
    id: 'nextgen',
    slug: 'next-gen-development',
    title: 'Next Gen Development',
    title_en: 'Next Gen Development',
    short: 'Joule Studio + Java/Node/Python/Agentic',
    short_en: 'Joule Studio + Java/Node/Python/Agentic',
    description:
      'Desarrollo full-stack y agentico: Joule Studio pro-code, protocolos MCP/A2A y ecosistema abierto para conectar SAP con todo lo demás.',
    description_en:
      'Full-stack and agentic development: Joule Studio pro-code, MCP/A2A protocols and an open ecosystem to connect SAP with everything else.',
    icon: Rocket,
    accent: 'accent',
    tags: ['Joule Studio', 'MCP', 'A2A', 'Python', 'React'],
    detail: {
      tagline:
        'Soluciones a medida que se integran con SAP y escalan con tu negocio.',
      tagline_en:
        'Custom solutions that integrate with SAP and scale with your business.',
      heroImage: '/images/NEXTGEN-1.png',
      overviewImage: '/images/NEXTGEN-2.jpg',
      overviewParagraphs: [
        'Desarrollamos aplicaciones modernas que extienden o complementan tu ecosistema SAP.',
        'APIs, microservicios, portales y sistemas de gestión construidos con tecnologías actuales, integrados con los procesos core de tu empresa.',
        'Trabajamos con código limpio, testeado y observable, con CI/CD y arquitecturas cloud-native pensadas para escalar y mantenerse en el tiempo.',
      ],
      overviewParagraphs_en: [
        'We build modern applications that extend or complement your SAP ecosystem.',
        'APIs, microservices, portals and management systems built with current technologies, integrated with your company\'s core processes.',
        'We work with clean, tested and observable code — CI/CD and cloud-native architectures designed to scale and last.',
      ],
      features: [
        { icon: Server, title: 'Desarrollo Java / Spring Boot', title_en: 'Java / Spring Boot development' },
        { icon: GitBranch, title: 'APIs REST y microservicios', title_en: 'REST APIs and microservices' },
        { icon: Plug, title: 'Integración con SAP via RFC, OData, BAPI', title_en: 'SAP integration via RFC, OData, BAPI' },
        { icon: MonitorSmartphone, title: 'Portales y aplicaciones web', title_en: 'Portals and web applications' },
        { icon: Workflow, title: 'Automatización de procesos', title_en: 'Process automation' },
        { icon: Cloud, title: 'Arquitecturas cloud-native', title_en: 'Cloud-native architectures' },
      ],
      benefits: [
        {
          metric: 'OData + MCP',
          metric_en: 'OData + MCP',
          title: 'Integración nativa con SAP',
          title_en: 'Native integration with SAP',
          description:
            'Conectamos apps modernas y agentes con S/4HANA, BTP y sistemas SAP vía OData, APIs, protocolos MCP/A2A y conectores propios.',
          description_en:
            'We connect modern apps and agents with S/4HANA, BTP and SAP systems via OData, APIs, MCP/A2A protocols and our own connectors.',
        },
        {
          metric: '-50% time-to-market',
          metric_en: '-50% time-to-market',
          title: 'Time-to-market acelerado',
          title_en: 'Accelerated time-to-market',
          description:
            'Stack moderno + Joule Studio + metodologías ágiles + componentes reusables entregan más rápido que el ciclo clásico de desarrollo.',
          description_en:
            'Modern stack + Joule Studio + agile methodologies + reusable components deliver faster than the classic development cycle.',
        },
        {
          metric: 'Cloud-native',
          metric_en: 'Cloud-native',
          title: 'Soluciones escalables y seguras',
          title_en: 'Scalable and secure solutions',
          description:
            'Apps diseñadas desde el día 1 para crecer con el negocio. Arquitecturas de microservicios, containers y autoscaling en SAP BTP o hyperscalers.',
          description_en:
            'Apps designed from day 1 to grow with the business. Microservices architectures, containers and autoscaling on SAP BTP or hyperscalers.',
        },
        {
          metric: '100% reviewed',
          metric_en: '100% reviewed',
          title: 'Calidad garantizada',
          title_en: 'Guaranteed quality',
          description:
            'Code reviews obligatorios, testing automatizado (unit, integration, e2e) y revisiones exhaustivas. La calidad se construye, no se audita después.',
          description_en:
            'Mandatory code reviews, automated testing (unit, integration, e2e) and thorough reviews. Quality is built in, not audited afterwards.',
        },
        {
          metric: 'Flexible',
          metric_en: 'Flexible',
          title: 'Equipos flexibles',
          title_en: 'Flexible teams',
          description:
            'Desde proyectos llave en mano hasta expansión de tu equipo interno con desarrolladores senior — modalidad team-as-a-service o staff augmentation.',
          description_en:
            'From turnkey projects to expanding your in-house team with senior developers — team-as-a-service or staff augmentation models.',
        },
        {
          metric: 'SLA garantizado',
          metric_en: 'Guaranteed SLA',
          title: 'Soporte continuo',
          title_en: 'Continuous support',
          description:
            'Acompañamiento post-go-live con SLAs definidos, mantenimiento evolutivo y mejora continua del producto entregado.',
          description_en:
            'Post-go-live support with defined SLAs, evolutionary maintenance and continuous improvement of the delivered product.',
        },
      ],
      useCases: [
        {
          title: 'Comprobantes Digitales (e-invoice)',
          title_en: 'Digital Receipts (e-invoice)',
          description:
            'Plataforma de gestión de documentos electrónicos fiscales y no fiscales integrada con SAP y entidades fiscales locales.',
          description_en:
            'Management platform for electronic fiscal and non-fiscal documents integrated with SAP and local tax authorities.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Java', 'Spring Boot', 'SAP'],
        },
        {
          title: 'Gestión de logística y TM',
          title_en: 'Logistics and TM management',
          description:
            'Sistemas de optimización de viajes y transporte con integración SAP y dashboards para operación en tiempo real.',
          description_en:
            'Trip and transportation optimization systems with SAP integration and dashboards for real-time operations.',
          industry: 'Logística',
          industry_en: 'Logistics',
          technologies: ['Java', 'React', 'SAP TM'],
        },
        {
          title: 'Portales B2B y B2C',
          title_en: 'B2B and B2C portals',
          description:
            'Portales modernos para clientes y socios con integración directa a SAP para pedidos, status y pagos.',
          description_en:
            'Modern portals for customers and partners with direct SAP integration for orders, status and payments.',
          industry: 'Distribución & Retail',
          industry_en: 'Distribution & Retail',
          technologies: ['React', 'Node.js', 'SAP'],
        },
        {
          title: 'Sistema de vouchers y promociones',
          title_en: 'Vouchers and promotions system',
          description:
            'Creación, administración y seguimiento de vouchers con reglas de negocio y reporting integrado.',
          description_en:
            'Creation, administration and tracking of vouchers with business rules and integrated reporting.',
          industry: 'Retail & Servicios',
          industry_en: 'Retail & Services',
          technologies: ['Spring Boot', 'React', 'PostgreSQL'],
        },
      ],
      horizonte: {
        text:
          'Joule Studio permite a los desarrolladores construir agentes con sus frameworks preferidos (LangGraph, AutoGen, LlamaIndex) combinando código profesional con contexto SAP nativo. Los agentes soportan los protocolos MCP y A2A para conectarse con herramientas y agentes de terceros, haciéndolos interoperables y escalables en entornos multiagente. Además, SAP colabora con n8n para la orquestación visual de flujos de IA dentro de la infraestructura cloud de SAP.',
        text_en:
          'Joule Studio lets developers build agents with their preferred frameworks (LangGraph, AutoGen, LlamaIndex), combining professional code with native SAP context. The agents support the MCP and A2A protocols to connect with third-party tools and agents, making them interoperable and scalable in multi-agent environments. SAP is also collaborating with n8n for visual orchestration of AI flows within SAP\'s cloud infrastructure.',
      },
      relatedTechIds: ['btp', 'fiori', 'ia', 'abap'],
      faq: [
        {
          q: '¿Por qué desarrollar fuera de ABAP si tengo SAP?',
          q_en: 'Why develop outside ABAP if I have SAP?',
          a: 'Para casos que requieren UX moderna, integración con sistemas no-SAP, alto throughput o escalado horizontal independiente del ERP.',
          a_en: 'For cases requiring modern UX, integration with non-SAP systems, high throughput or horizontal scaling independent of the ERP.',
        },
        {
          q: '¿Cómo se integra con SAP?',
          q_en: 'How does it integrate with SAP?',
          a: 'Vía OData, APIs REST, BAPIs/IDOCs y BTP. Tenemos conectores propios probados en producción para los casos más comunes.',
          a_en: 'Via OData, REST APIs, BAPIs/IDOCs and BTP. We have our own production-tested connectors for the most common cases.',
        },
        {
          q: '¿Qué pasa con el mantenimiento después del go-live?',
          q_en: 'What happens with maintenance after go-live?',
          a: 'Modelos de soporte mensual con SLA y horas de evolución. Te dejamos en posición de operar internamente si lo preferís.',
          a_en: 'Monthly support models with SLA and evolution hours. We leave you in a position to operate internally if you prefer.',
        },
        {
          q: '¿Hacen apps mobile nativas?',
          q_en: 'Do you build native mobile apps?',
          a: 'Hacemos PWAs (Progressive Web Apps) y React Native. La mayoría de los casos enterprise se cubren bien con esos enfoques.',
          a_en: 'We build PWAs (Progressive Web Apps) and React Native. Most enterprise cases are well covered with those approaches.',
        },
        {
          q: '¿Y la propiedad intelectual del código?',
          q_en: 'What about the intellectual property of the code?',
          a: 'El código es del cliente. Entregamos repos, documentación, runbooks y todo lo necesario para que puedas operar y evolucionar sin nosotros si lo decidís.',
          a_en: 'The code belongs to the customer. We deliver repos, documentation, runbooks and everything needed so you can operate and evolve without us if you choose to.',
        },
      ],
      metaTitle: 'Next Gen Development: Java, Node, Python, React',
      metaTitle_en: 'Next Gen Development: Java, Node, Python, React',
      metaDescription:
        'Desarrollo full-stack moderno integrado con SAP — Java, Spring Boot, Node, Python, React y Angular. Microservicios, APIs y portales por GoTechy.',
      metaDescription_en:
        'Modern full-stack development integrated with SAP — Java, Spring Boot, Node, Python, React and Angular. Microservices, APIs and portals by GoTechy.',
    },
  },
  {
    id: 'pm',
    slug: 'gestion-proyectos',
    title: 'Gestión de Proyectos',
    title_en: 'Project Management',
    short: 'SAP Activate + Autonomous Project Delivery',
    short_en: 'SAP Activate + Autonomous Project Delivery',
    description:
      'Liderazgo end-to-end de programas SAP con SAP Activate, gobierno claro y los nuevos asistentes Joule de gestión de proyectos para entrega continua.',
    description_en:
      'End-to-end leadership of SAP programs with SAP Activate, clear governance and the new Joule project management assistants for continuous delivery.',
    icon: Briefcase,
    accent: 'secondary',
    tags: ['Activate', 'Agile', 'Joule PM Assistant', 'PMO'],
    detail: {
      tagline:
        'Implementaciones SAP que llegan en tiempo y dentro del presupuesto.',
      tagline_en:
        'SAP implementations that land on time and on budget.',
      heroImage: '/images/GestióndeProyectos-1.png',
      overviewImage: '/images/GestióndeProyectos-2.png',
      overviewParagraphs: [
        'Lideramos proyectos SAP con metodologías probadas, equipos certificados y foco en resultados.',
        'Desde la planificación inicial hasta el go-live y el soporte post-productivo, adoptamos los objetivos de nuestros clientes como propios.',
        'Gobierno claro, gestión proactiva de riesgos y KPIs medibles desde el día uno: anticipamos los desvíos antes de que se vuelvan problemas y mantenemos al sponsor con visibilidad total.',
      ],
      overviewParagraphs_en: [
        'We lead SAP projects with proven methodologies, certified teams and a focus on results.',
        'From initial planning to go-live and post-production support, we take our clients\' goals as our own.',
        'Clear governance, proactive risk management and measurable KPIs from day one: we anticipate deviations before they become problems and keep the sponsor fully informed.',
      ],
      features: [
        { icon: Target, title: 'Metodología SAP Activate', title_en: 'SAP Activate methodology' },
        { icon: ShieldCheck, title: 'Gestión de riesgos y stakeholders', title_en: 'Risk and stakeholder management' },
        { icon: Briefcase, title: 'PMO para proyectos complejos', title_en: 'PMO for complex projects' },
        { icon: Users, title: 'Coordinación de equipos multidisciplinarios', title_en: 'Coordination of multidisciplinary teams' },
        { icon: GitMerge, title: 'Gestión del cambio organizacional', title_en: 'Organizational change management' },
        { icon: BarChart3, title: 'Reporting ejecutivo', title_en: 'Executive reporting' },
      ],
      approach: {
        title: 'Cómo lideramos los proyectos',
        title_en: 'How we lead projects',
        subtitle:
          'Combinamos SAP Activate con prácticas ágiles según el caso — sin dogmatismo metodológico, con foco en valor de negocio.',
        subtitle_en:
          'We combine SAP Activate with agile practices as the case dictates — without methodological dogmatism, focused on business value.',
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
        items_en: [
          'SAP Activate as base framework',
          'Scrum and Kanban in short iterations',
          'Agile/traditional hybrid based on context',
          'Proactive risk and change management',
          'Measurable KPIs from day 1',
          'Focus on value, not on the original plan',
        ],
      },
      benefits: [
        {
          metric: 'Tiempo real',
          metric_en: 'Real-time',
          title: 'Mayor visibilidad y control',
          title_en: 'Greater visibility and control',
          description:
            'Avance real del proyecto en dashboards y KPIs — lo que está pasando, no lo que el equipo dice que pasa. Integrado con SAP Cloud ALM y Signavio para trazabilidad completa.',
          description_en:
            'Real project progress in dashboards and KPIs — what is actually happening, not what the team says is happening. Integrated with SAP Cloud ALM and Signavio for full traceability.',
        },
        {
          metric: '-70% desvíos',
          metric_en: '-70% deviations',
          title: 'Reducción de riesgos',
          title_en: 'Risk reduction',
          description:
            'Gestión proactiva y planificada que anticipa desvíos antes de que se vuelvan incidentes — comité de riesgos activo y planes de mitigación documentados.',
          description_en:
            'Proactive, planned management that anticipates deviations before they become incidents — active risk committee and documented mitigation plans.',
        },
        {
          metric: 'Líder técnico',
          metric_en: 'Technical leader',
          title: 'Equipos alineados y motivados',
          title_en: 'Aligned and motivated teams',
          description:
            'Liderazgo claro y técnico que conecta los objetivos del negocio con la ejecución diaria — sin gaps entre estrategia, plan y entrega.',
          description_en:
            'Clear, technical leadership that connects business goals with day-to-day execution — no gaps between strategy, plan and delivery.',
        },
        {
          metric: 'On-time, on-budget',
          metric_en: 'On-time, on-budget',
          title: 'Entregas predecibles',
          title_en: 'Predictable deliveries',
          description:
            'Metodología SAP Activate aplicada con disciplina + asistentes Joule para gestión de hojas de horas, facturación y cambios — proyectos que cierran cuando deben, con el alcance comprometido.',
          description_en:
            'SAP Activate methodology applied with discipline + Joule assistants for timesheets, billing and change management — projects that close when they should, with the committed scope.',
        },
      ],
      useCases: [
        {
          title: 'Implementaciones de S/4HANA',
          title_en: 'S/4HANA implementations',
          description:
            'Liderazgo end-to-end de proyectos de implementación, conversion y greenfield de S/4HANA.',
          description_en:
            'End-to-end leadership of S/4HANA implementation, conversion and greenfield projects.',
          industry: 'SAP customers',
          industry_en: 'SAP customers',
          technologies: ['SAP Activate', 'Agile', 'PMO'],
        },
        {
          title: 'Rollouts globales',
          title_en: 'Global rollouts',
          description:
            'Despliegues multi-país y multi-empresa con templates corporativos y adaptaciones locales.',
          description_en:
            'Multi-country and multi-company deployments with corporate templates and local adaptations.',
          industry: 'Multinacionales',
          industry_en: 'Multinationals',
          technologies: ['PMO', 'Template & Roll-out'],
        },
        {
          title: 'Programas de transformación digital',
          title_en: 'Digital transformation programs',
          description:
            'Coordinación de portfolios de proyectos: Signavio, BTP, IA, Fiori. Visión unificada con foco en business outcomes.',
          description_en:
            'Coordination of project portfolios: Signavio, BTP, AI, Fiori. Unified vision focused on business outcomes.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Program Management'],
        },
        {
          title: 'Recovery de proyectos en problemas',
          title_en: 'Recovery of troubled projects',
          description:
            'Diagnóstico, replanning y estabilización de proyectos que están atrasados, fuera de presupuesto o desalineados.',
          description_en:
            'Diagnosis, replanning and stabilization of projects that are behind schedule, over budget or misaligned.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['PMO', 'Risk Management'],
        },
      ],
      horizonte: {
        text:
          'El Asistente de Gestión de Proyectos de Joule coordina agentes para la configuración inicial, asignación de recursos y control del ciclo de vida del proyecto, usando datos de proyectos anteriores como referencia. Los nuevos asistentes para migración y modernización en RISE with SAP analizan entornos, detectan código customizado y automatizan pruebas y validaciones para acelerar la transición a SAP Cloud ERP con menor riesgo.',
        text_en:
          'Joule\'s Project Management Assistant coordinates agents for initial setup, resource assignment and project lifecycle control, using data from previous projects as a reference. The new migration and modernization assistants in RISE with SAP analyze environments, detect custom code and automate tests and validations to accelerate the transition to SAP Cloud ERP with lower risk.',
      },
      relatedTechIds: ['signavio', 'leanix', 'basis', 'btp'],
      faq: [
        {
          q: '¿En qué se diferencia SAP Activate de Scrum tradicional?',
          q_en: 'How is SAP Activate different from traditional Scrum?',
          a: 'SAP Activate es específico para proyectos SAP, con entregables y fit-gap analysis estandarizados. Scrum es genérico. Los combinamos: estructura de Activate con prácticas ágiles de Scrum.',
          a_en: 'SAP Activate is specific to SAP projects, with standardized deliverables and fit-gap analysis. Scrum is generic. We combine them: Activate\'s structure with Scrum\'s agile practices.',
        },
        {
          q: '¿Es solo para proyectos SAP?',
          q_en: 'Is it only for SAP projects?',
          a: 'Lideramos también iniciativas no-SAP, pero el diferencial es nuestra experiencia con el ecosistema SAP. En proyectos puramente non-SAP usamos PMI/Scrum/Kanban según el caso.',
          a_en: 'We also lead non-SAP initiatives, but our differentiator is our SAP ecosystem experience. On purely non-SAP projects we use PMI/Scrum/Kanban depending on the case.',
        },
        {
          q: '¿Cómo se mide el éxito de un PMO?',
          q_en: 'How is PMO success measured?',
          a: 'KPIs definidos al inicio: budget vs. actual, schedule, scope creep, quality (defectos), satisfacción de stakeholders. Reportamos contra esos números, no contra "sensaciones".',
          a_en: 'KPIs defined at the start: budget vs. actual, schedule, scope creep, quality (defects), stakeholder satisfaction. We report against those numbers, not against "feelings".',
        },
        {
          q: '¿Pueden tomar un proyecto que ya está en problemas?',
          q_en: 'Can you take over a project that\'s already in trouble?',
          a: 'Sí. Hacemos un assessment rápido (1-2 semanas), identificamos los issues críticos, proponemos un replanning y lo ejecutamos. Es uno de los pedidos más comunes.',
          a_en: 'Yes. We do a quick assessment (1-2 weeks), identify the critical issues, propose a replanning and execute it. It\'s one of the most common requests.',
        },
        {
          q: '¿Qué tamaño de proyectos lideran?',
          q_en: 'What size of projects do you lead?',
          a: 'Desde proyectos boutique de 6-8 semanas hasta programas multi-año con presupuestos de varios millones. La metodología se adapta al tamaño.',
          a_en: 'From boutique projects of 6-8 weeks to multi-year programs with multi-million budgets. The methodology adapts to the size.',
        },
        {
          q: '¿Cómo trabajan con el equipo interno del cliente?',
          q_en: 'How do you work with the customer\'s internal team?',
          a: 'Nuestro PMO entra como liderazgo del proyecto. El cliente mantiene la decisión estratégica y nos delega la ejecución y la coordinación.',
          a_en: 'Our PMO comes in as project leadership. The customer keeps the strategic decisions and delegates execution and coordination to us.',
        },
      ],
      metaTitle: 'Gestión de Proyectos SAP: PMO y SAP Activate',
      metaTitle_en: 'SAP Project Management: PMO and SAP Activate',
      metaDescription:
        'PMO experto para implementaciones SAP, rollouts y transformaciones — SAP Activate, ágil, gestión de riesgos y entregas predecibles por GoTechy.',
      metaDescription_en:
        'Expert PMO for SAP implementations, rollouts and transformations — SAP Activate, agile, risk management and predictable deliveries by GoTechy.',
    },
  },
  {
    id: 'cloudalm',
    slug: 'sap-cloud-alm',
    title: 'SAP Cloud ALM',
    title_en: 'SAP Cloud ALM',
    short: 'SolMan + Cloud ALM · Ciclo de vida',
    short_en: 'SolMan + Cloud ALM · Lifecycle',
    description:
      'Implementamos y operamos SAP Solution Manager y SAP Cloud ALM para monitorear, gestionar incidentes y controlar el ciclo de vida completo de tu solución SAP.',
    description_en:
      'We implement and operate SAP Solution Manager and SAP Cloud ALM to monitor, manage incidents and control the full lifecycle of your SAP solution.',
    icon: Activity,
    accent: 'secondary',
    tags: ['Cloud ALM', 'Solution Manager', 'Monitoring', 'ITSM'],
    detail: {
      tagline:
        'Control total del ciclo de vida de tu solución SAP.',
      tagline_en:
        'Full control of your SAP solution\'s lifecycle.',
      overviewParagraphs: [
        'Implementamos y operamos SAP Solution Manager y SAP Cloud ALM para monitorear sistemas y gestionar incidentes.',
        'Mantenemos tu infraestructura SAP en estado óptimo a lo largo de todo su ciclo de vida.',
        'Centralizamos monitoreo, documentación y gestión de cambios en una sola vista, y acompañamos la transición de Solution Manager a Cloud ALM sin perder control.',
      ],
      overviewParagraphs_en: [
        'We implement and operate SAP Solution Manager and SAP Cloud ALM to monitor systems and manage incidents.',
        'We keep your SAP infrastructure in optimal shape throughout its entire lifecycle.',
        'We centralize monitoring, documentation and change management in a single view, and support the move from Solution Manager to Cloud ALM without losing control.',
      ],
      features: [
        { icon: Activity, title: 'Monitoreo de sistemas y alertas', title_en: 'System monitoring and alerts' },
        { icon: Database, title: 'Gestión de volumen de datos (DVM)', title_en: 'Data Volume Management (DVM)' },
        { icon: Search, title: 'Análisis de causa raíz', title_en: 'Root cause analysis' },
        { icon: BarChart3, title: 'Reportes Early Watch Alert', title_en: 'Early Watch Alert reports' },
        { icon: FileText, title: 'Documentación de procesos', title_en: 'Process documentation' },
        { icon: Cloud, title: 'Transición a SAP Cloud ALM', title_en: 'Transition to SAP Cloud ALM' },
      ],
      benefits: [
        {
          metric: '24/7',
          metric_en: '24/7',
          title: 'Monitoreo continuo',
          title_en: 'Continuous monitoring',
          description:
            'Detección temprana de incidentes y alertas proactivas antes de que impacten la operación.',
          description_en:
            'Early incident detection and proactive alerts before they impact operations.',
        },
        {
          metric: 'Causa raíz',
          metric_en: 'Root cause',
          title: 'Resolución más rápida',
          title_en: 'Faster resolution',
          description:
            'Análisis de causa raíz y trazabilidad end-to-end para acortar los tiempos de resolución.',
          description_en:
            'Root cause analysis and end-to-end traceability to shorten resolution times.',
        },
        {
          metric: 'Fuente única',
          metric_en: 'Single source',
          title: 'Visibilidad del ciclo de vida',
          title_en: 'Lifecycle visibility',
          description:
            'Documentación de procesos, configuración y cambios centralizada y siempre actualizada.',
          description_en:
            'Centralized, always-up-to-date documentation of processes, configuration and changes.',
        },
        {
          metric: 'Cloud-ready',
          metric_en: 'Cloud-ready',
          title: 'Transición ordenada',
          title_en: 'Orderly transition',
          description:
            'Migración de Solution Manager a SAP Cloud ALM sin perder visibilidad ni control.',
          description_en:
            'Migration from Solution Manager to SAP Cloud ALM without losing visibility or control.',
        },
      ],
      useCases: [
        {
          title: 'Monitoreo de sistemas productivos',
          title_en: 'Monitoring of production systems',
          description:
            'Monitoreo proactivo de disponibilidad, performance e interfaces con alertas accionables.',
          description_en:
            'Proactive monitoring of availability, performance and interfaces with actionable alerts.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Cloud ALM', 'SolMan', 'Monitoring'],
        },
        {
          title: 'Gestión de incidentes e ITSM',
          title_en: 'Incident management and ITSM',
          description:
            'Gestión centralizada de tickets, cambios y problemas integrada con la operación SAP.',
          description_en:
            'Centralized management of tickets, changes and problems integrated with SAP operations.',
          industry: 'IT & Operaciones',
          industry_en: 'IT & Operations',
          technologies: ['ITSM', 'ChaRM'],
        },
        {
          title: 'Early Watch y salud del sistema',
          title_en: 'Early Watch and system health',
          description:
            'Reportes Early Watch Alert periódicos con recomendaciones de optimización.',
          description_en:
            'Periodic Early Watch Alert reports with optimization recommendations.',
          industry: 'SAP customers',
          industry_en: 'SAP customers',
          technologies: ['EWA', 'HANA'],
        },
        {
          title: 'Migración de SolMan a Cloud ALM',
          title_en: 'SolMan to Cloud ALM migration',
          description:
            'Transición planificada de Solution Manager a SAP Cloud ALM con cero pérdida de control.',
          description_en:
            'Planned transition from Solution Manager to SAP Cloud ALM with zero loss of control.',
          industry: 'SAP customers',
          industry_en: 'SAP customers',
          technologies: ['Cloud ALM', 'SolMan'],
        },
      ],
      horizonte: {
        text:
          'SAP Cloud ALM incorpora agentes de IA para la resolución de casos: analizan nuevos incidentes, detectan duplicados, sugieren rutas de resolución y redactan respuestas. Para casos prioritarios, los agentes recomiendan acciones que reducen el trabajo manual y acortan los tiempos de resolución con mayor precisión y trazabilidad.',
        text_en:
          'SAP Cloud ALM is adding AI agents for case resolution: they analyze new incidents, detect duplicates, suggest resolution paths and draft responses. For priority cases, the agents recommend actions that reduce manual work and shorten resolution times with greater precision and traceability.',
      },
      relatedTechIds: ['basis', 'leanix', 'signavio', 'pm'],
      faq: [
        {
          q: '¿Cuál es la diferencia entre Solution Manager y SAP Cloud ALM?',
          q_en: 'What\'s the difference between Solution Manager and SAP Cloud ALM?',
          a: 'Solution Manager es la plataforma on-premise de ALM; SAP Cloud ALM es su evolución cloud-native, más liviana y orientada a entornos RISE y cloud. Operamos ambas y acompañamos la transición.',
          a_en: 'Solution Manager is the on-premise ALM platform; SAP Cloud ALM is its cloud-native evolution — lighter and geared toward RISE and cloud environments. We operate both and support the transition.',
        },
        {
          q: '¿Cloud ALM reemplaza a Solution Manager?',
          q_en: 'Does Cloud ALM replace Solution Manager?',
          a: 'SAP posiciona Cloud ALM como la plataforma central de operaciones para entornos cloud. Para muchos clientes conviven durante la transición; te ayudamos a definir el momento y la estrategia.',
          a_en: 'SAP positions Cloud ALM as the central operations platform for cloud environments. For many customers both coexist during the transition; we help you define the timing and strategy.',
        },
        {
          q: '¿Pueden operar el monitoreo por nosotros?',
          q_en: 'Can you run the monitoring for us?',
          a: 'Sí. Ofrecemos operación gestionada con SLAs claros, alertas accionables y reporting ejecutivo — integrado con nuestro servicio de SAP Basis.',
          a_en: 'Yes. We offer managed operations with clear SLAs, actionable alerts and executive reporting — integrated with our SAP Basis service.',
        },
        {
          q: '¿Se integra con el resto del ecosistema SAP?',
          q_en: 'Does it integrate with the rest of the SAP ecosystem?',
          a: 'Sí. Cloud ALM se alinea con SAP LeanIX, Signavio y los procesos de cambio para dar trazabilidad de punta a punta.',
          a_en: 'Yes. Cloud ALM aligns with SAP LeanIX, Signavio and change processes to provide end-to-end traceability.',
        },
      ],
      metaTitle: 'SAP Cloud ALM y Solution Manager: operación y ciclo de vida',
      metaTitle_en: 'SAP Cloud ALM and Solution Manager: operations and lifecycle',
      metaDescription:
        'Implementación y operación de SAP Solution Manager y SAP Cloud ALM: monitoreo, gestión de incidentes y ciclo de vida de tu solución SAP, por GoTechy.',
      metaDescription_en:
        'Implementation and operation of SAP Solution Manager and SAP Cloud ALM: monitoring, incident management and the lifecycle of your SAP solution, by GoTechy.',
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

// ===== Localization =============================================
// Helpers que devuelven una copia "localizada" de un Service o ServiceDetail
// para el idioma activo. Si la variante `_en` no está cargada, hacen fallback
// transparente al español. Componentes hacen: `const s = localizeService(svc, isEn)`.

/** Devuelve el primer valor truthy entre EN y ES (fallback al ES). */
function pick<T>(en: T | undefined | null, es: T): T {
  if (en === undefined || en === null) return es;
  if (typeof en === 'string' && en.trim() === '') return es;
  if (Array.isArray(en) && en.length === 0) return es;
  return en;
}

export function localizeService(service: Service, isEn: boolean): Service {
  if (!isEn) return service;
  return {
    ...service,
    title: pick(service.title_en, service.title),
    short: pick(service.short_en, service.short),
    description: pick(service.description_en, service.description),
    tags: pick(service.tags_en, service.tags),
    detail: service.detail ? localizeServiceDetail(service.detail, true) : undefined,
  };
}

export function localizeServiceDetail(detail: ServiceDetail, isEn: boolean): ServiceDetail {
  if (!isEn) return detail;
  return {
    ...detail,
    tagline: pick(detail.tagline_en, detail.tagline),
    overviewParagraphs: pick(detail.overviewParagraphs_en, detail.overviewParagraphs),
    features: detail.features.map((f) => ({
      ...f,
      title: pick(f.title_en, f.title),
      description: pick(f.description_en, f.description),
      bullets: f.bullets ? pick(f.bullets_en, f.bullets) : undefined,
    })),
    benefits: detail.benefits.map((b) => ({
      ...b,
      title: pick(b.title_en, b.title),
      description: b.description ? pick(b.description_en, b.description) : undefined,
      metric: b.metric ? pick(b.metric_en, b.metric) : undefined,
    })),
    useCases: detail.useCases.map((u) => ({
      ...u,
      title: pick(u.title_en, u.title),
      description: pick(u.description_en, u.description),
      industry: u.industry ? pick(u.industry_en, u.industry) : undefined,
    })),
    stats: detail.stats
      ? {
          ...detail.stats,
          eyebrow: detail.stats.eyebrow ? pick(detail.stats.eyebrow_en, detail.stats.eyebrow) : undefined,
          title: detail.stats.title ? pick(detail.stats.title_en, detail.stats.title) : undefined,
          items: detail.stats.items.map((item) => ({
            ...item,
            label: pick(item.label_en, item.label),
          })),
        }
      : undefined,
    approach: detail.approach
      ? {
          ...detail.approach,
          eyebrow: detail.approach.eyebrow ? pick(detail.approach.eyebrow_en, detail.approach.eyebrow) : undefined,
          title: pick(detail.approach.title_en, detail.approach.title),
          subtitle: detail.approach.subtitle ? pick(detail.approach.subtitle_en, detail.approach.subtitle) : undefined,
          items: pick(detail.approach.items_en, detail.approach.items),
        }
      : undefined,
    techStack: detail.techStack
      ? detail.techStack.map((tech) => ({ ...tech, label: pick(tech.label_en, tech.label) }))
      : undefined,
    horizonte: detail.horizonte
      ? { ...detail.horizonte, text: pick(detail.horizonte.text_en, detail.horizonte.text) }
      : undefined,
    faq: detail.faq.map((item) => ({
      ...item,
      q: pick(item.q_en, item.q),
      a: pick(item.a_en, item.a),
    })),
    metaTitle: pick(detail.metaTitle_en, detail.metaTitle),
    metaDescription: pick(detail.metaDescription_en, detail.metaDescription),
  };
}
