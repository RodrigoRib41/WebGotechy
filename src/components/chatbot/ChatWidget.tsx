import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { chatbotService, isSupabaseConfigured } from '../../lib/supabase';
import type { ChatMessage } from '../../types/chatbot';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../utils/cn';

const SESSION_KEY = 'gt-chat-session';
const HISTORY_KEY = 'gt-chat-history';
const MAX_LOCAL_HISTORY = 40;

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Convierte URLs y rutas internas mencionadas por el bot en links reales
 * (p. ej. "/contacto#agendar" → Link de react-router).
 */
function renderWithLinks(text: string): ReactNode[] {
  const re =
    /(https?:\/\/[^\s)]+|\/(?:contacto|servicios|proyectos|nosotros|clientes|blogtechy)(?:\/[\w-]+)?(?:#[\w-]+)?)/g;
  return text.split(re).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-secondary-300 underline underline-offset-2 hover:text-secondary-200"
        >
          {part}
        </a>
      );
    }
    if (part.startsWith('/')) {
      return (
        <Link
          key={i}
          to={part}
          className="font-semibold text-secondary-300 underline underline-offset-2 hover:text-secondary-200"
        >
          {part}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ============================================================
//  Muñequito "Techy" (SVG inline, paleta de la marca)
// ============================================================
function TechyMascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="techy-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C3E5C" />
          <stop offset="100%" stopColor="#121B2C" />
        </linearGradient>
        <filter id="techy-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antena */}
      <line x1="32" y1="6" x2="32" y2="12" stroke="#3D4E6B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="5" r="3" fill="#00FF92" filter="url(#techy-glow)">
        <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Orejas */}
      <rect x="8" y="21" width="5" height="11" rx="2.5" fill="#00F3FF" opacity="0.55" />
      <rect x="51" y="21" width="5" height="11" rx="2.5" fill="#00F3FF" opacity="0.55" />

      {/* Cabeza */}
      <rect
        x="13"
        y="11"
        width="38"
        height="30"
        rx="11"
        fill="url(#techy-metal)"
        stroke="#00F3FF"
        strokeOpacity="0.45"
      />
      {/* Pantalla / cara */}
      <rect x="18" y="16.5" width="28" height="19" rx="8" fill="#050A14" />

      {/* Ojos (parpadean) */}
      <g filter="url(#techy-glow)">
        <circle cx="26" cy="25" r="3.2" fill="#00F3FF">
          <animate
            attributeName="opacity"
            values="1;1;0.1;1"
            keyTimes="0;0.9;0.94;1"
            dur="4.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="38" cy="25" r="3.2" fill="#00F3FF">
          <animate
            attributeName="opacity"
            values="1;1;0.1;1"
            keyTimes="0;0.9;0.94;1"
            dur="4.6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      {/* Sonrisa */}
      <path
        d="M26.5 30.5 Q32 34 37.5 30.5"
        stroke="#00FF92"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cuello + cuerpo */}
      <rect x="28.5" y="40.5" width="7" height="5" rx="2" fill="#1B2537" />
      <rect
        x="19"
        y="44"
        width="26"
        height="15"
        rx="7"
        fill="url(#techy-metal)"
        stroke="#00F3FF"
        strokeOpacity="0.35"
      />
      {/* Luz del pecho */}
      <circle cx="32" cy="51.5" r="3.4" fill="none" stroke="#00FF92" strokeWidth="1.6" opacity="0.8" />
      <circle cx="32" cy="51.5" r="1.3" fill="#00FF92" />
    </svg>
  );
}

