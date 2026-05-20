import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../data/site';

export function WhatsAppButton() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Aparece después de un pequeño scroll para no obstruir el hero
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 200);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const href = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
    'Hola GoTechy 👋 Me gustaría conversar sobre un proyecto SAP.',
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7"
        >
          <div className="relative flex items-center">
            <AnimatePresence>
              {tooltipOpen && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-elevated"
                >
                  Hablemos por WhatsApp
                  <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-primary" />
                </motion.span>
              )}
            </AnimatePresence>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir conversación de WhatsApp con GoTechy"
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              onFocus={() => setTooltipOpen(true)}
              onBlur={() => setTooltipOpen(false)}
              className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-glow-md transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
            >
              {/* Pulso */}
              <span
                className="absolute inset-0 -z-10 rounded-full bg-whatsapp animate-pulse-ring"
                aria-hidden="true"
              />
              {/* Icono oficial WhatsApp (SVG inline) */}
              <svg
                viewBox="0 0 32 32"
                className="h-7 w-7 sm:h-8 sm:w-8"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.11 17.46c-.27-.13-1.59-.78-1.83-.87-.25-.09-.43-.13-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.13-.13.27-.32.41-.49.14-.17.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.61-1.46-.84-2-.22-.53-.45-.46-.61-.46l-.52-.01c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26 0 1.34.97 2.62 1.11 2.8.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.03 5.34h-.01c-5.89 0-10.69 4.79-10.69 10.68 0 1.88.49 3.72 1.43 5.34l-1.51 5.51 5.65-1.48a10.66 10.66 0 0 0 5.12 1.31h.01c5.89 0 10.69-4.79 10.69-10.68 0-2.85-1.11-5.54-3.13-7.55a10.6 10.6 0 0 0-7.56-3.13zm0 19.55h-.01a8.83 8.83 0 0 1-4.5-1.23l-.32-.19-3.34.88.89-3.26-.21-.34a8.84 8.84 0 0 1-1.36-4.72c0-4.89 3.99-8.87 8.88-8.87 2.37 0 4.59.92 6.27 2.6a8.81 8.81 0 0 1 2.6 6.27c0 4.89-3.99 8.87-8.9 8.87z" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
