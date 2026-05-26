export type EventKind = 'event' | 'webinar';

export interface EventRow {
  id: string;
  /** 'event' (presencial/híbrido) o 'webinar' (online). Se muestra como prefijo del título. */
  kind: EventKind;
  /** Título del evento. */
  title: string;
  /** Bajada breve (1 línea). */
  description: string | null;
  /** ISO date (YYYY-MM-DD). Día de inicio. */
  start_date: string;
  /** ISO date opcional. Si está, se renderiza como rango "May 19-21". */
  end_date: string | null;
  /** Ubicación legible. Ej: "España", "Online", "Buenos Aires". */
  location: string | null;
  /** Idiomas del evento. Ej: ['English', 'Spanish']. */
  languages: string[];
  /** Texto del CTA. Default "Regístrate". */
  cta_label: string;
  /** URL del CTA. Se abre en nueva pestaña. */
  cta_url: string | null;
  /** Si está publicado: solo los publicados aparecen en el sitio público. */
  published: boolean;
  /** Menor = aparece primero. Por default ordenamos por start_date asc. */
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type NewEvent = Omit<EventRow, 'id' | 'created_at' | 'updated_at'>;

export interface EventFormState {
  kind: EventKind;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  languages: string[];
  cta_label: string;
  cta_url: string;
  published: boolean;
  sort_order: number;
}

export const EMPTY_EVENT: EventFormState = {
  kind: 'event',
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  location: '',
  languages: [],
  cta_label: 'Regístrate',
  cta_url: '',
  published: true,
  sort_order: 0,
};
