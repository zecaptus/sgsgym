# Stratégie de Versioning — SGS Gym

> Document de réflexion — workflow de releases et gestion des versions.

## Semantic Versioning

Le projet suit [SemVer](https://semver.org/) : `MAJOR.MINOR.PATCH`

| Segment | Quand l'incrémenter |
|---------|---------------------|
| MAJOR   | Breaking changes (API incompatible, refonte majeure) |
| MINOR   | Nouvelle fonctionnalité rétrocompatible |
| PATCH   | Correction de bug rétrocompatible |

## Branches

```
master          ← releases stables uniquement (tags x.x.x)
develop         ← développement quotidien
release/x.x.x  ← stabilisation avant release
hotfix/x.x.x   ← correctifs urgents en production
feature/*       ← développement de fonctionnalités
fix/*           ← corrections de bugs
```

## Cycle de vie d'une release

### 1. Décision de release

Quand `develop` est jugé prêt pour une nouvelle version :

```
develop ─── PR ou merge ──→ release/x.x.x
```

- Créer la branche `release/x.x.x` depuis `develop`
- Tag automatique : `x.x.x-alpha.0`

### 2. Phase Alpha — Stabilisation

Sur la branche `release/x.x.x`, on ne fait que des **bugfixes et polish** :

```
release/x.x.x
  ├── fix: correct validation       → tag x.x.x-alpha.1
  ├── fix: handle edge case         → tag x.x.x-alpha.2
  └── fix: update translations      → tag x.x.x-alpha.3
```

- Chaque commit/merge sur la branche release incrémente le compteur alpha
- **Aucune nouvelle feature** n'est ajoutée pendant cette phase
- `develop` continue d'avancer en parallèle pour la prochaine version

### 3. Release stable

Quand la branche release est jugée stable :

```
release/x.x.x ──→ merge sur master
                   tag x.x.x (stable)
```

- Merge de `release/x.x.x` dans `master`
- Tag définitif : `x.x.x`
- Backmerge : `master` est mergé dans `develop` pour récupérer les fixes
- La branche `release/x.x.x` est supprimée

### 4. Hotfix (urgences production)

Pour un bug critique en production :

```
master ──→ hotfix/x.x.x ──→ merge sur master (tag x.x.x)
                             merge sur develop
```

- Branche créée depuis `master`
- Fix appliqué, tag patch
- Merge dans `master` ET `develop`

## Schéma complet

```
master:    ─────────────────── M ──────────────── M ───
                              ↑                   ↑
release:            r/1.0.0 ──┘         r/1.1.0 ──┘
                    ↑  α.0 → α.1        ↑  α.0 → α.1 → α.2
                    │                    │
develop:   ── • ── • ── • ── • ── • ── • ── • ── • ── • ──
               ↑       ↑         ↑
feature:    feat/a  feat/b    feat/c
```

## Tags

| Format | Signification | Exemple |
|--------|--------------|---------|
| `x.x.x-alpha.N` | Pré-release en stabilisation | `1.2.0-alpha.3` |
| `x.x.x` | Release stable | `1.2.0` |

## Questions ouvertes

- [ ] **Phase RC ?** — Ajouter une étape `x.x.x-rc.N` entre alpha et stable ? Utile si l'équipe grandit et qu'on veut un cycle de validation plus formel.
- [ ] **Changelog automatique ?** — Utiliser `conventional-changelog` ou `release-please` pour générer le changelog à partir des Conventional Commits.
- [ ] **Automatisation CI ?** — GitHub Actions pour créer les tags automatiquement à chaque push sur `release/*` et au merge sur `master`.
- [ ] **Numéro de version initial ?** — Partir de `0.1.0` (pré-v1) ou `1.0.0` ?
- [ ] **Déploiement auto ?** — Déclencher un déploiement automatique sur merge dans `master` ?
