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
// Todos los campos de texto admiten una variante `_en` opcional.
// `getLocalizedService()` se encarga de seleccionar la variante correcta y
// hacer fallback al español si la EN no está cargada.

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  title_en?: string;
  description: string;
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
        'Llevamos la Empresa Autónoma de SAP a producción — Joule Assistants, Agentes y escenarios de Industry AI integrados con tus procesos reales.',
      tagline_en:
        'We bring SAP\'s Autonomous Enterprise to production — Joule Assistants, Agents and Industry AI scenarios integrated with your real processes.',
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
      overviewParagraphs_en: [
        'SAP defined the Autonomous Enterprise as the next generation of enterprise software: Joule Assistants and Agents that collaborate with people to execute critical processes across finance, procurement, HCM, CX, supply chain and industry. At GoTechy we design, implement and operate that architecture for real customers.',
        'We build on SAP Business AI Platform: we integrate domain-specialized assistants (Financial Close, Planning, Procurement, Payroll, Customer Service, Assets, Logistics, Manufacturing), connected to Joule Work as a unified interaction layer and Joule Studio for custom extensions.',
        'When the case requires it, we develop custom agents with SAP Domain Models, the Cloud SDK for Python and the MCP and A2A protocols — securely interoperating with third-party tools and agents (Anthropic\'s Claude, open models on EU AI Cloud, NVIDIA OpenShell for secure execution).',
        'We cover the full lifecycle: discovery of high-ROI scenarios, architecture, governance with SAP AI Agent Hub, integration with SAP Business Data Cloud, grounding on SAP Knowledge Graph, observability and cost control. Every agent we deliver operates with trusted data, explicit governance and actionable metrics.',
      ],
      features: [
        {
          icon: Bot,
          title: 'Chatbots y Asistentes Inteligentes',
          title_en: 'Chatbots and Intelligent Assistants',
          description:
            'Asistentes conversacionales empresariales que no solo responden — ejecutan acciones reales sobre tus sistemas, con escalamiento inteligente cuando hace falta.',
          description_en:
            'Enterprise conversational assistants that don\'t just answer — they execute real actions on your systems, with intelligent escalation when needed.',
          bullets: [
            'Integración con sistemas internos (ERP, CRM, bases de datos)',
            'Automatización de tareas operativas',
            'Flujos conversacionales con validaciones y lógica de negocio',
            'Atención al cliente con escalamiento a humanos',
            'Soporte interno para IT, RRHH y operaciones',
          ],
          bullets_en: [
            'Integration with internal systems (ERP, CRM, databases)',
            'Automation of operational tasks',
            'Conversational flows with validations and business logic',
            'Customer support with escalation to humans',
            'Internal support for IT, HR and operations',
          ],
        },
        {
          icon: Network,
          title: 'Agentes Inteligentes y Multi-Agentes',
          title_en: 'Intelligent and Multi-Agent Systems',
          description:
            'Agentes capaces de razonar, planificar y ejecutar acciones en múltiples sistemas, con patrones modernos de orquestación y control de contexto.',
          description_en:
            'Agents capable of reasoning, planning and executing actions across multiple systems, with modern orchestration patterns and context control.',
          bullets: [
            'Arquitecturas de agentes autónomos',
            'Orquestación de tareas complejas',
            'Agentes especializados por dominio',
            'Integración con herramientas externas y APIs',
            'Flujos multi-agente coordinados',
          ],
          bullets_en: [
            'Autonomous agent architectures',
            'Orchestration of complex tasks',
            'Domain-specialized agents',
            'Integration with external tools and APIs',
            'Coordinated multi-agent flows',
          ],
        },
        {
          icon: FileText,
          title: 'Lectura Inteligente de Documentos (IDP)',
          title_en: 'Intelligent Document Processing (IDP)',
          description:
            'Automatización del procesamiento documental que reduce tiempos manuales, errores humanos y costos operativos.',
          description_en:
            'Document processing automation that reduces manual time, human errors and operational costs.',
          bullets: [
            'Lectura y análisis de PDFs, contratos, facturas y formularios',
            'Extracción estructurada de datos',
            'Clasificación automática de documentos',
            'Validación contra reglas de negocio',
            'Integración con sistemas administrativos o financieros',
          ],
          bullets_en: [
            'Reading and analysis of PDFs, contracts, invoices and forms',
            'Structured data extraction',
            'Automatic document classification',
            'Validation against business rules',
            'Integration with administrative or financial systems',
          ],
        },
        {
          icon: Sparkles,
          title: 'Integración de LLM y Arquitecturas RAG',
          title_en: 'LLM Integration and RAG Architectures',
          description:
            'Modelos de lenguaje de última generación implementados de forma segura y controlada, balanceando precisión, rendimiento y costo.',
          description_en:
            'Latest-generation language models implemented securely and controllably, balancing accuracy, performance and cost.',
          bullets: [
            'Integración de LLM en aplicaciones existentes',
            'Arquitecturas RAG (Retrieval-Augmented Generation)',
            'Control de contexto y memoria conversacional',
            'Optimización de prompts y evaluación de respuestas',
            'Gobernanza y protección de datos sensibles',
          ],
          bullets_en: [
            'LLM integration into existing applications',
            'RAG architectures (Retrieval-Augmented Generation)',
            'Context control and conversational memory',
            'Prompt optimization and response evaluation',
            'Governance and protection of sensitive data',
          ],
        },
        {
          icon: Server,
          title: 'Servidores MCP y Conectividad Avanzada',
          title_en: 'MCP Servers and Advanced Connectivity',
          description:
            'Servidores MCP (Model Context Protocol) para que agentes y asistentes operen activamente — no solo conversen — dentro de tu infraestructura.',
          description_en:
            'MCP (Model Context Protocol) servers so agents and assistants operate actively — not just chat — inside your infrastructure.',
          bullets: [
            'Diseño de herramientas personalizadas para agentes',
            'Exposición controlada de funciones empresariales',
            'Seguridad y control de acceso granular',
            'Arquitecturas extensibles para ecosistemas de IA',
          ],
          bullets_en: [
            'Custom tool design for agents',
            'Controlled exposure of enterprise functions',
            'Granular security and access control',
            'Extensible architectures for AI ecosystems',
          ],
        },
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
        'La columna vertebral de la transformación: Process Intelligence + IA con agentes, atomización de reglas y memoria corporativa para escalar la Empresa Autónoma con gobernanza.',
      tagline_en:
        'The backbone of transformation: Process Intelligence + AI with agents, rule atomization and corporate memory to scale the Autonomous Enterprise with governance.',
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
      overviewParagraphs_en: [
        'SAP Signavio is the suite SAP chose as the foundation of the Autonomous Enterprise: every Joule Agent going into production needs modeled processes, explicit rules and traceability. Without this, AI scales out of control. At GoTechy we implement Signavio as the real starting point for AI-driven transformation.',
        'We cover the seven tools in the suite — Process Insights, Process Intelligence, Process Manager, Process Transformation Manager, Process Collaboration Hub, Process Governance and Journey Modeler — combined with the new capabilities: Process Transformation Assistant, AI-assisted Root Cause Analysis, Process Network Intelligence and industry-specific Value Accelerators.',
        'We work with Process Atoms — reusable fragments of rules, constraints and objectives — so your AI agents operate within business and regulatory limits. We add Corporate Memory to centralize the knowledge shared by all agents deployed in the organization.',
        'We connect Signavio with SAP LeanIX (Process Transformation Manager + Fact Sheets), SAP Cloud ALM and the Joule Assistants of each line of business. This turns process modeling into an operational lever: what is designed is executed, monitored and improved — with auditable metrics and native governance.',
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
        {
          icon: Search,
          title: 'Optimizar procesos',
          title_en: 'Optimize processes',
          description:
            'Mediante la minería de procesos permite visualizar los procesos empresariales de forma clara y comprensible mediante diagramas intuitivos que facilitan la identificación de áreas de mejora.',
          description_en:
            'Through process mining, it lets you visualize business processes clearly and understandably with intuitive diagrams that make improvement areas easy to spot.',
          bullets: [
            'Discovery automático desde los logs de tus sistemas',
            'Diagramas BPMN 2.0 intuitivos',
            'Visualización de variantes y desviaciones',
            'Identificación inmediata de áreas de mejora',
            'Métricas y KPIs sobre el proceso real',
          ],
          bullets_en: [
            'Automatic discovery from your system logs',
            'Intuitive BPMN 2.0 diagrams',
            'Visualization of variants and deviations',
            'Immediate identification of improvement areas',
            'Metrics and KPIs on the real process',
          ],
        },
        {
          icon: BarChart3,
          title: 'Analizar y optimizar',
          title_en: 'Analyze and optimize',
          description:
            'Permite analizar el rendimiento de tus procesos actuales, identifica cuellos de botella y puntos de mejora, y simula cambios para optimizar la eficiencia operativa.',
          description_en:
            'Analyze the performance of your current processes, identify bottlenecks and improvement points, and simulate changes to optimize operational efficiency.',
          bullets: [
            'Análisis de performance del proceso actual',
            'Identificación de cuellos de botella y reprocesos',
            'Simulación de cambios "what-if" antes de implementarlos',
            'Recomendaciones accionables de mejora',
            'Benchmarks de industria con SAP Insights',
          ],
          bullets_en: [
            'Performance analysis of the current process',
            'Identification of bottlenecks and reworks',
            '"What-if" simulation of changes before implementing them',
            'Actionable improvement recommendations',
            'Industry benchmarks with SAP Insights',
          ],
        },
        {
          icon: Users,
          title: 'Colaborar',
          title_en: 'Collaborate',
          description:
            'Fomenta la colaboración entre equipos y partes interesadas al permitirles trabajar juntos en la documentación, análisis y mejora de los procesos empresariales.',
          description_en:
            'Foster collaboration across teams and stakeholders by letting them work together on documenting, analyzing and improving business processes.',
          bullets: [
            'Repositorio central de procesos para toda la organización',
            'Modelado colaborativo en BPMN',
            'Workflows de aprobación y publicación con governance',
            'Comentarios, versionado y trazabilidad',
            'Journey Modeler para alinear CX y operaciones',
          ],
          bullets_en: [
            'Central process repository for the whole organization',
            'Collaborative BPMN modeling',
            'Approval and publishing workflows with governance',
            'Comments, versioning and traceability',
            'Journey Modeler to align CX and operations',
          ],
        },
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
        'BTP es el cimiento de la Empresa Autónoma — Business AI Platform, Joule Studio, AI Agent Hub, Business Data Cloud e Integration Suite trabajando como un solo tejido.',
      tagline_en:
        'BTP is the foundation of the Autonomous Enterprise — Business AI Platform, Joule Studio, AI Agent Hub, Business Data Cloud and Integration Suite working as one fabric.',
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
      overviewParagraphs_en: [
        'BTP has consolidated itself as the platform where everything new in the SAP ecosystem lives: SAP Business AI Platform (the foundation of Joule), Joule Studio (creation of agents and applications), SAP Business Data Cloud, SAP Integration Suite with agent orchestration, and SAP AI Agent Hub for centralized governance. At GoTechy we design BTP architectures ready to scale the Autonomous Enterprise.',
        'We implement clean extensions following Clean Core principles: nothing is touched in the ERP; everything custom lives in BTP. This lets you adopt new SAP releases without breaking your developments and take advantage of AI innovations as they arrive.',
        'We cover Integration Suite (with the new capabilities for agent orchestration, real-time data ingestion, AI gateway and selective API exposure for MCP servers), CAP, Cloud Foundry and Kyma, alongside SAP HANA Cloud as BDC\'s native AI database.',
        'For customers with sovereignty requirements, we implement on SAP Sovereign Cloud and EU AI Cloud with models like Mistral and Cohere, keeping full control of infrastructure, data and local governance.',
      ],
      features: [
        {
          icon: Plug,
          title: 'Integración',
          title_en: 'Integration',
          description:
            'Conectamos tus sistemas y aplicaciones para asegurar un flujo de información sin interrupciones, mejorando la eficiencia operativa y facilitando la toma de decisiones informadas.',
          description_en:
            'We connect your systems and applications to ensure an uninterrupted flow of information, improving operational efficiency and enabling informed decision-making.',
        },
        {
          icon: ArrowUpCircle,
          title: 'Despliegue de aplicaciones SAP',
          title_en: 'Deployment of SAP applications',
          description:
            'Disponibilizamos los productos de SAP BTP que ya contrataste, en conformidad con las mejores prácticas de SAP, para que tu empresa pueda comenzar a aprovecharlos de inmediato.',
          description_en:
            'We provision the SAP BTP products you\'ve already contracted, in line with SAP best practices, so your company can start leveraging them right away.',
        },
        {
          icon: Code2,
          title: 'Desarrollo de aplicaciones',
          title_en: 'Application development',
          description:
            'Creamos soluciones a medida que se alinean perfectamente con los objetivos y procesos de tu empresa, utilizando las herramientas avanzadas de SAP BTP para garantizar aplicaciones robustas y escalables.',
          description_en:
            'We create custom solutions perfectly aligned with your company\'s goals and processes, using the advanced tools of SAP BTP to guarantee robust and scalable applications.',
        },
        {
          icon: Workflow,
          title: 'Flujo de trabajo',
          title_en: 'Workflow',
          description:
            'Optimizamos y automatizamos tus procesos de negocio para mejorar la productividad y reducir los tiempos de ciclo, asegurando que tus operaciones sean más ágiles y efectivas.',
          description_en:
            'We optimize and automate your business processes to improve productivity and reduce cycle times, making your operations more agile and effective.',
        },
        {
          icon: BarChart3,
          title: 'Gestión y análisis de datos',
          title_en: 'Data management and analytics',
          description:
            'Implementamos estrategias de gestión de datos que te permiten obtener insights valiosos y en tiempo real, apoyando decisiones estratégicas y operativas basadas en datos precisos.',
          description_en:
            'We implement data management strategies that give you valuable real-time insights, supporting strategic and operational decisions based on precise data.',
        },
        {
          icon: Bot,
          title: 'Automatización',
          title_en: 'Automation',
          description:
            'Utilizamos las capacidades de automatización de SAP BTP para reducir la carga de trabajo manual, minimizar errores y liberar recursos para tareas de mayor valor añadido.',
          description_en:
            'We use the automation capabilities of SAP BTP to reduce manual workload, minimize errors and free up resources for higher-value tasks.',
        },
        {
          icon: Users,
          title: 'Soporte y consultoría',
          title_en: 'Support and consulting',
          description:
            'Ofrecemos soporte continuo y servicios de consultoría para asegurar que tu empresa maximice el valor de SAP BTP, adaptándose a las tendencias del mercado y manteniendo una ventaja competitiva.',
          description_en:
            'We provide ongoing support and consulting services to ensure your company maximizes the value of SAP BTP, adapting to market trends and maintaining a competitive edge.',
        },
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
        'La arquitectura como palanca: catálogo, gobernanza y ahora también el control central de agentes, LLMs y servidores MCP en toda la organización.',
      tagline_en:
        'Architecture as leverage: catalog, governance and now the central control point for agents, LLMs and MCP servers across the entire organization.',
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
      overviewParagraphs_en: [
        'SAP LeanIX is no longer just an Enterprise Architecture tool: with SAP AI Agent Hub it became the governance center for enterprise AI — a centralized inventory of agents, LLMs and MCP servers, no matter which platform they run on. At GoTechy we implement LeanIX as the backbone of change control in organizations scaling AI.',
        'We cover the platform\'s key capabilities: the Enterprise Architect Assistant that keeps architectural data up to date, integration with Signavio Process Transformation Manager to connect architecture with processes, alignment with SAP Cloud ALM and Fact Sheets enriched with process data.',
        'We implement the new AI governance features: agent registration and observability, risk assessment and formal verification before production, integration with SAP Cloud Identity Services for access control, execution analysis with Signavio and mapping to business units via SuccessFactors.',
        'Without LeanIX, scaling agents is a gamble. With LeanIX, every agent going to production is catalogued, evaluated, monitored and tied to a functional owner. That\'s what separates an AI POC from a sustainable autonomous operation.',
      ],
      features: [
        {
          icon: Network,
          title: 'Modelado de plataformas',
          title_en: 'Platform modeling',
          description:
            'Conecta componentes de TI y aplicaciones a conceptos estratégicos, brindando a los CIOs información sobre los elementos críticos que respaldan las plataformas de la organización.',
          description_en:
            'Connects IT components and applications to strategic concepts, giving CIOs insight into the critical elements that support the organization\'s platforms.',
          bullets: [
            'Application Portfolio Management vivo',
            'Mapeo de aplicaciones a capabilities de negocio',
            'Análisis de dependencias entre componentes',
            'Inventario de tecnologías y su ciclo de vida',
            'Vista ejecutiva del landscape completo',
          ],
          bullets_en: [
            'Live Application Portfolio Management',
            'Mapping of applications to business capabilities',
            'Dependency analysis between components',
            'Technology inventory and lifecycle',
            'Executive view of the full landscape',
          ],
        },
        {
          icon: Boxes,
          title: 'Meta Model predefinido',
          title_en: 'Predefined Meta Model',
          description:
            'Proporciona una estructura estandarizada para documentar todos los elementos de la arquitectura empresarial, basada en las mejores prácticas de más de 1.000 clientes.',
          description_en:
            'Provides a standardized structure to document all elements of the enterprise architecture, based on best practices from over 1,000 customers.',
          bullets: [
            'Estructura estandarizada lista para usar',
            'Best practices de 1.000+ clientes globales',
            'Aplicaciones, tecnologías, capabilities y procesos pre-modelados',
            'Adaptable a tu modelo de negocio',
            'Reduce el time-to-value a semanas',
          ],
          bullets_en: [
            'Ready-to-use standardized structure',
            'Best practices from 1,000+ global customers',
            'Applications, technologies, capabilities and processes pre-modeled',
            'Adaptable to your business model',
            'Reduces time-to-value to weeks',
          ],
        },
        {
          icon: Sparkles,
          title: 'Integración con herramientas de IA',
          title_en: 'Integration with AI tools',
          description:
            'Ofrece funciones como el Inventory Builder, que acelera la creación del inventario de TI mediante inteligencia artificial.',
          description_en:
            'Offers features like the Inventory Builder, which speeds up IT inventory creation using artificial intelligence.',
          bullets: [
            'Inventory Builder con IA para el inventario inicial',
            'Detección automática desde SSO, CMDB y cloud providers',
            'Continuous discovery del landscape',
            'Recomendaciones automatizadas de catalogación',
            'Mantenimiento mínimo del repositorio',
          ],
          bullets_en: [
            'AI-powered Inventory Builder for the initial inventory',
            'Automatic detection from SSO, CMDB and cloud providers',
            'Continuous discovery of the landscape',
            'Automated catalog recommendations',
            'Minimal manual repository maintenance',
          ],
        },
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
        'El camino a Cloud ERP con asistentes Joule de migración y modernización — Clean Core como principio, no como aspiración.',
      tagline_en:
        'The path to Cloud ERP with Joule migration and modernization assistants — Clean Core as a principle, not an aspiration.',
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
      overviewParagraphs_en: [
        'We operate, migrate and modernize SAP systems across their full lifecycle — from implementation to upgrades, high availability, DR and 24/7 support. With more than 20 years in the ecosystem and customized SLAs for critical enterprise customers.',
        'SAP added the Joule migration and modernization assistants inside RISE with SAP Advanced Cloud Transformation: automated system analysis, detection and correction of custom code, best-practice application and automated testing/validation. At GoTechy we leverage these assistants to drastically shorten transition times to SAP Cloud ERP — public or private.',
        'We apply the five Clean Core principles to every migration: the ERP stays standard, extensions live in BTP, and the RISE with SAP quality gates objectively measure AI readiness. This lets every new SAP release (Joule, Industry AI, BDC) reach the customer without rewriting anything.',
        'We cover the full technical stack: installation, configuration, performance tuning, security, observability, S/4HANA migrations and hybrid architectures. We add services aligned with SAP\'s Max Success Plan to coordinate adoption, governance and premium support in complex transformations.',
      ],
      features: [
        {
          icon: Server,
          title: 'Implementaciones técnicas y soporte post-implementación',
          title_en: 'Technical implementations and post-implementation support',
          description:
            'Realizamos implementaciones técnicas de sistemas SAP — incluyendo sizing, instalación, configuración técnica y soporte continuo — para asegurar una transición sin problemas y garantizar que tu sistema funcione de manera eficiente.',
          description_en:
            'We deliver technical implementations of SAP systems — including sizing, installation, technical configuration and ongoing support — to ensure a smooth transition and make sure your system runs efficiently.',
        },
        {
          icon: ArrowUpCircle,
          title: 'Actualización de stack o versión de sistemas',
          title_en: 'Stack or version upgrades',
          description:
            'Realizamos actualizaciones de stack y de versión de sistemas SAP, asegurando que tu infraestructura esté siempre al día con las últimas mejoras y parches de seguridad.',
          description_en:
            'We perform stack and version upgrades of SAP systems, making sure your infrastructure is always up to date with the latest improvements and security patches.',
        },
        {
          icon: Database,
          title: 'Actualización de bases de datos',
          title_en: 'Database upgrades',
          description:
            'Actualizamos las bases de datos sobre las que corren tus sistemas SAP para que cuentes con las últimas mejoras y correcciones.',
          description_en:
            'We upgrade the databases your SAP systems run on so you benefit from the latest improvements and fixes.',
        },
        {
          icon: ShieldCheck,
          title: 'Backup y restauración de bases de datos',
          title_en: 'Database backup and restoration',
          description:
            'Configuramos backups periódicos de las bases de datos de tus sistemas SAP, protegiendo tus datos ante posibles fallas. En caso de requerir el regreso a un estado anterior, efectuamos restauraciones de bases de datos.',
          description_en:
            'We configure periodic database backups of your SAP systems, protecting your data against possible failures. When a rollback is needed, we perform database restorations.',
        },
        {
          icon: GitMerge,
          title: 'Migraciones homogéneas y heterogéneas',
          title_en: 'Homogeneous and heterogeneous migrations',
          description:
            'Llevamos a cabo migraciones de sistemas SAP, ya sea dentro del mismo entorno (homogéneas) o hacia diferentes plataformas (heterogéneas), minimizando riesgos y asegurando la integridad de los datos.',
          description_en:
            'We carry out SAP system migrations, whether within the same environment (homogeneous) or to different platforms (heterogeneous), minimizing risk and safeguarding data integrity.',
        },
        {
          icon: Activity,
          title: 'Esquemas de alta disponibilidad',
          title_en: 'High availability architectures',
          description:
            'Diseñamos e implementamos arquitecturas de alta disponibilidad para tus sistemas SAP, garantizando la continuidad operativa y minimizando el tiempo de inactividad.',
          description_en:
            'We design and implement high availability architectures for your SAP systems, guaranteeing operational continuity and minimizing downtime.',
        },
        {
          icon: Lock,
          title: 'Gestión integral de seguridad y perfiles',
          title_en: 'Integrated security and profile management',
          description:
            'Ofrecemos una gestión completa de la seguridad de tu entorno SAP, incluyendo la administración de perfiles y roles de usuario, para proteger tu información crítica.',
          description_en:
            'We provide full security management for your SAP environment, including user profile and role administration, to protect your critical information.',
        },
        {
          icon: Wrench,
          title: 'Soporte y mantenimiento',
          title_en: 'Support and maintenance',
          description:
            'Proporcionamos soporte técnico y mantenimiento preventivo y correctivo, asegurando que tus sistemas SAP operen de manera óptima y resolviendo cualquier incidencia que pueda surgir.',
          description_en:
            'We provide technical support and preventive and corrective maintenance, ensuring your SAP systems run at their best and resolving any incidents that arise.',
        },
        {
          icon: BarChart3,
          title: 'Monitoreo y reportes',
          title_en: 'Monitoring and reporting',
          description:
            'Monitoreamos la integridad y el rendimiento de tus sistemas SAP y generamos reportes técnicos y ejecutivos para que te mantengas al tanto del estado de tu plataforma y puedas tomar decisiones informadas.',
          description_en:
            'We monitor the integrity and performance of your SAP systems and generate technical and executive reports so you stay aware of your platform\'s status and make informed decisions.',
        },
        {
          icon: Users,
          title: 'Coaching de proyectos',
          title_en: 'Project coaching',
          description:
            'Brindamos asesoramiento y coaching para proyectos SAP, apoyando a tu equipo en la planificación, ejecución y gestión de proyectos para garantizar su éxito.',
          description_en:
            'We provide advisory and coaching for SAP projects, supporting your team in planning, executing and managing projects to guarantee their success.',
        },
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
        'La experiencia de usuario completa: Fiori para transacciones estructuradas + Joule Work como capa adaptativa basada en intención.',
      tagline_en:
        'The complete user experience: Fiori for structured transactions + Joule Work as an adaptive intent-based layer.',
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
      overviewParagraphs_en: [
        'SAP redefined the user experience with Joule Work — a dynamic workspace that interprets user intent in natural language (text and voice) and coordinates agents to execute tasks across SAP and non-SAP systems. Joule Work complements Fiori: structured transactions remain Fiori\'s domain; multi-step, multi-system, multi-domain flows are resolved by Joule.',
        'At GoTechy we design and implement the right combination for each customer: standard and custom Fiori apps with SAPUI5/Fiori Elements for core operations, and the progressive integration of Joule Work (web, mobile and desktop) so users delegate routine tasks and focus on decisions.',
        'We cover the Fiori Launchpad as a unified entry point, custom developments with UI5/Fiori Elements and the addition of intelligent voice (SAP-LiveKit partnership) for employees who work away from the keyboard — field, plant, retail, logistics.',
        'The real differentiator is no longer just "fewer clicks." It\'s: what used to require navigating 7 transactions is now solved by telling Joule what your goal is. That\'s the transition we help you plan and deliver without breaking what already works.',
      ],
      features: [
        {
          icon: Rocket,
          title: 'Implementación',
          title_en: 'Implementation',
          description:
            'Despliegue completo de SAP Fiori adaptado a las necesidades de tu empresa, desde la activación del Launchpad hasta el rollout a usuarios.',
          description_en:
            'Full SAP Fiori deployment tailored to your company\'s needs, from Launchpad activation to user rollout.',
          bullets: [
            'Activación y configuración del Fiori Launchpad',
            'Catalogación de apps estándar relevantes',
            'Roles, autorizaciones y SSO con tu IdP',
            'Plan de adopción y rollout por área',
            'Transferencia de conocimiento al equipo interno',
          ],
          bullets_en: [
            'Activation and configuration of the Fiori Launchpad',
            'Cataloging of relevant standard apps',
            'Roles, authorizations and SSO with your IdP',
            'Adoption and rollout plan by department',
            'Knowledge transfer to the internal team',
          ],
        },
        {
          icon: Code2,
          title: 'Desarrollo de aplicaciones personalizadas',
          title_en: 'Custom application development',
          description:
            'Creación de soluciones a medida para optimizar tus procesos, utilizando Fiori Elements y SAPUI5 según el caso.',
          description_en:
            'Creation of tailored solutions to optimize your processes, using Fiori Elements and SAPUI5 as appropriate.',
          bullets: [
            'Fiori Elements (apps generadas por metadata)',
            'SAPUI5 / OpenUI5 custom para procesos específicos',
            'Diseño UX alineado al design system de Fiori',
            'Backend OData v4 / RAP a medida',
            'Apps responsive — desktop, tablet y mobile',
          ],
          bullets_en: [
            'Fiori Elements (metadata-driven apps)',
            'Custom SAPUI5 / OpenUI5 for specific processes',
            'UX design aligned with the Fiori design system',
            'Custom OData v4 / RAP backend',
            'Responsive apps — desktop, tablet and mobile',
          ],
        },
        {
          icon: ArrowUpCircle,
          title: 'Actualizaciones',
          title_en: 'Updates',
          description:
            'Mantenimiento y mejora continua para asegurar el mejor rendimiento y compatibilidad con nuevos releases de SAP.',
          description_en:
            'Maintenance and continuous improvement to ensure the best performance and compatibility with new SAP releases.',
          bullets: [
            'Upgrades de versión de UI5',
            'Actualización de catálogos estándar',
            'Compatibilidad con nuevos releases SAP',
            'Refactor de apps custom legacy',
            'Mantenimiento preventivo y proactivo',
          ],
          bullets_en: [
            'UI5 version upgrades',
            'Update of standard catalogs',
            'Compatibility with new SAP releases',
            'Refactor of legacy custom apps',
            'Preventive and proactive maintenance',
          ],
        },
        {
          icon: Zap,
          title: 'Optimización del rendimiento',
          title_en: 'Performance optimization',
          description:
            'Ajustes técnicos para mejorar la velocidad y eficiencia de tus aplicaciones Fiori, con foco en la experiencia del usuario final.',
          description_en:
            'Technical adjustments to improve the speed and efficiency of your Fiori applications, focused on the end-user experience.',
          bullets: [
            'Análisis de tiempos de carga y LCP',
            'Optimización OData v4 vs. v2',
            'Lazy loading, bundling y caching',
            'Tuning del SAP Gateway',
            'Mejores prácticas de SAPUI5',
          ],
          bullets_en: [
            'Load time and LCP analysis',
            'OData v4 vs. v2 optimization',
            'Lazy loading, bundling and caching',
            'SAP Gateway tuning',
            'SAPUI5 best practices',
          ],
        },
        {
          icon: Wrench,
          title: 'Resolución de problemas',
          title_en: 'Troubleshooting',
          description:
            'Asistencia experta para solucionar errores y garantizar un funcionamiento óptimo de tus apps Fiori en producción.',
          description_en:
            'Expert assistance to solve errors and guarantee optimal operation of your Fiori apps in production.',
          bullets: [
            'Soporte L2 / L3 especializado',
            'Diagnóstico y resolución de incidencias',
            'Hotfixes a apps custom',
            'Análisis de logs y troubleshooting',
            'SLA personalizado según criticidad',
          ],
          bullets_en: [
            'Specialized L2 / L3 support',
            'Incident diagnosis and resolution',
            'Hotfixes to custom apps',
            'Log analysis and troubleshooting',
            'Customized SLA based on criticality',
          ],
        },
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
        'Desarrollo ABAP alineado a los principios de Clean Core: extensiones que no rompen al upgradear y que conviven con SAP Domain Models e IA generativa de código.',
      tagline_en:
        'ABAP development aligned with Clean Core principles: extensions that don\'t break on upgrade and coexist with SAP Domain Models and generative AI code.',
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
      overviewParagraphs_en: [
        'Specialists in SAP ABAP — classic, RAP (RESTful ABAP Programming), CDS Views and AMDPs — to extend, optimize and modernize the system without compromising the path to Cloud ERP. Our team applies the five Clean Core principles on every commit.',
        'SAP introduced Domain Models: AI models trained specifically on SAP S/4HANA code, data and patterns, capable of generating clean, core-compatible ABAP from natural language. At GoTechy we adopt these capabilities — via Joule Studio — to speed up development while keeping governance.',
        'We work with User Exits, BAdIs, Enhancements and CDS Views to extend the standard without touching it. For complex extensions, we move them to SAP BTP as side-by-side: that\'s the pattern that survives every upgrade and leaves the ERP ready to adopt Joule Assistants and new releases without rewriting.',
        'When the case requires it, we integrate ABAP with agentic development: OData APIs consumed by Joule agents, contexts published via MCP so AI operates with your instance\'s data, and change validation with SAP Cloud ALM. Old and new coexisting without friction.',
      ],
      features: [
        {
          icon: Code2,
          title: 'Desarrollo y optimización de programas ABAP',
          title_en: 'ABAP development and optimization',
          description:
            'Creación de reportes, formularios, interfaces y mejoras en el rendimiento del código existente, siguiendo normas de calidad y best practices.',
          description_en:
            'Creation of reports, forms, interfaces and performance improvements on existing code, following quality standards and best practices.',
          bullets: [
            'Reports ALV, SmartForms y Adobe Forms',
            'Formularios e interfaces personalizadas',
            'Mejoras de rendimiento sobre código legacy',
            'Refactor con foco en mantenibilidad',
            'Code reviews y validación con ATC',
          ],
          bullets_en: [
            'ALV reports, SmartForms and Adobe Forms',
            'Custom forms and interfaces',
            'Performance improvements on legacy code',
            'Refactor focused on maintainability',
            'Code reviews and validation with ATC',
          ],
        },
        {
          icon: Wrench,
          title: 'Ampliaciones y mejoras',
          title_en: 'Enhancements and improvements',
          description:
            'User Exits, BAdIs, Enhancements y BTEs para adaptar procesos estándar de SAP a los requerimientos del negocio — sin tocar el core.',
          description_en:
            'User Exits, BAdIs, Enhancements and BTEs to adapt standard SAP processes to business requirements — without touching the core.',
          bullets: [
            'User Exits clásicos sobre ECC',
            'BAdIs (Business Add-Ins) en S/4HANA',
            'Implicit y Explicit Enhancements',
            'BTEs (Business Transaction Events)',
            'Customización 100% upgrade-safe',
          ],
          bullets_en: [
            'Classic User Exits on ECC',
            'BAdIs (Business Add-Ins) on S/4HANA',
            'Implicit and Explicit Enhancements',
            'BTEs (Business Transaction Events)',
            '100% upgrade-safe customization',
          ],
        },
        {
          icon: Network,
          title: 'Integraciones',
          title_en: 'Integrations',
          description:
            'Desarrollo de APIs, Web Services y conectores para la integración de SAP con sistemas externos y plataformas B2B.',
          description_en:
            'Development of APIs, Web Services and connectors to integrate SAP with external systems and B2B platforms.',
          bullets: [
            'APIs REST y Web Services SOAP',
            'BAPIs y BAPIs remotas (RFC)',
            'IDOCs para integración EDI/B2B',
            'Conectores con marketplaces y bancos',
            'Middleware y mensajería',
          ],
          bullets_en: [
            'REST APIs and SOAP Web Services',
            'BAPIs and remote BAPIs (RFC)',
            'IDOCs for EDI/B2B integration',
            'Connectors with marketplaces and banks',
            'Middleware and messaging',
          ],
        },
        {
          icon: GitMerge,
          title: 'Migración y adaptación a S/4HANA',
          title_en: 'Migration and adaptation to S/4HANA',
          description:
            'Conversión de código a ABAP en S/4HANA y uso de nuevas tecnologías como CDS Views y AMDPs para máxima performance.',
          description_en:
            'Code conversion to ABAP on S/4HANA and use of new technologies like CDS Views and AMDPs for maximum performance.',
          bullets: [
            'Análisis con SAP Readiness Check',
            'Conversión a sintaxis S/4HANA',
            'Reemplazo de tablas obsoletas',
            'Modelado moderno con CDS Views',
            'Procedimientos optimizados con AMDPs',
          ],
          bullets_en: [
            'Analysis with SAP Readiness Check',
            'Conversion to S/4HANA syntax',
            'Replacement of obsolete tables',
            'Modern modeling with CDS Views',
            'Optimized procedures with AMDPs',
          ],
        },
        {
          icon: Workflow,
          title: 'Desarrollo en SAP Fiori / UI5',
          title_en: 'Development on SAP Fiori / UI5',
          description:
            'Aplicaciones web modernas y responsivas basadas en ABAP RAP y OData, listas para consumirse desde el Fiori Launchpad.',
          description_en:
            'Modern, responsive web applications based on ABAP RAP and OData, ready to be consumed from the Fiori Launchpad.',
          bullets: [
            'ABAP RAP (RESTful ABAP Programming)',
            'Servicios OData v2 y v4',
            'Backend para apps Fiori Elements',
            'Integración con Fiori Launchpad',
            'Custom apps SAPUI5',
          ],
          bullets_en: [
            'ABAP RAP (RESTful ABAP Programming)',
            'OData v2 and v4 services',
            'Backend for Fiori Elements apps',
            'Integration with Fiori Launchpad',
            'Custom SAPUI5 apps',
          ],
        },
        {
          icon: Zap,
          title: 'Automatización de procesos',
          title_en: 'Process automation',
          description:
            'Creación de programas batch, BAPIs y herramientas de optimización de tareas repetitivas — para liberar al equipo de trabajo manual.',
          description_en:
            'Creation of batch programs, BAPIs and tools to optimize repetitive tasks — freeing the team from manual work.',
          bullets: [
            'Programas batch (background jobs)',
            'BAPIs custom para procesos repetitivos',
            'Workflow SAP estándar',
            'Job scheduling y monitoreo',
            'Reducción medible de tareas manuales',
          ],
          bullets_en: [
            'Batch programs (background jobs)',
            'Custom BAPIs for repetitive processes',
            'Standard SAP Workflow',
            'Job scheduling and monitoring',
            'Measurable reduction of manual tasks',
          ],
        },
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
        'Desarrollo moderno y agentico: Joule Studio con marcos de agentes preferidos (LangGraph, AutoGen, LlamaIndex), Python SDK, MCP, A2A y orquestación visual con n8n.',
      tagline_en:
        'Modern and agentic development: Joule Studio with preferred agent frameworks (LangGraph, AutoGen, LlamaIndex), Python SDK, MCP, A2A and visual orchestration with n8n.',
      heroImage:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
      overviewParagraphs: [
        'El desarrollo empresarial ya no es solo "Java + APIs". Hoy se construyen agentes que razonan sobre datos SAP, se conectan vía MCP a herramientas internas y dialogan con agentes de terceros vía A2A. En GoTechy combinamos lo mejor de los dos mundos: full-stack moderno (Java, Node, Python, React, Angular) y desarrollo agentico sobre Joule Studio.',
        'Usamos Joule Studio en modo pro-code con SAP Cloud SDK para Python y los frameworks de agentes que prefiere cada equipo — LangGraph, AutoGen, LlamaIndex. Los agentes que entregamos entienden nativamente el código, los modelos de datos y los procesos SAP gracias a los SAP Domain Models, no como genéricos de internet.',
        'Para orquestación visual de flujos agenticos, aprovechamos la alianza SAP-n8n integrada en Joule Studio. Para experiencias front-end más allá de Fiori, usamos Vercel + Next.js cuando el caso pide velocidad y diseño custom. Y para razonamiento avanzado, integramos modelos como Claude (Anthropic) o los soberanos de la EU AI Cloud (Mistral, Cohere).',
        'Construimos productos completos: portales B2B/B2C, comprobantes fiscales digitales, gestores de logística, integraciones con TMS, servicios cloud-native y ahora también agentes empresariales con gobernanza vía SAP AI Agent Hub. Código limpio, testeado, observable y listo para producción.',
      ],
      overviewParagraphs_en: [
        'Enterprise development is no longer just "Java + APIs". Today we build agents that reason over SAP data, connect to internal tools via MCP and converse with third-party agents via A2A. At GoTechy we combine the best of both worlds: modern full-stack (Java, Node, Python, React, Angular) and agentic development on Joule Studio.',
        'We use Joule Studio in pro-code mode with the SAP Cloud SDK for Python and the agent frameworks each team prefers — LangGraph, AutoGen, LlamaIndex. The agents we deliver natively understand SAP code, data models and processes thanks to SAP Domain Models, not as internet generics.',
        'For visual orchestration of agentic flows, we leverage the SAP-n8n partnership integrated into Joule Studio. For front-end experiences beyond Fiori, we use Vercel + Next.js when the case calls for speed and custom design. And for advanced reasoning, we integrate models like Claude (Anthropic) or the EU AI Cloud sovereigns (Mistral, Cohere).',
        'We build complete products: B2B/B2C portals, digital tax receipts, logistics managers, TMS integrations, cloud-native services and now also enterprise agents with governance via SAP AI Agent Hub. Clean code, tested, observable and production-ready.',
      ],
      features: [
        {
          icon: Server,
          title: 'Backend en Java / Spring Boot',
          title_en: 'Backend in Java / Spring Boot',
          description:
            'APIs REST, microservicios y aplicaciones empresariales con Spring Boot, Hibernate y el stack Java tradicional.',
          description_en:
            'REST APIs, microservices and enterprise applications with Spring Boot, Hibernate and the traditional Java stack.',
        },
        {
          icon: Code2,
          title: 'Backend en Node.js / Python',
          title_en: 'Backend in Node.js / Python',
          description:
            'Servicios livianos en Node.js (Express, NestJS) y Python (FastAPI, Django) cuando el caso lo justifica.',
          description_en:
            'Lightweight services in Node.js (Express, NestJS) and Python (FastAPI, Django) when the case warrants it.',
        },
        {
          icon: Sparkles,
          title: 'Frontends en React / Angular',
          title_en: 'Frontends in React / Angular',
          description:
            'SPAs modernas, responsive y accesibles. Design systems consistentes con la marca del cliente.',
          description_en:
            'Modern, responsive and accessible SPAs. Design systems consistent with the client\'s brand.',
        },
        {
          icon: GitBranch,
          title: 'Microservicios y APIs',
          title_en: 'Microservices and APIs',
          description:
            'Arquitecturas desacopladas con comunicación vía REST, gRPC o eventos. Listas para escalar.',
          description_en:
            'Decoupled architectures with communication via REST, gRPC or events. Ready to scale.',
        },
        {
          icon: Workflow,
          title: 'CI/CD y testing',
          title_en: 'CI/CD and testing',
          description:
            'Pipelines de CI/CD, pruebas unitarias, integración y e2e. Calidad como parte del proceso, no como auditoría posterior.',
          description_en:
            'CI/CD pipelines, unit, integration and e2e testing. Quality as part of the process, not as a later audit.',
        },
        {
          icon: ShieldCheck,
          title: 'Seguridad y escalabilidad',
          title_en: 'Security and scalability',
          description:
            'OAuth2/OIDC, encriptación, secrets management y auditoría. Apps diseñadas para crecer con el negocio.',
          description_en:
            'OAuth2/OIDC, encryption, secrets management and auditing. Apps designed to grow with the business.',
        },
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
        'Project management de SAP enterprise potenciado por Autonomous Project Delivery — Asistente de Gestión de Proyectos, Asistente de Facturación y métricas de valor en tiempo real.',
      tagline_en:
        'Enterprise SAP project management powered by Autonomous Project Delivery — Project Management Assistant, Billing Assistant and real-time value metrics.',
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
      overviewParagraphs_en: [
        'We lead end-to-end SAP programs with SAP Activate, the official methodology — combined with agile practices when the case calls for it. Clear governance, actionable KPIs, active risk and change management, and measurable roadmaps aligned with business goals.',
        'SAP defined Autonomous Project Delivery as one of the initial Industry AI scenarios. We adopt the Joule project management assistants: fast project setup from historical data, intelligent resource assignment, conversational support for timesheets, project changes and more accurate, timely billing.',
        'We connect project execution with SAP Signavio Process Transformation Manager and SAP Cloud ALM so delivered value (monetary and non-monetary) is captured in real time, not in a parallel spreadsheet. Every milestone we close has auditable metrics tied to the investment.',
        'We lead with strategic vision and land with technical discipline: the right team, the right methodologies and the right assistants so the transformation delivers sustainable results — not one-off efforts that don\'t scale.',
      ],
      features: [
        {
          icon: Target,
          title: 'Roadmaps claros y medibles',
          title_en: 'Clear, measurable roadmaps',
          description:
            'Definimos roadmaps con KPIs que permiten evaluar avances de forma constante y transparente, conectando hitos técnicos con objetivos de negocio.',
          description_en:
            'We define roadmaps with KPIs that let you evaluate progress constantly and transparently, connecting technical milestones with business objectives.',
          bullets: [
            'Hitos y entregables claros por fase',
            'KPIs y métricas accionables para el sponsor',
            'Tracking de avance vs. baseline',
            'Reporting ejecutivo continuo',
            'Visibilidad transparente para todos los stakeholders',
          ],
          bullets_en: [
            'Clear milestones and deliverables per phase',
            'KPIs and actionable metrics for the sponsor',
            'Progress tracking vs. baseline',
            'Continuous executive reporting',
            'Transparent visibility for all stakeholders',
          ],
        },
        {
          icon: Users,
          title: 'Coordinación efectiva entre actores',
          title_en: 'Effective coordination across stakeholders',
          description:
            'Logramos una coordinación efectiva entre todos los actores del proyecto, generando alineación y fluidez en la comunicación interna y externa.',
          description_en:
            'We achieve effective coordination across all project stakeholders, fostering alignment and smooth internal and external communication.',
          bullets: [
            'Stakeholders mapeados y comprometidos',
            'RACI claro y respetado',
            'Comunicación fluida interna y externa',
            'Ritualidad: standups, status reviews, retros',
            'Escalación clara cuando hace falta',
          ],
          bullets_en: [
            'Stakeholders mapped and engaged',
            'Clear and respected RACI',
            'Smooth internal and external communication',
            'Ceremonies: standups, status reviews, retros',
            'Clear escalation when needed',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Gestión activa de riesgos y cambios',
          title_en: 'Active risk and change management',
          description:
            'Gestionamos activamente riesgos y cambios, anticipando desvíos y adaptándonos con agilidad para mantener el foco en el valor de negocio.',
          description_en:
            'We actively manage risks and changes, anticipating deviations and adapting with agility to keep the focus on business value.',
          bullets: [
            'Identificación temprana de riesgos',
            'Plan de mitigación por riesgo crítico',
            'Comité de cambios con governance',
            'Re-baseline cuando el contexto lo amerita',
            'Foco en valor, no en el plan original',
          ],
          bullets_en: [
            'Early identification of risks',
            'Mitigation plan per critical risk',
            'Change committee with governance',
            'Re-baselining when context demands it',
            'Focus on value, not on the original plan',
          ],
        },
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
    faq: detail.faq.map((item) => ({
      ...item,
      q: pick(item.q_en, item.q),
      a: pick(item.a_en, item.a),
    })),
    metaTitle: pick(detail.metaTitle_en, detail.metaTitle),
    metaDescription: pick(detail.metaDescription_en, detail.metaDescription),
  };
}
