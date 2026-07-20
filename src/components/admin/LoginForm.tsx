import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Loader2, Mail, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../lib/supabase';

interface LocationState {
  from?: string;
}

export function LoginForm() {
  const { signIn, signInWithGoogle } = useAuth();
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
  const [googleLoading, setGoogleLoading] = useState(false);

  // Si Google OAuth vuelve con error, GoTrue lo apendea al redirect
  // (#error=...&error_description=...). Lo mostramos y limpiamos la URL.
  useEffect(() => {
    const raw = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.search.slice(1);
    if (!raw) return;
    const params = new URLSearchParams(raw);
    const desc = params.get('error_description') ?? params.get('error');
    if (!desc) return;
    // El gate de la base rechaza emails no autorizados; GoTrue lo envuelve
    // como "Database error saving new user" (o "Signups not allowed").
    const friendly = /signup|not allowed|database error/i.test(desc)
      ? 'Esa cuenta de Google no está autorizada para el panel.'
      : desc;
    toast.error(friendly);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const handleGoogle = async () => {
    if (!isSupabaseConfigured) {
      toast.error('Supabase no está configurado. Revisá .env (ver SETUP.md).');
      return;
    }
    setGoogleLoading(true);
    try {
      await signInWithGoogle(); // redirige fuera de la app; no hay "después"
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo iniciar con Google.';
      toast.error(msg);
      setGoogleLoading(false);
    }
  };

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

      <div className="mt-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-wider text-white/40">o</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        className="btn-secondary mt-6 w-full disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="h-4 w-4" />
        )}
        Continuar con Google
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

/** "G" oficial de Google (multicolor, SVG inline). */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.27a12 12 0 0 0 0 10.78l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}
