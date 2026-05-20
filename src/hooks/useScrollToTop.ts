import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolla al top en cada cambio de ruta.
 * Se monta una vez en el layout, NO en cada página.
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}
