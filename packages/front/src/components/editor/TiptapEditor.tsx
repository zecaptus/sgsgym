import { useRef, useEffect, useCallback } from "react";

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ content, onChange, placeholder }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialise the content on first mount only
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content ?? "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const exec = useCallback(
    (cmd: string, value?: string) => {
      document.execCommand(cmd, false, value);
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput],
  );

  const handleHeading = (tag: string) => {
    document.execCommand("formatBlock", false, tag);
    editorRef.current?.focus();
    handleInput();
  };

  const handleImageUpload = useCallback(
    async (file: File) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        const [prefix, data] = dataUrl.split(",");
        const mimeType = prefix.match(/:(.*?);/)?.[1] ?? "image/jpeg";

        const res = await fetch("/api/blog/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ mimeType, data }),
        });

        if (!res.ok) return;
        const { url } = (await res.json()) as { url: string };
        document.execCommand("insertImage", false, url);
        handleInput();
      };
      reader.readAsDataURL(file);
    },
    [handleInput],
  );

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-600 bg-gray-700">
        <ToolBtn title="Gras" onClick={() => exec("bold")}>
          <strong>B</strong>
        </ToolBtn>
        <ToolBtn title="Italique" onClick={() => exec("italic")}>
          <em>I</em>
        </ToolBtn>
        <ToolBtn title="Barré" onClick={() => exec("strikeThrough")}>
          <s>S</s>
        </ToolBtn>
        <Sep />
        <ToolBtn title="Titre 2" onClick={() => handleHeading("h2")}>
          H2
        </ToolBtn>
        <ToolBtn title="Titre 3" onClick={() => handleHeading("h3")}>
          H3
        </ToolBtn>
        <ToolBtn title="Paragraphe" onClick={() => handleHeading("p")}>
          ¶
        </ToolBtn>
        <Sep />
        <ToolBtn title="Liste à puces" onClick={() => exec("insertUnorderedList")}>
          • —
        </ToolBtn>
        <ToolBtn title="Liste numérotée" onClick={() => exec("insertOrderedList")}>
          1.
        </ToolBtn>
        <Sep />
        <ImageBtn onFile={handleImageUpload} />
        <Sep />
        <ToolBtn
          title="Annuler"
          onClick={() => {
            document.execCommand("undo");
            handleInput();
          }}
        >
          ↩
        </ToolBtn>
        <ToolBtn
          title="Rétablir"
          onClick={() => {
            document.execCommand("redo");
            handleInput();
          }}
        >
          ↪
        </ToolBtn>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder ?? "Rédigez votre article…"}
        className="prose prose-invert max-w-none p-4 min-h-64 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 empty:before:pointer-events-none"
      />
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault(); // keep editor focus
        onClick();
      }}
      className="px-2 py-1 rounded text-sm font-mono text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
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
