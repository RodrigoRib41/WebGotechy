import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UseAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/**
 * Hook de sesión Supabase: rehidrata la sesión al montar y se suscribe a cambios.
 * Expone helpers `signIn` y `signOut`.
 */
export function useAuth() {
  const [state, setState] = useState<UseAuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setState({
        user: data.session?.user ?? null,
        session: data.session,
        loading: false,
      });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  /**
   * Segunda opción de acceso al panel: Google OAuth. Redirige a Google y
   * vuelve a /admin (el login redirige solo a /admin/dashboard si hay sesión;
   * si Google devuelve error, el hash llega intacto al login para mostrarlo).
   * Solo los emails cargados en `admin_allowed_emails` pueden crear cuenta
   * (gate por trigger en la base — ver MIGRATIONS.md 2026-07-18).
   */
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { ...state, signIn, signInWithGoogle, signOut };
}
