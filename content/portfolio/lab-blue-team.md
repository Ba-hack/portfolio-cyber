---
title: "Lab Cybersécurité Virtualisé — Blue Team"
description: "Concevoir une architecture réseau segmentée et défendable, puis la doter de moyens de détection pour identifier les tentatives d'intrusion — pfSense en pare-feu/passerelle pour segmenter LAN et DMZ, avec une politique deny by default."
date: "2026-09-10"
tags: ["Blue Team", "pfSense", "IDS"]
stack: ["VirtualBox", "pfSense", "Suricata", "Kali Linux"]
---

## Démarche

Déployé pfSense comme pare-feu et passerelle pour segmenter le réseau en
zones isolées (LAN et DMZ), avec des règles explicites en *deny by
default* plutôt que les règles permissives par défaut. Un serveur web a
été exposé dans la DMZ via du NAT, tout en bloquant strictement toute
communication initiée depuis la DMZ vers le LAN. En complément de la
segmentation, un IDS Suricata a été mis en place pour détecter les
activités suspectes sur le réseau, avec des règles de détection
personnalisées adaptées aux scénarios d'attaque du lab. La segmentation et
la détection ont ensuite été validées empiriquement en attaquant depuis
Kali, puis en surveillant les journaux du pare-feu et les alertes
Suricata.

## Exemples de mise en pratique

- Segmentation du réseau en zones LAN et DMZ avec des règles de pare-feu
  explicites.
- Exposition d'un serveur web de la DMZ via NAT, tout en isolant
  strictement la DMZ du LAN.
- Déploiement d'un IDS Suricata avec des règles de détection
  personnalisées.
- Tests d'intrusion depuis Kali pour confirmer que la DMZ ne pouvait pas
  atteindre le LAN.
- Surveillance des journaux pfSense et des alertes Suricata pour
  identifier les tentatives suspectes.
