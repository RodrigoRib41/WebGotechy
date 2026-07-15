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
    role: 'CEO',
    role_en: 'CEO',
    photo: '/images/team/ceo.jpg',
  },
  {
    name: 'Nombre Apellido',
    role: 'Gerente General',
    role_en: 'General Manager',
    photo: '/images/team/gerente-general.jpg',
  },
  {
    name: 'Nombre Apellido',
    role: 'CTO',
    role_en: 'CTO',
    photo: '/images/team/cto.jpg',
  },
  {
    name: 'Nombre Apellido',
    role: 'PMO',
    role_en: 'PMO',
    photo: '/images/team/pmo.jpg',
  },
];
