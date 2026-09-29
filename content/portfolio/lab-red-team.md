---
title: "Lab Cybersécurité Virtualisé — Red Team"
description: "Construire un environnement réseau isolé pour pratiquer la méthodologie offensive de bout en bout, sur des systèmes informatiques classiques comme sur des environnements industriels — lab virtualisé avec VirtualBox (Kali Linux, Windows 10/11, cibles OWASP) sur un réseau isolé."
date: "2025-09-01"
tags: ["Pentest", "Red Team", "ICS/OT"]
stack:
  [
    "VirtualBox",
    "Kali Linux",
    "Windows 10/11",
    "Nmap",
    "whatweb",
    "ffuf",
    "Metasploit",
    "OWASP (cibles vulnérables)",
    "Shodan",
    "Google Dorks",
    "Conpot",
    "Modbus",
    "S7/Snap7",
  ]
---

## Démarche

La démarche suit les grandes étapes d'un test d'intrusion : reconnaissance
réseau et applicative, exploitation d'un service ou d'une vulnérabilité
pour obtenir un premier accès, puis élévation de privilège pour maximiser
cet accès. Cette pratique a ensuite été étendue aux environnements
industriels (ICS/OT), avec une démarche de découverte en sources ouvertes
(OSINT) d'équipements industriels exposés, puis un pentest de PLC simulés
dans un environnement dédié.

## Exemples de mise en pratique

- Reconnaissance réseau et applicative avec Nmap, whatweb, et énumération
  de contenu avec ffuf.
- Exploitation d'un accès FTP anonyme mal configuré pour uploader un web
  shell sur un site hébergé, établissant un accès distant.
- Exploitation d'une vulnérabilité SMB via Metasploit sur une machine
  cible.
- Élévation de privilège via un binaire Python autorisé en `sudo` sans mot
  de passe (technique type GTFOBins), obtenant un accès root.
- Utilisation de Shodan et des Google Dorks pour recenser des automates
  Siemens exposés publiquement.
- Simulation d'un automate industriel avec le honeypot Conpot, exposant
  les protocoles S7, SNMP et Modbus, puis reconnaissance et analyse de
  vulnérabilités avec Nmap et Metasploit.
