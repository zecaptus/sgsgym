# SGS Gym

Monorepo pour l'application SGS Gym.

## Architecture

- **Monorepo npm workspaces** avec les packages dans `packages/`
- `packages/front` — Application frontend React + Vite + TypeScript
- `packages/back` — API backend Node.js + Koa v3 + TypeScript
- `packages/db` — Base de données Prisma + PostgreSQL (types partagés)

## Scripts racine

- `npm run dev:front` — Lance le dev server Vite (port 5173)
- `npm run dev:back` — Lance le serveur Koa avec hot-reload (port 3001)
- `npm run build:front` — Build production du front
- `npm run build:back` — Compilation TypeScript du back

## Git

- **Branche principale de développement** : `develop` — tous les commits et PRs se font sur cette branche
- **Branche de production** : `master` — réservée aux releases stables

## Conventions

- **Langue** : Le code (variables, fonctions, commentaires) est en anglais
- **Type** : ESM (`"type": "module"`) dans tous les packages
- **TypeScript** : Strict mode activé partout
- Les dépendances s'installent depuis la racine avec `npm install`
- Chaque package a son propre `tsconfig.json`

## Agents spécialisés

Lors du travail sur ce projet, utiliser les agents appropriés :
- **Agent Front** : Pour tout ce qui concerne `packages/front` — voir `packages/front/CLAUDE.md`
- **Agent Back** : Pour tout ce qui concerne `packages/back` — voir `packages/back/CLAUDE.md`
- **Agent DB** : Pour tout ce qui concerne `packages/db` (schéma, migrations, Prisma) — voir `packages/db/CLAUDE.md`
