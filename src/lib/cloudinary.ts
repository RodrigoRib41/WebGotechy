import { supabase } from './supabase';

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

interface UploadSignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  uploadPreset: string;
}

// El cloud name no es secreto: se usa para construir URLs de lectura/transform.
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Las subidas ya NO dependen de un preset público en el bundle: se firman
// server-side vía la Edge Function `sign-upload` (solo admins logueados).
export const isCloudinaryConfigured = Boolean(cloudName);

export const cloudinaryService = {
  async uploadImage(file: File): Promise<CloudinaryUploadResponse> {
    // 1. Pedir la firma a la Edge Function: valida sesión + rol admin del lado
    //    servidor y firma con el API secret (que nunca toca el cliente).
    const { data: sig, error: sigErr } = await supabase.functions.invoke<UploadSignature>(
      'sign-upload',
    );
    if (sigErr || !sig?.signature) {
      throw new Error(
        sigErr?.message ??
          'No se pudo autorizar la subida. Iniciá sesión como administrador e intentá de nuevo.',
      );
    }

    // 2. Subir directo a Cloudinary con los params firmados (sin preset público).
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', sig.apiKey);
    formData.append('timestamp', String(sig.timestamp));
    formData.append('signature', sig.signature);
    formData.append('upload_preset', sig.uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
      { method: 'POST', body: formData },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Fallo subiendo imagen (${response.status}): ${text || 'sin detalle'}`);
    }

    return (await response.json()) as CloudinaryUploadResponse;
  },

  getOptimizedUrl(publicIdOrUrl: string, width = 1200): string {
    if (!cloudName) return publicIdOrUrl;
    // Si ya es una URL completa, devolverla tal cual.
    if (publicIdOrUrl.startsWith('http')) return publicIdOrUrl;
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},f_auto,q_auto/${publicIdOrUrl}`;
  },

  /**
   * Aplica transformaciones in-flight a una URL existente de Cloudinary.
   * Devuelve la URL tal cual si no la podemos parsear (no rompe el render).
   *
   * Ejemplo de uso para logos del carrusel:
   *   transform(url, 'c_pad,h_80,w_240,b_transparent,f_auto,q_auto')
   */
  transform(url: string, transformation: string): string {
    if (!url) return url;
    // Marker que usa Cloudinary entre el host y el path con transformaciones.
    const MARKER = '/upload/';
    const idx = url.indexOf(MARKER);
    if (idx === -1) return url;
    const head = url.slice(0, idx + MARKER.length);
    const tail = url.slice(idx + MARKER.length);
    // Si ya existen transformaciones (no contiene 'v' o 'blog-posts' al inicio puro),
    // las reemplazamos solo si parecen una cadena de transform (contienen un comma + slash).
    const looksTransformed = /^[^/]+,/.test(tail);
    const cleanTail = looksTransformed ? tail.slice(tail.indexOf('/') + 1) : tail;
    return `${head}${transformation}/${cleanTail}`;
  },

  /**
   * URL canónica para logos del carrusel: canvas uniforme con padding transparente.
   * Si no es URL de Cloudinary, la devuelve sin transformar.
   */
  padLogoUrl(url: string, opts?: { h?: number; w?: number }): string {
    const h = opts?.h ?? 80;
    const w = opts?.w ?? 240;
    return cloudinaryService.transform(
      url,
      `c_pad,h_${h},w_${w},b_transparent,f_auto,q_auto`,
    );
  },
};
