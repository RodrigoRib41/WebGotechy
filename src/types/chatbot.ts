// ============================================================
//  Chatbot IA "Techy" — tipos compartidos front/admin
// ============================================================

/** Config global del bot (fila única id=1). El flag es de lectura pública. */
export interface ChatbotSettingsRow {
  id: number;
  enabled: boolean;
  updated_at: string;
}

/** Artículo de la base de conocimientos (solo visible para admins). */
export interface ChatbotArticleRow {
  id: string;
  title: string;
  content: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface NewChatbotArticle {
  title: string;
  content: string;
  active?: boolean;
  sort_order?: number;
}

/** Mensaje logueado por la Edge Function (lectura admin). */
export interface ChatbotMessageRow {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  lang: string | null;
  created_at: string;
}

/**
 * Consumo diario de la API de Gemini, agregado por la RPC
 * `chatbot_usage_daily` (lectura admin). `day` viene en YYYY-MM-DD y es el
 * "día de cuota" de Google (huso America/Los_Angeles, no UTC).
 */
export interface ChatbotUsageDailyRow {
  day: string;
  total: number;
  ok_count: number;
  rate_limited_count: number;
  error_count: number;
  prompt_tokens: number;
  output_tokens: number;
}

/** Mensaje del hilo en el widget público. */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  /** Marcado en errores locales: no se reenvía como historial al modelo. */
  error?: boolean;
}

/** Respuesta de la Edge Function `chat-assistant`. */
export interface ChatReplyResponse {
  reply?: string;
  error?: string;
  code?: 'busy' | 'disabled' | string;
}
