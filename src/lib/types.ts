/**
 * Types TypeScript pour le "frontmatter" (les métadonnées en en-tête, au
 * format YAML) de chaque type de contenu Markdown du site.
 *
 * Chaque fichier .md dans content/<type>/ commence par un bloc comme :
 *
 *   ---
 *   title: "Mon projet"
 *   description: "Résumé en une phrase."
 *   date: "2026-01-15"
 *   tags: ["web", "sécurité"]
 *   ---
 *
 * Ces interfaces décrivent la forme attendue de ce bloc pour chaque
 * section du site, afin d'avoir de l'autocomplétion et des erreurs de
 * type si un champ est oublié ou mal orthographié.
 */

/** Champs communs à tous les types de contenu. */
interface FrontmatterCommun {
  title: string;
  description: string;
  /** Date au format ISO ("AAAA-MM-JJ"), utilisée pour trier les listes. */
  date: string;
  tags?: string[];
}

/** Un projet présenté dans la section Portfolio. */
export interface PortfolioFrontmatter extends FrontmatterCommun {
  /** Lien vers une démo en ligne, si elle existe. */
  lienDemo?: string;
  /** Lien vers le dépôt de code source (GitHub, GitLab...). */
  lienDepot?: string;
}

/** Un TP ou une formation, listé dans la section Formations. */
export interface FormationFrontmatter extends FrontmatterCommun {
  niveau: "Débutant" | "Intermédiaire" | "Avancé";
  /** Durée indicative, ex. "2h", "1 jour". */
  duree?: string;
}

/** Une recherche personnelle publiée dans Cybersécurité > Recherches. */
export type RechercheFrontmatter = FrontmatterCommun;

/**
 * Un article de veille : résumé d'un article de presse externe, avec un
 * lien vers la source originale (jamais le texte intégral recopié, pour
 * respecter le droit d'auteur — voir README).
 */
export interface VeilleFrontmatter extends FrontmatterCommun {
  /** Nom du média source, ex. "Le Monde Informatique". */
  sourceNom: string;
  /** Lien vers l'article original. */
  sourceUrl: string;
}

/** Un item de contenu complet : ses métadonnées + son corps rendu en HTML. */
export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  contentHtml: string;
}
