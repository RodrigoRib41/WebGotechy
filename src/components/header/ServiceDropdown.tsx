import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICES } from '../../data/services';
import { cn } from '../../utils/cn';

const HOVER_OPEN_DELAY_MS = 150;
const HOVER_CLOSE_DELAY_MS = 120;

interface ServiceDropdownProps {
  label: string;
}

/**
 * Dropdown de servicios en el desktop nav.
 * - Hover: abre con 150ms de delay, cierra con 120ms de delay (evita parpadeo al cruzar el gap)
 * - Click: toggle inmediato (sirve también para teclado)
 * - Click fuera / Escape: cierra
 * - Cada item linkea a /servicios/:slug; los que aún no tienen `detail`
 *   son redirigidos al overview por la ServiceDetailPage.
 */
export function ServiceDropdown({ label }: ServiceDropdownProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const isActive = pathname === '/servicios' || pathname.startsWith('/servicios/');

  const clearTimers = () => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), HOVER_OPEN_DELAY_MS);
  };

  const handleMouseLeave = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY_MS);
  };

  // Cerrar al cambiar de ruta (cuando se clickea un item).
  useEffect(() => {
    setOpen(false);
    clearTimers();
  }, [pathname]);

  // Click fuera + Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Cleanup timers on unmount.
  useEffect(() => () => clearTimers(), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          clearTimers();
          setOpen((s) => !s);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
          isActive ? 'text-white' : 'text-white/65 hover:text-white',
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
        {isActive && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 -z-10 rounded-full bg-secondary/20 ring-1 ring-secondary/40"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute left-0 top-full z-50 mt-3 w-[420px] overflow-hidden rounded-2xl border backdrop-blur-xl',
              'border-secondary/10 bg-[#141B2D]/95',
            )}
            style={{
              boxShadow:
                '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 229, 255, 0.05), 0 0 30px -10px rgba(0, 229, 255, 0.15)',
            }}
          >
            <div className="border-b border-white/[0.06] px-6 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary-300">
                Servicios
              </div>
              <p className="mt-0.5 text-sm text-white/55">
                Soluciones integrales para tu negocio
              </p>
            </div>

            <ul className="max-h-[70vh] overflow-y-auto py-2">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.id} role="none">
                    <Link
                      to={`/servicios/${service.slug}`}
                      role="menuitem"
                      className={cn(
                        'group relative flex items-start gap-3 border-l-4 border-transparent px-6 py-4 transition-all duration-150 ease-smooth',
                        'hover:border-secondary hover:bg-[#1E293B]',
                      )}
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-display text-sm font-semibold text-[#F8FAFC]">
                            {service.title}
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary" />
                        </div>
                        <div className="mt-0.5 text-xs text-[#94A3B8]">{service.short}</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/[0.06] px-6 py-3">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-200"
              >
                Ver todos los servicios
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
