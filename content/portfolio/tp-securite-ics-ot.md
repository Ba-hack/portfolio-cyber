---
title: "TP sécurité industrielle (ICS/OT) — OSINT et tests d'intrusion sur PLC simulés"
description: "Travaux pratiques sur la sécurité des systèmes de contrôle industriel : découverte OSINT de PLC exposés et tests d'intrusion sur un environnement simulé (honeypot Conpot)."
date: "2026-05-01"
tags: ["ICS/OT", "OSINT", "Pentest", "Shodan", "Metasploit"]
---

## Contexte

Dans le cadre du cours *Cybersecurity in the Context of Industry 4.0* à
l'École Centrale Casablanca, j'ai réalisé une série de travaux pratiques
sur la sécurité des systèmes de contrôle industriel (ICS/OT — automates
programmables, protocoles industriels), un domaine dont les enjeux de
sécurité diffèrent nettement de l'IT classique : la disponibilité y prime
sur la confidentialité, les cycles de vie des équipements sont très longs,
et il est souvent impossible de les patcher sans arrêter une production en
continu.

## Méthodologie

Le TP reproduit, en environnement contrôlé, le déroulé typique d'un
attaquant ciblant des équipements industriels :

- **OSINT** : recherche d'automates Siemens exposés publiquement via
  Shodan (`port:102`, filtré par gamme de produit) et via Google Dorks,
  pour mesurer l'ampleur réelle de l'exposition de ce type d'équipement
  sur Internet — sans jamais interagir avec les hôtes trouvés, à des fins
  d'observation uniquement.
- **Simulation** : déploiement d'un automate simulé avec Conpot (honeypot
  ICS) exposant les protocoles industriels courants (S7Comm, SNMP,
  Modbus), pour disposer d'une cible réaliste sans aucun risque.
- **Reconnaissance active** : cartographie du réseau et des ports du PLC
  simulé (`netdiscover`, `nmap`, `snmp-check`), puis analyse plus fine du
  port 102 (protocole S7/ISO-TSAP utilisé par les automates Siemens) à
  l'aide de scripts Nmap dédiés et de l'outil `plcscan`.
- **Exploitation encadrée** : utilisation de la bibliothèque `snap7` pour
  dialoguer directement avec le protocole S7, puis recherche de modules
  Metasploit et d'exploits publics (Searchsploit) ciblant spécifiquement du
  matériel industriel.

## Constat marquant

Un des enseignements du TP porte sur l'écosystème d'exploitation
lui-même : le nombre de modules Metasploit et d'exploits publics ciblant
spécifiquement les équipements industriels est nettement plus restreint
que pour l'IT classique — une conséquence directe de la nature de ces
environnements (accès souvent physique, parc très hétérogène, criticité
qui limite la recherche offensive publique), qui ne signifie en aucun cas
qu'ils sont moins vulnérables.

## Cadre

Toutes les manipulations ont été réalisées sur des équipements simulés,
dans un réseau isolé dédié au TP, conformément au cadre pédagogique du
cours (K. Zerhouni et R. Nassih, École Centrale Casablanca).

## Ce que j'en retiens

Ce TP illustre concrètement pourquoi la sécurité IT et la sécurité OT ne
peuvent pas être traitées avec les mêmes réflexes : un scan de ports jugé
anodin en IT peut, sur certains équipements industriels anciens, provoquer
une instabilité — d'où la prudence méthodologique nécessaire (toujours
simuler avant de tester du réel) propre à ce domaine.
