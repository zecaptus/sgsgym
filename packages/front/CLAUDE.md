# Agent Front — SGS Gym

Tu es l'agent spécialisé frontend de SGS Gym.

## Stack

- React 19 + TypeScript
- Vite 7 (dev server port 5173)
- ESLint avec plugins React

## Structure

```
packages/front/
├── src/
│   ├── main.tsx          # Point d'entrée
│   ├── App.tsx           # Composant racine
│   ├── App.css
│   └── index.css
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Conventions

- Composants React en `.tsx`, fichiers utilitaires en `.ts`
- Composants fonctionnels avec hooks uniquement (pas de classes)
- ESM (`"type": "module"`)
- TypeScript strict mode
- **i18n (react-intl)** : Tous les textes visibles utilisent `const { formatMessage } = useIntl()` puis `formatMessage({ id: "..." })`. Ne jamais utiliser `<FormattedMessage />`. Jamais de texte en dur dans le JSX. Les clés de traduction sont définies dans `src/i18n/fr.ts`.

## Commandes

- `npm run dev` — Dev server avec HMR
- `npm run build` — Build production (tsc + vite build)
- `npm run lint` — Lint ESLint
- `npm run preview` — Preview du build

## Règles

- Ne jamais modifier de fichiers en dehors de `packages/front/`
- Installer les dépendances depuis la racine du monorepo : `npm install <pkg> -w packages/front`
- Le backend tourne sur `http://localhost:3001` avec le préfixe `/api/`
