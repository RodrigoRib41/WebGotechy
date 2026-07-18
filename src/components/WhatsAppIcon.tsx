import { SITE } from '../data/site';

/**
 * Link de WhatsApp con mensaje prellenado. Compartido por el botón flotante
 * y el chat de Techy para que ambos abran la misma conversación.
 */
export const WHATSAPP_HREF = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
  'Hola GoTechy 👋 Me gustaría conversar sobre un proyecto.',
)}`;

/** Icono oficial de WhatsApp (SVG inline, hereda el color vía currentColor). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.46c-.27-.13-1.59-.78-1.83-.87-.25-.09-.43-.13-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.13-.13.27-.32.41-.49.14-.17.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.61-1.46-.84-2-.22-.53-.45-.46-.61-.46l-.52-.01c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26 0 1.34.97 2.62 1.11 2.8.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.03 5.34h-.01c-5.89 0-10.69 4.79-10.69 10.68 0 1.88.49 3.72 1.43 5.34l-1.51 5.51 5.65-1.48a10.66 10.66 0 0 0 5.12 1.31h.01c5.89 0 10.69-4.79 10.69-10.68 0-2.85-1.11-5.54-3.13-7.55a10.6 10.6 0 0 0-7.56-3.13zm0 19.55h-.01a8.83 8.83 0 0 1-4.5-1.23l-.32-.19-3.34.88.89-3.26-.21-.34a8.84 8.84 0 0 1-1.36-4.72c0-4.89 3.99-8.87 8.88-8.87 2.37 0 4.59.92 6.27 2.6a8.81 8.81 0 0 1 2.6 6.27c0 4.89-3.99 8.87-8.9 8.87z" />
    </svg>
  );
}
