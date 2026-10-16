/**
 * Types TypeScript pour le "frontmatter" (les métadonnées en en-tête, au
 * format YAML) du contenu Markdown du site.
 *
 * Chaque fichier .md dans content/portfolio/ commence par un bloc comme :
 *
 *   ---
 *   title: "Mon projet"
 *   description: "Résumé en une phrase."
 *   date: "2026-01-15"
 *   tags: ["Pentest", "Red Team"]
 *   stack: ["Kali Linux", "Nmap", "Metasploit"]
 *   ---
 *
 * `PortfolioFrontmatter` décrit la forme attendue de ce bloc, pour avoir
 * de l'autocomplétion et des erreurs de type si un champ est oublié ou
 * mal orthographié.
 */

/** Type d'une pièce du registre de preuves d'un projet. */
export type EvidenceType = "video" | "capture" | "pdf" | "log" | "schema";

/**
 * Une pièce vérifiable attachée à un projet (vidéo, capture d'écran, PDF,
 * extrait de log, schéma) — l'idée du "registre de preuves" : toute
 * affirmation du texte doit pouvoir renvoyer à une pièce consultable.
 */
export interface Evidence {
  /** Identifiant court affiché tel quel, ex. "EV-01". */
  id: string;
  type: EvidenceType;
  /** Chemin sous /public, ou URL externe (ex. vidéo hébergée). */
  src: string;
  /** Légende courte affichée sous la pièce. */
  titre: string;
  /** Empreinte SHA-256 du fichier, si statique et calculable. */
  hash?: string;
  /**
   * Pièce recréée/anonymisée plutôt qu'un export brut (ex. données d'une
   * mission cliente sous NDA) — affiche un badge explicite plutôt que de
   * laisser croire à une pièce brute.
   */
  anonymise?: boolean;
}

/** Un projet présenté dans la section Projets. */
export interface PortfolioFrontmatter {
  title: string;
  /** Résumé de 2-3 phrases, affiché en intro de la fiche et sur la carte de liste. */
  description: string;
  /** Date au format ISO ("AAAA-MM-JJ"), utilisée en repli si `ordre` est absent. */
  date: string;
  /**
   * Position manuelle dans la liste /portfolio (1 = premier). Sans ce
   * champ, l'entrée se trie par `date` (plus récent d'abord) après toutes
   * les entrées qui en ont un.
   */
  ordre?: number;
  /**
   * Période affichée telle quelle à la place de `date` sur la fiche
   * (ex. "22 juin 2026 – 28 août 2026"), utile pour un stage ou une
   * expérience avec une durée précise plutôt qu'une date ponctuelle.
   */
  periode?: string;
  /** Tags thématiques courts affichés en haut de la fiche (ex. "Pentest", "Red Team"). */
  tags?: string[];
  /** Liste complète des technologies utilisées, affichée en bandeau en bas de fiche. */
  stack?: string[];
  /** Lien vers une démo en ligne, si elle existe. */
  lienDemo?: string;
  /** Lien vers le dépôt de code source (GitHub, GitLab...). */
  lienDepot?: string;
  /**
   * Registre de preuves du projet : chaque pièce est affichée dans l'ordre,
   * avec son type, son identifiant et son éventuelle empreinte. Absent ou
   * vide tant qu'aucune pièce n'est encore fournie.
   */
  evidences?: Evidence[];
}

/** Un item de contenu complet : ses métadonnées + son corps rendu en HTML. */
export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  contentHtml: string;
}
