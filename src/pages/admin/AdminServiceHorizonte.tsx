import { useEffect, useMemo, useState } from 'react';
import {
  EyeOff,
  Loader2,
  Pencil,
  RotateCcw,
  Save,
  Sparkles,
  Telescope,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useServiceHorizonteOverrides } from '../../hooks/useCatalog';
import { serviceHorizonteService } from '../../lib/supabase';
import { SERVICES } from '../../data/services';
import type { ServiceHorizonteRow } from '../../types/serviceHorizonte';
import { cn } from '../../utils/cn';

type Status = 'original' | 'custom' | 'hidden' | 'none';

/** Servicios con página propia (sólo esos muestran el bloque Horizonte). */
const EDITABLE_SERVICES = SERVICES.filter((s) => s.detail).map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  staticText: s.detail?.horizonte?.text ?? '',
  staticTextEn: s.detail?.horizonte?.text_en ?? '',
}));

type EditableService = (typeof EDITABLE_SERVICES)[number];

function resolveStatus(staticText: string, override: ServiceHorizonteRow | undefined): Status {
  if (!override) return staticText ? 'original' : 'none';
  if (override.hidden) return 'hidden';
  if (override.text && override.text.trim()) return 'custom';
  return 'hidden';
}

/** Texto que se mostraría hoy en la página (ES). `null` = el bloque no aparece. */
function effectiveText(staticText: string, override: ServiceHorizonteRow | undefined): string | null {
  if (!override) return staticText || null;
  if (override.hidden) return null;
  return override.text && override.text.trim() ? override.text : null;
}

