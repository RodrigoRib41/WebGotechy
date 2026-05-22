import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { useScrollToTop } from './hooks/useScrollToTop';

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

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
    </div>
  );
}

function PublicLayout() {
  useScrollToTop();
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
    </>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
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
  // Admin (sin Header/Footer públicos)
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
]);
