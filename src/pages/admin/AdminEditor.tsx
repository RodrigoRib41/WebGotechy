import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Save,
  Send,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CloudinaryUpload } from '../../components/admin/CloudinaryUpload';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { TagInput } from '../../components/admin/TagInput';
import { TipTapEditor } from '../../components/admin/TipTapEditor';
import { useAuth } from '../../hooks/useAuth';
import { usePostById } from '../../hooks/usePosts';
import { blogService } from '../../lib/supabase';
import { toSlug } from '../../utils/slugify';
import { plainTextLength, validatePost } from '../../utils/validation';
import { EMPTY_POST, type BlogPostFormState, type PostStatus } from '../../types/blog';
import { cn } from '../../utils/cn';

interface AdminEditorProps {
  mode: 'new' | 'edit';
}

export function AdminEditor({ mode }: AdminEditorProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { post, loading: loadingPost } = usePostById(mode === 'edit' ? id : undefined);

  const [form, setForm] = useState<BlogPostFormState>(EMPTY_POST);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<ReturnType<typeof validatePost>>({});
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Pre-llenar autor con el email del usuario logueado en modo nuevo.
  useEffect(() => {
    if (mode === 'new' && user?.email) {
      setForm((f) => ({
        ...f,
        author: f.author || (user.email?.split('@')[0] ?? ''),
        author_email: f.author_email || (user.email ?? ''),
      }));
    }
  }, [mode, user]);

  // Cargar datos del post existente.
  useEffect(() => {
    if (mode !== 'edit' || !post) return;
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? '',
      content: post.content,
      featured_image: post.featured_image ?? '',
      author: post.author,
      author_email: post.author_email ?? '',
      tags: post.tags ?? [],
      status: post.status,
    });
    setSlugTouched(true);
  }, [mode, post]);

  // Auto-generar slug desde el título mientras el usuario no lo haya tocado.
  useEffect(() => {
    if (slugTouched || mode === 'edit') return;
    setForm((f) => ({ ...f, slug: toSlug(f.title) }));
  }, [form.title, slugTouched, mode]);

  const wordCount = useMemo(() => {
    const text = form.content.replace(/<[^>]+>/g, ' ').trim();
    return text ? text.split(/\s+/).length : 0;
  }, [form.content]);

  const update = <K extends keyof BlogPostFormState>(key: K, value: BlogPostFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const save = async (targetStatus: PostStatus) => {
    const next: BlogPostFormState = { ...form, status: targetStatus };
    const v = validatePost(next);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      toast.error('Revisá los campos con error.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slug: next.slug,
        title: next.title,
        excerpt: next.excerpt || null,
        content: next.content,
        featured_image: next.featured_image || null,
        author: next.author,
        author_email: next.author_email || null,
        tags: next.tags,
        status: targetStatus,
        published_at:
          targetStatus === 'published'
            ? (post?.published_at ?? new Date().toISOString())
            : null,
      };

      if (mode === 'new') {
        const created = await blogService.createPost(payload);
        toast.success(targetStatus === 'published' ? '¡Artículo publicado!' : 'Borrador guardado.');
        navigate(`/admin/posts/edit/${created.id}`, { replace: true });
      } else if (post) {
        await blogService.updatePost(post.id, payload);
        toast.success(targetStatus === 'published' ? '¡Cambios publicados!' : 'Borrador actualizado.');
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!post) return;
    setDeleting(true);
    try {
      await blogService.deletePost(post.id);
      toast.success('Artículo eliminado.');
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
      setDeleting(false);
    }
  };

  if (mode === 'edit' && loadingPost) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      </AdminLayout>
    );
  }

  if (mode === 'edit' && !post) {
    return (
      <AdminLayout title="Artículo no encontrado">
        <Link to="/admin/dashboard" className="btn-secondary">
          <ArrowLeft className="h-4 w-4" /> Volver al dashboard
        </Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={mode === 'new' ? 'Nuevo artículo' : 'Editar artículo'}
      actions={
        <>
          <Link to="/admin/dashboard" className="btn-secondary !px-4 !py-2.5 !text-sm">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          {mode === 'edit' && post && post.status === 'published' && (
            <Link
              to={`/blogtechy/${post.slug}`}
              target="_blank"
              className="btn-secondary !px-4 !py-2.5 !text-sm"
            >
              <ExternalLink className="h-4 w-4" /> Ver
            </Link>
          )}
          <button
            type="button"
            onClick={() => save('draft')}
            disabled={saving}
            className="btn-secondary !px-4 !py-2.5 !text-sm disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar borrador
          </button>
          <button
            type="button"
            onClick={() => save('published')}
            disabled={saving}
            className="btn-primary !px-4 !py-2.5 !text-sm disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Publicar
          </button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Columna principal */}
        <div className="space-y-5">
          <Field label="Título" error={errors.title} required>
            <input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Título atrapante del artículo"
              className="input-base text-lg font-semibold"
            />
          </Field>

          <Field
            label="Slug (URL)"
            error={errors.slug}
            required
            hint={`/blogtechy/${form.slug || 'mi-articulo'}`}
          >
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update('slug', e.target.value.toLowerCase());
              }}
              placeholder="mi-articulo-genial"
              className="input-base font-mono text-sm"
            />
          </Field>

          <Field
            label="Extracto"
            error={errors.excerpt}
            hint={`${form.excerpt.length}/300 caracteres · usado en listados y SEO`}
          >
            <textarea
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value.slice(0, 300))}
              placeholder="Resumen breve que aparece en el listado del blog."
              rows={3}
              className="input-base resize-none"
            />
          </Field>

          <Field
            label="Contenido"
            error={errors.content}
            required
            hint={`${wordCount} palabras · ${plainTextLength(form.content)} caracteres`}
          >
            <TipTapEditor value={form.content} onChange={(html) => update('content', html)} />
          </Field>
        </div>

        {/* Columna lateral (metadata) */}
        <aside className="space-y-5">
          <CloudinaryUpload
            value={form.featured_image}
            onChange={(url) => update('featured_image', url)}
          />

          <Field label="Autor" error={errors.author} required>
            <input
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              placeholder="Nombre del autor"
              className="input-base"
            />
          </Field>

          <Field label="Email del autor">
            <input
              type="email"
              value={form.author_email}
              onChange={(e) => update('author_email', e.target.value)}
              placeholder="autor@gotechy.com"
              className="input-base"
            />
          </Field>

          <Field label="Tags" error={errors.tags} hint={`${form.tags.length}/10`}>
            <TagInput value={form.tags} onChange={(tags) => update('tags', tags)} />
          </Field>

          <Field label="Estado">
            <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-1">
              {(['draft', 'published'] as PostStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update('status', s)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                    form.status === s
                      ? 'bg-secondary/20 text-secondary-200'
                      : 'text-white/65 hover:text-white',
                  )}
                >
                  {s === 'draft' ? 'Borrador' : 'Publicado'}
                </button>
              ))}
            </div>
          </Field>

          {mode === 'edit' && post && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/55 space-y-1">
              <div>
                <span className="text-white/40">Creado:</span>{' '}
                {new Date(post.created_at).toLocaleString('es-AR')}
              </div>
              <div>
                <span className="text-white/40">Actualizado:</span>{' '}
                {new Date(post.updated_at).toLocaleString('es-AR')}
              </div>
              {post.published_at && (
                <div>
                  <span className="text-white/40">Publicado:</span>{' '}
                  {new Date(post.published_at).toLocaleString('es-AR')}
                </div>
              )}
              <div>
                <span className="text-white/40">Vistas:</span> {post.views}
              </div>
            </div>
          )}

          {mode === 'edit' && (
            <button
              type="button"
              onClick={() => setToDelete(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" /> Eliminar artículo
            </button>
          )}
        </aside>
      </div>

      <DeleteConfirmation
        open={toDelete}
        title="¿Eliminar este artículo?"
        description={post ? `Vas a borrar "${post.title}" de forma permanente.` : undefined}
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
