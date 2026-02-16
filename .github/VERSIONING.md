# Stratégie de Versioning — SGS Gym

> Workflow de releases et gestion des versions du projet.

## Semantic Versioning

Le projet suit [SemVer](https://semver.org/) : `MAJOR.MINOR.PATCH`

- Version initiale : **`1.0.0`**

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
- **CI** : Tag automatique `x.x.x-alpha.0`

### 2. Phase Alpha — Stabilisation

Sur la branche `release/x.x.x`, on ne fait que des **bugfixes et polish** :

```
release/x.x.x
  ├── fix: correct validation       → tag x.x.x-alpha.1
  ├── fix: handle edge case         → tag x.x.x-alpha.2
  └── fix: update translations      → tag x.x.x-alpha.3
```

- **CI** : Chaque push sur la branche release incrémente le tag alpha automatiquement
- **Aucune nouvelle feature** n'est ajoutée pendant cette phase
- `develop` continue d'avancer en parallèle pour la prochaine version

### 3. Phase RC — Release Candidate

Quand l'alpha est jugée suffisamment stable, on passe en RC :

```
release/x.x.x
  └── tag x.x.x-rc.0 (déclenché manuellement ou via label/commit convention)
      ├── fix: last minute fix      → tag x.x.x-rc.1
      └── fix: final polish         → tag x.x.x-rc.2
```

- La phase RC signifie **feature complete** : on ne fait plus que du bugfix critique
- **CI** : Chaque push après le passage en RC incrémente le tag RC automatiquement
- Passage alpha → RC déclenché par un **workflow dispatch manuel** ou un commit avec le préfixe `rc:`

### 4. Release stable

Quand la RC est validée :

```
release/x.x.x ──→ merge sur master
                   tag x.x.x (stable)
```

- **CI** : Tag définitif `x.x.x` créé automatiquement au merge sur `master`
- **CI** : Changelog généré automatiquement depuis les Conventional Commits
- **Vercel** : Déploiement automatique déclenché par le merge sur `master`
- Backmerge : `master` est mergé dans `develop` pour récupérer les fixes
- La branche `release/x.x.x` est supprimée

### 5. Hotfix (urgences production)

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
master:    ──────────────────────── M ──────────────────────────── M ───
                                   ↑                              ↑
release:            r/1.0.0 ───────┘            r/1.1.0 ──────────┘
                    ↑  α.0 → α.1 → rc.0        ↑  α.0 → α.1 → rc.0 → rc.1
                    │                           │
develop:   ── • ── • ── • ── • ── • ── • ── • ── • ── • ── • ──
               ↑       ↑         ↑
feature:    feat/a  feat/b    feat/c
```

## Tags

| Format | Signification | Exemple |
|--------|--------------|---------|
| `x.x.x-alpha.N` | Pré-release en stabilisation | `1.0.0-alpha.3` |
| `x.x.x-rc.N` | Release candidate, feature complete | `1.0.0-rc.1` |
| `x.x.x` | Release stable | `1.0.0` |

## Automatisation CI (GitHub Actions)

### Workflow 1 : `release-alpha.yml`
- **Trigger** : Push sur `release/*`
- **Action** : Détecte le dernier tag alpha/rc, incrémente et crée le tag suivant
- **Logique** : Si en phase RC → incrémente RC, sinon → incrémente alpha

### Workflow 2 : `release-rc.yml`
- **Trigger** : Workflow dispatch manuel
- **Action** : Crée le tag `x.x.x-rc.0` pour marquer le passage en RC

### Workflow 3 : `release-stable.yml`
- **Trigger** : Push/merge sur `master`
- **Action** : Crée le tag stable `x.x.x` + génère le changelog

### Changelog
- Généré automatiquement via `conventional-changelog` à partir des Conventional Commits
- Fichier `CHANGELOG.md` mis à jour à chaque release stable
- Contenu aussi publié dans la GitHub Release associée au tag

## Déploiement

- **Production** : Vercel déploie automatiquement au merge sur `master`
- Aucune action CI supplémentaire nécessaire pour le déploiement
