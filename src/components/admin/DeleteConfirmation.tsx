import { useEffect } from 'react';
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react';

interface DeleteConfirmationProps {
  open: boolean;
  title: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({
  open,
  title,
  description,
  loading,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onCancel();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-400/30 bg-primary-600/95 p-6 shadow-elevated backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-300">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <h2 className="font-display text-lg font-bold text-white">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Cancelar"
            className="text-white/60 hover:text-white disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-white/75">{description}</p>
        )}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn inline-flex items-center justify-center rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-elevated transition hover:bg-red-600 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Eliminando…
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" /> Eliminar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
