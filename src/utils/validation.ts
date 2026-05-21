import type { BlogPostFormState } from '../types/blog';
import { isValidSlug } from './slugify';

export type PostErrors = Partial<Record<keyof BlogPostFormState, string>>;

/** Devuelve la longitud de texto plano sin tags HTML (para validar contenido del editor). */
export function plainTextLength(html: string): number {
  if (typeof window === 'undefined') {
    return html.replace(/<[^>]+>/g, '').trim().length;
  }
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent ?? '').trim().length;
}

export function validatePost(form: BlogPostFormState): PostErrors {
  const errors: PostErrors = {};

  if (!form.title.trim()) errors.title = 'El título es requerido.';
  else if (form.title.length < 5) errors.title = 'Mínimo 5 caracteres.';
  else if (form.title.length > 200) errors.title = 'Máximo 200 caracteres.';

  if (!form.slug.trim()) errors.slug = 'El slug es requerido.';
  else if (!isValidSlug(form.slug))
    errors.slug = 'Solo minúsculas, números y guiones (ej: mi-articulo).';

  if (form.excerpt && form.excerpt.length > 300)
    errors.excerpt = 'Máximo 300 caracteres.';

  const contentLen = plainTextLength(form.content);
  if (contentLen < 100) errors.content = 'Mínimo 100 caracteres de contenido.';

  if (!form.author.trim()) errors.author = 'El autor es requerido.';
  else if (form.author.length > 100) errors.author = 'Máximo 100 caracteres.';

  if (form.tags.length > 10) errors.tags = 'Máximo 10 tags.';
  if (form.tags.some((t) => t.length > 30))
    errors.tags = 'Cada tag puede tener hasta 30 caracteres.';

  return errors;
}
