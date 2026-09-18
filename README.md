# Portfolio Cybersécurité

Site personnel : portfolio de projets, formations/TP pour débutants en
cybersécurité, et une section dédiée à la cybersécurité (recherches
personnelles + veille sur l'actualité). Une section Forum est prévue mais
pas encore développée (voir [Prochaines étapes](#prochaines-étapes)).

## Choix technologiques

| Choix | Pourquoi |
|---|---|
| **Next.js 16 (App Router) + TypeScript** | Framework développé par Vercel, donc parfaitement intégré à son hébergement gratuit. Gère à la fois des pages statiques (rapides, gratuites) et, plus tard, des routes serverless si besoin (API du forum, etc.). TypeScript apporte des types qui évitent des bugs bêtes (champ oublié dans un article, etc.). |
| **Tailwind CSS v4** | Style directement dans les composants, pas de gros fichiers CSS séparés à maintenir. La palette de couleurs est centralisée dans `src/app/globals.css`. |
| **Contenu en Markdown versionné (`/content`)** | Pas de base de données pour l'instant : chaque projet/formation/article est un simple fichier `.md`. Gratuit, versionné avec Git (historique clair), et modifiable sans interface d'admin. Voir [Ajouter du contenu](#ajouter-du-contenu). |
| **Vercel (hébergement)** | Déploiement automatique à chaque `git push`, généreux plan gratuit, HTTPS et nom de domaine `*.vercel.app` inclus. |

Pas de base de données pour l'instant : c'est un choix assumé pour rester
simple et gratuit tant que le contenu est en lecture seule. Le jour où le
forum sera développé, il faudra une vraie base de données (voir plus bas).

## Structure du projet

```
content/                 # Tout le contenu éditorial, en Markdown
  portfolio/*.md          # Un fichier = un projet
  formations/*.md         # Un fichier = un TP / une formation
  recherches/*.md         # Un fichier = une recherche personnelle
  veille/*.md              # Un fichier = un résumé d'article de presse

src/
  app/                    # Routes du site (App Router de Next.js)
    layout.tsx             # Structure commune à toutes les pages (header/footer)
    page.tsx                # Page d'accueil
    portfolio/               # /portfolio et /portfolio/[slug]
    formations/               # /formations et /formations/[slug]
    cybersecurite/              # /cybersecurite (hub)
      recherches/                # /cybersecurite/recherches et [slug]
      veille/                     # /cybersecurite/veille et [slug]
    forum/                    # /forum (page d'attente pour l'instant)
    globals.css              # Couleurs et styles de base du site

  components/             # Composants React réutilisés entre les pages
  lib/
    content.ts              # Fonctions qui lisent et parsent les fichiers Markdown
    types.ts                 # Types TypeScript du frontmatter de chaque section
    format.ts                 # Petites fonctions utilitaires (formatage de date)

  site.config.ts          # Nom du site, liens de nav, réseaux sociaux — à personnaliser
```

## Ajouter du contenu

Chaque section correspond à un dossier dans `content/`. Pour ajouter un
élément, créer un nouveau fichier `.md` dans le bon dossier avec le
frontmatter attendu (voir les fichiers d'exemple déjà présents pour le
modèle exact) :

- `content/portfolio/mon-projet.md` — champs : `title`, `description`,
  `date`, `tags`, `lienDemo` (optionnel), `lienDepot` (optionnel).
- `content/formations/mon-tp.md` — champs : `title`, `description`,
  `date`, `niveau` (`Débutant` / `Intermédiaire` / `Avancé`), `duree`
  (optionnel), `tags`.
- `content/recherches/ma-recherche.md` — champs : `title`, `description`,
  `date`, `tags`.
- `content/veille/mon-resume.md` — champs : `title`, `description`,
  `date`, `sourceNom`, `sourceUrl`, `tags`. **Toujours résumer avec ses
  propres mots et ne jamais copier le texte de l'article original** —
  seul un lien vers la source est publié (droit d'auteur).

Le nom du fichier (sans `.md`) devient l'URL de la page (le "slug"). Une
fois le fichier ajouté et poussé sur GitHub, Vercel régénère
automatiquement le site avec le nouveau contenu.

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

`npm run build` construit la version de production (c'est ce que Vercel
exécute à chaque déploiement) ; `npm run lint` vérifie la qualité du code.

## Déploiement sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com) (connexion possible
   directement avec le compte GitHub).
2. "Add New… > Project", puis sélectionner ce dépôt GitHub.
3. Vercel détecte automatiquement Next.js — aucune configuration
   nécessaire. Cliquer sur "Deploy".
4. À chaque `git push` sur la branche principale, Vercel redéploie
   automatiquement le site (aperçu automatique aussi sur les autres
   branches/pull requests).

Ce projet n'utilise aucune variable d'environnement pour l'instant (pas de
clé API, pas de base de données) : aucune configuration supplémentaire
n'est nécessaire côté Vercel.

## Sécurité automatisée (CI)

Trois workflows GitHub Actions s'exécutent automatiquement à chaque `push`
et `pull_request` vers `master` (et chaque semaine par sécurité), sans
action manuelle. Les résultats apparaissent dans l'onglet **Security >
Code scanning** du dépôt GitHub.

| Fichier | Rôle | Outil |
|---|---|---|
| `.github/workflows/codeql.yml` | SAST général : analyse le code source à la recherche de failles (injection, mauvaise gestion des entrées, etc.) | [CodeQL](https://codeql.github.com/) (natif GitHub, gratuit) |
| `.github/workflows/security.yml` → job `sca-dependances` | Analyse de composants (SCA) : vérifie les bibliothèques tierces installées | `npm audit` |
| `.github/workflows/security.yml` → job `owasp-semgrep` | Scan ciblé sur les 10 catégories de l'[OWASP Top 10](https://owasp.org/www-project-top-ten/) | [Semgrep](https://semgrep.dev/) (règles publiques `p/owasp-top-ten`) |
| `.github/workflows/security.yml` → job `secrets-gitleaks` | Détecte les secrets (clés API, mots de passe) commités par erreur, y compris dans l'historique Git | [Gitleaks](https://github.com/gitleaks/gitleaks) |
| `.github/dependabot.yml` | Ouvre automatiquement une Pull Request quand une dépendance (ou une action GitHub) a une mise à jour de sécurité disponible | [Dependabot](https://docs.github.com/code-security/dependabot) (natif GitHub) |

Chaque fichier de workflow est commenté en détail : voir directement dans
`.github/` pour comprendre chaque étape.

**Pourquoi plusieurs outils plutôt qu'un seul ?** Ils ne couvrent pas la
même surface : CodeQL suit les flux de données dans la logique du code,
Semgrep applique des règles ciblées OWASP, `npm audit`/Dependabot
regardent les dépendances tierces, Gitleaks regarde les secrets. C'est la
combinaison qui donne une couverture correcte, pas un seul outil isolé.

**Pour vérifier que tout tourne** : après le premier push, aller dans
l'onglet **Actions** du dépôt GitHub — les workflows "SAST - CodeQL" et
"Sécurité - dépendances, OWASP et secrets" doivent apparaître et passer au
vert (un premier scan CodeQL peut prendre quelques minutes de plus que les
suivants).

## Prochaines étapes (hors périmètre de ce premier scratch)

- **Forum** : nécessitera des comptes utilisateurs et une vraie base de
  données (ex. Postgres via Vercel Postgres/Neon, ou Supabase — les deux
  ont un plan gratuit). C'est un changement d'architecture volontairement
  reporté pour garder ce premier scratch simple.
- **Automatiser la veille** : un script qui va chercher des articles
  (RSS, API) et génère automatiquement un brouillon de résumé dans
  `content/veille/`, à relire avant publication.
- Remplir `src/site.config.ts` avec vos vraies informations (nom, liens
  GitHub/LinkedIn) et personnaliser la page d'accueil (`src/app/page.tsx`).
