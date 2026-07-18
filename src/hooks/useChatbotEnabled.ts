import { useEffect, useState } from 'react';

// Cache a nivel módulo: WhatsAppButton y ChatWidget comparten una única
// consulta del flag por carga de página. El import dinámico evita arrastrar
// supabase-js al bundle inicial (WhatsAppButton no es lazy).
let flagPromise: Promise<boolean> | null = null;

function fetchEnabled(): Promise<boolean> {
  flagPromise ??= import('../lib/supabase')
    .then(({ chatbotService, isSupabaseConfigured }) =>
      isSupabaseConfigured ? chatbotService.isEnabled() : false,
    )
    .catch(() => false);
  return flagPromise;
}

/** ¿El chatbot "Techy" está activado site-wide? (false mientras carga). */
export function useChatbotEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchEnabled().then((on) => {
      if (!cancelled) setEnabled(on);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return enabled;
}
