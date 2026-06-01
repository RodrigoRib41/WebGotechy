/**
 * Override editable (desde /admin) del bloque "Horizonte SAP" de cada servicio.
 *
 * El texto por defecto vive en `src/data/services.ts` (estático). Esta tabla
 * sólo guarda los servicios cuyo Horizonte fue editado u ocultado desde el
 * panel. Si no hay fila para un `service_id`, el sitio usa el texto estático.
 *
 *  - Con `hidden = true`  → el bloque NO aparece en la página del servicio.
 *  - Con `text` cargado   → reemplaza al texto estático.
 *  - Sin fila             → se usa el texto estático original.
 */
export interface ServiceHorizonteRow {
  /** Coincide con `Service.id` del catálogo estático (ej: "ia", "btp"). */
  service_id: string;
  /** Texto en español. Null cuando el bloque está oculto y sin contenido. */
  text: string | null;
  /** Texto en inglés (opcional). Fallback al español si queda vacío. */
  text_en: string | null;
  /** Si está oculto, el bloque no se renderiza en la página pública. */
  hidden: boolean;
  created_at: string;
  updated_at: string;
}

/** Payload de escritura (upsert). `service_id` identifica la fila. */
export type ServiceHorizonteUpsert = {
  service_id: string;
  text?: string | null;
  text_en?: string | null;
  hidden?: boolean;
};
