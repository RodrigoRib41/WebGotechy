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
    short: 'Automatización inteligente',
    description:
      'Modelos de IA aplicada y agentes que potencian la toma de decisiones y automatizan flujos críticos del negocio.',
    icon: Brain,
    accent: 'secondary',
    tags: ['GenAI', 'ML', 'Agents'],
    detail: {
      tagline:
        'Diseñamos, construimos e integramos soluciones de IA de extremo a extremo — desde la arquitectura hasta la puesta en producción y la evolución continua.',
      heroImage:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'Desarrollamos soluciones avanzadas basadas en Inteligencia Artificial diseñadas para generar impacto real en el negocio. No implementamos IA como tendencia: la integramos estratégicamente en procesos, sistemas y productos para optimizar operaciones, reducir costos y mejorar la toma de decisiones.',
        'Diseñamos, construimos e integramos soluciones de IA de extremo a extremo — desde la arquitectura hasta la puesta en producción y la evolución continua.',
        'Cubrimos chatbots empresariales, agentes autónomos, procesamiento inteligente de documentos, integración de LLMs con arquitecturas RAG y servidores MCP conectados a tus sistemas internos.',
        'Cada solución se construye con foco en impacto medible: arquitecturas escalables, evaluación y selección de modelos, seguridad y gobernanza de datos, observabilidad de desempeño, control de costos y testing de calidad de respuestas.',
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
          title: 'Experiencia técnica especializada',
          description:
            'Equipo con experiencia real implementando IA en entornos productivos — agentes, automatización y sistemas empresariales corriendo en producción, no en slides.',
        },
        {
          title: 'Enfoque estratégico, no experimental',
          description:
            'Diseñamos soluciones aplicables al negocio. Evitamos implementaciones superficiales sin impacto real.',
        },
        {
          title: 'Arquitecturas escalables y seguras',
          description:
            'Construimos soluciones preparadas para crecimiento, con control de acceso, trazabilidad y mantenimiento a largo plazo.',
        },
        {
          title: 'Evolución continua',
          description:
            'La IA requiere mejora constante. Acompañamos optimizando modelos, ajustando agentes y evolucionando la arquitectura según nuevas necesidades.',
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
    short: 'Process Intelligence',
    description:
      'Modelado, descubrimiento y mejora continua de procesos end-to-end con la suite Signavio.',
    icon: Workflow,
    accent: 'accent',
    tags: ['Process Mining', 'BPMN', 'Governance'],
    detail: {
      tagline:
        'Una suite integral de Process Intelligence para optimizar y transformar tus procesos de negocio con visión End-to-End.',
      heroImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP Signavio es una suite integral de soluciones, diseñada para ayudar a las empresas a optimizar y transformar sus procesos de negocio con una visión End-to-End, asegurando eficiencia y adaptabilidad en un entorno dinámico.',
        'Se trata de una suite porque ofrece siete herramientas relacionadas entre sí, con distintos enfoques y objetivos donde, entre otras, se encuentran SAP Signavio Process Insights y Process Intelligence — cuyos potenciales de minería de procesos permiten analizar distintas líneas de negocio y flujos de proceso, ofreciendo recomendaciones de corrección e innovación de manera ágil y rápida.',
        'En síntesis, SAP Signavio fomenta la toma de decisiones informadas y la alineación estratégica en toda la organización.',
        'Al integrarse con otras herramientas SAP y aprovechar tecnologías como la inteligencia artificial, SAP Signavio se convierte en un habilitador clave para empresas que buscan adaptarse rápidamente a entornos dinámicos y maximizar su competitividad.',
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
          title: 'Visibilidad y transparencia',
          description:
            'Facilita la toma de decisiones informadas con datos reales y la alineación estratégica de los procesos con los objetivos del negocio.',
        },
        {
          title: 'Optimización de procesos empresariales',
          description:
            'Mediante el descubrimiento y modelado eficiente de procesos que aumenta la eficiencia y reduce costos operativos.',
        },
        {
          title: 'Adaptación a cambios dinámicos',
          description:
            'Brinda capacidad para gestionar transformaciones organizacionales y responder con agilidad a nuevos escenarios de mercado.',
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
    short: 'Business Technology Platform',
    description:
      'Extensiones, integración y aplicaciones cloud-native sobre la plataforma estratégica de SAP.',
    icon: Cloud,
    accent: 'secondary',
    tags: ['CAP', 'Integration Suite', 'CF/Kyma'],
    detail: {
      tagline:
        'Una plataforma integral que unifica datos, IA, desarrollo de aplicaciones, automatización e integración — para acelerar tu transformación digital.',
      heroImage:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP Business Technology Platform (SAP BTP) es una plataforma integral que unifica la gestión de datos, análisis avanzados, inteligencia artificial, desarrollo de aplicaciones, automatización e integración en un entorno cohesivo.',
        'Esta plataforma está diseñada para impulsar la innovación y la transformación digital en las empresas, permitiendo experiencias consistentes y conectadas a lo largo de los procesos de negocio, y proporcionando información estratégica en tiempo real.',
        'En GoTechy diseñamos e implementamos soluciones sobre SAP BTP — desde integraciones entre sistemas hasta aplicaciones cloud-native, pasando por automatización de procesos y analítica avanzada — adoptando las mejores prácticas de SAP.',
        'Si tu organización está migrando a S/4HANA o necesita extender SAP sin tocar el core, BTP es el lugar donde vive la innovación que después escala sin reescribir.',
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
          title: 'Integración perfecta',
          description:
            'SAP BTP ofrece capacidades integrales para la integración de datos y procesos empresariales, facilitando la conexión y colaboración entre sistemas y aplicaciones tanto internos como externos.',
        },
        {
          title: 'Desarrollo ágil de aplicaciones',
          description:
            'Con herramientas de desarrollo low-code, SAP BTP permite la creación rápida y eficiente de aplicaciones personalizadas que se adaptan a las necesidades específicas de tu negocio.',
        },
        {
          title: 'Análisis avanzado de datos',
          description:
            'La plataforma proporciona capacidades analíticas robustas que permiten obtener información estratégica completa y en tiempo real sobre tus datos, sin importar dónde residan.',
        },
        {
          title: 'Automatización inteligente',
          description:
            'Mediante el uso de inteligencia artificial y aprendizaje automático, SAP BTP facilita la automatización de procesos, optimizando operaciones y reduciendo errores humanos.',
        },
        {
          title: 'Escalabilidad y flexibilidad',
          description:
            'La plataforma está diseñada para crecer junto con tu negocio, permitiendo comenzar con proyectos pequeños y expandirse según sea necesario, asegurando que las soluciones se mantengan alineadas con las demandas cambiantes del mercado.',
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
    short: 'Enterprise Architecture',
    description:
      'Arquitectura empresarial moderna: visibilidad de capabilities, aplicaciones y dependencias tecnológicas.',
    icon: LayoutGrid,
    accent: 'accent',
    tags: ['EA', 'Application Portfolio', 'TBM'],
    detail: {
      tagline:
        'Dominá tu arquitectura de TI con datos confiables. Un entorno más ágil, gobernado y alineado al negocio.',
      heroImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'SAP LeanIX es una plataforma de gestión de arquitectura empresarial que permite a las organizaciones visualizar, analizar y optimizar su ecosistema de TI, facilitando decisiones estratégicas y acelerando la transformación digital.',
        'Al proporcionar una visión integral de las aplicaciones, tecnologías y procesos, SAP LeanIX ayuda a las empresas a identificar redundancias, mitigar riesgos y alinear su infraestructura tecnológica con los objetivos corporativos.',
        'SAP LeanIX ayuda a las empresas a dominar su arquitectura de TI con datos confiables, promoviendo un entorno más ágil, gobernado y alineado con las necesidades del negocio.',
        'Al integrarse con soluciones como SAP Signavio y otras herramientas SAP, LeanIX se convierte en un habilitador esencial para la transformación digital y la innovación continua.',
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
          title: 'Acelerar las transformaciones',
          description:
            'Facilita cambios rápidos y efectivos al proporcionar un lenguaje común y una fuente única de información veraz para toda la organización.',
        },
        {
          title: 'Identificar y gestionar riesgos',
          description:
            'Ofrece visibilidad multidimensional del software para descubrir y abordar rápidamente cualquier riesgo que amenace al negocio.',
        },
        {
          title: 'Apoyar la transformación ágil',
          description:
            'Proporciona herramientas para la creación de hojas de ruta, planificación de escenarios y análisis de impacto, esenciales para metodologías ágiles.',
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
    short: 'Infraestructura y administración',
    description:
      'Operación, performance y migraciones — incluyendo S/4HANA y arquitecturas híbridas.',
    icon: Server,
    accent: 'secondary',
    tags: ['S/4HANA', 'Migrations', '24/7 Ops'],
    detail: {
      tagline:
        'Acompañamos todo el ciclo de vida de tus sistemas SAP — implementación, upgrades, migraciones, alta disponibilidad y soporte continuo bajo SLAs personalizados.',
      heroImage:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'En GoTechy nos especializamos en brindar servicios integrales de SAP Basis, acompañando a nuestros clientes a lo largo de todo el ciclo de vida de sus sistemas SAP. Desde la implementación inicial hasta las actualizaciones, soporte y mantenimiento continuo, nuestro objetivo es asegurar el óptimo funcionamiento de tus sistemas y atender las necesidades de negocio que puedan surgir.',
        'Cubrimos cada capa del stack técnico: instalación, configuración, performance, disponibilidad, seguridad y observabilidad — siempre alineados con las mejores prácticas oficiales de SAP.',
        'Nuestro servicio se basa en acuerdos de nivel de servicio (SLA) personalizados, adaptados a los requerimientos específicos de cada cliente. Seguimos las mejores prácticas de SAP y aplicamos metodologías probadas para ofrecer un servicio de alta calidad.',
        'Con más de 15 años de experiencia en el ecosistema SAP, nuestro equipo de profesionales está comprometido en asegurar la confiabilidad y sustentabilidad de tu infraestructura tecnológica SAP.',
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
          metric: '15+ años',
          title: 'De experiencia en el ecosistema SAP',
          description:
            'Equipo de profesionales con experiencia probada operando ecosistemas SAP críticos en clientes enterprise.',
        },
        {
          title: 'SLA personalizados',
          description:
            'Acuerdos de nivel de servicio adaptados a los requerimientos específicos de cada cliente y a la criticidad real de cada sistema.',
        },
        {
          title: 'Mejores prácticas de SAP',
          description:
            'Aplicamos las metodologías y best practices oficiales de SAP en cada actividad, asegurando calidad, certificabilidad y resultados predecibles.',
        },
        {
          title: 'Confiabilidad y sustentabilidad',
          description:
            'Equipo comprometido en asegurar el funcionamiento óptimo y la continuidad operativa de tu infraestructura SAP en el largo plazo.',
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
        'Operación y soporte de sistemas SAP 24/7 — Basis, migraciones a S/4HANA, HA y DR. Más de 15 años con SLAs personalizados por GoTechy.',
    },
  },
  {
    id: 'fiori',
    slug: 'sap-fiori',
    title: 'SAP Fiori',
    short: 'UX moderna para SAP',
    description:
      'Diseñamos e implementamos apps Fiori que reducen fricción y elevan la productividad del usuario final.',
    icon: MonitorSmartphone,
    accent: 'accent',
    tags: ['Fiori Elements', 'UI5', 'UX'],
    detail: {
      tagline:
        'Transformamos la experiencia de usuario de SAP. Accedé al sistema desde cualquier dispositivo y sistema operativo a través del navegador.',
      heroImage:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'En GoTechy transformamos la experiencia de usuario de SAP mediante la implementación de SAP Fiori, una solución moderna e intuitiva que permite acceder al sistema desde cualquier dispositivo y sistema operativo a través del navegador.',
        'Nuestra interfaz amigable garantiza una visualización estandarizada de los dashboards, lo que aumenta la eficiencia, minimiza errores y mejora la productividad de los equipos de trabajo. Además, este módulo inteligente identifica situaciones críticas y sugiere acciones adecuadas para resolverlas, facilitando la toma de decisiones.',
        'Trabajamos con apps Fiori estándar de SAP, desarrollo custom con SAPUI5 y Fiori Elements, y la configuración del Fiori Launchpad como punto de entrada único — sobre S/4HANA, ECC y BTP.',
        'El diferencial real de Fiori no es estético: es que tus usuarios efectivamente usan SAP. Menos clicks, menos pantallas, menos confusión. Más adopción significa más ROI del ERP.',
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
          title: 'Accesibilidad desde cualquier dispositivo',
          description:
            'Mejora la flexibilidad del trabajo al permitir el acceso a SAP desde computadoras, tablets y móviles, sin desarrollo separado.',
        },
        {
          title: 'Interfaz intuitiva y moderna',
          description:
            'Facilita la adopción del sistema por parte de los usuarios, reduciendo la curva de aprendizaje y el tiempo de onboarding.',
        },
        {
          title: 'Mayor eficiencia y productividad',
          description:
            'La navegación simplificada y los accesos rápidos permiten realizar tareas en menos tiempo y con menos clicks.',
        },
        {
          title: 'Menos errores operativos',
          description:
            'Los procesos guiados y la estandarización en la visualización ayudan a reducir fallos humanos en el día a día.',
        },
        {
          title: 'Mejor experiencia del usuario',
          description:
            'Un diseño centrado en las necesidades del usuario hace que el uso de SAP sea más ágil y satisfactorio — más adopción, más ROI.',
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
    short: 'Custom dev y RAP',
    description:
      'Desarrollo ABAP clásico y on-stack RAP para extender SAP sin comprometer la actualización del core.',
    icon: Code2,
    accent: 'secondary',
    tags: ['RAP', 'OData', 'CDS Views'],
    detail: {
      tagline:
        'Equipo altamente especializado en SAP ABAP para desarrollar, optimizar y extender las funcionalidades del sistema SAP según las necesidades de cada cliente.',
      heroImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'En GoTechy contamos con un equipo altamente especializado en SAP ABAP (Advanced Business Application Programming) para desarrollar, optimizar y extender las funcionalidades del sistema SAP de acuerdo con las necesidades específicas de cada cliente.',
        'Nuestros desarrolladores tienen una sólida experiencia en el ecosistema SAP, aplicando las mejores prácticas de desarrollo, normas de calidad y metodologías ágiles para garantizar soluciones eficientes, seguras y escalables.',
        'Cubrimos ABAP clásico y ABAP RAP (RESTful ABAP Programming) para que el código sea futuro-proof, con CDS Views y AMDPs para sacar el máximo provecho de S/4HANA sobre HANA.',
        'Aplicamos User Exits, BAdIs, Enhancements y CDS Views para extender el estándar sin reescribirlo — es el camino que sobrevive a los upgrades y mantiene tu core limpio.',
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
          title: 'Equipo experimentado y certificado',
          description:
            'Sólida experiencia en el ecosistema SAP, con desarrolladores especializados en módulos críticos y proyectos enterprise.',
        },
        {
          title: 'Mejores prácticas y normas de calidad',
          description:
            'Code reviews obligatorios, ATC (ABAP Test Cockpit) con reglas custom, unit testing y CI/CD cuando aplica.',
        },
        {
          title: 'Código eficiente, seguro y escalable',
          description:
            'Extension points oficiales, CDS / AMDPs optimizados y arquitecturas pensadas para sobrevivir a los upgrades.',
        },
        {
          title: 'Metodologías ágiles',
          description:
            'Iteraciones cortas con valor demostrable, gestión transparente del backlog y entregas predecibles.',
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
    short: 'Java, Node.js, Python',
    description:
      'Plataformas modernas full-stack: APIs, microservicios y frontends que se integran nativamente con SAP.',
    icon: Rocket,
    accent: 'accent',
    tags: ['Java', 'Node', 'Python', 'React'],
    detail: {
      tagline:
        'Desarrollo moderno full-stack — Java, Node, Python y React — que se integra nativamente con SAP.',
      heroImage:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
      overviewParagraphs: [
        'En GoTechy desarrollamos aplicaciones empresariales con tecnologías modernas — Java, Spring Boot, Node.js, Python, React y Angular — diseñadas para integrarse de forma nativa con el ecosistema SAP y otros sistemas core.',
        'Aplicamos las mejores prácticas de programación: código limpio, seguro, testeado y revisado. Arquitecturas basadas en microservicios y cloud-native cuando el caso lo requiere.',
        'Operamos con metodologías ágiles (Scrum, Kanban) y prácticas de DevOps modernas: integración continua, pruebas automatizadas y revisiones exhaustivas.',
        'Construimos productos completos, no fragmentos: comprobantes digitales fiscales, sistemas de vouchers, gestores de logística y TM integrados a SAP, portales B2B/B2C y servicios cloud-native.',
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
          title: 'Integración nativa con SAP',
          description:
            'Conectamos cualquier app moderna con S/4HANA, BTP y sistemas SAP vía OData, APIs y conectores propios.',
        },
        {
          title: 'Time-to-market acelerado',
          description:
            'Stack moderno + metodologías ágiles + componentes reusables entregan más rápido que el ciclo clásico.',
        },
        {
          title: 'Soluciones escalables y seguras',
          description:
            'Apps diseñadas desde el día 1 para crecer con el negocio. Sin retrabajo cuando llega el escalado.',
        },
        {
          title: 'Calidad garantizada',
          description:
            'Code reviews, testing automatizado y revisiones exhaustivas. La calidad se construye, no se audita después.',
        },
        {
          title: 'Equipos flexibles',
          description:
            'Desde proyectos llave en mano hasta expansión de tu equipo interno con desarrolladores senior.',
        },
        {
          title: 'Soporte continuo',
          description:
            'Acompañamiento post-go-live con SLAs, mantenimiento y mejora continua.',
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
    short: 'PMO híbrida y ágil',
    description:
      'Liderazgo end-to-end de programas SAP con metodologías híbridas, gobierno claro y KPIs accionables.',
    icon: Briefcase,
    accent: 'secondary',
    tags: ['Activate', 'Agile', 'PMO'],
    detail: {
      tagline:
        'Liderazgo de proyectos orientado a resultados. SAP Activate + ágil, gobierno claro y KPIs accionables para entregas sostenibles en el tiempo.',
      heroImage:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
      overviewImage:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      overviewParagraphs: [
        'En GoTechy ofrecemos un servicio integral de Gestión de Proyectos orientado a resultados. Nos especializamos en liderar iniciativas tecnológicas de punta a punta, aplicando metodologías estructuradas y adaptables para asegurar entregas exitosas y sostenibles en el tiempo.',
        'Nuestro enfoque se basa en SAP Activate, la metodología oficial de SAP para implementaciones eficientes y certificables. Esta guía probada nos permite estructurar cada fase del proyecto con claridad, agilidad y foco en el valor, cumpliendo con los más altos estándares de calidad exigidos por SAP.',
        'Lideramos con visión estratégica, conectando los objetivos del negocio con la ejecución técnica. A través de una gestión profesional y alineada con las metas corporativas, definimos roadmaps medibles, coordinamos a todos los actores del proyecto y gestionamos activamente riesgos y cambios.',
        'Integramos metodologías ágiles y tradicionales según las necesidades de cada organización, priorizando la eficiencia, la adaptación al cambio y la entrega continua de resultados.',
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
          title: 'Mayor visibilidad y control',
          description:
            'Sobre el avance real del proyecto — dashboards, KPIs y reporting que muestran lo que está pasando, no lo que el equipo dice que pasa.',
        },
        {
          title: 'Reducción de riesgos',
          description:
            'A través de una gestión proactiva y planificada que anticipa desvíos antes de que se vuelvan incidentes.',
        },
        {
          title: 'Equipos alineados y motivados',
          description:
            'Bajo un liderazgo claro y técnico que conecta los objetivos del negocio con la ejecución diaria.',
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
