import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { LoginForm } from '../../components/admin/LoginForm';
import { useAuth } from '../../hooks/useAuth';

export function AdminLogin() {
  const { user, loading } = useAuth();

  useEffect(() => {
    document.title = 'Admin · GoTechy';
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (user) return <Navigate to="/admin/dashboard" replace />;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <LoginForm />
    </div>
  );
}
