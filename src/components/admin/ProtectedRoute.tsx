import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, LogOut, ShieldX } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

// Cache por usuario para no repetir el RPC en cada navegación del panel.
// Solo se cachean respuestas del servidor (un error de red no bloquea al
// admin hasta recargar: se reintenta en la próxima navegación).
const adminCache = new Map<string, boolean>();

/**
 * true/false una vez resuelto; null mientras consulta. La autorización REAL
 * vive en las policies RLS (is_admin()) — esto es solo UX: le evita a una
 * sesión no autorizada (p. ej. Google OAuth de un email sin permisos) ver un
 * panel roto lleno de errores de fetch.
 */
function useIsAdmin(userId: string | undefined): boolean | null {
  const cached = userId !== undefined ? adminCache.get(userId) : undefined;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(cached ?? null);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(null);
      return;
    }
    const hit = adminCache.get(userId);
    if (hit !== undefined) {
      setIsAdmin(hit);
      return;
    }
    let active = true;
    void supabase.rpc('is_admin').then(({ data, error }) => {
      if (!active) return;
      const ok = !error && data === true;
      if (!error) adminCache.set(userId, ok);
      setIsAdmin(ok);
    });
    return () => {
      active = false;
    };
  }, [userId]);

  return isAdmin;
}

/**
 * Envuelve rutas protegidas: redirige a /admin (login) si no hay sesión y
 * muestra un aviso claro si la sesión no pertenece a un admin autorizado.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAdmin = useIsAdmin(user?.id);

  if (loading || (user && isAdmin === null)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return <NotAuthorized email={user.email} />;
  }

  return <>{children}</>;
}

function NotAuthorized({ email }: { email?: string }) {
  const { signOut } = useAuth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-elevated backdrop-blur sm:p-10">
        <ShieldX className="mx-auto h-12 w-12 text-red-400" />
        <h1 className="mt-5 font-display text-2xl font-bold text-white">
          Cuenta sin acceso
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          {email ? (
            <>
              <span className="font-mono text-white/85">{email}</span> no está
              autorizada para el panel de administración.
            </>
          ) : (
            'Esta cuenta no está autorizada para el panel de administración.'
          )}{' '}
          Si creés que es un error, pedile al administrador que agregue tu email.
        </p>
        <button
          type="button"
          onClick={() => void signOut()}
          className="btn-secondary mt-7 w-full"
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}
