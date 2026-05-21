/** Tipos compartidos para clientes, partners y proyectos gestionados desde el admin. */

export type LogoKind = 'client' | 'partner';

export interface LogoRow {
  id: string;
  kind: LogoKind;
  name: string;
  logo_url: string;
  alt: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type NewLogo = Omit<LogoRow, 'id' | 'created_at' | 'updated_at'>;

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectRow {
  id: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  image_url: string | null;
  image_alt: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type NewProject = Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>;

export interface ProjectFormState {
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  image_url: string;
  image_alt: string;
  sort_order: number;
}

export const EMPTY_PROJECT: ProjectFormState = {
  slug: '',
  client: '',
  industry: '',
  title: '',
  challenge: '',
  solution: '',
  metrics: [{ value: '', label: '' }],
  image_url: '',
  image_alt: '',
  sort_order: 0,
};
