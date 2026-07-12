import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../SectionHeader';
import { approachItem, approachContainer } from '../effects/ApproachReveal';

export interface ServiceTechItem {
  label: string;
  icon?: LucideIcon;
  /** URL de logo subido. Si está presente, prevalece sobre `icon`. */
  imageUrl?: string;
  /** Tecnologías del grupo (chips). Si existe, `label` actúa como categoría. */
  items?: string[];
}

interface ServiceTechStackProps {
  items: ServiceTechItem[];
}

/**
 * Logos locales (public/images/tech/) por nombre de tecnología.
 * Fuentes: LobeHub Icons + Simple Icons (SVG, marcas a color; los monocromos
 * se reescribieron a blanco suave para el fondo oscuro).
 * Si una tecnología no está acá, el chip muestra un monograma con su inicial.
 */
const TECH_LOGOS: Record<string, string> = {
  OpenAI: '/images/tech/openai.svg',
  Claude: '/images/tech/claude.svg',
  Gemini: '/images/tech/gemini.svg',
  Llama: '/images/tech/llama.svg',
  Mistral: '/images/tech/mistral.svg',
  Qwen: '/images/tech/qwen.svg',
  DeepSeek: '/images/tech/deepseek.svg',
  Phi: '/images/tech/phi.svg',
  Cohere: '/images/tech/cohere.svg',
  LangChain: '/images/tech/langchain.svg',
  LlamaIndex: '/images/tech/llamaindex.svg',
  Haystack: '/images/tech/haystack.svg',
  CrewAI: '/images/tech/crewai.svg',
  txtai: '/images/tech/txtai.png',
  Pinecone: '/images/tech/pinecone.png',
  Qdrant: '/images/tech/qdrant.svg',
  Weaviate: '/images/tech/weaviate.png',
  Milvus: '/images/tech/milvus.svg',
  Chroma: '/images/tech/chroma.png',
  Postgres: '/images/tech/postgres.svg',
  Cassandra: '/images/tech/cassandra.svg',
  OpenSearch: '/images/tech/opensearch.svg',
  Docling: '/images/tech/docling.png',
  Firecrawl: '/images/tech/firecrawl.png',
  Crawl4AI: '/images/tech/crawl4ai.png',
  ScrapeGraphAI: '/images/tech/scrapegraphai.png',
  MegaParse: '/images/tech/megaparse.png',
  Ragas: '/images/tech/ragas.png',
  DeepEval: '/images/tech/deepeval.png',
  TruLens: '/images/tech/trulens.svg',
  Giskard: '/images/tech/giskard.png',
  'Hugging Face': '/images/tech/huggingface.svg',
  Ollama: '/images/tech/ollama.svg',
  Groq: '/images/tech/groq.svg',
  'Together AI': '/images/tech/togetherai.svg',
  OpenRouter: '/images/tech/openrouter.svg',
  vLLM: '/images/tech/vllm.svg',
  'Voyage AI': '/images/tech/voyageai.svg',
  Google: '/images/tech/google.svg',
  Jina: '/images/tech/jina.svg',
  LangSmith: '/images/tech/langsmith.svg',
  Langfuse: '/images/tech/langfuse.svg',
  LlamaParse: '/images/tech/llamaparse.svg',
  Unstructured: '/images/tech/unstructured.svg',
};

/**
 * Ecosistema tecnológico agrupado por categoría (LLMs, Frameworks, Vector
 * DBs, …). Cada fila: icono + categoría a la izquierda, chips de tecnologías
 * a la derecha. Mobile: apilado.
 */
export function ServiceTechStack({ items }: ServiceTechStackProps) {
  const { t } = useTranslation();
  if (items.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="techstack-title">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent"
        aria-hidden="true"
      />
      <div className="container-x">
        <SectionHeader
          eyebrow={t('services.techStack.eyebrow')}
          title={
            <>
              {t('services.techStack.titleStart')}{' '}
              <span className="text-secondary">{t('services.techStack.titleHighlight')}</span>{' '}
              {t('services.techStack.titleEnd')}
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={approachContainer}
          className="mt-14 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-card backdrop-blur"
        >
          {items.map((group, i) => (
            <motion.div
              key={`${group.label}-${i}`}
              variants={approachItem}
              className="grid gap-5 p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-[210px_1fr] sm:items-center sm:gap-8 sm:p-7"
            >
              {/* Categoría — título tipográfico protagonista */}
              <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                {group.label}
              </h3>

              {/* Tecnologías del grupo — tiles cuadrados con logo grande */}
              {group.items && group.items.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((tech) => {
                    const logo = TECH_LOGOS[tech];
                    return (
                      <div
                        key={tech}
                        className="flex w-[5.75rem] flex-col items-center justify-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3.5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-white/[0.07] hover:shadow-glow-sm"
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-9 w-9 shrink-0 object-contain"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/15 font-display text-base font-bold leading-none text-secondary ring-1 ring-secondary/25"
                          >
                            {tech.charAt(0).toUpperCase()}
                          </span>
                        )}
                        <span className="text-center text-[11px] font-medium leading-tight text-white/75">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
