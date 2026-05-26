export interface TestimonialRow {
  id: string;
  /** Cita del cliente. */
  quote: string;
  /** Nombre completo. */
  author_name: string;
  /** Cargo (ej: "CTO"). */
  author_role: string | null;
  /** Empresa (ej: "Telecom Argentina"). */
  company: string | null;
  /** URL del avatar (Cloudinary o externa). Opcional. */
  avatar_url: string | null;
  /** Si está publicado: solo los publicados aparecen en el sitio público. */
  published: boolean;
  /** Menor = aparece primero. */
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type NewTestimonial = Omit<TestimonialRow, 'id' | 'created_at' | 'updated_at'>;

export interface TestimonialFormState {
  quote: string;
  author_name: string;
  author_role: string;
  company: string;
  avatar_url: string;
  published: boolean;
  sort_order: number;
}

export const EMPTY_TESTIMONIAL: TestimonialFormState = {
  quote: '',
  author_name: '',
  author_role: '',
  company: '',
  avatar_url: '',
  published: true,
  sort_order: 0,
};
