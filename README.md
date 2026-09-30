# Portfolio Cybersécurité

Portfolio professionnel personnel, recentré sur 4 sections : **Accueil**,
**Projets**, **Formation & Certifications**, **Contact**. Les projets sont
la pièce maîtresse du site — pas de tutoriels pour d'autres, pas de veille
publique, pas de forum : un portfolio, pas une plateforme de contenu.

## Choix technologiques

| Choix | Pourquoi |
|---|---|
| **Next.js 16 (App Router) + TypeScript** | Framework développé par Vercel, donc parfaitement intégré à son hébergement gratuit. TypeScript apporte des types qui évitent des bugs bêtes (champ oublié dans une fiche projet, etc.). |
| **Tailwind CSS v4** | Style directement dans les composants, pas de gros fichiers CSS séparés à maintenir. La palette de couleurs (thème clair/sombre) est centralisée dans `src/app/globals.css`. |
| **Contenu en Markdown versionné (`/content`)** | Pas de base de données : chaque projet est un simple fichier `.md`. Gratuit, versionné avec Git (historique clair), modifiable sans interface d'admin. Voir [Ajouter un projet](#ajouter-un-projet). |
| **Vercel (hébergement)** | Déploiement automatique à chaque `git push`, plan gratuit, HTTPS et nom de domaine `*.vercel.app` inclus. |

## Structure du projet

```
content/
  portfolio/*.md          # Un fichier = un projet (voir "Ajouter un projet")
  veille/*.md              # Contenu généré par le pipeline de veille interne
                            # (voir plus bas) — pas de page publique pour l'instant

src/
  app/
    layout.tsx             # Structure commune (header/footer), script anti-flash du thème
    page.tsx                # Accueil
    portfolio/               # /portfolio (liste) et /portfolio/[slug] (fiche projet)
    formation/                # /formation (parcours + certifications, data.ts)
    contact/                  # /contact
    globals.css              # Thème clair/sombre, styles de base

  components/
    Reveal.tsx              # Animation d'apparition au scroll (IntersectionObserver)
    ThemeToggle.tsx          # Bouton de bascule clair/sombre
    ...                       # Container, Header, Footer, Tag, ContentCard, Prose...
  lib/
    content.ts              # Fonctions qui lisent et parsent les fichiers Markdown
    types.ts                 # Type du frontmatter des projets (PortfolioFrontmatter)
    format.ts                 # Petites fonctions utilitaires (formatage de date)

  site.config.ts          # Nom, titre, liens de contact — à personnaliser
```

## Ajouter un projet

Créer un fichier dans `content/portfolio/` (le nom du fichier, sans
`.md`, devient l'URL de la fiche). Frontmatter :

- `title`, `description` (résumé de 2-3 phrases, affiché en intro de la
  fiche et sur la carte de liste), `date` (sert au tri).
- `tags` (optionnel) — 2-4 tags thématiques courts affichés en haut de la
  fiche (ex. `["Pentest", "Red Team"]`).
- `stack` (optionnel) — liste complète des technologies utilisées,
  affichée en bandeau en bas de fiche.
- `lienDemo` / `lienDepot` (optionnels) — liens démo / dépôt de code.
- `images` / `pdf` / `video` (optionnels, réservés pour plus tard) — la
  page affiche une galerie, un lien de téléchargement ou un lien de démo
  vidéo si l'un de ces champs est renseigné, et n'affiche rien sinon.

Corps du fichier : une section `## Démarche` (le récit du projet) puis
`## Exemples de mise en pratique` (liste à puces concrète) — voir les 4
fiches existantes pour le modèle exact. Une fois poussé sur GitHub, Vercel
régénère automatiquement le site avec le nouveau projet.

## Pipeline de veille interne (sans page publique)

Ce pipeline reste actif en interne — c'est un point fort décrit dans la
fiche projet ["Site Portfolio Sécurisé"](content/portfolio/site-portfolio-securise.md)
— mais n'a plus de page publique dédiée depuis le recentrage du site sur
4 sections (voir plus haut). `content/veille/*.md` continue d'être généré
et versionné normalement ; il n'est simplement rendu sur aucune route pour
l'instant.

Un job planifié (`.github/workflows/veille-quotidienne.yml`) génère
automatiquement, une fois par jour, des brouillons de fiches pour
`content/veille/` :

1. Récupère les derniers articles de 5 flux RSS reconnus (The Hacker News,
   Krebs on Security, Dark Reading, CERT-FR avis et alertes — liste dans
   `scripts/veille/sources.mjs`) — uniquement le titre et l'extrait
   officiel fourni pour la syndication, jamais l'article complet.
2. Demande à un modèle de langage (Claude Haiku) de produire **deux textes
   distincts** à partir de cet extrait : un résumé factuel **court**
   (2-3 phrases, les faits) et une **analyse** originale (3-5 phrases :
   implications pour la défense, contexte technique) — jamais une copie
   du texte source, et jamais rédigés pour donner l'impression d'un
   article indépendant. L'analyse n'est pas une reformulation de l'article
   sous un autre angle : c'est un vrai commentaire, à s'approprier avant
   publication.
3. Écrit un fichier Markdown par nouvel article (maximum 6 par exécution),
   en ignorant automatiquement les articles déjà publiés (comparaison sur
   `sourceUrl`).
4. Ouvre une Pull Request avec ces brouillons.

**Aucune publication automatique directe** : la Pull Request générée doit
être relue (vérifier que chaque résumé est fidèle à l'article original,
ajuster si besoin) puis fusionnée manuellement, comme toute autre PR —
elle passe d'ailleurs par les 5 mêmes vérifications obligatoires (voir
[Sécurité automatisée](#sécurité-automatisée-ci)).

**Secrets à configurer** (Settings > Secrets and variables > Actions du
dépôt GitHub) pour que ce job fonctionne :

- `ANTHROPIC_API_KEY` — clé d'API utilisée pour générer les résumés. Un
  secret GitHub Actions n'est jamais réaffiché après sa création (même
  pas pour le propriétaire du dépôt) et n'apparaît nulle part dans le code
  public — le fait que le dépôt soit public n'expose donc pas la clé.
  N'est utilisé que par ce workflow (déclenché uniquement par
  planification/manuel), jamais accessible à une PR externe ni à
  Dependabot.
