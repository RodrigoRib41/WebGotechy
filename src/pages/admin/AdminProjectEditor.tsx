import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CloudinaryUpload } from '../../components/admin/CloudinaryUpload';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useProjectById } from '../../hooks/useCatalog';
import { projectsService } from '../../lib/supabase';
import { toSlug, isValidSlug } from '../../utils/slugify';
import {
  EMPTY_PROJECT,
  type ProjectFormState,
  type ProjectMetric,
} from '../../types/catalog';

interface AdminProjectEditorProps {
  mode: 'new' | 'edit';
}

export function AdminProjectEditor({ mode }: AdminProjectEditorProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading } = useProjectById(mode === 'edit' ? id : undefined);

  const [form, setForm] = useState<ProjectFormState>(EMPTY_PROJECT);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormState, string>>>({});

  // Pre-cargar datos
  useEffect(() => {
    if (mode !== 'edit' || !project) return;
    setForm({
      slug: project.slug,
      client: project.client,
      industry: project.industry,
      title: project.title,
      challenge: project.challenge,
      solution: project.solution,
      metrics: project.metrics.length ? project.metrics : [{ value: '', label: '' }],
      image_url: project.image_url ?? '',
      image_alt: project.image_alt ?? '',
      sort_order: project.sort_order,
    });
    setSlugTouched(true);
  }, [mode, project]);

  // Auto-slug desde título cuando es nuevo
  useEffect(() => {
    if (slugTouched || mode === 'edit') return;
    setForm((f) => ({ ...f, slug: toSlug(f.title) }));
  }, [form.title, slugTouched, mode]);

  const update = <K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const updateMetric = (idx: number, key: keyof ProjectMetric, value: string) => {
    setForm((f) => ({
      ...f,
      metrics: f.metrics.map((m, i) => (i === idx ? { ...m, [key]: value } : m)),
    }));
  };
  const addMetric = () =>
    setForm((f) => ({ ...f, metrics: [...f.metrics, { value: '', label: '' }] }));
  const removeMetric = (idx: number) =>
    setForm((f) => ({ ...f, metrics: f.metrics.filter((_, i) => i !== idx) }));

  const validate = (): boolean => {
    const e: Partial<Record<keyof ProjectFormState, string>> = {};
    if (!form.title.trim()) e.title = 'Requerido';
    else if (form.title.length > 200) e.title = 'Máximo 200 caracteres';
    if (!form.slug.trim()) e.slug = 'Requerido';
    else if (!isValidSlug(form.slug)) e.slug = 'Solo minúsculas, números, guiones';
    if (!form.client.trim()) e.client = 'Requerido';
    if (!form.industry.trim()) e.industry = 'Requerido';
    if (form.challenge.trim().length < 30) e.challenge = 'Mínimo 30 caracteres';
    if (form.solution.trim().length < 30) e.solution = 'Mínimo 30 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) {
      toast.error('Revisá los campos en rojo.');
      return;
    }
    setSaving(true);
    try {
      const cleanedMetrics = form.metrics.filter(
        (m) => m.value.trim() && m.label.trim(),
      );
      const payload = {
        slug: form.slug,
        title: form.title.trim(),
        client: form.client.trim(),
        industry: form.industry.trim(),
        challenge: form.challenge.trim(),
        solution: form.solution.trim(),
        metrics: cleanedMetrics,
        image_url: form.image_url || null,
        image_alt: form.image_alt.trim() || null,
        sort_order: form.sort_order,
      };
      if (mode === 'new') {
        const created = await projectsService.create(payload);
        toast.success('Proyecto creado.');
        navigate(`/admin/projects/edit/${created.id}`, { replace: true });
      } else if (project) {
        await projectsService.update(project.id, payload);
        toast.success('Cambios guardados.');
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!project) return;
    setDeleting(true);
    try {
      await projectsService.remove(project.id);
      toast.success('Proyecto eliminado.');
      navigate('/admin/projects', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
      setDeleting(false);
    }
  };

  if (mode === 'edit' && loading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      </AdminLayout>
    );
  }

  if (mode === 'edit' && !project) {
    return (
      <AdminLayout title="Proyecto no encontrado">
        <Link to="/admin/projects" className="btn-secondary">
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={mode === 'new' ? 'Nuevo proyecto' : 'Editar proyecto'}
      actions={
        <>
          <Link to="/admin/projects" className="btn-secondary !px-4 !py-2.5 !text-sm">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="btn-primary !px-4 !py-2.5 !text-sm disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar
          </button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Columna principal */}
        <div className="space-y-5">
          <Field label="Título" required error={errors.title}>
            <input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Ej: Process Intelligence sobre SAP Signavio"
              className="input-base text-lg font-semibold"
            />
          </Field>

          <Field label="Slug (URL interna)" required error={errors.slug} hint={form.slug || 'mi-proyecto'}>
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update('slug', e.target.value.toLowerCase());
              }}
              placeholder="energia-procesos"
              className="input-base font-mono text-sm"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Cliente" required error={errors.client}>
              <input
                value={form.client}
                onChange={(e) => update('client', e.target.value)}
                placeholder="Líder energético LATAM"
                className="input-base"
              />
            </Field>
            <Field label="Industria" required error={errors.industry}>
              <input
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
                placeholder="Energía & Combustibles"
                className="input-base"
              />
            </Field>
          </div>

          <Field label="Desafío" required error={errors.challenge}>
            <textarea
              value={form.challenge}
              onChange={(e) => update('challenge', e.target.value)}
              placeholder="Qué problema tenía el cliente, qué métricas estaban mal, etc."
              rows={4}
              className="input-base resize-none"
            />
          </Field>

          <Field label="Solución" required error={errors.solution}>
            <textarea
              value={form.solution}
              onChange={(e) => update('solution', e.target.value)}
              placeholder="Qué implementamos, tecnologías usadas, approach."
              rows={4}
              className="input-base resize-none"
            />
          </Field>

          {/* Métricas */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
                Métricas (hasta 3 recomendado)
              </span>
              <button
                type="button"
                onClick={addMetric}
                className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-xs font-semibold text-white/75 hover:bg-white/10"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>
            <div className="space-y-2">
              {form.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2"
                >
                  <input
                    value={m.value}
                    onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                    placeholder="40%"
                    className="w-28 rounded-lg bg-white/[0.04] px-3 py-2 text-sm font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                  <input
                    value={m.label}
                    onChange={(e) => updateMetric(idx, 'label', e.target.value)}
                    placeholder="Reducción de tiempo de proceso"
                    className="flex-1 rounded-lg bg-white/[0.04] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                  <button
                    type="button"
                    onClick={() => removeMetric(idx)}
                    aria-label="Quitar métrica"
                    className="rounded-lg p-1.5 text-white/55 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {form.metrics.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-3 text-center text-xs text-white/45">
                  Sin métricas. Agregá al menos una para reforzar el impacto.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna lateral */}
        <aside className="space-y-5">
          <CloudinaryUpload
            value={form.image_url}
            onChange={(url) => update('image_url', url)}
            label="Imagen del proyecto"
          />

          <Field label="Alt de la imagen" hint="Para accesibilidad">
            <input
              value={form.image_alt}
              onChange={(e) => update('image_alt', e.target.value)}
              placeholder="Tablero de control de procesos"
              className="input-base"
            />
          </Field>

          <Field label="Orden de aparición" hint="Menor = arriba">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => update('sort_order', parseInt(e.target.value, 10) || 0)}
              className="input-base"
            />
          </Field>

          {mode === 'edit' && project && (
            <>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/55 space-y-1">
                <div>
                  <span className="text-white/40">Creado:</span>{' '}
                  {new Date(project.created_at).toLocaleString('es-AR')}
                </div>
                <div>
                  <span className="text-white/40">Actualizado:</span>{' '}
                  {new Date(project.updated_at).toLocaleString('es-AR')}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setToDelete(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" /> Eliminar proyecto
              </button>
            </>
          )}
        </aside>
      </div>

      <DeleteConfirmation
        open={toDelete}
        title="¿Eliminar este proyecto?"
        description={project ? `Vas a borrar "${project.title}" de forma permanente.` : undefined}
        loading={deleting}
        onConfirm={onDelete}
        onCancel={() => !deleting && setToDelete(false)}
      />
    </AdminLayout>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
function Field({ label, hint, error, required, children }: FieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </span>
        {hint && !error && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}
