/**
 * Configuration centrale du site.
 *
 * Regrouper ici les infos globales (nom, description, liens de navigation,
 * réseaux sociaux) évite de les dupliquer dans plusieurs composants et
 * fichiers. Pour renommer le site, changer les liens, etc. : tout se passe
 * ici, dans un seul fichier.
 */

export const siteConfig = {
  // Nom affiché dans l'en-tête, le pied de page et les métadonnées SEO.
  name: "Mon Portfolio Cyber",
  // Courte description utilisée par défaut pour le SEO (balise <meta description>).
  description:
    "Portfolio, formations et veille en cybersécurité — projets, TP pour débutants, recherches et actualités du secteur.",
  // URL du site une fois déployé (à mettre à jour avec l'URL Vercel définitive).
  // Sert de base aux métadonnées (Open Graph, liens canoniques, etc.).
  url: "https://portfolio-cyber.vercel.app",
  // Liens externes affichés dans le pied de page.
  liens: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

/**
 * Liens de navigation principale, affichés dans l'en-tête du site.
 * `href` doit correspondre à un dossier de route sous src/app.
 */
export const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/formations", label: "Formations" },
  { href: "/cybersecurite", label: "Cybersécurité" },
  { href: "/forum", label: "Forum" },
] as const;
