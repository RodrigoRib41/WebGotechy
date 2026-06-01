import { createClient } from '@supabase/supabase-js';
import type { BlogPost, BlogPostUpdate, NewBlogPost } from '../types/blog';
import type {
  LogoKind,
  LogoRow,
  NewLogo,
  NewProject,
  ProjectRow,
} from '../types/catalog';
import type { NewTestimonial, TestimonialRow } from '../types/testimonials';
import type { EventRow, NewEvent } from '../types/events';
import type { ServiceHorizonteRow, ServiceHorizonteUpsert } from '../types/serviceHorizonte';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // No tiramos error en build para no romper despliegues sin envs;
  // las llamadas fallarán con un mensaje claro en runtime.
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidas. ' +
      'El panel de admin no funcionará hasta configurarlas en .env.',
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const TABLE = 'blog_posts';

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as BlogPost[];
  },

  async getPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as BlogPost[];
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as BlogPost | null;
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as BlogPost | null;
  },

  async createPost(post: NewBlogPost): Promise<BlogPost> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(post)
      .select()
      .single();
    if (error) throw error;
    return data as BlogPost;
  },

  async updatePost(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as BlogPost;
  },

  async deletePost(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
  },

  async incrementViews(id: string): Promise<void> {
    // RPC opcional: si la función `increment_views` no existe, hacemos un update best-effort.
    const { error: rpcError } = await supabase.rpc('increment_views', { post_id: id });
    if (!rpcError) return;
    // Fallback sin RPC
    const { data } = await supabase.from(TABLE).select('views').eq('id', id).maybeSingle();
    const current = (data?.views as number | undefined) ?? 0;
    await supabase.from(TABLE).update({ views: current + 1 }).eq('id', id);
  },
};

// ============================================================
//  Logos (clientes + partners)
// ============================================================
const LOGOS_TABLE = 'logos';

export const logosService = {
  async list(kind?: LogoKind): Promise<LogoRow[]> {
    let q = supabase.from(LOGOS_TABLE).select('*').order('sort_order').order('name');
    if (kind) q = q.eq('kind', kind);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as LogoRow[];
  },

  async create(logo: NewLogo): Promise<LogoRow> {
    const { data, error } = await supabase
      .from(LOGOS_TABLE)
      .insert(logo)
      .select()
      .single();
    if (error) throw error;
    return data as LogoRow;
  },

  async update(id: string, updates: Partial<NewLogo>): Promise<LogoRow> {
    const { data, error } = await supabase
      .from(LOGOS_TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as LogoRow;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(LOGOS_TABLE).delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================
//  Projects (casos de éxito)
// ============================================================
const PROJECTS_TABLE = 'projects';

export const projectsService = {
  async list(): Promise<ProjectRow[]> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .order('sort_order')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as ProjectRow[];
  },

  async getById(id: string): Promise<ProjectRow | null> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as ProjectRow | null;
  },

  async create(project: NewProject): Promise<ProjectRow> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data as ProjectRow;
  },

  async update(id: string, updates: Partial<NewProject>): Promise<ProjectRow> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as ProjectRow;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(PROJECTS_TABLE).delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================
//  Testimonials
// ============================================================
const TESTIMONIALS_TABLE = 'testimonials';

export const testimonialsService = {
  /** Lista todos (admin). El sitio público filtra por published=true. */
  async list(onlyPublished = false): Promise<TestimonialRow[]> {
    let q = supabase
      .from(TESTIMONIALS_TABLE)
      .select('*')
      .order('sort_order')
      .order('created_at', { ascending: false });
    if (onlyPublished) q = q.eq('published', true);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as TestimonialRow[];
  },

  async create(t: NewTestimonial): Promise<TestimonialRow> {
    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .insert(t)
      .select()
      .single();
    if (error) throw error;
    return data as TestimonialRow;
  },

  async update(id: string, updates: Partial<NewTestimonial>): Promise<TestimonialRow> {
    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as TestimonialRow;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(TESTIMONIALS_TABLE).delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================
//  Events / Webinars
// ============================================================
const EVENTS_TABLE = 'events';

export const eventsService = {
  /**
   * Lista eventos.
   * - `onlyPublished`: solo los marcados como publicados (uso público).
   * - `onlyUpcoming`: solo eventos con `start_date >= hoy` (uso público).
   */
  async list(onlyPublished = false, onlyUpcoming = false): Promise<EventRow[]> {
    let q = supabase
      .from(EVENTS_TABLE)
      .select('*')
      .order('start_date', { ascending: true })
      .order('sort_order');
    if (onlyPublished) q = q.eq('published', true);
    if (onlyUpcoming) {
      const today = new Date().toISOString().slice(0, 10);
      q = q.gte('start_date', today);
    }
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as EventRow[];
  },

  async create(e: NewEvent): Promise<EventRow> {
    const { data, error } = await supabase
      .from(EVENTS_TABLE)
      .insert(e)
      .select()
      .single();
    if (error) throw error;
    return data as EventRow;
  },

  async update(id: string, updates: Partial<NewEvent>): Promise<EventRow> {
    const { data, error } = await supabase
      .from(EVENTS_TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as EventRow;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(EVENTS_TABLE).delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================================
//  Service Horizonte — overrides editables del bloque "Horizonte SAP"
// ============================================================
const SERVICE_HORIZONTE_TABLE = 'service_horizonte';

export const serviceHorizonteService = {
  /** Lista todos los overrides cargados (admin). */
  async list(): Promise<ServiceHorizonteRow[]> {
    const { data, error } = await supabase
      .from(SERVICE_HORIZONTE_TABLE)
      .select('*');
    if (error) throw error;
    return (data ?? []) as ServiceHorizonteRow[];
  },

  /** Trae el override de un servicio puntual (uso público). */
  async get(serviceId: string): Promise<ServiceHorizonteRow | null> {
    const { data, error } = await supabase
      .from(SERVICE_HORIZONTE_TABLE)
      .select('*')
      .eq('service_id', serviceId)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as ServiceHorizonteRow | null;
  },

  /** Crea o actualiza el override de un servicio (clave: service_id). */
  async upsert(payload: ServiceHorizonteUpsert): Promise<ServiceHorizonteRow> {
    const { data, error } = await supabase
      .from(SERVICE_HORIZONTE_TABLE)
      .upsert(payload, { onConflict: 'service_id' })
      .select()
      .single();
    if (error) throw error;
    return data as ServiceHorizonteRow;
  },

  /** Elimina el override → el servicio vuelve a usar el texto estático. */
  async remove(serviceId: string): Promise<void> {
    const { error } = await supabase
      .from(SERVICE_HORIZONTE_TABLE)
      .delete()
      .eq('service_id', serviceId);
    if (error) throw error;
  },
};
