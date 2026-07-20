/**
 * Ruteo por host (subdominios).
 *
 * Producción:
 *  - gotechy.com / www.gotechy.com → sitio público. NO expone /agenda ni
 *    /admin (ambos caen al 404 del layout público).
 *  - agenda.gotechy.com            → agendador standalone (en la raíz del host).
 *  - administracion.gotechy.com    → panel de administración (rutas /admin/*).
 *
 * Local, 127.0.0.1 y previews EFÍMEROS de Vercel (deploys por rama): no hay
 * subdominios, así que se habilita TODO para poder probar sin fricción. Los
 * dominios propios de Vercel que sirven producción (web-gotechy.vercel.app y
 * web-gotechy-eight.vercel.app) se tratan como públicos → bloquean /agenda y
 * /admin igual que gotechy.com.
 *
 * El hostname se lee una vez al cargar el módulo: en una SPA no cambia durante
 * la sesión, así que alcanza para decidir qué rutas registrar.
 */
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

export const AGENDA_HOST = 'agenda.gotechy.com';
export const ADMIN_HOST = 'administracion.gotechy.com';

// Hosts públicos: el sitio de marketing. NO exponen /agenda ni /admin (caen al
// 404). Además del dominio real, se incluyen los dominios propios de Vercel que
// sirven producción — si no, `.vercel.app` los tomaría como "preview" y
// abriría el panel/agenda en ellos.
const PUBLIC_HOSTS = [
  'gotechy.com',
  'www.gotechy.com',
  'web-gotechy.vercel.app',
  'web-gotechy-eight.vercel.app',
];

export const IS_AGENDA_HOST = hostname === AGENDA_HOST;
export const IS_ADMIN_HOST = hostname === ADMIN_HOST;

// Local, 127.0.0.1 y previews EFÍMEROS de Vercel (deploys por rama, p. ej.
// web-gotechy-git-*.vercel.app) — pero NUNCA los aliases públicos de arriba.
const IS_LOCAL_OR_PREVIEW =
  hostname === '' ||
  hostname === 'localhost' ||
  hostname === '127.0.0.1' ||
  (hostname.endsWith('.vercel.app') && !PUBLIC_HOSTS.includes(hostname));

/** El path /agenda solo se registra donde la agenda puede vivir. */
export const AGENDA_PATH_ENABLED = IS_LOCAL_OR_PREVIEW || IS_AGENDA_HOST;
/** Las rutas /admin/* solo se registran donde el panel puede vivir. */
export const ADMIN_PATH_ENABLED = IS_LOCAL_OR_PREVIEW || IS_ADMIN_HOST;

/**
 * URL del panel para enlazar DESDE el sitio público (footer): cross-origin al
 * subdominio en producción, relativa en local/preview (donde /admin sí existe).
 */
export const ADMIN_URL = PUBLIC_HOSTS.includes(hostname)
  ? `https://${ADMIN_HOST}/admin`
  : '/admin';
