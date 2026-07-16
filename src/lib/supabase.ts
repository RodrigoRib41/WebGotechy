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
import type {
  AvailabilityResponse,
  BookMeetingPayload,
  BookMeetingResponse,
  MeetingBookingRow,
  MeetingSettingsRow,
  MeetingSettingsUpdate,
} from '../types/meetings';
import type {
  ChatbotArticleRow,
  ChatbotMessageRow,
  ChatbotSettingsRow,
  ChatbotUsageDailyRow,
  ChatMessage,
  ChatReplyResponse,
  NewChatbotArticle,
} from '../types/chatbot';

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
    // El conteo se hace vía RPC `increment_views` (SECURITY DEFINER) para no
    // requerir permisos de UPDATE directos sobre la tabla desde el cliente anónimo.
    // Si la función no existe, el error se ignora (best-effort, no rompe el render).
    await supabase.rpc('increment_views', { post_id: id });
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

// ============================================================
//  Meetings — agenda de reuniones con Google Meet
//  Público: Edge Functions (la tabla de reservas no es accesible
//  con la anon key). Admin: settings + listado vía RLS is_admin().
// ============================================================
const MEETING_SETTINGS_TABLE = 'meeting_settings';
const MEETING_BOOKINGS_TABLE = 'meeting_bookings';

export const meetingsService = {
  /** Slots disponibles, computados server-side (sin datos de terceros). */
  async availability(): Promise<AvailabilityResponse> {
    const { data, error } = await supabase.functions.invoke('meeting-availability', {
      body: {},
    });
    if (error) throw error;
    return data as AvailabilityResponse;
  },

  /** Reserva un slot. Errores de negocio vienen en `data.error`/`code`. */
  async book(payload: BookMeetingPayload): Promise<BookMeetingResponse> {
    const { data, error } = await supabase.functions.invoke('book-meeting', {
      body: payload,
    });
    if (error) {
      // FunctionsHttpError: el body con el detalle viene en error.context.
      const ctx = (error as { context?: Response }).context;
      if (ctx) {
        const parsed = (await ctx.json().catch(() => null)) as BookMeetingResponse | null;
        if (parsed?.error) return parsed;
      }
      throw error;
    }
    return data as BookMeetingResponse;
  },

  // ---- Admin ----
  async getSettings(): Promise<MeetingSettingsRow | null> {
    const { data, error } = await supabase
      .from(MEETING_SETTINGS_TABLE)
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as MeetingSettingsRow | null;
  },

  async updateSettings(updates: MeetingSettingsUpdate): Promise<MeetingSettingsRow> {
    const { data, error } = await supabase
      .from(MEETING_SETTINGS_TABLE)
      .upsert({ id: 1, ...updates, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data as MeetingSettingsRow;
  },

  async listBookings(): Promise<MeetingBookingRow[]> {
    const { data, error } = await supabase
      .from(MEETING_BOOKINGS_TABLE)
      .select('*')
      .order('starts_at', { ascending: true });
    if (error) throw error;
    return (data ?? []) as MeetingBookingRow[];
  },

  /** Cancela (libera el slot en la web; el evento de GCal se borra a mano). */
  async cancelBooking(id: string): Promise<void> {
    const { error } = await supabase
      .from(MEETING_BOOKINGS_TABLE)
      .update({ status: 'cancelled' })
      .eq('id', id);
    if (error) throw error;
  },
};

// ============================================================
//  Chatbot IA "Techy"
//  Público: flag `enabled` (lectura anónima) + Edge Function
//  `chat-assistant`. Admin: settings + base de conocimientos +
//  log de conversaciones vía RLS is_admin().
// ============================================================
const CHATBOT_SETTINGS_TABLE = 'chatbot_settings';
const CHATBOT_ARTICLES_TABLE = 'chatbot_articles';
const CHATBOT_MESSAGES_TABLE = 'chatbot_messages';

export const chatbotService = {
  /** ¿El bot está activado site-wide? (false ante cualquier error). */
  async isEnabled(): Promise<boolean> {
    const { data, error } = await supabase
      .from(CHATBOT_SETTINGS_TABLE)
      .select('enabled')
      .eq('id', 1)
      .maybeSingle();
    if (error) return false;
    return Boolean(data?.enabled);
  },

  /** Envía el hilo al asistente. Errores de negocio en `error`/`code`. */
  async send(
    messages: ChatMessage[],
    sessionId: string,
    lang: string,
  ): Promise<ChatReplyResponse> {
    const { data, error } = await supabase.functions.invoke('chat-assistant', {
      body: {
        // Los errores locales del widget no forman parte del historial real.
        messages: messages
          .filter((m) => !m.error)
          .map((m) => ({ role: m.role, content: m.content })),
        sessionId,
        lang,
      },
    });
    if (error) {
      // FunctionsHttpError: el body con el detalle viene en error.context.
      const ctx = (error as { context?: Response }).context;
      if (ctx) {
        const parsed = (await ctx.json().catch(() => null)) as ChatReplyResponse | null;
        if (parsed?.error) return parsed;
      }
      throw error;
    }
    return data as ChatReplyResponse;
  },

  // ---- Admin ----
  async getSettings(): Promise<ChatbotSettingsRow | null> {
    const { data, error } = await supabase
      .from(CHATBOT_SETTINGS_TABLE)
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as ChatbotSettingsRow | null;
  },

  async setEnabled(enabled: boolean): Promise<ChatbotSettingsRow> {
    const { data, error } = await supabase
      .from(CHATBOT_SETTINGS_TABLE)
      .upsert({ id: 1, enabled, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data as ChatbotSettingsRow;
  },

  async listArticles(): Promise<ChatbotArticleRow[]> {
    const { data, error } = await supabase
      .from(CHATBOT_ARTICLES_TABLE)
      .select('*')
      .order('sort_order')
      .order('created_at');
    if (error) throw error;
    return (data ?? []) as ChatbotArticleRow[];
  },

  async createArticle(article: NewChatbotArticle): Promise<ChatbotArticleRow> {
    const { data, error } = await supabase
      .from(CHATBOT_ARTICLES_TABLE)
      .insert(article)
      .select()
      .single();
    if (error) throw error;
    return data as ChatbotArticleRow;
  },

  async updateArticle(
    id: string,
    updates: Partial<NewChatbotArticle>,
  ): Promise<ChatbotArticleRow> {
    const { data, error } = await supabase
      .from(CHATBOT_ARTICLES_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as ChatbotArticleRow;
  },

  async removeArticle(id: string): Promise<void> {
    const { error } = await supabase.from(CHATBOT_ARTICLES_TABLE).delete().eq('id', id);
    if (error) throw error;
  },

  /** Últimos mensajes logueados (para agrupar por sesión en el admin). */
  async listMessages(limit = 300): Promise<ChatbotMessageRow[]> {
    const { data, error } = await supabase
      .from(CHATBOT_MESSAGES_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []) as ChatbotMessageRow[];
  },

  /**
   * Consumo de Gemini agregado por día de cuota (RPC, solo admins).
   * Días sin llamadas no vienen en el resultado: el panel los rellena.
   */
  async listUsageDaily(days = 14): Promise<ChatbotUsageDailyRow[]> {
    const { data, error } = await supabase.rpc('chatbot_usage_daily', { days });
    if (error) throw error;
    return (data ?? []) as ChatbotUsageDailyRow[];
  },
};
