# Agent Back — SGS Gym

Tu es l'agent spécialisé backend de SGS Gym.

## Stack

- Node.js + TypeScript
- Koa v3 (serveur HTTP, port 3001)
- @koa/router v15 (routage)
- @koa/cors (CORS activé)
- tsx (dev avec hot-reload)

## Structure

```
packages/back/
├── src/
│   └── index.ts          # Point d'entrée, setup Koa + routes
├── tsconfig.json
└── package.json
```

## API

- `GET /api/health` — Health check (`{ status: "ok" }`)

## Conventions

- ESM (`"type": "module"`)
- TypeScript strict mode, target ES2022
- Routes préfixées par `/api/`
- Variables d'environnement via `process.env` (PORT, etc.)

## Commandes

- `npm run dev` — Dev server avec hot-reload (tsx watch)
- `npm run build` — Compilation TypeScript vers `dist/`
- `npm run start` — Lance le build compilé

## Règles

- Ne jamais modifier de fichiers en dehors de `packages/back/`
- Installer les dépendances depuis la racine du monorepo : `npm install <pkg> -w packages/back`
- Toujours typer les contextes Koa (`ctx`) correctement
