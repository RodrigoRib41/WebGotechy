import { type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  ExternalLink,
  Building2,
  Briefcase,
  Handshake,
  Quote,
  CalendarDays,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../Logo';
import { cn } from '../../utils/cn';

interface AdminLayoutProps {
  children: ReactNode;
  /** Título visible en la barra superior. */
  title?: string;
  /** Slot opcional para acciones contextuales (botones). */
  actions?: ReactNode;
}

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true }],
  },
  {
    title: 'Blog',
    items: [
      { to: '/admin/dashboard', label: 'Artículos', icon: FileText, exact: true },
      { to: '/admin/posts/new', label: 'Nuevo artículo', icon: PlusCircle },
    ],
  },
  {
    title: 'Catálogo',
    items: [
      { to: '/admin/projects', label: 'Proyectos', icon: Briefcase },
      { to: '/admin/clients', label: 'Clientes', icon: Building2 },
      { to: '/admin/partners', label: 'Partners', icon: Handshake },
      { to: '/admin/testimonials', label: 'Testimonios', icon: Quote },
      { to: '/admin/events', label: 'Eventos', icon: CalendarDays },
    ],
  },
];

export function AdminLayout({ children, title, actions }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada.');
      navigate('/admin', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al cerrar sesión.');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-white">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/10 bg-primary-700/60 backdrop-blur lg:flex">
        <div className="flex h-16 items-center px-6">
          <Link to="/" aria-label="GoTechy">
            <Logo size={32} />
          </Link>
        </div>

        <nav className="mt-4 flex-1 space-y-4 px-3" aria-label="Admin navigation">
          {NAV.map((group, gi) => (
            <div key={gi} className="space-y-1">
              {group.title && (
                <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={`${gi}-${item.to}-${item.label}`}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                        isActive
                          ? 'bg-secondary/15 text-secondary-200 ring-1 ring-secondary/30'
                          : 'text-white/70 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          ))}
          <div className="my-2 border-t border-white/5" />
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Ver sitio público
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 truncate text-xs text-white/55">
            {user?.email}
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/10 bg-primary/80 px-4 backdrop-blur lg:hidden">
        <Link to="/admin/dashboard" aria-label="Admin">
          <Logo size={28} />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/posts/new"
            className="rounded-full bg-secondary/15 px-3 py-1.5 text-xs font-semibold text-secondary-200 ring-1 ring-secondary/30"
          >
            <PlusCircle className="inline h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            aria-label="Cerrar sesión"
            className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white/70"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="lg:pl-64">
        <div className="container-x py-8 sm:py-10">
          {(title || actions) && (
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {title && (
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {title}
                  </h1>
                </div>
              )}
              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
