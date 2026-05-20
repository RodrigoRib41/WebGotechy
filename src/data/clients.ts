/**
 * Logos de clientes representados como SVGs inline en wordmark.
 * Esto evita peticiones extra y permite controlar el color desde CSS
 * (grayscale + colorize on hover) sin perder calidad en escalas.
 */

export interface Client {
  name: string;
  /** Letras o iniciales que se renderizan como wordmark estilizado. */
  wordmark: string;
  /** Color "marca" en hover. */
  brandColor: string;
}

export const CLIENTS: Client[] = [
  { name: 'Raizen', wordmark: 'Raízen', brandColor: '#E30613' },
  { name: 'Tenaris', wordmark: 'Tenaris', brandColor: '#003B71' },
  { name: 'Gerdau', wordmark: 'Gerdau', brandColor: '#005EB8' },
  { name: 'Ledesma', wordmark: 'Ledesma', brandColor: '#1F8A3B' },
  { name: 'Roemmers', wordmark: 'Roemmers', brandColor: '#0058A3' },
  { name: 'Molinos', wordmark: 'Molinos', brandColor: '#C8102E' },
  { name: 'ACA', wordmark: 'ACA', brandColor: '#1E4D2B' },
];
