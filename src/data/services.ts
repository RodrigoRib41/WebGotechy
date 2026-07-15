import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  ArrowUpCircle,
  BadgeCheck,
  Blocks,
  Bot,
  Boxes,
  Braces,
  Brain,
  BrainCircuit,
  Cable,
  Cloud,
  CloudCog,
  Combine,
  Compass,
  Database,
  DatabaseZap,
  FileBarChart,
  FileText,
  Fingerprint,
  FlaskConical,
  Gauge,
  GitCompare,
  Globe2,
  HeartHandshake,
  HeartPulse,
  Infinity,
  LayoutDashboard,
  LayoutGrid,
  Layers3,
  LineChart,
  Map,
  MessagesSquare,
  PackageCheck,
  Plug,
  PlugZap,
  Presentation,
  Puzzle,
  RefreshCw,
  Rocket,
  Route,
  ScanSearch,
  ScanText,
  Server,
  ServerCog,
  Shapes,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
  Waypoints,
  Webhook,
  Workflow,
  Zap,
} from 'lucide-react';

// ===== Types ====================================================
// Todos los campos de texto admiten una variante `_en` opcional.
// `getLocalizedService()` se encarga de seleccionar la variante correcta y
// hacer fallback al español si la EN no está cargada.

export interface ServiceFeature {
  /** Icono lucide — se usa en la ilustración fallback del overview. */
  icon: LucideIcon;
  /** Icono ilustrado on-brand (SVG en /public/icons/capabilities). Tiene prioridad en las cards de Capacidades. */
  image?: string;
  title: string;
  title_en?: string;
  /** Opcional: las tarjetas de "Capacidades" pueden ser solo título + icono. */
  description?: string;
  description_en?: string;
  /** Sub-bullets opcionales para detallar el alcance de la feature. */
  bullets?: string[];
  bullets_en?: string[];
}

/**
 * Item del stack tecnológico. icon (lucide) o imageUrl (logo subido).
 * Si `items` está presente, el label actúa como CATEGORÍA y cada string
 * es una tecnología del grupo (se renderizan como chips).
 */
