import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Loader2, Mail, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../lib/supabase';

interface LocationState {
  from?: string;
}

export function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const rawFrom = (location.state as LocationState | null)?.from;
  // Solo permitimos rutas internas del panel para evitar open redirect
  // (p. ej. //evil.com o javascript:). Cualquier otra cosa → dashboard.
  const from =
    typeof rawFrom === 'string' && /^\/admin(\/|$)/.test(rawFrom)
      ? rawFrom
      : '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error('Supabase no está configurado. Revisá .env (ver SETUP.md).');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      toast.success('¡Bienvenido!');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Credenciales incorrectas.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-elevated backdrop-blur sm:p-10"
    >
      <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
        Panel de administración
      </h1>
      <p className="mt-2 text-sm text-white/65">
        Ingresá con tus credenciales para gestionar el blog GoTechy.
      </p>

      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
            Email
          </span>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gotechy.com"
              className="input-base pl-9"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
            Contraseña
          </span>
          <div className="relative mt-1.5">
            <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-base pl-9"
            />
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-8 w-full disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Ingresando…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" /> Ingresar
          </>
        )}
      </button>

      {!isSupabaseConfigured && (
        <p className="mt-5 rounded-xl border border-yellow-400/30 bg-yellow-500/10 p-3 text-xs leading-relaxed text-yellow-200">
          <strong>Supabase no configurado.</strong> Definí{' '}
          <code className="font-mono">VITE_SUPABASE_URL</code> y{' '}
          <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> en{' '}
          <code className="font-mono">.env</code>. Ver <code>SETUP.md</code>.
        </p>
      )}
    </form>
  );
}
