---
title: "Poubelle intelligente — Tri automatique des déchets par vision par ordinateur"
description: "Poubelle connectée qui identifie la nature d'un déchet par caméra et l'oriente vers le bon compartiment, avec suivi du niveau de remplissage en temps réel — projet scolaire en équipe."
date: "2025-03-01"
tags: ["Computer Vision", "YOLO", "Raspberry Pi", "IoT", "Python"]
---

*Projet scolaire réalisé en équipe.*

## Contexte

Concevoir une poubelle connectée capable de trier automatiquement les
déchets selon leur nature, et de signaler aux services de collecte quand
elle approche de son niveau de remplissage maximal — plutôt que de
s'appuyer sur des tournées de collecte à fréquence fixe, indépendantes du
remplissage réel.

## Fonctionnement

- **Détection de la nature du déchet** : une caméra couplée à un modèle de
  détection d'objets YOLO identifie le type de déchet déposé (plastique,
  métal, etc.).
- **Tri automatique** : selon la catégorie détectée, des servomoteurs
  orientent le déchet vers le compartiment correspondant.
- **Mesure du niveau de remplissage** : un capteur infrarouge mesure le
  niveau de déchets dans la poubelle, pour détecter qu'elle approche du
  plein.
- **Suivi à distance** : les données de remplissage remontent vers un site
  web permettant de suivre l'état de la poubelle en temps réel — et donc
  de planifier les collectes en fonction du remplissage réel plutôt que
  d'une tournée systématique.

## Matériel et stack technique

Raspberry Pi comme unité de contrôle, caméra pour la capture d'image,
servomoteurs pour l'orientation du tri, capteur infrarouge pour la mesure
de niveau ; Python côté embarqué pour le pilotage des capteurs/actionneurs
et l'inférence YOLO, complété par un site web pour la supervision à
distance.

## Ce que j'ai appris

Ce projet a été ma première expérience de bout en bout entre un modèle de
vision par ordinateur et du matériel physique : au-delà de la précision du
modèle YOLO pris isolément, la vraie difficulté a été de le faire
fonctionner de façon fiable sur un Raspberry Pi aux ressources limitées, et
de synchroniser correctement la détection avec l'action mécanique du tri.
