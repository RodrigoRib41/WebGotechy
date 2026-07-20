import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { useScrollToTop } from './hooks/useScrollToTop';
import {
  ADMIN_PATH_ENABLED,
  AGENDA_PATH_ENABLED,
  IS_ADMIN_HOST,
  IS_AGENDA_HOST,
} from './config/hosts';

// Code splitting por ruta — cada página se carga on-demand.
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
);
const ClientsPage = lazy(() =>
  import('./pages/ClientsPage').then((m) => ({ default: m.ClientsPage })),
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
);
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const AgendaPage = lazy(() =>
  import('./pages/AgendaPage').then((m) => ({ default: m.AgendaPage })),
);

// Admin (también lazy)
const AdminLogin = lazy(() =>
  import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })),
);
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
);
const AdminEditor = lazy(() =>
  import('./pages/admin/AdminEditor').then((m) => ({ default: m.AdminEditor })),
);
const AdminLogosManager = lazy(() =>
  import('./pages/admin/AdminLogosManager').then((m) => ({ default: m.AdminLogosManager })),
);
const AdminProjects = lazy(() =>
  import('./pages/admin/AdminProjects').then((m) => ({ default: m.AdminProjects })),
);
const AdminProjectEditor = lazy(() =>
  import('./pages/admin/AdminProjectEditor').then((m) => ({ default: m.AdminProjectEditor })),
);
const AdminTestimonials = lazy(() =>
  import('./pages/admin/AdminTestimonials').then((m) => ({ default: m.AdminTestimonials })),
);
const AdminEvents = lazy(() =>
  import('./pages/admin/AdminEvents').then((m) => ({ default: m.AdminEvents })),
);
const AdminServiceHorizonte = lazy(() =>
  import('./pages/admin/AdminServiceHorizonte').then((m) => ({
    default: m.AdminServiceHorizonte,
  })),
);
const AdminMeetings = lazy(() =>
  import('./pages/admin/AdminMeetings').then((m) => ({ default: m.AdminMeetings })),
);
const AdminChatbot = lazy(() =>
  import('./pages/admin/AdminChatbot').then((m) => ({ default: m.AdminChatbot })),
);
const AdminGeminiUsage = lazy(() =>
  import('./pages/admin/AdminGeminiUsage').then((m) => ({ default: m.AdminGeminiUsage })),
);

// El widget del chatbot es lazy para no arrastrar supabase-js al bundle
// inicial; si el bot está apagado no renderiza nada.
const ChatWidget = lazy(() =>
  import('./components/chatbot/ChatWidget').then((m) => ({ default: m.ChatWidget })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
    </div>
  );
}

// Ruteo por host (agenda.gotechy.com / administracion.gotechy.com / público):
// constantes centralizadas en ./config/hosts.

function PublicLayout() {
  useScrollToTop();

  // agenda.gotechy.com: cualquier path sirve el agendador standalone, sin el
  // chrome del sitio.
  if (IS_AGENDA_HOST) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AgendaPage />
      </Suspense>
    );
  }

  // administracion.gotechy.com: el sitio público no se sirve acá; todo se
  // manda al panel (login). Las rutas /admin/* son top-level y no pasan por
  // este layout, así que solo redirige lo que caería en el sitio público.
  if (IS_ADMIN_HOST) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <a href="#main" className="skip-to-content">
        Saltar al contenido
      </a>
      <Header />
      <main id="main" className="min-h-screen">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  useScrollToTop();
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

// Wrapper liviano para la agenda standalone (sin chrome público ni admin).
function AgendaShell({ children }: { children: ReactNode }) {
  useScrollToTop();
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  // Rutas públicas con Header/Footer
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/servicios', element: <ServicesPage /> },
      { path: '/servicios/:slug', element: <ServiceDetailPage /> },
      { path: '/clientes', element: <ClientsPage /> },
      { path: '/proyectos', element: <ProjectsPage /> },
      { path: '/nosotros', element: <AboutPage /> },
      { path: '/contacto', element: <ContactPage /> },
      { path: '/blogtechy', element: <BlogPage /> },
      { path: '/blogtechy/:slug', element: <BlogPostPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Agenda standalone por path — SOLO en local/staging/previews (sin
  // subdominio). En el dominio público de producción NO se registra:
  // gotechy.com/agenda cae al 404 del layout público. La agenda de producción
  // vive únicamente en agenda.gotechy.com (ver gate IS_AGENDA_HOST arriba).
  ...(AGENDA_PATH_ENABLED
    ? [
        {
          path: '/agenda',
          element: (
            <AgendaShell>
              <AgendaPage />
            </AgendaShell>
          ),
        },
      ]
    : []),
  // Panel de administración (sin Header/Footer públicos) — SOLO en
  // administracion.gotechy.com (+ local y previews de Vercel). En gotechy.com
  // NO se registran → gotechy.com/admin cae al 404 del layout público. El
  // panel de producción vive únicamente en administracion.gotechy.com.
  ...(ADMIN_PATH_ENABLED
    ? [
  {
    path: '/admin',
    element: (
      <AdminShell>
        <AdminLogin />
      </AdminShell>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/posts/new',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminEditor mode="new" />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/posts/edit/:id',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminEditor mode="edit" />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/clients',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminLogosManager kind="client" />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/partners',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminLogosManager kind="partner" />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/projects',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminProjects />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/projects/new',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminProjectEditor mode="new" />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/projects/edit/:id',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminProjectEditor mode="edit" />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/testimonials',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminTestimonials />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/events',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminEvents />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/horizonte',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminServiceHorizonte />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/meetings',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminMeetings />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/chatbot',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminChatbot />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
  {
    path: '/admin/chatbot/consumo',
    element: (
      <AdminShell>
        <ProtectedRoute>
          <AdminGeminiUsage />
        </ProtectedRoute>
      </AdminShell>
    ),
  },
      ]
    : []),
]);
