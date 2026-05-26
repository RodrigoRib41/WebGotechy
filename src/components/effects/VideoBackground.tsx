import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Props = {
  /** WebM (preferido por size). */
  webm?: string;
  /** MP4 (fallback universal). */
  mp4: string;
  /** Poster mientras carga / si el video falla. */
  poster?: string;
  /** Opacidad del video (overlay oscuro se controla aparte). */
  opacity?: number;
  className?: string;
};

/**
 * Video de fondo full-cover con fade-in al cargar.
 * Si el video no existe o falla, queda invisible y el gradient de fondo del
 * contenedor padre se ve sin alterarse (degrada limpio). Respeta
 * prefers-reduced-motion: muestra solo el póster.
 */
export function VideoBackground({
  webm,
  mp4,
  poster,
  opacity = 0.5,
  className = '',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onReady = () => setReady(true);
    const onError = () => setFailed(true);
    v.addEventListener('loadeddata', onReady);
    v.addEventListener('error', onError);
    return () => {
      v.removeEventListener('loadeddata', onReady);
      v.removeEventListener('error', onError);
    };
  }, []);

  if (reduced) {
    if (!poster) return null;
    return (
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{ opacity }}
      />
    );
  }

  if (failed) return null;

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${className}`}
      style={{ opacity: ready ? opacity : 0 }}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
