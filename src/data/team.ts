/**
 * Equipo de GoTechy — sección "Nuestro equipo" en /nosotros.
 *
 * ⚠️ PLACEHOLDERS: reemplazar con los datos reales del equipo.
 *  - `photo`: dejar las fotos en /public/images/team/ (ideal: cuadradas o
 *    retrato 4:5, ~800px de ancho, JPG/WebP). Si el archivo no existe,
 *    la card muestra un avatar con las iniciales (degrada limpio).
 *  - `linkedin`: opcional — si está, la card muestra el ícono con link.
 */
export interface TeamMember {
  name: string;
  role: string;
  role_en: string;
  /** Ruta pública de la foto (ej: '/images/team/juan-perez.jpg'). */
  photo?: string;
  linkedin?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Nombre Apellido',
    role: 'CEO & Co-founder',
    role_en: 'CEO & Co-founder',
    photo: '/images/team/ceo.jpg',
  },
  {
    name: 'Nombre Apellido',
    role: 'CTO & Co-founder',
    role_en: 'CTO & Co-founder',
    photo: '/images/team/cto.jpg',
  },
  {
    name: 'Nombre Apellido',
    role: 'Head of Delivery SAP',
    role_en: 'Head of SAP Delivery',
    photo: '/images/team/delivery.jpg',
  },
  {
    name: 'Nombre Apellido',
    role: 'Head of IA & Data',
    role_en: 'Head of AI & Data',
    photo: '/images/team/ia.jpg',
  },
];
