import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

/**
 * Admin — stub para Fase 1.
 * Fase 3 implementa: login con Supabase auth, dashboard, editor TipTap,
 * upload a Cloudinary, CRUD de posts.
 */
export function AdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Panel de administración"
        subtitle="Próximamente: gestión completa del blog GoTechy"
      />
      <section className="pb-28">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-card backdrop-blur">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30">
              <Lock className="h-8 w-8" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-white">
              En construcción
            </h2>
            <p className="mt-2 text-sm text-white/70">
              El panel de admin se habilita en la Fase 3 con Supabase + TipTap +
              Cloudinary.
            </p>
            <Link to="/" className="btn-secondary mt-6">
              Volver al sitio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
