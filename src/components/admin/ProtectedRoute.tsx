import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Envuelve rutas protegidas: redirige a /admin (login) si no hay sesión.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
