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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { ...state, signIn, signOut };
}
