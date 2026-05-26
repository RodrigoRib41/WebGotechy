/**
 * Datos centralizados del sitio.
 * Cualquier texto que pueda cambiar (servicios, clientes, oficinas, contacto)
 * vive aquí en lugar de estar hardcodeado en los componentes.
 */

// Defaults (se usan si las VITE_* no están definidas).
const DEFAULT_PHONE_DISPLAY = '+54 9 11 6753-3991';
const DEFAULT_WHATSAPP_RAW = '5491167533991';
const DEFAULT_EMAIL = 'contacto@gotechy.com';

const envPhone = import.meta.env.VITE_CONTACT_PHONE as string | undefined;
const envWhats = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
const envEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

/** Solo dígitos: lo que necesita wa.me. */
function toRawDigits(value: string): string {
  return value.replace(/\D+/g, '');
}

export const SITE = {
  name: 'GoTechy',
  tagline: 'Consultora SAP de clase mundial',
  description:
    'Transformamos empresas con tecnología SAP. Signavio, BTP, LeanIX, Basis, Fiori, ABAP, IA y Next Gen Development.',
  url: 'https://gotechy.com',
  /** Texto que se muestra al usuario. */
  phone: envPhone?.trim() || DEFAULT_PHONE_DISPLAY,
  /** Solo dígitos, listo para wa.me y tel:. */
  phoneRaw: toRawDigits(envWhats?.trim() || envPhone?.trim() || DEFAULT_WHATSAPP_RAW),
  email: envEmail?.trim() || DEFAULT_EMAIL,
  social: {
    linkedin: 'https://www.linkedin.com/company/gotechy',
    youtube: 'https://www.youtube.com/@gotechy',
  },
};

/**
 * Navegación principal — rutas (no anchors).
 * Cada `id` es un slug i18n bajo header.*
 */
export const NAV_LINKS = [
  { id: 'services', to: '/servicios' },
  { id: 'clients', to: '/clientes' },
  { id: 'projects', to: '/proyectos' },
  { id: 'about', to: '/nosotros' },
  { id: 'blog', to: '/blogtechy' },
  { id: 'contact', to: '/contacto' },
] as const;

export const OFFICES = [
  {
    id: 'baires',
    city: 'Buenos Aires',
    address: 'Juan Díaz de Solís 2384, Piso 2 — Olivos',
    postal: 'CP 1636',
    country: 'Argentina',
    coords: { lat: -34.5078092, lng: -58.4779991 },
    mapsUrl: 'https://maps.app.goo.gl/iPbQuTCYoWcWGxqj8',
  },
  {
    id: 'santafe',
    city: 'Santa Fe',
    address: 'Los Silos, Dique I, Puerto de Santa Fe',
    postal: 'CP 3000',
    country: 'Argentina',
    coords: { lat: -31.6484254, lng: -60.7004238 },
    mapsUrl: 'https://maps.app.goo.gl/YsrdHCXdvfTryQ6y8',
  },
] as const;

/**
 * STATS — para el counter animado usamos `count` + `suffix`. Cuando `count`
 * es null el bloque renderiza `value` literal (ej "24/7"). `value` se mantiene
 * por compatibilidad y para SSR/no-JS.
 */
export const STATS = [
  { value: '15+', count: 15, suffix: '+', label: 'Años de experiencia', labelEn: 'Years of experience' },
  { value: '120+', count: 120, suffix: '+', label: 'Proyectos entregados', labelEn: 'Projects delivered' },
  { value: '40+', count: 40, suffix: '+', label: 'Clientes enterprise', labelEn: 'Enterprise clients' },
  { value: '24/7', count: null, suffix: '', label: 'Soporte continuo', labelEn: 'Continuous support' },
] as const;
