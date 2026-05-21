import { useCallback, useEffect, useState } from 'react';
import { logosService, projectsService } from '../lib/supabase';
import type { LogoKind, LogoRow, ProjectRow } from '../types/catalog';

interface State<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/** Logos por tipo (clientes o partners), recargable. */
export function useLogos(kind?: LogoKind) {
  const [state, setState] = useState<State<LogoRow>>({
    data: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await logosService.list(kind);
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setState({ data: [], loading: false, error: msg });
    }
  }, [kind]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}

/** Proyectos (todos), recargable. */
export function useProjects() {
  const [state, setState] = useState<State<ProjectRow>>({
    data: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await projectsService.list();
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setState({ data: [], loading: false, error: msg });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}

/** Un proyecto por id. */
export function useProjectById(id: string | undefined) {
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProject(null);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    projectsService
      .getById(id)
      .then((p) => {
        if (!active) return;
        setProject(p);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Error');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return { project, loading, error };
}