export interface ServiceTechItem {
  label: string;
  label_en?: string;
  icon?: LucideIcon;
  imageUrl?: string;
  /** Tecnologías del grupo (nombres de marca, no se traducen). */
  items?: string[];
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
  /** Relación de aspecto de los marcos de imagen (hero + overview) en la página. Default '4/3'. */
  imageAspect?: '5/4' | '4/3' | '3/4' | '1/1';
  overviewParagraphs: string[];
  overviewParagraphs_en?: string[];
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  /** Opcional: banner de stats/métricas del producto (renderizado entre overview y features). */
  stats?: ServiceStatsBlock;
  /** Opcional: bloque de metodología / "Cómo trabajamos". */
  approach?: ServiceApproachBlock;
  /** Opcional: sección breve complementaria al final de la página (reutiliza el layout de approach). */
  extraSection?: ServiceApproachBlock;
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
        'IA aplicada al negocio. Tecnología que genera resultados reales.',
      tagline_en:
        'AI applied to business. Technology that drives real results.',
      heroImage: '/images/IA-1.webp',
      overviewImage: '/images/IA-2.webp',
      overviewParagraphs: [
        'Desarrollamos soluciones avanzadas basadas en Inteligencia Artificial diseñadas para generar impacto real en el negocio. No implementamos IA como tendencia: la integramos estratégicamente en procesos, sistemas y productos para optimizar operaciones, reducir costos y mejorar la toma de decisiones.',
        'Diseñamos, construimos e integramos soluciones de IA de extremo a extremo, desde la arquitectura hasta la puesta en producción y evolución continua.',
      ],
      overviewParagraphs_en: [
        'We develop advanced Artificial Intelligence solutions designed to generate real business impact. We don\'t implement AI as a trend: we integrate it strategically into processes, systems and products to optimize operations, reduce costs and improve decision-making.',
        'We design, build and integrate end-to-end AI solutions, from architecture to production deployment and continuous evolution.',
      ],
      features: [
        { icon: Zap, image: '/icons/capabilities/ia-automatizacion.svg', title: 'Automatización inteligente de procesos', title_en: 'Intelligent process automation' },
        { icon: TrendingUp, image: '/icons/capabilities/ia-predictivos.svg', title: 'Modelos predictivos', title_en: 'Predictive models' },
        { icon: ScanText, image: '/icons/capabilities/ia-documentos.svg', title: 'Document processing con IA (facturas, órdenes)', title_en: 'AI document processing (invoices, orders)' },
        { icon: MessagesSquare, image: '/icons/capabilities/ia-chatbots.svg', title: 'Chatbots y agentes empresariales', title_en: 'Enterprise chatbots and agents' },
        { icon: Cable, image: '/icons/capabilities/ia-integracion.svg', title: 'Integración con sistemas empresariales', title_en: 'Integration with enterprise systems' },
        { icon: BrainCircuit, image: '/icons/capabilities/ia-adopcion.svg', title: 'Consultoría de adopción de IA', title_en: 'AI adoption consulting' },
      ],
      approach: {
        title: 'Cómo trabajamos la IA',
        title_en: 'How we work with AI',
        subtitle:
          'Un enfoque integral que asegura que la IA en producción funcione, sea segura y sea rentable. Cada solución es diseñada con foco en impacto medible y retorno de inversión.',
        subtitle_en:
          'A comprehensive approach that ensures AI in production works, is secure and is profitable. Every solution is designed with a focus on measurable impact and return on investment.',
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
          technologies: ['IDP', 'n8n', 'LLM'],
        },
        {
          title: 'Asistente conversacional empresarial',
          title_en: 'Enterprise conversational assistant',
          description:
            'Asistentes tipo SAP Joule que responden consultas de empleados o clientes sobre políticas, productos o procesos, conectados a tus datos SAP y a la base de conocimiento real de la empresa.',
          description_en:
            'SAP Joule-style assistants that answer employee or customer questions about policies, products or processes, connected to your SAP data and the company\'s real knowledge base.',
          industry: 'Servicios',
          industry_en: 'Services',
          technologies: ['Chatbot', 'SAP Joule', 'LLM'],
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
          title: 'Predicción de ventas, demanda y mantenimiento',
          title_en: 'Sales, demand and maintenance forecasting',
          description:
            'Modelos que proyectan ventas, anticipan la demanda y predicen necesidades de mantenimiento combinando datos históricos de SAP y señales en tiempo real, para planificar con anticipación.',
          description_en:
            'Models that forecast sales, anticipate demand and predict maintenance needs by combining historical SAP data and real-time signals, to plan ahead.',
          industry: 'Retail & Manufactura',
          industry_en: 'Retail & Manufacturing',
          technologies: ['ML', 'Forecasting', 'Analytics'],
        },
      ],
      techStack: [
        {
          label: 'LLMs',
          icon: Brain,
          items: ['OpenAI', 'Claude', 'Gemini', 'Llama', 'Mistral', 'Qwen', 'DeepSeek', 'Phi', 'Cohere'],
        },
        {
          label: 'Frameworks',
          icon: Boxes,
          items: ['LangChain', 'LlamaIndex', 'Haystack', 'CrewAI', 'txtai'],
        },
        {
          label: 'Bases de datos vectoriales',
          label_en: 'Vector Databases',
          icon: Database,
          items: ['Pinecone', 'Qdrant', 'Weaviate', 'Milvus', 'Chroma', 'Postgres', 'Cassandra', 'OpenSearch'],
        },
        {
          label: 'Extracción de datos',
          label_en: 'Data Extraction',
          icon: FileText,
          items: ['Docling', 'LlamaParse', 'Firecrawl', 'Crawl4AI', 'ScrapeGraphAI', 'MegaParse', 'Unstructured'],
        },
        {
          label: 'Acceso a LLMs abiertos',
          label_en: 'Open LLMs Access',
          icon: Plug,
          items: ['Hugging Face', 'Ollama', 'Groq', 'Together AI', 'OpenRouter', 'vLLM'],
        },
        {
          label: 'Text Embeddings',
          icon: Sparkles,
          items: ['OpenAI', 'Voyage AI', 'Cohere', 'Google', 'Jina'],
        },
        {
          label: 'Evaluación',
          label_en: 'Evaluation',
          icon: Target,
          items: ['Ragas', 'LangSmith', 'Langfuse', 'DeepEval', 'TruLens', 'Giskard'],
        },
      ],
      horizonte: {
        text:
          'SAP presenta la Empresa Autónoma: un modelo en el que Joule Work, la Autonomous Suite y la SAP Business AI Platform trabajan juntos para que los equipos deleguen tareas rutinarias a asistentes y agentes, y se concentren en decisiones estratégicas. SAP y Anthropic colaboran para integrar Claude como capacidad central de razonamiento en la plataforma SAP Business AI, operando en finanzas, RRHH, compras y cadena de suministro con comprensión del contexto empresarial de SAP. Acompañamos a las organizaciones en su camino hacia este nuevo modelo de trabajo.',
        text_en:
          'SAP introduces the Autonomous Enterprise: a model where Joule Work, the Autonomous Suite and the SAP Business AI Platform work together so teams can delegate routine tasks to assistants and agents and focus on strategic decisions. SAP and Anthropic are collaborating to integrate Claude as a core reasoning capability within the SAP Business AI platform, operating across finance, HR, procurement and supply chain with an understanding of SAP\'s business context. We guide organizations on their path toward this new way of working.',
      },
      relatedTechIds: ['nextgen', 'btp', 'bdc', 'signavio'],
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
    id: 'nextgen',
    slug: 'next-gen-development',
    title: 'Next Gen Solutions',
    title_en: 'Next Gen Solutions',
    short: 'Full-stack + Agentic + Cloud-native',
    short_en: 'Full-stack + Agentic + Cloud-native',
    description:
      'Desarrollo full-stack y agentico: aplicaciones a medida, protocolos MCP/A2A y un ecosistema abierto para conectar todos tus sistemas.',
    description_en:
      'Full-stack and agentic development: custom applications, MCP/A2A protocols and an open ecosystem to connect all your systems.',
    icon: Rocket,
    accent: 'accent',
    tags: ['Full-stack', 'Agentic', 'MCP', 'Python', 'React'],
    detail: {
      tagline:
        'Soluciones a medida que se integran con tus sistemas y escalan con tu negocio.',
      tagline_en:
        'Custom solutions that integrate with your systems and scale with your business.',
      heroImage: '/images/NEXTGEN-1.webp',
      overviewImage: '/images/NEXTGEN-2.webp',
      overviewParagraphs: [
        'Desarrollamos aplicaciones modernas que extienden o complementan tus sistemas actuales.',
        'APIs, microservicios, portales y sistemas de gestión construidos con tecnologías actuales, integrados con los procesos core de tu empresa.',
        'Trabajamos con código limpio, testeado y observable, con CI/CD y arquitecturas cloud-native pensadas para escalar y mantenerse en el tiempo.',
      ],
      overviewParagraphs_en: [
        'We build modern applications that extend or complement your existing systems.',
        'APIs, microservices, portals and management systems built with current technologies, integrated with your company\'s core processes.',
        'We work with clean, tested and observable code — CI/CD and cloud-native architectures designed to scale and last.',
      ],
      features: [
        { icon: Braces, image: '/icons/capabilities/dev-java.svg', title: 'Desarrollo Java / Spring Boot', title_en: 'Java / Spring Boot development' },
        { icon: Webhook, image: '/icons/capabilities/dev-apis.svg', title: 'APIs REST y microservicios', title_en: 'REST APIs and microservices' },
        { icon: Blocks, image: '/icons/capabilities/dev-integracion.svg', title: 'Integración con ERP, CRM y APIs de terceros', title_en: 'Integration with ERP, CRM and third-party APIs' },
        { icon: AppWindow, image: '/icons/capabilities/dev-portales.svg', title: 'Portales y aplicaciones web', title_en: 'Portals and web applications' },
        { icon: Waypoints, image: '/icons/capabilities/dev-automatizacion.svg', title: 'Automatización de procesos', title_en: 'Process automation' },
        { icon: CloudCog, image: '/icons/capabilities/dev-cloud.svg', title: 'Arquitecturas cloud-native', title_en: 'Cloud-native architectures' },
      ],
      benefits: [
        {
          metric: 'APIs + MCP',
          metric_en: 'APIs + MCP',
          title: 'Integración con tus sistemas',
          title_en: 'Integration with your systems',
          description:
            'Conectamos apps modernas y agentes con tu ERP, CRM, bases de datos y APIs vía REST, protocolos MCP/A2A y conectores propios.',
          description_en:
            'We connect modern apps and agents with your ERP, CRM, databases and APIs via REST, MCP/A2A protocols and our own connectors.',
        },
        {
          metric: '-50% time-to-market',
          metric_en: '-50% time-to-market',
          title: 'Time-to-market acelerado',
          title_en: 'Accelerated time-to-market',
          description:
            'Stack moderno + metodologías ágiles + componentes reusables entregan más rápido que el ciclo clásico de desarrollo.',
          description_en:
            'Modern stack + agile methodologies + reusable components deliver faster than the classic development cycle.',
        },
        {
          metric: 'Cloud-native',
          metric_en: 'Cloud-native',
          title: 'Soluciones escalables y seguras',
          title_en: 'Scalable and secure solutions',
          description:
            'Apps diseñadas desde el día 1 para crecer con el negocio. Arquitecturas de microservicios, containers y autoscaling en la nube.',
          description_en:
            'Apps designed from day 1 to grow with the business. Microservices architectures, containers and autoscaling in the cloud.',
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
            'Plataforma de gestión de documentos electrónicos fiscales y no fiscales integrada con tu ERP y las entidades fiscales locales.',
          description_en:
            'Management platform for electronic fiscal and non-fiscal documents integrated with your ERP and local tax authorities.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Java', 'Spring Boot', 'REST'],
        },
        {
          title: 'Gestión de logística y TM',
          title_en: 'Logistics and TM management',
          description:
            'Sistemas de optimización de viajes y transporte con integración a tus sistemas y dashboards para operación en tiempo real.',
          description_en:
            'Trip and transportation optimization systems integrated with your systems and dashboards for real-time operations.',
          industry: 'Logística',
          industry_en: 'Logistics',
          technologies: ['Java', 'React', 'APIs'],
        },
        {
          title: 'Portales B2B y B2C',
          title_en: 'B2B and B2C portals',
          description:
            'Portales modernos para clientes y socios con integración directa a tu ERP para pedidos, status y pagos.',
          description_en:
            'Modern portals for customers and partners with direct ERP integration for orders, status and payments.',
          industry: 'Distribución & Retail',
          industry_en: 'Distribution & Retail',
          technologies: ['React', 'Node.js', 'REST'],
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
      relatedTechIds: ['ia', 'btp', 'bdc', 'leanix'],
      faq: [
        {
          q: '¿Cuándo conviene una solución a medida?',
          q_en: 'When is a custom solution the right choice?',
          a: 'Para casos que requieren UX moderna, integración entre múltiples sistemas, alto throughput o escalado horizontal independiente de tu ERP.',
          a_en: 'For cases requiring modern UX, integration across multiple systems, high throughput or horizontal scaling independent of your ERP.',
        },
        {
          q: '¿Cómo se integra con mis sistemas actuales?',
          q_en: 'How does it integrate with my existing systems?',
          a: 'Vía APIs REST, webhooks y conectores propios hacia tu ERP, CRM, bases de datos y servicios de terceros. Tenemos integraciones probadas en producción para los casos más comunes.',
          a_en: 'Via REST APIs, webhooks and our own connectors to your ERP, CRM, databases and third-party services. We have production-tested integrations for the most common cases.',
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
      metaTitle: 'Next Gen Solutions: Java, Node, Python, React',
      metaTitle_en: 'Next Gen Solutions: Java, Node, Python, React',
      metaDescription:
        'Desarrollo full-stack moderno — Java, Spring Boot, Node, Python, React y Angular. Microservicios, APIs, portales y arquitecturas cloud-native por GoTechy.',
      metaDescription_en:
        'Modern full-stack development — Java, Spring Boot, Node, Python, React and Angular. Microservices, APIs, portals and cloud-native architectures by GoTechy.',
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
        '/images/SAPBTP-1.webp',
      overviewImage: '/images/SAPBTP-2.webp',
      overviewParagraphs: [
        'SAP Business Technology Platform (SAP BTP) es una plataforma integral que unifica la gestión de datos, análisis avanzados, inteligencia artificial, desarrollo de aplicaciones, automatización e integración en un entorno cohesivo. Esta plataforma está diseñada para impulsar la innovación y la transformación digital en las empresas, permitiendo experiencias consistentes y conectadas a lo largo de los procesos de negocio, y proporcionando información estratégica en tiempo real.',
      ],
      overviewParagraphs_en: [
        'SAP Business Technology Platform (SAP BTP) is a comprehensive platform that unifies data management, advanced analytics, artificial intelligence, application development, automation and integration in a cohesive environment. This platform is designed to drive innovation and digital transformation in enterprises, enabling consistent and connected experiences across business processes, and providing real-time strategic insights.',
      ],
      features: [
        { icon: PlugZap, image: '/icons/capabilities/btp-integracion.svg', title: 'Integración de sistemas y APIs', title_en: 'System and API integration' },
        { icon: Puzzle, image: '/icons/capabilities/btp-extensiones.svg', title: 'Desarrollo de extensiones y apps custom', title_en: 'Custom extensions and app development' },
        { icon: Bot, image: '/icons/capabilities/btp-automatizacion.svg', title: 'Automatización con SAP Build Process Automation', title_en: 'Automation with SAP Build Process Automation' },
        { icon: DatabaseZap, image: '/icons/capabilities/btp-datos.svg', title: 'Gestión de datos y analíticas', title_en: 'Data management and analytics' },
        { icon: Globe2, image: '/icons/capabilities/btp-conectividad.svg', title: 'Conectividad con sistemas externos', title_en: 'Connectivity with external systems' },
        { icon: Infinity, image: '/icons/capabilities/btp-soporte.svg', title: 'Soporte y evolución continua', title_en: 'Ongoing support and evolution' },
      ],
      benefits: [
        {
          title: 'Integración Perfecta',
          title_en: 'Seamless Integration',
          description:
            'SAP BTP ofrece capacidades integrales para la integración de datos y procesos empresariales, facilitando la conexión y colaboración entre sistemas y aplicaciones tanto internos como externos.',
          description_en:
            'SAP BTP offers comprehensive capabilities for data and business process integration, facilitating connection and collaboration between systems and applications both internal and external.',
        },
        {
          title: 'Desarrollo Ágil de Aplicaciones',
          title_en: 'Agile Application Development',
          description:
            'Con herramientas de desarrollo low-code, SAP BTP permite la creación rápida y eficiente de aplicaciones personalizadas que se adaptan a las necesidades específicas de su negocio.',
          description_en:
            'With low-code development tools, SAP BTP enables rapid and efficient creation of custom applications that adapt to your specific business needs.',
        },
        {
          title: 'Análisis Avanzado de Datos',
          title_en: 'Advanced Data Analytics',
          description:
            'La plataforma proporciona capacidades analíticas robustas que permiten obtener información estratégica completa y en tiempo real sobre sus datos, sin importar dónde residan.',
          description_en:
            'The platform provides robust analytical capabilities that enable comprehensive and real-time strategic insights into your data, regardless of where it resides.',
        },
        {
          title: 'Automatización Inteligente',
          title_en: 'Intelligent Automation',
          description:
            'Mediante el uso de inteligencia artificial y aprendizaje automático, SAP BTP facilita la automatización de procesos, optimizando operaciones y reduciendo errores humanos.',
          description_en:
            'Through artificial intelligence and machine learning, SAP BTP enables process automation, optimizing operations and reducing human errors.',
        },
        {
          title: 'Escalabilidad y Flexibilidad',
          title_en: 'Scalability and Flexibility',
          description:
            'La plataforma está diseñada para crecer junto con su negocio, permitiendo comenzar con proyectos pequeños y expandirse según sea necesario, asegurando que las soluciones se mantengan alineadas con las demandas cambiantes del mercado.',
          description_en:
            'The platform is designed to grow alongside your business, allowing you to start with small projects and expand as needed, ensuring solutions remain aligned with changing market demands.',
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
          technologies: ['Integration Suite'],
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
      relatedTechIds: ['bdc', 'ia', 'signavio', 'leanix'],
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
    id: 'bdc',
    slug: 'sap-business-data-cloud',
    title: 'SAP Business Data Cloud',
    title_en: 'SAP Business Data Cloud',
    short: 'Datos unificados para analítica e IA',
    short_en: 'Unified data for analytics and AI',
    description:
      'Unificamos todos tus datos — SAP y de terceros — en una sola plataforma gestionada: data products con semántica de negocio, SAP Databricks e insight apps listas para usar.',
    description_en:
      'We unify all your data — SAP and third-party — in a single managed platform: data products with business semantics, SAP Databricks and ready-to-use insight apps.',
    icon: Database,
    accent: 'accent',
    tags: ['Data Products', 'SAP Databricks', 'Insight Apps', 'Zero-copy'],
    detail: {
      tagline:
        'Todos tus datos, con contexto de negocio, listos para analítica e IA.',
      tagline_en:
        'All your data, with business context, ready for analytics and AI.',
      overviewParagraphs: [
        'Implementamos SAP Business Data Cloud para unificar los datos de todo tu negocio — SAP y no SAP — en una única plataforma gestionada.',
        'Los data products entregan datos de S/4HANA y del resto de tus fuentes con su semántica de negocio intacta: sin ETLs frágiles ni duplicación, listos para consumir en analítica, planificación y machine learning.',
        'Con SAP Databricks integrado y compartición zero-copy, tus equipos trabajan sobre información confiable y gobernada — la fundación que necesita cualquier estrategia seria de datos e IA.',
      ],
      overviewParagraphs_en: [
        'We implement SAP Business Data Cloud to unify the data of your entire business — SAP and non-SAP — in a single managed platform.',
        'Data products deliver data from S/4HANA and the rest of your sources with their business semantics intact: no fragile ETLs, no duplication — ready to consume in analytics, planning and machine learning.',
        'With SAP Databricks built in and zero-copy sharing, your teams work on trusted, governed information — the foundation any serious data and AI strategy needs.',
      ],
      features: [
        { icon: PackageCheck, image: '/icons/capabilities/bdc-dataproducts.svg', title: 'Data products gestionados con semántica de negocio', title_en: 'Managed data products with business semantics' },
        { icon: LayoutDashboard, image: '/icons/capabilities/bdc-insightapps.svg', title: 'Insight apps preconstruidas por línea de negocio', title_en: 'Prebuilt insight apps per line of business' },
        { icon: FlaskConical, image: '/icons/capabilities/bdc-databricks.svg', title: 'SAP Databricks: notebooks, ML e IA sobre datos SAP', title_en: 'SAP Databricks: notebooks, ML and AI on SAP data' },
        { icon: Share2, image: '/icons/capabilities/bdc-sharing.svg', title: 'Compartición zero-copy con Delta Sharing', title_en: 'Zero-copy sharing with Delta Sharing' },
        { icon: LineChart, image: '/icons/capabilities/bdc-analitica.svg', title: 'Analítica y planificación con SAP Analytics Cloud', title_en: 'Analytics and planning with SAP Analytics Cloud' },
        { icon: UploadCloud, image: '/icons/capabilities/bdc-bw.svg', title: 'Modernización de SAP BW hacia la nube', title_en: 'SAP BW modernization to the cloud' },
      ],
      benefits: [
        {
          metric: 'Zero-copy',
          metric_en: 'Zero-copy',
          title: 'Datos sin duplicación',
          title_en: 'Data without duplication',
          description:
            'Delta Sharing conecta Business Data Cloud con Databricks y otras plataformas sin mover ni copiar datos: menos costo, menos riesgo y una sola versión de la verdad.',
          description_en:
            'Delta Sharing connects Business Data Cloud with Databricks and other platforms without moving or copying data: lower cost, lower risk and a single version of the truth.',
        },
        {
          metric: 'Semántica intacta',
          metric_en: 'Semantics intact',
          title: 'Contexto de negocio preservado',
          title_en: 'Business context preserved',
          description:
            'Los data products conservan las definiciones de negocio de origen — jerarquías, centros de costo, unidades — sin re-modelar lo mismo en cada data warehouse.',
          description_en:
            'Data products keep the business definitions from the source — hierarchies, cost centers, units — without re-modeling the same thing in every data warehouse.',
        },
        {
          metric: 'IA confiable',
          metric_en: 'Trusted AI',
          title: 'Base para IA y agentes',
          title_en: 'Foundation for AI and agents',
          description:
            'Datos gobernados y con contexto: el grounding que Joule y cualquier agente de IA necesitan para dar respuestas correctas sobre tu negocio.',
          description_en:
            'Governed data with context: the grounding that Joule and any AI agent need to give correct answers about your business.',
        },
        {
          metric: 'Time-to-value',
          metric_en: 'Time-to-value',
          title: 'Insight apps listas para usar',
          title_en: 'Ready-to-use insight apps',
          description:
            'Aplicaciones analíticas preconstruidas para finanzas, supply chain y personas que entregan valor en semanas, no en proyectos de un año.',
          description_en:
            'Prebuilt analytical applications for finance, supply chain and people that deliver value in weeks, not year-long projects.',
        },
      ],
      useCases: [
        {
          title: 'Analítica unificada SAP + no SAP',
          title_en: 'Unified SAP + non-SAP analytics',
          description:
            'Un solo modelo de datos gobernado que combina S/4HANA, CRMs y fuentes externas para reporting y dashboards ejecutivos.',
          description_en:
            'A single governed data model combining S/4HANA, CRMs and external sources for reporting and executive dashboards.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Data Products', 'SAC'],
        },
        {
          title: 'Modernización de SAP BW',
          title_en: 'SAP BW modernization',
          description:
            'Llevamos tu inversión en BW a la nube como data products, sin big-bang: BW sigue operando mientras migrás por dominios.',
          description_en:
            'We bring your BW investment to the cloud as data products, with no big-bang: BW keeps running while you migrate by domain.',
          industry: 'SAP customers',
          industry_en: 'SAP customers',
          technologies: ['BW', 'Data Products'],
        },
        {
          title: 'Machine learning sobre datos SAP',
          title_en: 'Machine learning on SAP data',
          description:
            'Data science y ML con SAP Databricks directamente sobre datos de negocio gobernados: forecasting, segmentación, detección de anomalías.',
          description_en:
            'Data science and ML with SAP Databricks directly on governed business data: forecasting, segmentation, anomaly detection.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['SAP Databricks', 'ML'],
        },
        {
          title: 'Fundación de datos para IA generativa',
          title_en: 'Data foundation for generative AI',
          description:
            'Preparamos la capa de datos que alimenta agentes y asistentes: data products curados, calidad medida y acceso gobernado.',
          description_en:
            'We prepare the data layer that feeds agents and assistants: curated data products, measured quality and governed access.',
          industry: 'Cross-industry',
          industry_en: 'Cross-industry',
          technologies: ['Data Products', 'Joule', 'RAG'],
        },
      ],
      horizonte: {
        text:
          'SAP Business Data Cloud es la piedra angular de la estrategia de datos e IA de SAP: cada vez más aplicaciones entregan sus datos como data products nativos, y el knowledge graph conecta datos y procesos para que los agentes de IA razonen sobre el negocio con contexto completo. Construir hoy esa fundación de datos es lo que marca la diferencia mañana.',
        text_en:
          'SAP Business Data Cloud is the cornerstone of SAP\'s data and AI strategy: more and more applications deliver their data as native data products, and the knowledge graph connects data and processes so AI agents can reason about the business with full context. Building that data foundation today is what makes the difference tomorrow.',
      },
      relatedTechIds: ['btp', 'ia', 'signavio', 'leanix'],
      faq: [
        {
          q: '¿Qué pasa con SAP Datasphere y SAP Analytics Cloud?',
          q_en: 'What happens to SAP Datasphere and SAP Analytics Cloud?',
          a: 'No desaparecen: Business Data Cloud los integra como parte de la suite. Datasphere aporta el fabric de datos y SAC la capa de analítica y planificación, bajo una experiencia unificada.',
          a_en: 'They don\'t go away: Business Data Cloud integrates them as part of the suite. Datasphere provides the data fabric and SAC the analytics and planning layer, under one unified experience.',
        },
        {
          q: '¿Reemplaza a mi SAP BW?',
          q_en: 'Does it replace my SAP BW?',
          a: 'Es su camino de modernización. BW se integra a Business Data Cloud y sus modelos pueden exponerse como data products — migrás por dominios, sin big-bang.',
          a_en: 'It\'s its modernization path. BW integrates with Business Data Cloud and its models can be exposed as data products — you migrate by domain, with no big-bang.',
        },
        {
          q: '¿Necesito una licencia de Databricks aparte?',
          q_en: 'Do I need a separate Databricks license?',
          a: 'No: SAP Databricks viene incluido dentro de Business Data Cloud. Y si ya usás Databricks u otra plataforma, se conecta vía Delta Sharing sin duplicar datos.',
          a_en: 'No: SAP Databricks is included within Business Data Cloud. And if you already use Databricks or another platform, it connects via Delta Sharing without duplicating data.',
        },
        {
          q: '¿Los datos salen del entorno SAP?',
          q_en: 'Does the data leave the SAP environment?',
          a: 'No con zero-copy: los data products se comparten sin copiarse. La gobernanza, la seguridad y el linaje se mantienen centralizados en la plataforma.',
          a_en: 'Not with zero-copy: data products are shared without being copied. Governance, security and lineage stay centralized in the platform.',
        },
        {
          q: '¿Cómo se relaciona con SAP BTP?',
          q_en: 'How does it relate to SAP BTP?',
          a: 'Son complementarios: Business Data Cloud es la fundación de datos; BTP aporta integración, extensiones y el runtime de IA. Los casos de uso más potentes combinan ambos.',
          a_en: 'They\'re complementary: Business Data Cloud is the data foundation; BTP provides integration, extensions and the AI runtime. The most powerful use cases combine both.',
        },
      ],
      metaTitle: 'SAP Business Data Cloud: datos unificados para analítica e IA',
      metaTitle_en: 'SAP Business Data Cloud: unified data for analytics and AI',
      metaDescription:
        'Implementación de SAP Business Data Cloud — data products, SAP Databricks e insight apps. Unificá tus datos SAP y de terceros como base para analítica e IA.',
      metaDescription_en:
        'SAP Business Data Cloud implementation — data products, SAP Databricks and insight apps. Unify your SAP and third-party data as the foundation for analytics and AI.',
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
    accent: 'secondary',
    tags: ['Process Mining', 'Joule', 'Governance', 'Atoms'],
    detail: {
      tagline:
        'Visibilidad total de tus procesos. Mejora lo que realmente ocurre.',
      tagline_en:
        'Total visibility into your processes. Improve what actually happens.',
      heroImage:
        '/images/SAPSignavio-1.webp',
      overviewImage: '/images/SAPSignavio-2.webp',
      overviewParagraphs: [
        'Implementamos soluciones de Process Intelligence diseñadas para generar impacto real en el negocio. No modelamos procesos por cumplir un formalismo: usamos minería de datos, simulación y gobernanza para identificar cuellos de botella, reducir costos operativos y sostener las mejoras en el tiempo.',
        'Conectamos el modelado con la ejecución de punta a punta — desde el descubrimiento del proceso real hasta el monitoreo continuo y la mejora iterativa — con métricas auditables y trazabilidad completa.',
      ],
      overviewParagraphs_en: [
        'We implement Process Intelligence solutions designed to generate real business impact. We don\'t model processes to check a box: we use process mining, simulation and governance to identify bottlenecks, cut operational costs and sustain improvement over time.',
        'We connect modeling with end-to-end execution — from discovering the real process to continuous monitoring and iterative improvement — with auditable metrics and full traceability.',
      ],
      features: [
        { icon: ScanSearch, image: '/icons/capabilities/sig-mining.svg', title: 'Process Mining sobre datos SAP', title_en: 'Process Mining on SAP data' },
        { icon: Shapes, image: '/icons/capabilities/sig-bpmn.svg', title: 'Modelado colaborativo BPMN 2.0', title_en: 'Collaborative BPMN 2.0 modeling' },
        { icon: GitCompare, image: '/icons/capabilities/sig-simulacion.svg', title: 'Simulación de escenarios de mejora', title_en: 'Improvement scenario simulation' },
        { icon: Gauge, image: '/icons/capabilities/sig-kpis.svg', title: 'KPIs y dashboards en tiempo real', title_en: 'Real-time KPIs and dashboards' },
        { icon: Route, image: '/icons/capabilities/sig-journey.svg', title: 'Journey Modeler end-to-end', title_en: 'End-to-end Journey Modeler' },
        { icon: HeartHandshake, image: '/icons/capabilities/sig-cambio.svg', title: 'Gestión del cambio organizacional', title_en: 'Organizational change management' },
      ],
      benefits: [
        {
          metric: '100% de visibilidad',
          metric_en: '100% visibility',
          title: 'Visibilidad y transparencia',
          title_en: 'Visibility and transparency',
          description:
            'Facilita la toma de decisiones informadas con datos reales y la alineación estratégica de los procesos con los objetivos del negocio.',
          description_en:
            'Enables informed decision-making with real data and strategic alignment of processes with business objectives.',
        },
        {
          metric: 'Reducción de costos',
          metric_en: 'Cost reduction',
          title: 'Optimización de procesos empresariales',
          title_en: 'Business process optimization',
          description:
            'El descubrimiento automático y la simulación what-if permiten eliminar reprocesos, cuellos de botella y maverick buying — con impacto directo en margen.',
          description_en:
            'Automatic discovery and what-if simulation eliminate reworks, bottlenecks and maverick buying — with direct margin impact.',
        },
        {
          metric: 'Mayor agilidad',
          metric_en: 'Greater agility',
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
          technologies: ['SAP Procurement', 'Ariba'],
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
          technologies: ['Process Governance', 'Compliance'],
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
          technologies: ['SAP Signavio', 'SAP Activate'],
        },
      ],
      horizonte: {
        text:
          'Signavio incorpora asistentes y agentes Joule que permiten a usuarios sin experiencia analítica realizar análisis sofisticados en lenguaje natural. El nuevo Asistente para la Transformación de Procesos combina múltiples agentes especializados para guiar a las organizaciones en su transformación. Además, los Process Atoms definen reglas y restricciones para que los agentes de IA operen dentro de los límites regulatorios y operativos de tu empresa, y la Corporate Memory centraliza el conocimiento organizacional para gobernar la ejecución de múltiples agentes a escala.',
        text_en:
          'Signavio adds Joule assistants and agents that let users with no analytics background run sophisticated analyses in natural language. The new Process Transformation Assistant combines multiple specialized agents to guide organizations through their transformation. Process Atoms define rules and constraints so AI agents operate within your company\'s regulatory and operational limits, and Corporate Memory centralizes organizational knowledge to govern the execution of multiple agents at scale.',
      },
      relatedTechIds: ['btp', 'leanix', 'bdc', 'ia'],
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
        '/images/LEANIX-1.webp',
      overviewImage: '/images/LEANIX-2.webp',
      overviewParagraphs: [
        'SAP LeanIX es una plataforma de gestión de arquitectura empresarial que permite a las organizaciones visualizar, analizar y optimizar su ecosistema de TI, facilitando decisiones estratégicas y acelerando la transformación digital. Al proporcionar una visión integral de las aplicaciones, tecnologías y procesos, SAP LeanIX ayuda a las empresas a identificar redundancias, mitigar riesgos y alinear su infraestructura tecnológica con los objetivos corporativos.',
      ],
      overviewParagraphs_en: [
        'SAP LeanIX is an enterprise architecture management platform that enables organizations to visualize, analyze and optimize their IT ecosystem, facilitating strategic decisions and accelerating digital transformation. By providing a comprehensive view of applications, technologies and processes, SAP LeanIX helps companies identify redundancies, mitigate risks and align their technology infrastructure with corporate objectives.',
      ],
      features: [
        { icon: Layers3, image: '/icons/capabilities/lean-apm.svg', title: 'Application Portfolio Management', title_en: 'Application Portfolio Management' },
        { icon: Map, image: '/icons/capabilities/lean-mapeo.svg', title: 'Mapeo de arquitectura empresarial', title_en: 'Enterprise architecture mapping' },
        { icon: Compass, image: '/icons/capabilities/lean-readiness.svg', title: 'Evaluación de cloud readiness', title_en: 'Cloud readiness assessment' },
        { icon: RefreshCw, image: '/icons/capabilities/lean-lifecycle.svg', title: 'Gestión del ciclo de vida de aplicaciones', title_en: 'Application lifecycle management' },
        { icon: Combine, image: '/icons/capabilities/lean-integracion.svg', title: 'Integración nativa con Signavio y BTP', title_en: 'Native integration with Signavio and BTP' },
        { icon: Presentation, image: '/icons/capabilities/lean-reporting.svg', title: 'Reporting para CIOs y equipos técnicos', title_en: 'Reporting for CIOs and technical teams' },
      ],
      benefits: [
        {
          metric: 'Decisiones rápidas',
          metric_en: 'Fast decisions',
          title: 'Acelerar las transformaciones',
          title_en: 'Accelerate transformations',
          description:
            'Lenguaje común y fuente única de verdad para toda la organización — decisiones de arquitectura que antes tomaban semanas, ahora salen en días.',
          description_en:
            'Common language and single source of truth for the entire organization — architecture decisions that used to take weeks now ship in days.',
        },
        {
          metric: 'Visibilidad completa',
          metric_en: 'Complete visibility',
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
      relatedTechIds: ['signavio', 'btp', 'basis', 'bdc'],
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
    tags: ['Cloud ERP', 'RISE', 'Cloud ALM', '24/7 Ops'],
    detail: {
      tagline:
        'Tu infraestructura SAP, estable, segura y en buenas manos.',
      tagline_en:
        'Your SAP infrastructure — stable, secure and in good hands.',
      heroImage:
        '/images/SAPBASIS-1.webp',
      overviewImage: '/images/SAPBASIS-2.webp',
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
        { icon: ServerCog, image: '/icons/capabilities/basis-admin.svg', title: 'Administración SAP (ECC, S/4HANA, BTP)', title_en: 'SAP administration (ECC, S/4HANA, BTP)' },
        { icon: HeartPulse, image: '/icons/capabilities/basis-monitoreo.svg', title: 'Monitoreo proactivo y soporte continuo', title_en: 'Proactive monitoring and ongoing support' },
        { icon: Fingerprint, image: '/icons/capabilities/basis-seguridad.svg', title: 'Gestión de seguridad y perfiles de usuario', title_en: 'Security and user profile management' },
        { icon: ArrowUpCircle, image: '/icons/capabilities/basis-upgrades.svg', title: 'Upgrades, migraciones y aplicación de patches', title_en: 'Upgrades, migrations and patching' },
        { icon: BadgeCheck, image: '/icons/capabilities/basis-slas.svg', title: 'SLAs personalizados', title_en: 'Customized SLAs' },
        { icon: FileBarChart, image: '/icons/capabilities/basis-reportes.svg', title: 'Reportes técnicos y ejecutivos', title_en: 'Technical and executive reporting' },
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
      extraSection: {
        eyebrow: 'SAP Cloud ALM',
        eyebrow_en: 'SAP Cloud ALM',
        title: 'Ciclo de vida y monitoreo con SAP Cloud ALM',
        title_en: 'Lifecycle and monitoring with SAP Cloud ALM',
        subtitle:
          'Complementamos la operación Basis con SAP Cloud ALM y Solution Manager: monitoreo centralizado, gestión de incidentes y control del ciclo de vida completo de tu solución SAP.',
        subtitle_en:
          'We complement Basis operations with SAP Cloud ALM and Solution Manager: centralized monitoring, incident management and control of your SAP solution\'s full lifecycle.',
        items: [
          'Monitoreo de sistemas y alertas proactivas',
          'Gestión de incidentes e ITSM',
          'Reportes Early Watch Alert',
          'Análisis de causa raíz',
          'Documentación de procesos y cambios',
          'Transición de Solution Manager a Cloud ALM',
        ],
        items_en: [
          'System monitoring and proactive alerts',
          'Incident management and ITSM',
          'Early Watch Alert reports',
          'Root cause analysis',
          'Process and change documentation',
          'Transition from Solution Manager to Cloud ALM',
        ],
        image: '/images/ALM-1.webp',
      },
      horizonte: {
        text:
          'SAP Cloud ALM se consolida como la plataforma central de operaciones para entornos cloud, con capacidades de resolución de casos asistida por agentes de IA que analizan incidentes, detectan duplicados y acortan los tiempos de resolución. Acompañamos esa transición para que no pierdas visibilidad ni control durante el cambio.',
        text_en:
          'SAP Cloud ALM is consolidating as the central operations platform for cloud environments, with AI-agent-assisted case resolution that analyzes incidents, detects duplicates and shortens resolution times. We support that transition so you don\'t lose visibility or control during the change.',
      },
      relatedTechIds: ['btp', 'leanix', 'bdc', 'signavio'],
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
    extraSection: detail.extraSection
      ? {
          ...detail.extraSection,
          eyebrow: detail.extraSection.eyebrow ? pick(detail.extraSection.eyebrow_en, detail.extraSection.eyebrow) : undefined,
          title: pick(detail.extraSection.title_en, detail.extraSection.title),
          subtitle: detail.extraSection.subtitle ? pick(detail.extraSection.subtitle_en, detail.extraSection.subtitle) : undefined,
          items: pick(detail.extraSection.items_en, detail.extraSection.items),
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
