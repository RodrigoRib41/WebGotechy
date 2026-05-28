export type PostStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string;
  author_email: string | null;
  tags: string[];
  status: PostStatus;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  /** Variantes EN opcionales. Si están vacías, el renderer hace fallback al ES. */
  title_en?: string | null;
  excerpt_en?: string | null;
  content_en?: string | null;
}

/**
 * Devuelve una vista del post con los campos en EN aplicados si están
 * cargados (fallback transparente al ES cuando no existen).
 */
export function localizeBlogPost(p: BlogPost, isEn: boolean): BlogPost {
  if (!isEn) return p;
  const pickStr = (en: string | null | undefined, es: string) =>
    en && en.trim() !== '' ? en : es;
  return {
    ...p,
    title: pickStr(p.title_en, p.title),
    excerpt: p.excerpt_en && p.excerpt_en.trim() !== '' ? p.excerpt_en : p.excerpt,
    content: pickStr(p.content_en, p.content),
  };
}

export type NewBlogPost = Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>;
export type BlogPostUpdate = Partial<NewBlogPost>;

export interface BlogPostFormState {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  author_email: string;
  tags: string[];
  status: PostStatus;
  /** Traducciones EN — opcionales. Vacías → fallback al español en el sitio. */
  title_en: string;
  excerpt_en: string;
  content_en: string;
}

export const EMPTY_POST: BlogPostFormState = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  featured_image: '',
  author: '',
  author_email: '',
  tags: [],
  status: 'draft',
  title_en: '',
  excerpt_en: '',
  content_en: '',
};
