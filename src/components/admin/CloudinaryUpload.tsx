import { useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { cloudinaryService, isCloudinaryConfigured } from '../../lib/cloudinary';

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function CloudinaryUpload({ value, onChange, label = 'Imagen destacada' }: CloudinaryUploadProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const pick = () => fileInput.current?.click();

  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!isCloudinaryConfigured) {
      toast.error('Cloudinary no está configurado. Revisá .env (ver SETUP.md).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen supera 5MB.');
      return;
    }
    if (!/^image\/(jpe?g|png|webp|gif)$/.test(file.type)) {
      toast.error('Formato no soportado. Usá jpg, png, webp o gif.');
      return;
    }

    setUploading(true);
    try {
      const res = await cloudinaryService.uploadImage(file);
      onChange(res.secure_url);
      toast.success('Imagen subida.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al subir la imagen.');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
        {label}
      </span>

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <img src={value} alt="Imagen destacada" className="h-56 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent p-3">
            <button
              type="button"
              onClick={pick}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
              disabled={uploading}
            >
              {uploading ? 'Subiendo…' : 'Cambiar'}
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-200 backdrop-blur hover:bg-red-500/30"
            >
              <Trash2 className="h-3.5 w-3.5" /> Quitar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={pick}
          disabled={uploading}
          className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-white/55 transition hover:border-secondary/40 hover:bg-white/[0.04] hover:text-white disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-secondary" />
              <span className="text-sm">Subiendo a Cloudinary…</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-7 w-7" />
              <span className="text-sm">
                <Upload className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
                Subir imagen destacada
              </span>
              <span className="text-xs text-white/40">jpg, png, webp · máx 5MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
