import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bot,
  BookOpen,
  Loader2,
  MessagesSquare,
  Pencil,
  Plus,
  Save,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { chatbotService } from '../../lib/supabase';
import type {
  ChatbotArticleRow,
  ChatbotMessageRow,
  ChatbotSettingsRow,
} from '../../types/chatbot';
import { cn } from '../../utils/cn';

export function AdminChatbot() {
  const [settings, setSettings] = useState<ChatbotSettingsRow | null>(null);
  const [articles, setArticles] = useState<ChatbotArticleRow[]>([]);
  const [messages, setMessages] = useState<ChatbotMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [s, a, m] = await Promise.all([
        chatbotService.getSettings(),
        chatbotService.listArticles(),
        chatbotService.listMessages(),
      ]);
      setSettings(s);
      setArticles(a);
      setMessages(m);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AdminLayout title="Asistente IA — Techy">
      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
          <p className="mt-3 text-xs text-red-200/80">
            Si ves "relation does not exist", corré primero la migración SQL de
            <code> supabase/MIGRATIONS.md</code> (sección "Chatbot IA Techy").
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          <ToggleCard settings={settings} onSaved={refresh} />
          <ArticlesCard articles={articles} onChanged={refresh} />
          <ConversationsCard messages={messages} />
        </div>
      )}
    </AdminLayout>
  );
}

