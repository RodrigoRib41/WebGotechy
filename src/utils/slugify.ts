import slugifyLib from 'slugify';

/** Genera un slug seguro para URLs a partir de un título. */
export function toSlug(input: string): string {
  return slugifyLib(input, { lower: true, strict: true, trim: true, locale: 'es' });
}

/** Valida que un slug tenga el formato esperado: minúsculas, números, guiones. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
