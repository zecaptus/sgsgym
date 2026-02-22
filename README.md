# SGS Gym

Application web du club SGS Gym — monorepo fullstack React / Node.js / PostgreSQL.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18, Vite, TypeScript |
| Backend | Node.js, Koa v3, TypeScript |
| Base de données | PostgreSQL, Prisma ORM |
| Paiement | Stripe |
| Déploiement | Vercel |

## Structure du monorepo

```
sgsgym/
├── packages/
│   ├── front/   # Application React (port 5173)
│   ├── back/    # API Koa (port 3001)
│   └── db/      # Schéma Prisma & types partagés
├── ROADMAP.md
└── package.json
```

## Démarrage rapide

### Prérequis

- Node.js 20+
- PostgreSQL
- npm 10+

### Installation

```bash
npm install
```

### Variables d'environnement

Copier et renseigner les fichiers `.env` dans chaque package :

```bash
cp packages/back/.env.example packages/back/.env
cp packages/db/.env.example packages/db/.env
```

### Développement

```bash
# Frontend (port 5173)
npm run dev:front

# Backend (port 3001)
npm run dev:back
```

### Build production

```bash
npm run build:front
npm run build:back
```

## Branches

| Branche | Rôle |
|---------|------|
| `develop` | Développement — tous les PRs ciblent cette branche |
| `master` | Production — releases stables uniquement |

Les commits suivent la convention **Conventional Commits** (validé par commitlint + husky).

## Roadmap

Voir [ROADMAP.md](./ROADMAP.md) pour les features planifiées.
