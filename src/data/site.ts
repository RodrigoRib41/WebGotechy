/**
 * Datos centralizados del sitio.
 * Cualquier texto que pueda cambiar (servicios, clientes, oficinas, contacto)
 * vive aquí en lugar de estar hardcodeado en los componentes.
 */

export const SITE = {
  name: 'GoTechy',
  tagline: 'Consultora SAP de clase mundial',
  description:
    'Transformamos empresas con tecnología SAP. Signavio, BTP, LeanIX, Basis, Fiori, ABAP, IA y Next Gen Development.',
  url: 'https://gotechy.com',
  phone: '+54 9 11 6753-3991',
  phoneRaw: '5491167533991', // wa.me sin signos
  email: 'contacto@gotechy.com',
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
    address: 'Juan Diaz de Solis 2384, Piso 2',
    postal: 'CP 1636',
    country: 'Argentina',
    coords: { lat: -34.498, lng: -58.515 },
  },
  {
    id: 'santafe',
    city: 'Santa Fe',
    address: 'Los Silos, Dique I, Puerto de Santa Fe',
    postal: 'CP 3000',
    country: 'Argentina',
    coords: { lat: -31.628, lng: -60.704 },
  },
] as const;

export const STATS = [
  { value: '15+', label: 'Años de experiencia', labelEn: 'Years of experience' },
  { value: '120+', label: 'Proyectos entregados', labelEn: 'Projects delivered' },
  { value: '40+', label: 'Clientes enterprise', labelEn: 'Enterprise clients' },
  { value: '24/7', label: 'Soporte continuo', labelEn: 'Continuous support' },
] as const;
