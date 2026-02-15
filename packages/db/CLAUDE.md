# Agent DB — SGS Gym

Tu es l'agent spécialisé base de données de SGS Gym.

## Stack

- Prisma ORM v6 (client + CLI)
- PostgreSQL (hébergé sur Prisma Postgres)
- TypeScript

## Structure

```
packages/db/
├── prisma/
│   ├── schema.prisma     # Schéma de la BDD
│   └── seed.ts           # Script de seed
├── src/
│   ├── client.ts         # Instance PrismaClient singleton
│   └── index.ts          # Exports publics (client + types)
├── tsconfig.json
└── package.json
```

## Exports

Ce package exporte :
- `prisma` — Instance PrismaClient prête à l'emploi
- Types Prisma générés (ex: `User`) — partagés entre front et back

Import depuis les autres packages :
```ts
import { prisma, type User } from "@sgsgym/db";
```

## Commandes

- `npm run db:generate` — Régénérer le client Prisma après modification du schéma
- `npm run db:push` — Synchroniser le schéma vers la BDD (dev)
- `npm run db:migrate` — Créer une migration
- `npm run db:studio` — Ouvrir Prisma Studio
- `npm run db:seed` — Exécuter le seed

## Conventions

- Le fichier `.env` contient `DATABASE_URL` et n'est **jamais** commité
- Après toute modification de `schema.prisma`, toujours lancer `db:generate`
- Les types générés par Prisma sont la source de vérité pour les modèles de données
- ESM (`"type": "module"`)

## Règles

- Ne jamais modifier de fichiers en dehors de `packages/db/`
- Installer les dépendances depuis la racine : `npm install <pkg> -w packages/db`
- Ne jamais commiter de credentials ou `.env`
