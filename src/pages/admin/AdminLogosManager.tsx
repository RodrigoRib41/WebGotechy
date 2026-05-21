import { useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Pencil, PlusCircle, Save, Trash2, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useLogos } from '../../hooks/useCatalog';
import { logosService } from '../../lib/supabase';
import { cloudinaryService, isCloudinaryConfigured } from '../../lib/cloudinary';
import type { LogoKind, LogoRow } from '../../types/catalog';
import { cn } from '../../utils/cn';

interface AdminLogosManagerProps {
  kind: LogoKind;
}

const COPY = {
  client: {
    title: 'Clientes',
    cta: 'Agregar cliente',
    emptyHint: 'Todavía no hay clientes cargados.',
  },
  partner: {
    title: 'Partners',
    cta: 'Agregar partner',
    emptyHint: 'Todavía no hay partners cargados.',
  },
} as const;

export function AdminLogosManager({ kind }: AdminLogosManagerProps) {
  const { data: logos, loading, error, refresh } = useLogos(kind);
  const [editing, setEditing] = useState<LogoRow | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<LogoRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const copy = COPY[kind];

  const sorted = useMemo(
    () => [...logos].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name)),
    [logos],
  );

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await logosService.remove(toDelete.id);
      toast.success(`"${toDelete.name}" eliminado.`);
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
      title={copy.title}
      actions={
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="btn-primary !px-4 !py-2.5 !text-sm"
        >
          <PlusCircle className="h-4 w-4" /> {copy.cta}
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
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60">
          <p className="text-sm">{copy.emptyHint}</p>
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="btn-primary !px-4 !py-2 !text-sm"
          >
            <PlusCircle className="h-4 w-4" /> {copy.cta}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((logo) => (
            <div
              key={logo.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-card backdrop-blur"
            >
              <div className="flex h-32 items-center justify-center bg-white/[0.03] p-6">
                <img
                  src={cloudinaryService.padLogoUrl(logo.logo_url, { h: 80, w: 240 })}
                  alt={logo.alt ?? logo.name}
                  className="max-h-full max-w-full object-contain"
                  style={{ mixBlendMode: 'lighten' }}
                />
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-white/5 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{logo.name}</div>
                  <div className="text-[11px] text-white/45">Orden: {logo.sort_order}</div>
                </div>
                <div className="flex shrink-0 items-center">
                  <button
                    type="button"
                    onClick={() => setEditing(logo)}
                    aria-label="Editar"
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-secondary-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(logo)}
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
        <LogoFormModal
          kind={kind}
          logo={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            void refresh();
          }}
        />
      )}

      <DeleteConfirmation
        open={Boolean(toDelete)}
        title="¿Eliminar este logo?"
        description={toDelete ? `Vas a borrar "${toDelete.name}" del carrusel.` : undefined}
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
interface LogoFormModalProps {
  kind: LogoKind;
  logo: LogoRow | null;
  onClose: () => void;
  onSaved: () => void;
}

function LogoFormModal({ kind, logo, onClose, onSaved }: LogoFormModalProps) {
  const isNew = !logo;
  const [name, setName] = useState(logo?.name ?? '');
  const [alt, setAlt] = useState(logo?.alt ?? '');
  const [sortOrder, setSortOrder] = useState<number>(logo?.sort_order ?? 0);
  const [logoUrl, setLogoUrl] = useState(logo?.logo_url ?? '');
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
      setLogoUrl(res.secure_url);
      toast.success('Logo subido.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al subir.');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const save = async () => {
    if (!name.trim()) return toast.error('El nombre es requerido.');
    if (!logoUrl) return toast.error('Subí una imagen primero.');
    setSaving(true);
    try {
      const payload = {
        kind,
        name: name.trim(),
        alt: alt.trim() || null,
        sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
        logo_url: logoUrl,
      };
      if (isNew) {
        await logosService.create(payload);
        toast.success('Logo agregado.');
      } else {
        await logosService.update(logo!.id, payload);
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
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-primary-600/95 shadow-elevated backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="font-display text-lg font-bold text-white">
            {isNew
              ? kind === 'client'
                ? 'Nuevo cliente'
                : 'Nuevo partner'
              : `Editar: ${logo!.name}`}
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
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/55">
              Logo *
            </div>
            {logoUrl ? (
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <img
                  src={cloudinaryService.padLogoUrl(logoUrl, { h: 80, w: 240 })}
                  alt={alt || name}
                  className="max-h-full max-w-full object-contain"
                  style={{ mixBlendMode: 'lighten' }}
                />
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="absolute bottom-2 right-2 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
                  disabled={uploading}
                >
                  {uploading ? 'Subiendo…' : 'Cambiar'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
                className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-white/55 transition hover:border-secondary/40 hover:text-white disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-secondary" />
                    <span className="text-sm">Subiendo…</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">Subir logo (PNG transparente recomendado)</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="hidden"
              onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <Field label="Nombre" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Raízen"
              className="input-base"
            />
          </Field>

          <Field label="Alt text" hint="Para accesibilidad y SEO">
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder={`Logo de ${name || 'la empresa'}`}
              className="input-base"
            />
          </Field>

          <Field label="Orden" hint="Menor = aparece primero en el carrusel">
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
              className="input-base"
            />
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/10 p-4">
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
