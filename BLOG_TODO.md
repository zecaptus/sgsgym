# Blog Feature — Travaux restants

Ce document liste les points bloquants et les tâches restantes avant de merger cette branche sur `develop`.

## État des lieux

### Fait ✅

| Zone | Détail |
|------|--------|
| **DB** | Modèles `Category` et `BlogPost` ajoutés au schéma Prisma |
| **DB** | Rôle `EDITOR` et permissions blog (`blog:read`, `blog:write`, `blog:delete`) |
| **DB** | Fichier de migration `0002_blog` créé |
| **Back** | Routes CRUD pour les articles (`/api/blog/posts`) |
| **Back** | Routes CRUD pour les catégories (`/api/blog/categories`) |
| **Back** | Route d'upload d'images (`/api/blog/upload`) — utilise `@koa/multer` |
| **Back** | Routes enregistrées dans `index.ts` |
| **Front** | Service `blog.ts` (appels API) |
| **Front** | Pages admin : liste, création, édition, catégories |
| **Front** | Pages publiques : liste articles, détail article |
| **Front** | Composant `TiptapEditor` (éditeur WYSIWYG basique) |
| **Front** | Navigation admin et publique mise à jour |
| **Front** | Traductions i18n ajoutées |

---

## Bloquants 🚧

### 1. Migration Prisma à appliquer

La migration `0002_blog` a été créée mais **pas encore appliquée** en base.

```bash
cd packages/db
npx prisma migrate dev --name blog
```

> À faire en local ou en CI avant le démarrage du serveur.

---

### 2. Éditeur Tiptap à réécrire avec l'API v3

Le composant `packages/front/src/components/editor/TiptapEditor.tsx` est actuellement implémenté avec `contentEditable` + `document.execCommand` (API dépréciée). Il faut le réécrire pour utiliser la librairie Tiptap v3 installée (`@tiptap/react ^3.20.0`).

**Ce qu'il faut faire :**

```tsx
// Remplacer l'implémentation actuelle par :
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

export default function TiptapEditor({ content, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? "Rédigez votre article…" }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return <EditorContent editor={editor} />;
}
```

> La toolbar devra utiliser `editor.chain().focus().toggleBold().run()` etc.

---

### 3. Upload d'images dans l'éditeur

Le backend (`blogUpload.ts`) accepte actuellement du JSON base64 (`{ mimeType, data }`). Il faudrait migrer vers un vrai `multipart/form-data` pour utiliser `@koa/multer` correctement :

- Back : remplacer le parsing JSON par `multer.single("file")`
- Front : envoyer un `FormData` depuis l'extension Image de Tiptap

---

### 4. Types `@koa/multer` et `koa-static`

Les types `@types/koa__multer` et `@types/koa-static` ont été installés sur `develop`. Vérifier que le back compile sans erreurs :

```bash
npm run build:back
```

---

## Optionnel / Améliorations futures

- [ ] Pagination côté back (`limit` / `offset` déjà pris en charge partiellement)
- [ ] Recherche fulltext sur les articles
- [ ] Upload d'image de couverture (champ `coverImage` présent en DB)
- [ ] Prévisualisation de l'article avant publication
- [ ] Planification de publication (champ `publishedAt` présent en DB)
