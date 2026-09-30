---
title: "Site Portfolio Sécurisé — CI/CD & Automatisation (en cours)"
description: "Développer et déployer un site portfolio en intégrant dès la conception les pratiques de sécurité applicative et d'automatisation attendues d'un projet professionnel — Next.js/TypeScript, déploiement automatique sur Vercel, contenu versionné en Markdown."
date: "2026-09-18"
ordre: 5
tags: ["DevSecOps", "CI/CD", "Next.js"]
stack:
  [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vercel",
    "GitHub Actions",
    "CodeQL",
    "Semgrep",
    "npm audit",
    "Gitleaks",
    "Dependabot",
    "LLM (Claude Haiku)",
  ]
lienDepot: "https://github.com/Ba-hack/portfolio-cyber"
lienDemo: "https://portfolio-cyber-gray.vercel.app"
---

## Démarche

Le dépôt est protégé par une chaîne de vérifications automatiques à chaque
push et pull request : build et lint, analyse statique de code (SAST) via
CodeQL, complétée par un scan Semgrep basé sur les règles OWASP Top 10,
une analyse des dépendances (SCA) via npm audit, et une détection de
secrets avec Gitleaks sur l'historique complet du dépôt. Dependabot
surveille en continu les dépendances vulnérables. Le site intègre aussi un
job quotidien qui génère des brouillons d'articles de veille cybersécurité
à partir de flux RSS, résumés par un LLM, systématiquement soumis à
relecture humaine via Pull Request avant toute publication.

## Exemples de mise en pratique

- Next.js/TypeScript, Tailwind CSS, contenu Markdown versionné,
  hébergement Vercel.
- Pipeline CI/CD (GitHub Actions) : build+lint, SAST CodeQL, suite
  sécurité (npm audit, Semgrep OWASP Top 10, Gitleaks).
- Dependabot pour la mise à jour automatisée des dépendances npm et des
  actions GitHub.
- Génération automatisée de brouillons de veille cybersécurité (RSS +
  LLM), avec relecture humaine obligatoire avant fusion.