- `PAT_VEILLE` — un Personal Access Token *fine-grained*, limité à ce
  dépôt, avec les permissions "Contents" et "Pull requests" en écriture.
  Nécessaire car le jeton `GITHUB_TOKEN` fourni par défaut à un workflow
  ne peut pas déclencher les autres workflows (CodeQL, Semgrep...) sur la
  Pull Request qu'il crée lui-même (protection anti-boucle infinie de
  GitHub) — sans ce PAT, la PR resterait bloquée en attente de
  vérifications qui ne se lanceraient jamais.

Testable manuellement en local avec `ANTHROPIC_API_KEY=... npm run
veille:generate`, ou depuis GitHub via l'onglet Actions (`workflow_dispatch`).

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

`npm run build` construit la version de production (c'est ce que Vercel
exécute à chaque déploiement) ; `npm run lint` vérifie la qualité du code.

## Déploiement sur Vercel

Le dépôt GitHub est connecté à un projet Vercel (import fait une fois
depuis vercel.com). Vercel et GitHub Actions sont deux systèmes
**indépendants** qui réagissent chacun de leur côté aux mêmes événements
GitHub :

- Vercel construit et publie le site à chaque push (Preview pour une
  branche/PR, Production pour `master`).
- GitHub Actions fait tourner nos vérifications (voir plus bas).

Vercel ne sait pas si nos vérifications passent ou échouent — c'est la
protection de branche (section suivante) qui empêche du code non
vérifié d'atteindre `master`, et donc la Production.

Ce projet n'utilise aucune variable d'environnement pour l'instant (pas de
clé API, pas de base de données) : aucune configuration supplémentaire
n'est nécessaire côté Vercel.

## Comment contribuer (workflow obligatoire)

`master` est une branche **protégée** : il est impossible d'y pousser
directement, même pour le propriétaire du dépôt (vérifié en pratique : un
`git push origin master` direct est rejeté par GitHub avec l'erreur
`GH006: Protected branch update failed`). Tout changement, y compris un
petit, doit passer par une Pull Request :

```bash
git checkout -b ma-modification
# ... modifications ...
git add -A
git commit -m "Description du changement"
git push -u origin ma-modification
gh pr create   # ou depuis l'interface GitHub
```

La Pull Request ne peut être fusionnée dans `master` que si les 5
vérifications suivantes réussissent (visibles directement sur la PR) :

- `Build + lint`
- `Analyse CodeQL`
- `Analyse des dépendances (npm audit)`
- `Scan OWASP Top 10 (Semgrep)`
- `Détection de secrets (Gitleaks)`

Vercel crée aussi automatiquement un déploiement **Preview** pour la
branche/PR (lien affiché en commentaire sur la PR) : on peut donc visiter
la version de test avant de fusionner. Ce n'est qu'une fois la PR
fusionnée que Vercel republie la Production — jamais avant, jamais sur du
code qui n'a pas été vérifié.

Ce réglage est fait au niveau du dépôt GitHub (Settings > Branches), pas
dans le code du projet.

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
| `.github/workflows/build-and-lint.yml` | Filet de sécurité fonctionnel : vérifie que le site compile toujours et respecte le lint — pas un scan de sécurité, mais nécessaire pour ne pas fusionner une mise à jour de dépendance qui casse le site sans qu'aucun scan ne le remarque | `npm run build` + `npm run lint` |

Chaque fichier de workflow est commenté en détail : voir directement dans
`.github/` pour comprendre chaque étape.

Les actions utilisées (`actions/checkout`, `github/codeql-action`...) sont
épinglées sur un hash de commit précis plutôt que sur un tag mobile
(`@v4`), et `dependabot.yml` applique un délai ("cooldown") avant
d'appliquer une mise à jour de routine — deux mesures de durcissement de
la chaîne d'approvisionnement CI, elles-mêmes repérées comme manquantes
par le premier scan Semgrep lancé sur ce dépôt (preuve que le pipeline
fonctionne).

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

## Prochaines étapes

- **CV** : ajouter un fichier PDF dans `/public` et renseigner
  `siteConfig.cvUrl` (actuellement `undefined`, ce qui masque tous les
  boutons "Télécharger mon CV" du site). La photo de portrait, elle, est
  déjà en place (`public/portrait.jpg`, affichée sur l'accueil).
- **Médias de projet** : les champs `images`/`pdf`/`video` du frontmatter
  Portfolio sont prévus et gérés par la page, mais aucun projet n'en a
  pour l'instant.
- **Remettre une page publique pour la veille**, si souhaité un jour : le
  pipeline tourne déjà, il ne manque qu'une route qui liste
  `content/veille/*.md` (reprendre le modèle des pages `/portfolio`).
