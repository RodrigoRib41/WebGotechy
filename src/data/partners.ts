/**
 * Logos de partners — imágenes servidas desde /public/images.
 * Partners estratégicos de GoTechy en el ecosistema SAP.
 */

export interface Partner {
  name: string;
  logo: string;
  alt: string;
}

export const PARTNERS: Partner[] = [
  { name: 'Feedbackground', logo: '/images/Partner-Feedbackground.jpg', alt: 'Logo de Feedbackground' },
  { name: 'MSP Consulting', logo: '/images/Partner-MSP Consulting.png', alt: 'Logo de MSP Consulting' },
  { name: 'NB Team', logo: '/images/Partner-NB Team.webp', alt: 'Logo de NB Team' },
  { name: 'Entelgy', logo: '/images/Partnet-Entelgy.jpg', alt: 'Logo de Entelgy' },
];
