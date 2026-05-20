import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la sección actualmente visible.
 * Útil para iluminar el ítem activo del menú según el scroll.
 */
export function useActiveSection(ids: readonly string[], offset = 120): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const handler = () => {
      const scrollY = window.scrollY + offset;
      let current = ids[0] ?? '';
      for (const section of sections) {
        if (section.offsetTop <= scrollY) current = section.id;
      }
      setActive(current);
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [ids, offset]);

  return active;
}
