/**
 * Logos de clientes — imágenes servidas desde /public/images.
 * Los logos se renderizan como <img> con tratamiento uniforme en el carrusel.
 */

export interface Client {
  name: string;
  /** Ruta absoluta dentro de /public. */
  logo: string;
  /** Texto alternativo accesible. */
  alt: string;
}

export const CLIENTS: Client[] = [
  { name: 'Raizen', logo: '/images/raizen.png', alt: 'Logo de Raízen' },
  { name: 'Tenaris', logo: '/images/Tenaris.png', alt: 'Logo de Tenaris' },
  { name: 'Gerdau', logo: '/images/gerdau.png', alt: 'Logo de Gerdau' },
  { name: 'Ledesma', logo: '/images/ledesma.png', alt: 'Logo de Ledesma' },
  { name: 'Roemmers', logo: '/images/roemmers.jpg', alt: 'Logo de Roemmers' },
  { name: 'Molinos', logo: '/images/molinos.webp', alt: 'Logo de Molinos' },
  { name: 'ACA', logo: '/images/aca.jpg', alt: 'Logo de ACA' },
  { name: 'Komatsu', logo: '/images/komatsu.png', alt: 'Logo de Komatsu' },
  { name: 'Topper', logo: '/images/topper.png', alt: 'Logo de Topper' },
  { name: 'Ecopetrol', logo: '/images/ecopetrol.jpg', alt: 'Logo de Ecopetrol' },
];
