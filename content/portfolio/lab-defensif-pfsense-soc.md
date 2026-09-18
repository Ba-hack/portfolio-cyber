---
title: "Laboratoire de cybersécurité défensive — Architecture réseau segmentée et supervision SOC"
description: "Projet Blue Team en cours : conception d'une architecture réseau à trois zones (WAN/LAN/DMZ) avec pfSense, vers un socle SIEM/SOC complet."
date: "2026-09-10"
tags: ["Blue Team", "pfSense", "SOC", "SIEM", "Réseaux", "En cours"]
---

*Projet personnel autodidacte, actuellement en cours.*

## Contexte

Projet de montée en compétences Blue Team, conçu en complément d'un profil
offensif (CompTIA PenTest+, pratique CTF). L'objectif est de maîtriser la
posture défensive par la pratique : concevoir, configurer et éprouver une
infrastructure de sécurité complète en environnement virtualisé, plutôt
que d'en acquérir la théorie par certification seule.

## Environnement technique

Laboratoire virtualisé sous VirtualBox reproduisant une architecture
d'entreprise à trois zones : WAN (simulé), LAN interne, et DMZ isolée.
Pare-feu pfSense en position de routeur central, serveur Ubuntu/Apache
exposé en DMZ, poste Kali Linux en position d'attaquant sur le LAN pour la
validation offensive des règles.

## Structure du projet — 4 phases, 12 travaux pratiques

**Phase 1 — Réseau défensif et pare-feu**

- TP1 : architecture pfSense avec segmentation LAN/DMZ, règles de
  filtrage stateful, NAT et port forwarding.
- TP2 : détection d'intrusion avec Suricata en mode IDS/IPS, rédaction de
  règles personnalisées.
- TP3 : VPN OpenVPN et segmentation VLAN, validation de l'isolation
  inter-segments.

**Phase 2 — SIEM et supervision**

- TP4 : stack ELK (Elasticsearch, Logstash, Kibana), centralisation des
  journaux Windows et Linux.
- TP5 : Wazuh SIEM, déploiement d'agents HIDS et règles de détection.
- TP6 : threat hunting avec règles Sigma et cartographie MITRE ATT&CK.

**Phase 3 — SOC et réponse à incident**

- TP7 : TheHive et Cortex, workflow de gestion d'incident et analyse
  automatisée.
- TP8 : forensics réseau avec Wireshark et Zeek, extraction d'IOC.
- TP9 : MITRE ATT&CK Navigator, analyse d'écarts de détection.

**Phase 4 — Durcissement et Blue Team avancé**

- TP10 : durcissement Linux et Windows selon les benchmarks CIS,
  automatisation Ansible.
- TP11 : honeypot T-Pot et collecte de threat intelligence.
- TP12 : exercice Purple Team complet — attaque, détection, confinement,
  rapport.

## Réalisations à ce stade

Le TP1 est opérationnel : architecture trois zones fonctionnelle,
politique de filtrage construite selon le principe du *deny by default*,
isolation stricte DMZ vers LAN validée, translation d'adresses configurée,
et vérification des règles par tests offensifs depuis Kali (scans Nmap,
tentatives de traversée inter-zones).

## Compétences mobilisées

Segmentation réseau et conception de DMZ, filtrage stateful et
ordonnancement de règles, NAT/PAT, diagnostic réseau bas niveau (netplan,
routage, résolution DNS), virtualisation et configuration d'interfaces
multiples, validation défensive par approche offensive.

## Démarche

Chaque TP suit un cycle conception → mise en œuvre → test offensif →
analyse des journaux. Les incidents rencontrés en environnement réel
(conflits d'hyperviseur, configurations réseau concurrentes, résolution
DNS inter-zones) sont traités comme partie intégrante de l'apprentissage
plutôt que contournés.
