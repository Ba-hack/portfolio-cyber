---
title: "Lab de cybersécurité virtualisé — Red & Blue Team"
description: "Environnement de pratique offensive et défensive entièrement virtualisé : reconnaissance, exploitation et segmentation réseau sur des cibles volontairement vulnérables."
date: "2025-09-01"
tags: ["Pentest", "Red Team", "Blue Team", "VirtualBox", "Réseaux"]
---

## Objectif

Construire un environnement réseau réaliste, entièrement virtualisé, pour
pratiquer aussi bien l'attaque que la défense, et mesurer concrètement
l'effet d'une segmentation réseau correcte plutôt que de s'arrêter à sa
description théorique.

## Environnement

Laboratoire sous VirtualBox regroupant plusieurs machines virtuelles : Kali
Linux en poste attaquant, plusieurs cibles Windows (10, 11, 7) et un serveur
Linux, ainsi que des applications volontairement vulnérables (OWASP) pour
la partie exploitation. pfSense a ensuite été introduit pour segmenter le
réseau en zones isolées.

## Démarche

- **Reconnaissance** : cartographie des cibles et des services exposés
  (scans réseau, identification de technologies web) avec Nmap et WhatWeb.
- **Exploitation** : recherche et exploitation de vulnérabilités connues
  sur les cibles web et système, avec Metasploit, jusqu'à l'obtention d'un
  accès.
- **Défense** : déploiement de pfSense pour segmenter le réseau en zones
  isolées, avec une politique de filtrage restrictive par défaut.
- **Validation croisée** : vérification de l'efficacité de la segmentation
  en rejouant les mêmes techniques offensives (scans, tentatives de
  connexion) depuis une zone censée ne plus y avoir accès, puis analyse des
  journaux pour confirmer que les tentatives bloquées sont bien visibles.

## Ce que j'ai appris

Pratiquer l'attaque et la défense sur le même environnement change la façon
de voir chacune des deux : une règle de pare-feu n'est vraiment validée que
lorsqu'elle a explicitement résisté à une tentative de contournement, pas
seulement lorsqu'elle a été écrite conformément à la documentation.
