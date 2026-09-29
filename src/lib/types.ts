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

/** Un projet présenté dans la section Projets. */
export interface PortfolioFrontmatter {
  title: string;
  /** Résumé de 2-3 phrases, affiché en intro de la fiche et sur la carte de liste. */
  description: string;
  /** Date au format ISO ("AAAA-MM-JJ"), utilisée pour trier la liste. */
  date: string;
  /** Tags thématiques courts affichés en haut de la fiche (ex. "Pentest", "Red Team"). */
  tags?: string[];
  /** Liste complète des technologies utilisées, affichée en bandeau en bas de fiche. */
  stack?: string[];
  /** Lien vers une démo en ligne, si elle existe. */
  lienDemo?: string;
  /** Lien vers le dépôt de code source (GitHub, GitLab...). */
  lienDepot?: string;
  /**
   * Champs réservés pour de futurs médias (non utilisés pour l'instant) :
   * la page projet les affiche s'ils sont présents, ne montre rien sinon.
   */
  images?: string[];
  /** Lien vers un rapport ou document à télécharger. */
  pdf?: string;
  /** Lien vers une démo vidéo. */
  video?: string;
}

/** Un item de contenu complet : ses métadonnées + son corps rendu en HTML. */
export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  contentHtml: string;
}
