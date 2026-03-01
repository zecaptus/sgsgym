import { useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import type { JSONContent } from "@tiptap/core";

interface TiptapEditorProps {
  content: JSONContent | null;
  onChange: (json: JSONContent) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? "Rédigez votre article…" }),
    ],
    content: content ?? undefined,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor) return;
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/blog/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) return;
      const { url } = (await res.json()) as { url: string };
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-600 bg-gray-700">
        <ToolBtn
          title="Gras"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolBtn>
        <ToolBtn
          title="Italique"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </ToolBtn>
        <ToolBtn
          title="Barré"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </ToolBtn>
        <Sep />
        <ToolBtn
          title="Titre 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolBtn>
        <ToolBtn
          title="Titre 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolBtn>
        <Sep />
        <ToolBtn
          title="Liste à puces"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • —
        </ToolBtn>
        <ToolBtn
          title="Liste numérotée"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </ToolBtn>
        <Sep />
        <ToolBtn
          title="Citation"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &ldquo;
        </ToolBtn>
        <ToolBtn
          title="Code"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          {"</>"}
        </ToolBtn>
        <Sep />
        <ImageBtn onFile={handleImageUpload} />
        <LinkBtn
          active={editor.isActive("link")}
          onLink={(url) => {
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            } else {
              editor.chain().focus().unsetLink().run();
            }
          }}
        />
        <Sep />
        <ToolBtn
          title="Annuler"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          ↩
        </ToolBtn>
        <ToolBtn
          title="Rétablir"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          ↪
        </ToolBtn>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-64 [&_.tiptap]:outline-none [&_.tiptap.is-editor-empty::before]:content-[attr(data-placeholder)] [&_.tiptap.is-editor-empty::before]:text-gray-500 [&_.tiptap.is-editor-empty::before]:pointer-events-none [&_.tiptap.is-editor-empty::before]:float-left [&_.tiptap.is-editor-empty::before]:h-0"
      />
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  title,
  active,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`px-2 py-1 rounded text-sm font-mono transition-colors ${
        disabled
          ? "text-gray-600 cursor-not-allowed"
          : active
            ? "bg-gray-500 text-white"
            : "text-gray-300 hover:bg-gray-600 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px bg-gray-500 mx-1 self-stretch" />;
}

function ImageBtn({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <ToolBtn title="Insérer une image" onClick={() => inputRef.current?.click()}>
        IMG
      </ToolBtn>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
    </>
  );
}

function LinkBtn({ active, onLink }: { active: boolean; onLink: (url: string | null) => void }) {
  return (
    <ToolBtn
      title="Lien"
      active={active}
      onClick={() => {
        if (active) {
          onLink(null);
          return;
        }
        const url = window.prompt("URL du lien :");
        if (url) onLink(url);
      }}
    >
      🔗
    </ToolBtn>
  );
}
