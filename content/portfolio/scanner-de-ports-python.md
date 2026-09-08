---
title: "Scanner de ports en Python"
description: "Un scanner de ports TCP simple, écrit en Python, pour comprendre les bases de la reconnaissance réseau."
date: "2026-02-10"
tags: ["Python", "Réseau", "Outils"]
lienDepot: "https://github.com/votre-compte/scanner-ports"
---

## Contexte

Ceci est un exemple de fiche projet. Remplacez ce contenu par la
description de votre propre projet : objectif, technologies utilisées,
difficultés rencontrées, résultat.

## Fonctionnement

Décrivez ici les grandes étapes techniques du projet, avec éventuellement
des extraits de code :

```python
import socket

def scanner_port(hote: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex((hote, port)) == 0
```

## Ce que j'ai appris

Un court paragraphe sur les apprentissages techniques ou méthodologiques
tirés de ce projet.
