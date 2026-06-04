/**
 * Devuelve la URL sólo si usa un protocolo de navegación seguro (http/https).
 * Sirve para blindar hrefs que vienen de la BD (ej. `event.cta_url`) contra
 * XSS por `javascript:` / `data:` / `vbscript:`. Si no es válida o el protocolo
 * no está permitido, devuelve `null` (el caller decide no renderizar el link).
 */
export function safeExternalUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://localhost';
  try {
    const parsed = new URL(url, base);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}
