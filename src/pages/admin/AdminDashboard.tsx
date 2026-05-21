import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Edit3,
  ExternalLink,
  FileText,
  Loader2,
  PlusCircle,
  Search,
  Trash2,
  Eye,
  FileCheck2,
  FileClock,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useAllPosts } from '../../hooks/usePosts';
import { blogService } from '../../lib/supabase';
import { cn } from '../../utils/cn';
import type { BlogPost, PostStatus } from '../../types/blog';

type Filter = 'all' | PostStatus;

export function AdminDashboard() {
  const { posts, loading, error, refresh } = useAllPosts();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts
      .filter((p) => (filter === 'all' ? true : p.status === filter))
      .filter((p) => (q ? p.title.toLowerCase().includes(q) || p.slug.includes(q) : true));
  }, [posts, filter, search]);

  const stats = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((p) => p.status === 'published').length,
      drafts: posts.filter((p) => p.status === 'draft').length,
      views: posts.reduce((sum, p) => sum + (p.views ?? 0), 0),
    }),
    [posts],
  );

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await blogService.deletePost(toDelete.id);
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
      title="Artículos"
      actions={
        <Link to="/admin/posts/new" className="btn-primary !px-4 !py-2.5 !text-sm">
          <PlusCircle className="h-4 w-4" /> Nuevo artículo
        </Link>
      }
    >
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Total" value={stats.total} accent="secondary" />
        <StatCard icon={FileCheck2} label="Publicados" value={stats.published} accent="accent" />
        <StatCard icon={FileClock} label="Borradores" value={stats.drafts} accent="muted" />
        <StatCard icon={Eye} label="Vistas totales" value={stats.views} accent="secondary" />
      </div>

      {/* Filtros + búsqueda */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-1">
          {(['all', 'published', 'draft'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                filter === f ? 'bg-secondary/20 text-secondary-200' : 'text-white/65 hover:text-white',
              )}
            >
              {f === 'all' ? 'Todos' : f === 'published' ? 'Publicados' : 'Borradores'}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título o slug…"
            className="input-base pl-9"
          />
        </div>
      </div>

      {/* Estado */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60">
          <FileText className="h-8 w-8" />
          <p className="text-sm">
            {posts.length === 0 ? 'Todavía no hay artículos.' : 'Ningún artículo coincide con el filtro.'}
          </p>
          {posts.length === 0 && (
            <Link to="/admin/posts/new" className="btn-primary !px-4 !py-2 !text-sm">
              <PlusCircle className="h-4 w-4" /> Crear el primero
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/55">
              <tr>
                <th className="px-4 py-3 font-semibold">Artículo</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Estado</th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">Fecha</th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">Vistas</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="transition hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.featured_image ? (
                        <img
                          src={p.featured_image}
                          alt=""
                          className="h-10 w-14 shrink-0 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-white/5">
                          <FileText className="h-4 w-4 text-white/40" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/posts/edit/${p.id}`)}
                          className="block truncate text-left font-semibold text-white hover:text-secondary"
                        >
                          {p.title || '(sin título)'}
                        </button>
                        <div className="truncate text-xs text-white/45">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-white/65 lg:table-cell">
                    {format(new Date(p.updated_at), "d MMM yyyy", { locale: es })}
                  </td>
                  <td className="hidden px-4 py-3 text-white/65 lg:table-cell">{p.views}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {p.status === 'published' && (
                        <Link
                          to={`/blogtechy/${p.slug}`}
                          target="_blank"
                          aria-label="Ver"
                          className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        to={`/admin/posts/edit/${p.id}`}
                        aria-label="Editar"
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-secondary-200"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setToDelete(p)}
                        aria-label="Eliminar"
                        className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(toDelete)}
        title="¿Eliminar este artículo?"
        description={
          toDelete
            ? `Vas a borrar "${toDelete.title}" de forma permanente. Esta acción no se puede deshacer.`
            : undefined
        }
        loading={deleting}
        onConfirm={onDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminLayout>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent: 'secondary' | 'accent' | 'muted';
}

function StatCard({ icon: Icon, label, value, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl ring-1',
            accent === 'secondary' && 'bg-secondary/15 text-secondary-200 ring-secondary/30',
            accent === 'accent' && 'bg-accent/15 text-accent ring-accent/30',
            accent === 'muted' && 'bg-white/10 text-white/70 ring-white/15',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/55">{label}</div>
          <div className="font-mono text-2xl font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PostStatus }) {
  const map = {
    published: 'bg-accent/15 text-accent ring-accent/30',
    draft: 'bg-white/10 text-white/75 ring-white/15',
  } as const;
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1', map[status])}>
      {status === 'published' ? 'Publicado' : 'Borrador'}
    </span>
  );
}
