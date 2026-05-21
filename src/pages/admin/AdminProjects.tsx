import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Edit3, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmation } from '../../components/admin/DeleteConfirmation';
import { useProjects } from '../../hooks/useCatalog';
import { projectsService } from '../../lib/supabase';
import type { ProjectRow } from '../../types/catalog';

export function AdminProjects() {
  const { data: projects, loading, error, refresh } = useProjects();
  const navigate = useNavigate();
  const [toDelete, setToDelete] = useState<ProjectRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await projectsService.remove(toDelete.id);
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
      title="Proyectos"
      actions={
        <Link to="/admin/projects/new" className="btn-primary !px-4 !py-2.5 !text-sm">
          <PlusCircle className="h-4 w-4" /> Nuevo proyecto
        </Link>
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
      ) : projects.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60">
          <Building2 className="h-8 w-8" />
          <p className="text-sm">Todavía no hay proyectos cargados.</p>
          <Link to="/admin/projects/new" className="btn-primary !px-4 !py-2 !text-sm">
            <PlusCircle className="h-4 w-4" /> Cargar el primero
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/55">
              <tr>
                <th className="px-4 py-3 font-semibold">Proyecto</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Cliente</th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">Industria</th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">Orden</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="transition hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt=""
                          className="h-10 w-14 shrink-0 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-white/5">
                          <Building2 className="h-4 w-4 text-white/40" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                          className="block truncate text-left font-semibold text-white hover:text-secondary"
                        >
                          {p.title || '(sin título)'}
                        </button>
                        <div className="truncate text-xs text-white/45">/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-white/75 sm:table-cell">{p.client}</td>
                  <td className="hidden px-4 py-3 text-white/65 lg:table-cell">{p.industry}</td>
                  <td className="hidden px-4 py-3 text-white/55 lg:table-cell">{p.sort_order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/projects/edit/${p.id}`}
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
        title="¿Eliminar este proyecto?"
        description={
          toDelete
            ? `Vas a borrar "${toDelete.title}" de la sección Casos de éxito.`
            : undefined
        }
        loading={deleting}
        onConfirm={onDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </AdminLayout>
  );
}
