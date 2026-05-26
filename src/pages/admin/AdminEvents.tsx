import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  EyeOff,
  ExternalLink,
  Globe,
  Loader2,
  MapPin,
  Pencil,
  PlusCircle,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useEvents } from '../../hooks/useCatalog';
import { eventsService } from '../../lib/supabase';
import { type EventKind, type EventRow } from '../../types/events';
import { cn } from '../../utils/cn';

const KIND_LABEL: Record<EventKind, string> = {
  event: 'Event',
  webinar: 'Webinar',
};

export function AdminEvents() {
  // Para admin: TODOS (incluido pasados y ocultos)
  const { data: items, loading, error, refresh } = useEvents(false, false);
  const [editing, setEditing] = useState<EventRow | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<EventRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sorted = useMemo(
    () =>
      [...items].sort((a, b) => a.start_date.localeCompare(b.start_date) || a.sort_order - b.sort_order),
    [items],
  );

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await eventsService.remove(toDelete.id);
      toast.success(`"${toDelete.title}" eliminado.`);
      setToDelete(null);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Eventos y Webinars"
      actions={
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="btn-primary !px-4 !py-2.5 !text-sm"
        >
          <PlusCircle className="h-4 w-4" /> Nuevo evento
        </button>
      }
    >
      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
          <p className="mt-3 text-xs text-red-200/80">
            Si ves "relation does not exist", corré primero la migración SQL.
            Está en <code>supabase/MIGRATIONS.md</code>.
          </p>
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60">
          <CalendarDays className="h-8 w-8" />
          <p className="text-sm">Todavía no hay eventos cargados.</p>
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="btn-primary !px-4 !py-2 !text-sm"
          >
            <PlusCircle className="h-4 w-4" /> Cargar el primero
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {sorted.map((ev) => {
            const isPast = ev.start_date < new Date().toISOString().slice(0, 10);
            return (
              <div
                key={ev.id}
                className={cn(
                  'group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur sm:flex-row sm:items-center',
                  isPast && 'opacity-60',
                )}
              >
                {/* Fecha bloque grande */}
                <div className="min-w-[140px] shrink-0">
                  <div className="font-mono text-xs uppercase tracking-wider text-secondary-300">
                    {KIND_LABEL[ev.kind]}
                  </div>
                  <div className="mt-1 font-display text-xl font-bold text-white">
                    {formatDateRange(ev.start_date, ev.end_date)}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">{ev.title}</h3>
                    {!ev.published && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/15">
                        <EyeOff className="h-3 w-3" /> Oculto
                      </span>
                    )}
                    {isPast && (
                      <span className="inline-flex rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/30">
                        Pasado
                      </span>
                    )}
                  </div>
                  {ev.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-white/65">{ev.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/55">
                    {ev.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {ev.location}
                      </span>
                    )}
                    {ev.languages.length > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Globe className="h-3 w-3" /> {ev.languages.join(', ')}
                      </span>
                    )}
                    {ev.cta_url && (
                      <a
                        href={ev.cta_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-secondary-300 hover:text-secondary"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {ev.cta_label}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditing(ev)}
                    aria-label="Editar"
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-secondary-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(ev)}
                    aria-label="Eliminar"
                    className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300"
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
        <EventFormModal
          item={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            void refresh();
          }}
        />
      )}

      <DeleteConfirmation
        open={Boolean(toDelete)}
        title="¿Eliminar este evento?"
        description={
          toDelete
            ? `Vas a borrar "${toDelete.title}" de forma permanente.`
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
//  Modal de edición / creación
// ============================================================
interface FormModalProps {
  item: EventRow | null;
  onClose: () => void;
  onSaved: () => void;
}

function EventFormModal({ item, onClose, onSaved }: FormModalProps) {
  const isNew = !item;
  const [kind, setKind] = useState<EventKind>(item?.kind ?? 'event');
  const [title, setTitle] = useState(item?.title ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [startDate, setStartDate] = useState(item?.start_date ?? '');
  const [endDate, setEndDate] = useState(item?.end_date ?? '');
  const [location, setLocation] = useState(item?.location ?? '');
  const [languagesStr, setLanguagesStr] = useState(item?.languages?.join(', ') ?? '');
  const [ctaLabel, setCtaLabel] = useState(item?.cta_label ?? 'Regístrate');
  const [ctaUrl, setCtaUrl] = useState(item?.cta_url ?? '');
  const [published, setPublished] = useState<boolean>(item?.published ?? true);
  const [sortOrder, setSortOrder] = useState<number>(item?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [saving, onClose]);

  const save = async () => {
    if (!title.trim()) return toast.error('El título es requerido.');
    if (!startDate) return toast.error('La fecha de inicio es requerida.');
    if (endDate && endDate < startDate)
      return toast.error('La fecha de fin no puede ser anterior al inicio.');
    setSaving(true);
    try {
      const languages = languagesStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const payload = {
        kind,
        title: title.trim(),
        description: description.trim() || null,
        start_date: startDate,
        end_date: endDate || null,
        location: location.trim() || null,
        languages,
        cta_label: ctaLabel.trim() || 'Regístrate',
        cta_url: ctaUrl.trim() || null,
        published,
        sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      };
      if (isNew) {
        await eventsService.create(payload);
        toast.success('Evento agregado.');
      } else {
        await eventsService.update(item!.id, payload);
        toast.success('Cambios guardados.');
      }
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-primary-600/95 shadow-elevated backdrop-blur">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-primary-600/95 p-5">
          <h2 className="font-display text-lg font-bold text-white">
            {isNew ? 'Nuevo evento' : `Editar: ${item!.title}`}
          </h2>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Tipo" required>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as EventKind)}
                className="input-base"
              >
                <option value="event">Event (presencial / híbrido)</option>
                <option value="webinar">Webinar (online)</option>
              </select>
            </Field>
            <Field label="Estado">
              <label className="flex h-[42px] cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 accent-secondary"
                />
                Publicado
              </label>
            </Field>
          </div>

          <Field label="Título" required>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Westernacher en SAPPHIRE Europe 2026"
              className="input-base"
            />
          </Field>

          <Field label="Bajada" hint="1 línea descriptiva">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="El evento estrella de transformación digital de SAP."
              className="input-base"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Fecha inicio" required>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-base"
              />
            </Field>
            <Field label="Fecha fin" hint="Opcional, si es rango">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-base"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Ubicación" hint="Ej: España · Online · Buenos Aires">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="España"
                className="input-base"
              />
            </Field>
            <Field label="Idiomas" hint="Separados por coma">
              <input
                value={languagesStr}
                onChange={(e) => setLanguagesStr(e.target.value)}
                placeholder="English, Spanish"
                className="input-base"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="CTA — texto">
              <input
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                placeholder="Regístrate"
                className="input-base"
              />
            </Field>
            <Field label="CTA — URL" hint="Link de inscripción (se abre en nueva pestaña)">
              <input
                type="url"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                placeholder="https://..."
                className="input-base"
              />
            </Field>
          </div>

          <Field label="Orden" hint="Menor = aparece primero (cuando hay misma fecha)">
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
              className="input-base"
            />
          </Field>
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
//  Helpers
// ============================================================
function formatDateRange(start: string, end: string | null): string {
  const s = new Date(start + 'T00:00:00');
  if (!end) return format(s, "d MMM yyyy", { locale: es });
  const e = new Date(end + 'T00:00:00');
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${format(s, 'd', { locale: es })}-${format(e, "d MMM yyyy", { locale: es })}`;
  }
  return `${format(s, 'd MMM', { locale: es })} – ${format(e, "d MMM yyyy", { locale: es })}`;
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
