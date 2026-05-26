import { useEffect, useMemo, useRef, useState } from 'react';
import {
  EyeOff,
  Loader2,
  Pencil,
  PlusCircle,
  Quote,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useTestimonials } from '../../hooks/useCatalog';
import { testimonialsService } from '../../lib/supabase';
import { cloudinaryService, isCloudinaryConfigured } from '../../lib/cloudinary';
import type { TestimonialRow } from '../../types/testimonials';
import { cn } from '../../utils/cn';

export function AdminTestimonials() {
  // Para el admin queremos ver TODOS (publicados + ocultos)
  const { data: items, loading, error, refresh } = useTestimonials(false);
  const [editing, setEditing] = useState<TestimonialRow | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<TestimonialRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) => a.sort_order - b.sort_order || a.author_name.localeCompare(b.author_name),
      ),
    [items],
  );

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await testimonialsService.remove(toDelete.id);
      toast.success(`Testimonio de "${toDelete.author_name}" eliminado.`);
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
      title="Testimonios"
      actions={
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="btn-primary !px-4 !py-2.5 !text-sm"
        >
          <PlusCircle className="h-4 w-4" /> Nuevo testimonio
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
            Si ves un error tipo &quot;relation does not exist&quot;, tenés que correr la migración
            SQL primero. Mirá <code>supabase/MIGRATIONS.md</code>.
          </p>
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60">
          <Quote className="h-8 w-8" />
          <p className="text-sm">Todavía no hay testimonios cargados.</p>
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="btn-primary !px-4 !py-2 !text-sm"
          >
            <PlusCircle className="h-4 w-4" /> Cargar el primero
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((t) => (
            <div
              key={t.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur"
            >
              {!t.published && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/15">
                  <EyeOff className="h-3 w-3" /> Oculto
                </span>
              )}
              <Quote className="h-6 w-6 text-secondary/70" />
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/85">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
                {t.avatar_url ? (
                  <img
                    src={t.avatar_url}
                    alt={t.author_name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold uppercase text-secondary-200 ring-1 ring-secondary/30">
                    {t.author_name.slice(0, 2)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">
                    {t.author_name}
                  </div>
                  <div className="truncate text-xs text-white/55">
                    {[t.author_role, t.company].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <div className="flex shrink-0 items-center">
                  <button
                    type="button"
                    onClick={() => setEditing(t)}
                    aria-label="Editar"
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-secondary-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(t)}
                    aria-label="Eliminar"
                    className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <TestimonialFormModal
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
        title="¿Eliminar este testimonio?"
        description={
          toDelete
            ? `Vas a borrar el testimonio de "${toDelete.author_name}" de forma permanente.`
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
  item: TestimonialRow | null;
  onClose: () => void;
  onSaved: () => void;
}

function TestimonialFormModal({ item, onClose, onSaved }: FormModalProps) {
  const isNew = !item;
  const [quote, setQuote] = useState(item?.quote ?? '');
  const [authorName, setAuthorName] = useState(item?.author_name ?? '');
  const [authorRole, setAuthorRole] = useState(item?.author_role ?? '');
  const [company, setCompany] = useState(item?.company ?? '');
  const [avatarUrl, setAvatarUrl] = useState(item?.avatar_url ?? '');
  const [published, setPublished] = useState<boolean>(item?.published ?? true);
  const [sortOrder, setSortOrder] = useState<number>(item?.sort_order ?? 0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving && !uploading) onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [saving, uploading, onClose]);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!isCloudinaryConfigured) {
      toast.error('Cloudinary no está configurado. Revisá .env.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen supera 5MB.');
      return;
    }
    setUploading(true);
    try {
      const res = await cloudinaryService.uploadImage(file);
      setAvatarUrl(res.secure_url);
      toast.success('Avatar subido.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al subir.');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const save = async () => {
    if (!quote.trim()) return toast.error('La cita es requerida.');
    if (!authorName.trim()) return toast.error('El nombre del autor es requerido.');
    setSaving(true);
    try {
      const payload = {
        quote: quote.trim(),
        author_name: authorName.trim(),
        author_role: authorRole.trim() || null,
        company: company.trim() || null,
        avatar_url: avatarUrl || null,
        published,
        sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      };
      if (isNew) {
        await testimonialsService.create(payload);
        toast.success('Testimonio agregado.');
      } else {
        await testimonialsService.update(item!.id, payload);
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
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-primary-600/95 shadow-elevated backdrop-blur">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-primary-600/95 p-5">
          <h2 className="font-display text-lg font-bold text-white">
            {isNew ? 'Nuevo testimonio' : `Editar: ${item!.author_name}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving || uploading}
            aria-label="Cerrar"
            className="text-white/60 hover:text-white disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <Field label="Cita" required hint="2-4 líneas, en primera persona">
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={4}
              placeholder="GoTechy nos acompañó en la migración a S/4HANA y..."
              className="input-base resize-y"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nombre" required>
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Martín García"
                className="input-base"
              />
            </Field>
            <Field label="Cargo">
              <input
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="CTO"
                className="input-base"
              />
            </Field>
          </div>

          <Field label="Empresa">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Telecom Argentina"
              className="input-base"
            />
          </Field>

          <Field label="Avatar" hint="Opcional. Si lo dejás vacío, se muestran las iniciales.">
            {avatarUrl ? (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <img
                  src={avatarUrl}
                  alt={authorName || 'avatar'}
                  className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                />
                <div className="flex-1 text-xs text-white/55 break-all">{avatarUrl}</div>
                <button
                  type="button"
                  onClick={() => setAvatarUrl('')}
                  className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300"
                  aria-label="Quitar avatar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
                className="flex h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-white/55 transition hover:border-secondary/40 hover:text-white disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-secondary" />
                    <span className="text-sm">Subiendo…</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">Subir avatar (cuadrado)</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Orden" hint="Menor = aparece primero">
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                className="input-base"
              />
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
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-white/10 bg-primary-600/95 p-4">
          <button type="button" onClick={onClose} disabled={saving} className="btn-secondary !text-sm">
            Cancelar
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving || uploading}
            className={cn('btn-primary !text-sm', (saving || uploading) && 'opacity-60')}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar
          </button>
        </div>
      </div>
    </div>
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
