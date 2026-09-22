---
title: "Ce site — Sécuriser un portfolio comme un vrai projet en production"
description: "Ce portfolio lui-même, construit comme une démonstration concrète de sécurité applicative : scans automatiques à chaque push, protection de branche, durcissement de la chaîne CI/CD."
date: "2026-09-18"
tags: ["DevSecOps", "CI/CD", "SAST", "OWASP Top 10", "Next.js"]
lienDepot: "https://github.com/Ba-hack/portfolio-cyber"
lienDemo: "https://portfolio-cyber-gray.vercel.app"
---

## Objectif

Ce site (Next.js/TypeScript, contenu en Markdown) n'est pas qu'une vitrine
de projets : c'en est un lui-même. Plutôt que de traiter la sécurité comme
une étape ajoutée après coup, l'objectif a été de le construire dès le
départ selon une logique proche d'un vrai environnement de production —
scans automatiques, garde-fous avant déploiement, durcissement de la
chaîne CI/CD — pour appliquer concrètement des principes de sécurité
applicative plutôt que de s'arrêter à leur description théorique.

## Scans automatiques à chaque push

Quatre outils tournent automatiquement (GitHub Actions) à chaque `push` et
Pull Request, sans action manuelle :

- **SAST — CodeQL** : analyse la logique du code source à la recherche de
  failles (injection, mauvaise gestion des entrées...).
- **SCA — npm audit + Dependabot** : audite les dépendances tierces à
  chaque push, et Dependabot ouvre automatiquement une Pull Request dès
  qu'un correctif de sécurité est disponible.
- **OWASP Top 10 — Semgrep** : règles publiques ciblées sur les 10
  catégories OWASP (injection, authentification cassée, exposition de
  données sensibles...).
- **Détection de secrets — Gitleaks** : vérifie qu'aucune clé ou mot de
  passe n'a été commité par erreur, y compris dans l'historique Git.

Tous les résultats remontent au même endroit : l'onglet Security de
GitHub, pas besoin d'aller consulter chaque outil séparément.

## Une CI qui bloque réellement avant la production

Deux systèmes indépendants agissent sur ce dépôt : Vercel déploie à chaque
push, GitHub Actions vérifie le code — mais rien ne liait les deux par
défaut. Un push cassé aurait pu atteindre la production avant même la fin
des scans. La branche `master` est donc **protégée** : aucun push direct
n'est possible, même pour le propriétaire du dépôt, et une Pull Request ne
peut être fusionnée que si les cinq vérifications (build, lint, CodeQL,
Semgrep, Gitleaks) sont vertes. Vercel ne publie la production qu'une fois
la fusion faite — jamais avant.

## Durcissement de la chaîne CI/CD elle-même

Les actions GitHub utilisées dans les workflows sont épinglées sur un hash
de commit précis plutôt que sur un tag mobile (`@v4`) — pour empêcher
qu'une action tierce compromise soit tirée silencieusement dans la CI, le
scénario réel qui a touché `tj-actions/changed-files` en 2025. Le fichier
`dependabot.yml` applique aussi un délai ("cooldown") avant d'appliquer
une mise à jour de routine, pour se protéger d'un paquet publié puis
retiré rapidement après compromission.

## Preuve que le dispositif fonctionne

Ce n'est pas resté théorique : le premier scan Semgrep a lui-même repéré
les deux manques ci-dessus (tags mobiles, cooldown manquant) dans les
workflows fraîchement écrits, corrigés dans la foulée. Et le filet
build+lint a bloqué deux mises à jour Dependabot (TypeScript 7, ESLint 10)
qui passaient tous les scans de sécurité mais cassaient le lint pour
incompatibilité avec les dépendances existantes — repéré avant fusion, pas
après.

## Ce que j'en retiens

Un pipeline de sécurité n'a de valeur que s'il bloque réellement quelque
chose avant que ça n'atteigne la production — sinon ce n'est qu'un rapport
qu'on lit après coup. La différence s'est vue concrètement sur ce projet :
plusieurs problèmes réels (durcissement CI manquant, mises à jour
incompatibles) ont été arrêtés avant de poser problème, pas découverts
après.
