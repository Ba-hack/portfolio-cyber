// Génère des brouillons d'articles pour content/veille/ à partir des flux
// RSS listés dans sources.mjs.
//
// Ce script n'est jamais exécuté au moment où un visiteur charge le site
// (le site reste 100 % statique, voir lib/content.ts) : il tourne à part,
// une fois par jour, via le workflow .github/workflows/veille-quotidienne.yml,
// qui ouvre ensuite une Pull Request avec les fichiers générés — jamais de
// publication directe (voir ce workflow pour le détail du pourquoi).
//
// Volontairement pas d'appel à un service d'IA ici : ça éviterait de
// stocker une clé d'API tierce comme secret GitHub, ce qu'on préfère
// éviter. Le script se contente donc de récupérer le titre et l'extrait
// officiel fourni par chaque flux RSS pour la syndication (jamais
// l'article complet) et d'en faire un brouillon brut, clairement signalé
// comme tel — jamais publié sans reformulation humaine (voir la mention
// "Brouillon" ajoutée dans chaque fichier généré et le tag associé).
//
// Usage : node scripts/veille/generate-veille.mjs

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Parser from "rss-parser";
import matter from "gray-matter";
import { sources } from "./sources.mjs";

const CONTENT_DIR = path.join(process.cwd(), "content", "veille");
// Plafond volontaire : garde chaque Pull Request générée facile à relire.
const MAX_NEW_ARTICLES = 6;

const parser = new Parser({
  headers: { "User-Agent": "PortfolioCyberVeilleBot/1.0" },
  timeout: 15_000,
});

/** Transforme un titre en identifiant d'URL (slug) sans accents ni ponctuation. */
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // enlève les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Garantit un nom de fichier unique même si deux titres se ressemblent. */
function uniqueSlug(base, link) {
  const candidate = base || "article";
  if (!fs.existsSync(path.join(CONTENT_DIR, `${candidate}.md`))) {
    return candidate;
  }
  const suffix = crypto.createHash("sha1").update(link).digest("hex").slice(0, 6);
  return `${candidate}-${suffix}`;
}

function toIsoDate(value) {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString().slice(0, 10)
    : parsed.toISOString().slice(0, 10);
}

/** Lit les fiches déjà publiées pour ne jamais générer deux fois le même article. */
function loadExistingSourceUrls() {
  const urls = new Set();
  if (!fs.existsSync(CONTENT_DIR)) return urls;

  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.sourceUrl) urls.add(data.sourceUrl);
  }
  return urls;
}

/** Récupère les articles non encore publiés depuis chaque flux RSS. */
async function collectCandidates(existingUrls) {
  const candidates = [];

  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source.url);
      for (const item of feed.items) {
        if (!item.link || !item.title || existingUrls.has(item.link)) continue;
        candidates.push({
          title: item.title.trim(),
          link: item.link,
          date: toIsoDate(item.isoDate || item.pubDate),
          // contentSnippet = texte brut (HTML retiré par rss-parser).
          // Toujours l'extrait officiel du flux, jamais l'article complet.
          excerpt: (item.contentSnippet || item.content || "").trim().slice(0, 600),
          sourceNom: source.nom,
        });
      }
    } catch (err) {
      console.warn(`[veille] Source ignorée (${source.nom}) : ${err.message}`);
    }
  }

  // Les plus récents d'abord, tous flux confondus.
  candidates.sort((a, b) => (a.date < b.date ? 1 : -1));
  return candidates.slice(0, MAX_NEW_ARTICLES);
}

/**
 * Écrit un brouillon à partir d'un candidat RSS brut (titre + extrait
 * officiel, non reformulés). Le champ `description` reprend l'extrait tel
 * quel : à remplacer par un vrai résumé "avec ses propres mots" au moment
 * de la relecture de la Pull Request, avant toute fusion.
 */
function writeVeilleFile({ title, link, date, excerpt, sourceNom }) {
  const slug = uniqueSlug(slugify(title), link);
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  const frontmatter = {
    title,
    description: excerpt || title,
    date,
    sourceNom,
    sourceUrl: link,
    tags: ["Brouillon"],
  };

  const corps = [
    "> **Brouillon généré automatiquement à partir d'un flux RSS.**",
    "> À reformuler avec ses propres mots (et à retirer le tag \"Brouillon\") avant publication — voir README, section Veille automatique.",
    "",
    excerpt || "(Pas d'extrait fourni par la source — se référer au lien ci-dessous.)",
  ].join("\n");

  const fileContent = matter.stringify(`${corps}\n`, frontmatter);
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`[veille] Créé : content/veille/${slug}.md`);
}

async function main() {
  const existingUrls = loadExistingSourceUrls();
  const candidates = await collectCandidates(existingUrls);

  if (candidates.length === 0) {
    console.log("[veille] Aucun nouvel article à traiter.");
    return;
  }

  for (const candidate of candidates) {
    writeVeilleFile(candidate);
  }

  console.log(`[veille] ${candidates.length} brouillon(s) généré(s).`);
}

main().catch((err) => {
  console.error("[veille] Échec du script :", err);
  process.exitCode = 1;
});
