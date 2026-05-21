import { useCallback, useEffect, useRef } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import toast from 'react-hot-toast';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Code2,
  Undo, Redo, Loader2,
} from 'lucide-react';
import { cloudinaryService, isCloudinaryConfigured } from '../../lib/cloudinary';
import { cn } from '../../utils/cn';

const lowlight = createLowlight(common);
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);
lowlight.register('python', python);
lowlight.register('sql', sql);

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TipTapEditor({ value, onChange, placeholder }: TipTapEditorProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full h-auto my-4' } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-secondary-300 underline hover:text-secondary' },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder ?? 'Empezá a escribir tu artículo…' }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px]',
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  // Si el value cambia desde afuera (p.ej. carga inicial async), sincronizamos.
  useEffect(() => {
    if (!editor) return;
    if (value && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const insertImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      if (!isCloudinaryConfigured) {
        toast.error('Cloudinary no está configurado. Revisá .env.');
        return;
      }
      const id = toast.loading('Subiendo imagen…');
      try {
        const res = await cloudinaryService.uploadImage(file);
        editor.chain().focus().setImage({ src: res.secure_url, alt: file.name }).run();
        toast.success('Imagen insertada.', { id });
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Error al subir.', { id });
      }
    },
    [editor],
  );

  if (!editor) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        <Loader2 className="h-6 w-6 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <Toolbar
        editor={editor}
        onPickImage={() => fileInput.current?.click()}
      />
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void insertImage(f);
          if (fileInput.current) fileInput.current.value = '';
        }}
      />
      <div className="tiptap-editor p-4 sm:p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

interface ToolbarProps {
  editor: Editor;
  onPickImage: () => void;
}

function Toolbar({ editor, onPickImage }: ToolbarProps) {
  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL del enlace:', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-primary/40 p-2">
      <Group>
        <Btn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} label="Negrita">
          <Bold className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} label="Cursiva">
          <Italic className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} label="Subrayado">
          <UnderlineIcon className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} label="Tachado">
          <Strikethrough className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} label="Código inline">
          <Code className="h-4 w-4" />
        </Btn>
      </Group>

      <Group>
        <Btn active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="H1">
          <Heading1 className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="H2">
          <Heading2 className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} label="H3">
          <Heading3 className="h-4 w-4" />
        </Btn>
      </Group>

      <Group>
        <Btn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} label="Lista">
          <List className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="Lista numerada">
          <ListOrdered className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="Cita">
          <Quote className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Separador">
          <Minus className="h-4 w-4" />
        </Btn>
      </Group>

      <Group>
        <Btn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} label="Izquierda">
          <AlignLeft className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} label="Centrado">
          <AlignCenter className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} label="Derecha">
          <AlignRight className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} label="Justificado">
          <AlignJustify className="h-4 w-4" />
        </Btn>
      </Group>

      <Group>
        <Btn active={editor.isActive('link')} onClick={setLink} label="Enlace">
          <LinkIcon className="h-4 w-4" />
        </Btn>
        <Btn onClick={onPickImage} label="Insertar imagen">
          <ImageIcon className="h-4 w-4" />
        </Btn>
        <Btn active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} label="Bloque de código">
          <Code2 className="h-4 w-4" />
        </Btn>
      </Group>

      <Group last>
        <Btn onClick={() => editor.chain().focus().undo().run()} label="Deshacer" disabled={!editor.can().undo()}>
          <Undo className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} label="Rehacer" disabled={!editor.can().redo()}>
          <Redo className="h-4 w-4" />
        </Btn>
      </Group>
    </div>
  );
}

function Group({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn('flex items-center gap-0.5', !last && 'border-r border-white/10 pr-1.5 mr-1.5')}>
      {children}
    </div>
  );
}

interface BtnProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}

function Btn({ onClick, active, disabled, label, children }: BtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={disabled}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition',
        'hover:bg-white/10 hover:text-white',
        active && 'bg-secondary/20 text-secondary-200 ring-1 ring-secondary/30',
        disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent hover:text-white/70',
      )}
    >
      {children}
    </button>
  );
}
