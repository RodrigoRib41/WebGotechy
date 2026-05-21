import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({ value, onChange, placeholder = 'Agregar tag y Enter', maxTags = 10 }: TagInputProps) {
  const [draft, setDraft] = useState('');

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase();
    if (!tag) return;
    if (value.includes(tag)) return;
    if (value.length >= maxTags) return;
    onChange([...value, tag]);
    setDraft('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === 'Backspace' && !draft && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-secondary-200 ring-1 ring-secondary/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Quitar ${tag}`}
              className="text-secondary-200/70 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 bg-transparent px-2 py-1 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
    </div>
  );
}
