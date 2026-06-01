import { useCallback, useEffect, useState } from 'react';
import {
  eventsService,
  isSupabaseConfigured,
  logosService,
  projectsService,
  serviceHorizonteService,
  testimonialsService,
} from '../lib/supabase';
import type { LogoKind, LogoRow, ProjectRow } from '../types/catalog';
import type { TestimonialRow } from '../types/testimonials';
import type { EventRow } from '../types/events';
import type { ServiceHorizonteRow } from '../types/serviceHorizonte';

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

/** Testimonios. Por default trae solo publicados (uso público). */
export function useTestimonials(onlyPublished = true) {
  const [state, setState] = useState<State<TestimonialRow>>({
    data: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await testimonialsService.list(onlyPublished);
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setState({ data: [], loading: false, error: msg });
    }
  }, [onlyPublished]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}

/**
 * Eventos / webinars. Por default trae solo publicados y próximos
 * (start_date >= hoy). El admin pasa `onlyPublished=false, onlyUpcoming=false`
 * para ver todos.
 */
export function useEvents(onlyPublished = true, onlyUpcoming = true) {
  const [state, setState] = useState<State<EventRow>>({
    data: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await eventsService.list(onlyPublished, onlyUpcoming);
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setState({ data: [], loading: false, error: msg });
    }
  }, [onlyPublished, onlyUpcoming]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}

/** Overrides del "Horizonte SAP" (todos), recargable. Uso admin. */
export function useServiceHorizonteOverrides() {
  const [state, setState] = useState<State<ServiceHorizonteRow>>({
    data: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await serviceHorizonteService.list();
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

/**
 * Override del "Horizonte SAP" de un servicio puntual (uso público).
 * Si Supabase no está configurado o falla, devuelve `override = null` para que
 * la página caiga al texto estático sin romperse. `settled` indica que ya
 * terminó de resolver (para evitar parpadeos al ocultar un bloque).
 */
export function useServiceHorizonteOverride(serviceId: string | undefined) {
  const [override, setOverride] = useState<ServiceHorizonteRow | null>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!serviceId || !isSupabaseConfigured) {
      setOverride(null);
      setSettled(true);
      return;
    }
    let active = true;
    setSettled(false);
    serviceHorizonteService
      .get(serviceId)
      .then((row) => {
        if (!active) return;
        setOverride(row);
      })
      .catch(() => {
        if (!active) return;
        setOverride(null);
      })
      .finally(() => {
        if (active) setSettled(true);
      });
    return () => {
      active = false;
    };
  }, [serviceId]);

  return { override, settled };
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
