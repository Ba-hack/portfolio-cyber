/**
 * Configuration centrale du site.
 *
 * Regrouper ici les infos globales (nom, description, liens de navigation,
 * contact) évite de les dupliquer dans plusieurs composants et fichiers.
 * Pour renommer le site, changer les liens, etc. : tout se passe ici, dans
 * un seul fichier.
 */

export const siteConfig = {
  // Nom affiché dans l'en-tête, le pied de page et les métadonnées SEO.
  name: "Serigne Saliou BA",
  // Titre/spécialité en une ligne, affiché sur l'accueil.
  titre: "Élève ingénieur — cybersécurité offensive et défensive, IT/OT",
  // Courte description utilisée par défaut pour le SEO (balise <meta description>).
  description:
    "Portfolio de projets en cybersécurité offensive et défensive (Red Team, Blue Team, IT/OT).",
  // URL du site une fois déployé (à mettre à jour avec l'URL Vercel définitive).
  // Sert de base aux métadonnées (Open Graph, liens canoniques, etc.).
  url: "https://portfolio-cyber-gray.vercel.app",
  // Liens de contact, affichés sur l'Accueil et la page Contact.
  liens: {
    email: "serignesaliouba25@gmail.com",
    github: "https://github.com/Ba-hack",
    linkedin: "https://www.linkedin.com/in/salihu-bah",
  },
  /**
   * Chemin (sous /public) vers le CV en PDF, si disponible.
   * Laisser à `undefined` tant qu'aucun fichier n'est fourni : tous les
   * boutons "Télécharger mon CV" se masquent automatiquement dans ce cas
   * (voir Accueil et Contact) plutôt que de pointer vers un fichier
   * inexistant.
   */
  cvUrl: undefined as string | undefined,
} as const;

/**
 * Liens de navigation principale, affichés dans l'en-tête du site.
 * `href` doit correspondre à un dossier de route sous src/app. Le nom du
 * site dans l'en-tête fait déjà office de lien vers l'accueil.
 */
export const navLinks = [
  { href: "/portfolio", label: "Projets & Expérience" },
  { href: "/formation", label: "Formation & Certifications" },
  { href: "/contact", label: "Contact" },
] as const;
