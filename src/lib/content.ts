/**
 * Chargement du contenu Markdown.
 *
 * Choix d'architecture : plutôt qu'une base de données, tout le contenu
 * éditorial (projets, formations, articles) est stocké sous forme de
 * fichiers Markdown dans /content, versionnés avec le code sur GitHub.
 * Avantages pour ce projet :
 *   - Gratuit, aucune infrastructure à gérer (pas de BDD à payer/sécuriser).
 *   - Chaque ajout de contenu = un commit Git, donc un historique clair.
 *   - Simple à comprendre et à modifier, même sans interface d'admin.
 * Limite connue : pas adapté à du contenu généré par les visiteurs (d'où
 * le fait que le forum, lui, nécessitera une vraie base de données plus
 * tard). Pour un blog/portfolio en lecture seule, c'est largement suffisant.
 *
 * Ces fonctions ne s'exécutent que côté serveur (Server Components, appelées
 * au moment du build grâce à generateStaticParams) : jamais dans le
 * navigateur, donc pas de souci à utiliser Node "fs" ici.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { ContentItem } from "./types";

// Dossier racine contenant tous les sous-dossiers de contenu.
const CONTENT_ROOT = path.join(process.cwd(), "content");

/** Types de contenu gérés, un par sous-dossier de /content. */
export type ContentType = "portfolio" | "formations" | "recherches" | "veille";

function getContentDir(type: ContentType): string {
  return path.join(CONTENT_ROOT, type);
}

/**
 * Liste les "slugs" (identifiants d'URL) disponibles pour un type de
 * contenu, à partir des noms de fichiers .md présents sur le disque.
 * Ex: content/portfolio/scanner-reseau.md -> slug "scanner-reseau".
 */
export function getAllSlugs(type: ContentType): string[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((fichier) => fichier.endsWith(".md"))
    .map((fichier) => fichier.replace(/\.md$/, ""));
}

/**
 * Charge un contenu unique par son slug : lit le fichier, sépare le
 * frontmatter (métadonnées YAML) du corps, puis convertit le corps
 * Markdown en HTML.
 *
 * Lance une erreur si le fichier n'existe pas — à charge de l'appelant
 * de l'attraper et d'appeler notFound() (voir les pages [slug]/page.tsx).
 */
export async function getContentBySlug<T>(
  type: ContentType,
  slug: string,
): Promise<ContentItem<T>> {
  const cheminFichier = path.join(getContentDir(type), `${slug}.md`);
  const fichierBrut = fs.readFileSync(cheminFichier, "utf8");

  const { data, content } = matter(fichierBrut);

  const traite = await remark().use(remarkHtml).process(content);

  return {
    slug,
    frontmatter: data as T,
    contentHtml: traite.toString(),
  };
}

/**
 * Charge tous les contenus d'un type donné, triés du plus récent au plus
 * ancien (utilisé pour les pages de liste : /portfolio, /formations...).
 */
export async function getAllContent<T extends { date: string }>(
  type: ContentType,
): Promise<Array<ContentItem<T>>> {
  const slugs = getAllSlugs(type);
  const items = await Promise.all(
    slugs.map((slug) => getContentBySlug<T>(type, slug)),
  );

  return items.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );
}