// ============================================================
//  Widget: launcher (arriba de WhatsApp) + panel de chat
// ============================================================
export function ChatWidget() {
  const { t, i18n } = useTranslation();
  const reduced = usePrefersReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // Índice del mensaje que se está "tipeando" (efecto máquina de escribir).
  const [typingIdx, setTypingIdx] = useState<number | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useMemo(getSessionId, []);
  const lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'es';

  // Activado desde /admin/chatbot (flag público en chatbot_settings).
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    void chatbotService
      .isEnabled()
      .then((on) => {
        if (!cancelled) setEnabled(on);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Igual que el botón de WhatsApp: aparece tras un pequeño scroll.
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 200);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Persistir el hilo en la pestaña (sobrevive a la navegación y a F5).
  useEffect(() => {
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-MAX_LOCAL_HISTORY)));
    } catch {
      /* storage lleno/bloqueado: no es crítico */
    }
  }, [messages]);

  const scrollBottom = useCallback(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, []);

  // Auto-scroll al fondo con cada mensaje nuevo.
  useEffect(() => {
    if (open) scrollBottom();
  }, [messages, loading, open, scrollBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const closePanel = useCallback(() => {
    setOpen(false);
    // Si quedó una respuesta a medio tipear, se muestra completa al reabrir.
    setTypingIdx(null);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || loading) return;
      const next: ChatMessage[] = [...messages, { role: 'user', content }];
      setMessages(next);
      setInput('');
      setLoading(true);
      try {
        const res = await chatbotService.send(next.slice(-12), sessionId, lang);
        if (res.reply) {
          setMessages([...next, { role: 'assistant', content: res.reply }]);
          // Revelar la respuesta de a poco (salvo prefers-reduced-motion).
          if (!reduced) setTypingIdx(next.length);
        } else {
          setMessages([
            ...next,
            {
              role: 'assistant',
              content: t(res.code === 'busy' ? 'chatbot.busy' : 'chatbot.error'),
              error: true,
            },
          ]);
        }
      } catch {
        setMessages([
          ...next,
          { role: 'assistant', content: t('chatbot.error'), error: true },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, sessionId, lang, t, reduced],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  if (!enabled) return null;

  const suggestions = t('chatbot.suggestions', { returnObjects: true }) as string[];
  const showSuggestions = messages.filter((m) => m.role === 'user').length === 0;

  return (
    <>
      {/* Launcher — arriba del botón de WhatsApp */}
      <AnimatePresence>
        {visible && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-[5.25rem] right-5 z-[60] sm:bottom-[6.75rem] sm:right-7"
          >
            <div className="relative flex items-center">
              <AnimatePresence>
                {tooltipOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-elevated"
                  >
                    {t('chatbot.tooltip')}
                    <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-primary" />
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                type="button"
                aria-label={t('chatbot.tooltip')}
                onClick={() => setOpen(true)}
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
                onFocus={() => setTooltipOpen(true)}
                onBlur={() => setTooltipOpen(false)}
                className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-glow-md ring-2 ring-secondary/60 transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
              >
                {!reduced && (
                  <span
                    className="absolute inset-0 -z-10 rounded-full bg-secondary animate-pulse-ring"
                    aria-hidden="true"
                  />
                )}
                <TechyMascot className="h-10 w-10 sm:h-11 sm:w-11" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            role="dialog"
            aria-label={t('chatbot.title')}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closePanel();
            }}
            className="fixed bottom-4 right-4 z-[70] flex h-[min(34rem,calc(100dvh-5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-primary/95 shadow-elevated backdrop-blur-xl sm:bottom-7 sm:right-7"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-secondary/40">
                <TechyMascot className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-bold text-white">
                  {t('chatbot.title')}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {t('chatbot.online')}
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label={t('chatbot.close')}
                className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mensajes */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {/* Bienvenida (no forma parte del historial que va al modelo) */}
              <Bubble role="assistant">{t('chatbot.welcome')}</Bubble>

              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} error={m.error}>
                  {m.role === 'assistant' ? (
                    i === typingIdx ? (
                      <TypewriterText
                        text={m.content}
                        onProgress={scrollBottom}
                        onDone={() => setTypingIdx(null)}
                      />
                    ) : (
                      renderWithLinks(m.content)
                    )
                  ) : (
                    m.content
                  )}
                </Bubble>
              ))}

              {showSuggestions && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary-200 transition hover:bg-secondary/20"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex items-center gap-2">
                  <Bubble role="assistant">
                    <span className="inline-flex items-center gap-1" aria-label={t('chatbot.typing')}>
                      <Dot delay="0ms" />
                      <Dot delay="150ms" />
                      <Dot delay="300ms" />
                    </span>
                  </Bubble>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  maxLength={1500}
                  className="input-base flex-1 !rounded-full !py-2.5 text-sm"
                />
                <button
                  type="submit"
                  disabled={loading || input.trim().length === 0}
                  aria-label={t('chatbot.send')}
                  className={cn(
                    'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-primary shadow-glow-sm transition hover:scale-105',
                    (loading || input.trim().length === 0) && 'cursor-not-allowed opacity-40',
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 px-1 text-[10px] text-white/40">
                <span>{t('chatbot.disclaimer')}</span>
                <Link
                  to="/contacto"
                  onClick={closePanel}
                  className="shrink-0 font-semibold text-white/60 underline underline-offset-2 hover:text-secondary-300"
                >
                  {t('chatbot.talkHuman')}
                </Link>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({
  role,
  error,
  children,
}: {
  role: 'user' | 'assistant';
  error?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex', role === 'user' ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          role === 'user'
            ? 'rounded-br-sm bg-secondary/15 text-white ring-1 ring-secondary/25'
            : 'rounded-bl-sm bg-white/[0.06] text-white/85 ring-1 ring-white/10',
          error && 'ring-amber-400/30',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-secondary"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    />
  );
}

/**
 * Revela el texto de a poco (efecto máquina de escribir) con un caret
 * parpadeante. Al terminar avisa con onDone; onProgress mantiene el
 * auto-scroll pegado al fondo mientras "escribe".
 */
const TYPE_CHARS_PER_TICK = 3;
const TYPE_TICK_MS = 24;

function TypewriterText({
  text,
  onProgress,
  onDone,
}: {
  text: string;
  onProgress: () => void;
  onDone: () => void;
}) {
  const [count, setCount] = useState(0);
  // Refs para no reiniciar el intervalo si cambian las callbacks.
  const onProgressRef = useRef(onProgress);
  const onDoneRef = useRef(onDone);
  onProgressRef.current = onProgress;
  onDoneRef.current = onDone;

  useEffect(() => {
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        const nc = Math.min(c + TYPE_CHARS_PER_TICK, text.length);
        if (nc >= text.length) {
          window.clearInterval(id);
          onDoneRef.current();
        }
        return nc;
      });
    }, TYPE_TICK_MS);
    return () => window.clearInterval(id);
  }, [text]);

  useEffect(() => {
    onProgressRef.current();
  }, [count]);

  return (
    <>
      {renderWithLinks(text.slice(0, count))}
      {count < text.length && (
        <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-secondary align-middle" aria-hidden="true" />
      )}
    </>
  );
}