export function AdminServiceHorizonte() {
  const { data: overrides, loading, error, refresh } = useServiceHorizonteOverrides();
  const [editing, setEditing] = useState<EditableService | null>(null);
  const [toDelete, setToDelete] = useState<EditableService | null>(null);
  const [deleting, setDeleting] = useState(false);

  const overrideById = useMemo(() => {
    const map = new Map<string, ServiceHorizonteRow>();
    for (const o of overrides) map.set(o.service_id, o);
    return map;
  }, [overrides]);

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      // "Eliminar" = borrar el texto y ocultar el bloque en la página, aun si
      // había un texto estático por defecto. Persistimos hidden=true.
      await serviceHorizonteService.upsert({
        service_id: toDelete.id,
        text: null,
        text_en: null,
        hidden: true,
      });
      toast.success(`Horizonte de "${toDelete.title}" ocultado.`);
      setToDelete(null);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
    } finally {
      setDeleting(false);
    }
  };

  const onRestore = async (svc: EditableService) => {
    try {
      await serviceHorizonteService.remove(svc.id);
      toast.success(
        svc.staticText
          ? `"${svc.title}" volvió al texto original.`
          : `Override de "${svc.title}" eliminado.`,
      );
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al restaurar.');
    }
  };

  return (
    <AdminLayout title="Horizonte SAP">
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/60">
        El bloque <strong className="text-white/80">&ldquo;Horizonte SAP&rdquo;</strong> aparece al
        final de cada página de servicio. Acá podés editar su texto, ocultarlo (no aparece en la
        página) o restaurarlo al texto original del catálogo.
      </p>

      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
          <p className="mt-3 text-xs text-red-200/80">
            Si ves un error tipo &quot;relation does not exist&quot;, tenés que correr la migración
            SQL primero. Mirá <code>supabase/MIGRATIONS.md</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {EDITABLE_SERVICES.map((svc) => {
            const override = overrideById.get(svc.id);
            const status = resolveStatus(svc.staticText, override);
            const preview = effectiveText(svc.staticText, override);
            return (
              <div
                key={svc.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Telescope className="h-5 w-5 shrink-0 text-secondary/70" />
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-white">{svc.title}</h3>
                      <div className="truncate text-xs text-white/45">/servicios/{svc.slug}</div>
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>

                <p
                  className={cn(
                    'mt-4 line-clamp-4 flex-1 text-sm leading-relaxed',
                    preview ? 'text-white/80' : 'italic text-white/40',
                  )}
                >
                  {preview ?? 'El bloque no se muestra en la página.'}
                </p>

                <div className="mt-4 flex items-center justify-end gap-1 border-t border-white/5 pt-4">
                  {override && (
                    <button
                      type="button"
                      onClick={() => void onRestore(svc)}
                      aria-label="Restaurar original"
                      title={svc.staticText ? 'Restaurar al texto original' : 'Eliminar override'}
                      className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-secondary-200"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditing(svc)}
                    aria-label="Editar"
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-secondary-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(svc)}
                    disabled={status === 'hidden' || status === 'none'}
                    aria-label="Eliminar / ocultar"
                    title="Eliminar el texto y ocultar el bloque"
                    className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white/60"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <HorizonteFormModal
          service={editing}
          override={overrideById.get(editing.id) ?? null}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            void refresh();
          }}
        />
      )}

      <DeleteConfirmation
        open={Boolean(toDelete)}
        title="¿Ocultar el Horizonte SAP?"
        description={
          toDelete
            ? `El bloque "Horizonte SAP" dejará de aparecer en la página de "${toDelete.title}". Podés restaurarlo después.`
            : undefined
        }
        loading={deleting}
        onConfirm={onDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminLayout>
  );
}

// ============================================================
//  Modal de edición
// ============================================================
interface FormModalProps {
  service: EditableService;
  override: ServiceHorizonteRow | null;
  onClose: () => void;
  onSaved: () => void;
}

function HorizonteFormModal({ service, override, onClose, onSaved }: FormModalProps) {
  // Valor inicial: el override si existe, si no el texto estático del catálogo.
  const initialEs = override ? (override.hidden ? '' : override.text ?? '') : service.staticText;
  const initialEn = override ? (override.hidden ? '' : override.text_en ?? '') : service.staticTextEn;
  const [text, setText] = useState(initialEs);
  const [textEn, setTextEn] = useState(initialEn);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [saving, onClose]);

  const save = async () => {
    if (!text.trim()) {
      return toast.error('El texto en español es requerido. Para quitar el bloque usá "Eliminar".');
    }
    setSaving(true);
    try {
      await serviceHorizonteService.upsert({
        service_id: service.id,
        text: text.trim(),
        text_en: textEn.trim() || null,
        hidden: false,
      });
      toast.success('Horizonte SAP guardado.');
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const isCustomized = override && (override.hidden || (override.text ?? '') !== service.staticText);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-primary-600/95 shadow-elevated backdrop-blur">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-primary-600/95 p-5">
          <div className="flex items-center gap-2 min-w-0">
            <Telescope className="h-5 w-5 shrink-0 text-secondary" />
            <h2 className="truncate font-display text-lg font-bold text-white">
              Horizonte SAP: {service.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Cerrar"
            className="text-white/60 hover:text-white disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <Field label="Texto (ES)" required hint="Las novedades del ecosistema SAP que vienen.">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="SAP BTP evoluciona hacia el núcleo de la Empresa Autónoma…"
              className="input-base resize-y"
            />
          </Field>

          <Field label="Texto (EN)" hint="Opcional. Si queda vacío, el sitio en inglés usa el ES.">
            <textarea
              value={textEn}
              onChange={(e) => setTextEn(e.target.value)}
              rows={6}
              placeholder="SAP BTP is evolving into the core of the Autonomous Enterprise…"
              className="input-base resize-y"
            />
          </Field>

          {service.staticText && isCustomized && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                <Sparkles className="h-3.5 w-3.5" /> Texto original del catálogo
              </div>
              <p className="text-xs leading-relaxed text-white/55">{service.staticText}</p>
              <button
                type="button"
                onClick={() => {
                  setText(service.staticText);
                  setTextEn(service.staticTextEn);
                }}
                className="mt-2 text-xs font-semibold text-secondary-200 hover:underline"
              >
                Usar el texto original
              </button>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-white/10 bg-primary-600/95 p-4">
          <button type="button" onClick={onClose} disabled={saving} className="btn-secondary !text-sm">
            Cancelar
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className={cn('btn-primary !text-sm', saving && 'opacity-60')}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  UI helpers
// ============================================================
function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string; Icon?: typeof EyeOff }> = {
    original: { label: 'Original', className: 'bg-white/10 text-white/70 ring-white/15' },
    custom: { label: 'Personalizado', className: 'bg-secondary/15 text-secondary-200 ring-secondary/30' },
    hidden: { label: 'Oculto', className: 'bg-white/10 text-white/60 ring-white/15', Icon: EyeOff },
    none: { label: 'Sin texto', className: 'bg-white/5 text-white/45 ring-white/10' },
  };
  const { label, className, Icon } = map[status];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1',
        className,
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}
function Field({ label, hint, required, children }: FieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </span>
        {hint && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