// ============================================================
//  Activación site-wide
// ============================================================
function ToggleCard({
  settings,
  onSaved,
}: {
  settings: ChatbotSettingsRow | null;
  onSaved: () => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const enabled = settings?.enabled ?? false;

  const toggle = async () => {
    setSaving(true);
    try {
      await chatbotService.setEnabled(!enabled);
      toast.success(!enabled ? 'Bot activado en toda la web.' : 'Bot desactivado.');
      await onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <Bot className="h-5 w-5 text-secondary" />
            Chatbot "Techy" en el sitio público
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/55">
            Al activarlo, el muñequito aparece arriba del botón de WhatsApp en todas las
            páginas. Responde solo en base a la base de conocimientos de abajo — cargala
            antes de prenderlo.
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          disabled={saving}
          role="switch"
          aria-checked={enabled}
          className={cn(
            'relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition',
            enabled ? 'bg-accent/80' : 'bg-white/10',
            saving && 'opacity-60',
          )}
        >
          <span
            className={cn(
              'inline-block h-6 w-6 transform rounded-full bg-white shadow transition',
              enabled ? 'translate-x-7' : 'translate-x-1',
            )}
          />
        </button>
      </div>
      <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/50">
        Requiere la Edge Function <code>chat-assistant</code> desplegada y el secret{' '}
        <code>GEMINI_API_KEY</code> configurado (gratis). Guía paso a paso en{' '}
        <code>supabase/SETUP-CHATBOT.md</code>.
      </p>
    </section>
  );
}

// ============================================================
//  Base de conocimientos
// ============================================================
interface ArticleDraft {
  id: string | null;
  title: string;
  content: string;
  active: boolean;
  sort_order: number;
}

const EMPTY_DRAFT: ArticleDraft = { id: null, title: '', content: '', active: true, sort_order: 0 };

function ArticlesCard({
  articles,
  onChanged,
}: {
  articles: ChatbotArticleRow[];
  onChanged: () => Promise<void>;
}) {
  const [draft, setDraft] = useState<ArticleDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<ChatbotArticleRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const save = async () => {
    if (!draft) return;
    if (draft.title.trim().length === 0) return toast.error('El título es obligatorio.');
    if (draft.content.trim().length === 0) return toast.error('El contenido es obligatorio.');
    setSaving(true);
    try {
      const payload = {
        title: draft.title.trim(),
        content: draft.content.trim(),
        active: draft.active,
        sort_order: draft.sort_order,
      };
      if (draft.id) await chatbotService.updateArticle(draft.id, payload);
      else await chatbotService.createArticle(payload);
      toast.success('Artículo guardado.');
      setDraft(null);
      await onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (a: ChatbotArticleRow) => {
    try {
      await chatbotService.updateArticle(a.id, { active: !a.active });
      await onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al actualizar.');
    }
  };

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await chatbotService.removeArticle(toDelete.id);
      toast.success('Artículo eliminado.');
      setToDelete(null);
      await onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <BookOpen className="h-5 w-5 text-secondary" />
            Base de conocimientos ({articles.length})
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/55">
            Todo lo que el bot puede responder sale de acá: servicios, oficinas, horarios,
            FAQ, cómo trabajamos. Texto plano, un tema por artículo.
          </p>
        </div>
        {!draft && (
          <button
            type="button"
            onClick={() => setDraft({ ...EMPTY_DRAFT, sort_order: articles.length })}
            className="btn-primary !text-sm"
          >
            <Plus className="h-4 w-4" />
            Nuevo artículo
          </button>
        )}
      </div>

      {draft && (
        <div className="mt-5 rounded-2xl border border-secondary/25 bg-secondary/[0.06] p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_120px_auto]">
            <div>
              <FieldLabel>Título</FieldLabel>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder='p. ej. "Servicios SAP" o "Oficinas y contacto"'
                className="input-base"
                maxLength={200}
              />
            </div>
            <div>
              <FieldLabel>Orden</FieldLabel>
              <input
                type="number"
                value={draft.sort_order}
                onChange={(e) =>
                  setDraft({ ...draft, sort_order: parseInt(e.target.value, 10) || 0 })
                }
                className="input-base"
              />
            </div>
            <label className="flex cursor-pointer items-end gap-2 pb-2.5 text-sm text-white">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
                className="h-4 w-4 accent-secondary"
              />
              Activo
            </label>
          </div>
          <div className="mt-4">
            <FieldLabel>Contenido</FieldLabel>
            <textarea
              value={draft.content}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              rows={8}
              maxLength={8000}
              placeholder={
                'Escribí la información en texto plano.\n' +
                'Ej.: "GoTechy ofrece implementación de SAP S/4HANA, soporte AMS, ' +
                'migraciones a la nube… Las oficinas están en …"'
              }
              className="input-base !h-auto resize-y font-mono !text-sm"
            />
            <div className="mt-1 text-right text-[11px] text-white/40">
              {draft.content.length.toLocaleString()} / 8.000
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
            >
              <X className="h-4 w-4" /> Cancelar
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className={cn('btn-primary !text-sm', saving && 'opacity-60')}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Guardar artículo
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-3">
        {articles.length === 0 && !draft ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-sm text-white/55">
            Sin artículos todavía. El bot solo va a poder derivar a /contacto — cargá al
            menos servicios, oficinas y datos de contacto.
          </div>
        ) : (
          articles.map((a) => (
            <div
              key={a.id}
              className={cn(
                'flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center',
                !a.active && 'opacity-50',
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">{a.title}</span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1',
                      a.active
                        ? 'bg-accent/10 text-accent ring-accent/30'
                        : 'bg-white/10 text-white/50 ring-white/15',
                    )}
                  >
                    {a.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-white/55">{a.content}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => void toggleActive(a)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10"
                >
                  {a.active ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      id: a.id,
                      title: a.title,
                      content: a.content,
                      active: a.active,
                      sort_order: a.sort_order,
                    })
                  }
                  aria-label={`Editar ${a.title}`}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setToDelete(a)}
                  aria-label={`Eliminar ${a.title}`}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteConfirmation
        open={Boolean(toDelete)}
        title="¿Eliminar este artículo?"
        description={
          toDelete ? `"${toDelete.title}" deja de estar disponible para el bot.` : undefined
        }
        loading={deleting}
        onConfirm={onDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </section>
  );
}

// ============================================================
//  Últimas conversaciones (solo lectura)
// ============================================================
function ConversationsCard({ messages }: { messages: ChatbotMessageRow[] }) {
  // Agrupar por sesión, ordenadas por su mensaje más reciente.
  const sessions = useMemo(() => {
    const bySession = new Map<string, ChatbotMessageRow[]>();
    // Llegan desc → invertimos para leer cada conversación en orden.
    for (const m of [...messages].reverse()) {
      const arr = bySession.get(m.session_id) ?? [];
      arr.push(m);
      bySession.set(m.session_id, arr);
    }
    return [...bySession.entries()].sort((a, b) => {
      const lastA = a[1][a[1].length - 1]?.created_at ?? '';
      const lastB = b[1][b[1].length - 1]?.created_at ?? '';
      return lastB.localeCompare(lastA);
    });
  }, [messages]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
        <MessagesSquare className="h-5 w-5 text-secondary" />
        Últimas conversaciones ({sessions.length})
      </h2>
      <p className="mt-1 text-sm text-white/55">
        Revisalas para detectar preguntas que el bot no supo responder y sumar esa info a la
        base de conocimientos. Se conservan solo los últimos 14 días (limpieza automática
        diaria).
      </p>

      {sessions.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-sm text-white/55">
          Todavía no hay conversaciones registradas.
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {sessions.slice(0, 15).map(([sessionId, msgs]) => {
            const last = msgs[msgs.length - 1];
            return (
              <details
                key={sessionId}
                className="group rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 p-4 text-sm text-white/80 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs text-white/40">
                    {format(new Date(last.created_at), "d MMM yyyy HH:mm", { locale: es })}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                    {msgs.length} mensajes
                  </span>
                  <span className="min-w-0 flex-1 truncate text-white/60">
                    {msgs.find((m) => m.role === 'user')?.content}
                  </span>
                </summary>
                <div className="space-y-2 border-t border-white/5 p-4">
                  {msgs.map((m) => (
                    <div key={m.id} className="flex items-start gap-2 text-sm">
                      {m.role === 'user' ? (
                        <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary-300" />
                      ) : (
                        <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      )}
                      <p
                        className={cn(
                          'whitespace-pre-wrap leading-relaxed',
                          m.role === 'user' ? 'text-white/85' : 'text-white/60',
                        )}
                      >
                        {m.content}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/55">
      {children}
    </div>
  );
}
