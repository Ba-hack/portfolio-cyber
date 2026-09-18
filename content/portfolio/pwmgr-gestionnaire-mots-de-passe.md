---
title: "pwmgr — Gestionnaire de mots de passe local"
description: "CLI Python pour stocker des identifiants dans un vault chiffré local, sans qu'aucune donnée en clair ne soit jamais écrite sur le disque."
date: "2026-02-28"
tags: ["Python", "Cryptographie", "CLI", "Sécurité applicative"]
lienDepot: "https://github.com/Ba-hack/password-manager"
---

## Objectif

Un gestionnaire de mots de passe minimal en ligne de commande : toutes les
entrées (identifiants, mots de passe, notes) sont stockées dans un seul
fichier local, chiffré de bout en bout. Le mot de passe maître n'est jamais
sauvegardé, y compris temporairement — seule une clé dérivée de celui-ci
existe en mémoire le temps d'une commande.

## Choix de chiffrement

- **Dérivation de clé — Argon2id** : le mot de passe maître n'est jamais
  utilisé directement comme clé. Il passe par Argon2id (algorithme gagnant
  de la Password Hashing Competition), configuré avec un coût mémoire de
  64 Mio et un coût temporel de 3 itérations, pour rendre une attaque par
  force brute hors ligne coûteuse même avec du matériel dédié (GPU/ASIC).
- **Chiffrement — AES-256-GCM** : la clé dérivée chiffre le contenu du
  vault avec AES-256 en mode GCM, qui fournit à la fois la confidentialité
  et l'intégrité (toute modification du fichier chiffré fait échouer le
  déchiffrement plutôt que de produire des données corrompues silencieuses).
- **En-tête authentifié (AAD)** : les paramètres de chiffrement eux-mêmes
  (version du format, paramètres Argon2id, sel) sont inclus comme donnée
  authentifiée additionnelle (AAD) du chiffrement AES-GCM. Cela empêche de
  modifier ces paramètres sans invalider le tag d'authentification, même
  si un attaquant ne peut pas déchiffrer le contenu.
- **Écriture atomique** : chaque sauvegarde du vault passe par un fichier
  temporaire, remplacé ensuite en une seule opération — pour éviter un
  vault corrompu en cas d'interruption (coupure de courant, `Ctrl+C`)
  pendant l'écriture.

## Fonctionnalités CLI

Construit avec Typer, l'outil expose des commandes `init`, `add`, `list`
(avec recherche), `show` (mot de passe masqué par défaut, option
`--reveal` explicite), `copy` (presse-papiers avec effacement automatique
après un délai configurable), `update`, `delete`, `change-master`, ainsi
qu'un export/import de sauvegarde. Le mot de passe maître est toujours
saisi en entrée masquée (`getpass`), jamais passé en argument de commande.

Un module d'audit intégré signale les mots de passe faibles (longueur,
diversité de caractères insuffisante) et les mots de passe réutilisés
entre plusieurs entrées — la détection de réutilisation compare des
empreintes SHA-256 non réversibles, jamais les mots de passe eux-mêmes.

## Tests

Le chiffrement est couvert par des tests unitaires (pytest) : un
aller-retour chiffrement/déchiffrement, et la vérification qu'un mauvais
mot de passe maître fait échouer proprement le déchiffrement plutôt que
de renvoyer des données invalides.

## Ce que j'ai appris

Ce projet a été l'occasion de manipuler concrètement les briques
cryptographiques modernes recommandées (Argon2id, AES-GCM) plutôt que de
s'arrêter à leur description théorique, et de mesurer à quel point des
détails d'implémentation faciles à négliger — écriture atomique,
authentification des métadonnées, effacement du presse-papiers — sont
en réalité aussi importants que le choix de l'algorithme principal.
