---
title: "Stage opérateur — Sécurisation de plateformes bancaires digitales"
description: "Audit de sécurité de bout en bout (threat modeling, découverte automatisée, tests d'intrusion) sur une banque digitale et une plateforme de bourse en ligne."
date: "2026-06-22"
organisation: "CF Consulting (CFC)"
role: "Stagiaire opérateur — pôle technologie"
periode: "22 juin – 28 août 2026"
lieu: "Casablanca, Maroc"
tags: ["Threat modeling", "STRIDE", "Pentest", "OWASP Top 10", "IAM / Keycloak"]
---

## Contexte

CF Consulting (CFC) est un cabinet de conseil casablancais qui accompagne des
institutions financières marocaines vers des modèles bancaires 100 % digitaux.
Deux de ses plateformes en développement — une banque digitale et une
plateforme de bourse en ligne, toutes deux au stade de *Proof of Concept* —
devaient être sécurisées avant tout passage à l'échelle, sans qu'aucun audit
de sécurité formalisé n'ait encore été mené sur l'une ou l'autre.

## Missions

Conduire cet audit de bout en bout, en autonomie croissante et en
coordination continue avec le développeur en charge de l'implémentation :

- **Modélisé** les menaces selon la méthodologie STRIDE sur huit actifs
  critiques par plateforme (identifiants, jetons d'accès, flux de paiement,
  secrets d'infrastructure...), avec un score de risque calculé pour
  prioriser l'effort.
- **Mené** une découverte automatisée des vulnérabilités : analyse statique
  du code (Semgrep, Bandit), analyse de composants (pip-audit, npm audit),
  détection de secrets (Gitleaks), analyse de conteneurs (Trivy) et
  d'infrastructure (tfsec).
- **Conduit** des tests d'intrusion : reconnaissance (nmap, OWASP ZAP,
  ffuf...) puis validation empirique ciblée sur les hypothèses les plus
  critiques identifiées par les deux étapes précédentes.
- **Remonté** les constats les plus sensibles à l'équipe de développement
  dès leur confirmation, hors du cycle de restitution habituel, pour
  permettre une correction sans attendre la fin de la mission.

## Ce que j'en retiens

La leçon la plus structurante de ce stage : un constat issu de la seule
lecture du code reste une hypothèse tant qu'il n'est pas confronté à la
réalité du système déployé. C'est la démonstration empirique qui transforme
une hypothèse plausible en certitude actionnable — et c'est cette
conviction, obtenue par la preuve plutôt que par la déduction, qui permet
une remontée et une remédiation immédiates plutôt qu'une simple mention
dans un rapport de fin de mission.

Cette expérience confirme mon orientation vers les métiers du test
d'intrusion et de la sécurité offensive.
