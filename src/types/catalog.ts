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
  /** Variantes EN opcionales. Si están vacías, el renderer hace fallback al ES. */
  title_en?: string | null;
  industry_en?: string | null;
  challenge_en?: string | null;
  solution_en?: string | null;
}

/**
 * Devuelve una vista del proyecto con los campos en EN aplicados si están
 * cargados (fallback transparente al ES cuando no existen).
 */
export function localizeProject(p: ProjectRow, isEn: boolean): ProjectRow {
  if (!isEn) return p;
  const pickStr = (en: string | null | undefined, es: string) =>
    en && en.trim() !== '' ? en : es;
  return {
    ...p,
    title: pickStr(p.title_en, p.title),
    industry: pickStr(p.industry_en, p.industry),
    challenge: pickStr(p.challenge_en, p.challenge),
    solution: pickStr(p.solution_en, p.solution),
  };
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
  /** Traducciones en inglés. Si quedan vacías, el sitio público hace fallback al ES. */
  title_en: string;
  industry_en: string;
  challenge_en: string;
  solution_en: string;
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
  title_en: '',
  industry_en: '',
  challenge_en: '',
  solution_en: '',
};
