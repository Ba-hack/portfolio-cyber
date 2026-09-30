---
title: "Stagiaire Cybersécurité — CFC Consulting (2026)"
description: "Sécurisation de plateformes bancaires digitales — sécuriser une banque digitale et une plateforme de bourse en ligne, au stade de POC, de l'analyse des risques jusqu'à la remédiation. Analyse de risques STRIDE sur les deux plateformes, cartographie des actifs sensibles et priorisation dans une matrice de risque."
date: "2026-06-22"
ordre: 1
periode: "22 juin 2026 – 28 août 2026"
tags: ["Threat Modeling", "IAM", "Pentest"]
stack:
  [
    "STRIDE (threat modeling)",
    "Keycloak",
    "OIDC",
    "Semgrep",
    "Bandit",
    "Gitleaks",
    "Trivy",
    "Nmap",
    "whatweb",
    "ffuf",
    "OWASP ZAP",
  ]
---

## Démarche

Conçu une architecture d'authentification et de gestion des accès fédérée
entre les deux applications. Conduit des audits de sécurité du code et des
dépendances, puis des tests d'intrusion manuels pour confirmer
empiriquement les hypothèses de vulnérabilité. Rédigé la documentation
technique et les procédures de remédiation à destination des équipes de
développement.

## Exemples de mise en pratique

- Analyse STRIDE des deux plateformes, aboutissant à l'identification de
  16 actifs critiques.
- Architecture d'authentification fédérée avec Keycloak et le protocole
  OIDC.
- Audits de sécurité du code et des dépendances avec Semgrep, Bandit,
  Gitleaks et Trivy.
- Tests d'intrusion (reconnaissance, découverte de contenu) avec Nmap,
  whatweb, ffuf et OWASP ZAP.
