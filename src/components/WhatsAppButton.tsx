import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useChatbotEnabled } from '../hooks/useChatbotEnabled';
import { WhatsAppIcon, WHATSAPP_HREF } from './WhatsAppIcon';

export function WhatsAppButton() {
  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // Con Techy activo, WhatsApp vive dentro del chat: el flotante se oculta
  // y el muñequito ocupa este lugar (ver ChatWidget).
  const chatbotEnabled = useChatbotEnabled();

  // Aparece después de un pequeño scroll para no obstruir el hero
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 200);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (chatbotEnabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-[1200] sm:bottom-7 sm:right-7"
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
                  {t('contact.whatsapp')}
                  <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-primary" />
                </motion.span>
              )}
            </AnimatePresence>

            <a
              href={WHATSAPP_HREF}
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
              <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
