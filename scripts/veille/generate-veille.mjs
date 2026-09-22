// Génère des brouillons d'articles pour content/veille/ à partir des flux
// RSS listés dans sources.mjs.
//
// Ce script n'est jamais exécuté au moment où un visiteur charge le site
// (le site reste 100 % statique, voir lib/content.ts) : il tourne à part,
// une fois par jour, via le workflow .github/workflows/veille-quotidienne.yml,
// qui ouvre ensuite une Pull Request avec les fichiers générés — jamais de
// publication directe (voir ce workflow pour le détail du pourquoi).
//
// Principe de prudence sur le droit d'auteur ET sur l'honnêteté envers les
// lecteurs : on ne récupère jamais l'article complet, seulement le titre
// et l'extrait officiel fourni par le flux RSS pour la syndication. Le
// résumé final est une reformulation factuelle et courte de cet extrait,
// jamais une copie — et jamais rédigé pour donner l'impression d'un
// article indépendant : la fiche affiche toujours la source et un lien
// vers l'article original (voir le template de la page détail).
//
// Usage : ANTHROPIC_API_KEY=... node scripts/veille/generate-veille.mjs

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Parser from "rss-parser";
import matter from "gray-matter";
import { sources } from "./sources.mjs";

const CONTENT_DIR = path.join(process.cwd(), "content", "veille");
// Plafond volontaire : garde chaque Pull Request générée facile à relire,
// et limite le nombre d'appels à l'API de résumé à chaque exécution.
const MAX_NEW_ARTICLES = 6;
const MODEL = "claude-haiku-4-5-20251001";

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
 * Demande à un modèle de langage de produire, à partir de l'extrait :
 *  - un résumé factuel court (les faits, jamais copiés du texte source) ;
 *  - une analyse ORIGINALE distincte (implications, contexte technique,
 *    ce que ça change pour la défense) — pas une reformulation de
 *    l'article sous un autre angle, un vrai commentaire indépendant.
 * N'envoie jamais que le titre + l'extrait officiel (jamais l'article
 * complet). Les deux textes sont publiés avec le nom de la source et un
 * lien vers l'article original juste en dessous : ce n'est pas un article
 * indépendant qui masquerait sa source, c'est un résumé de veille + un
 * avis, qui doivent donner envie d'aller lire la source, pas la remplacer.
 */
async function summarize({ title, excerpt, sourceNom }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY manquante");
  }

  const prompt = `Tu aides à la veille en cybersécurité pour un site personnel francophone.
Le résultat sera toujours publié avec le nom de la source et un lien vers l'article original juste en dessous : ce n'est pas un article indépendant, c'est une fiche de veille qui doit donner envie d'aller lire la source, pas la remplacer.

À partir du titre et de l'extrait officiel ci-dessous (jamais l'article complet), rédige deux textes bien distincts :

1. "resume" — un résumé factuel COURT (2 à 3 phrases maximum), en français, avec tes propres mots, sans jamais reprendre mot pour mot le texte source, et sans chercher à donner l'impression d'un reportage original ou indépendant. Uniquement les faits (qui, quoi, comment).

2. "analyse" — un commentaire ORIGINAL de 3 à 5 phrases, en français, qui n'est PAS une reformulation du résumé ni de l'article : implications pour la défense, contexte technique plus large (pourquoi cette catégorie de faille/attaque compte), points de vigilance pour un professionnel. Base-toi uniquement sur des connaissances générales de cybersécurité, jamais sur des détails de l'extrait qui ne seraient pas déjà dans le résumé, et n'invente aucune expérience personnelle ni aucun fait non vérifiable.

Rédige aussi :
- si le titre original n'est pas en français, une traduction française naturelle du titre ;
- 1 à 3 mots-clés pertinents en français (ex. "Ransomware", "Fuite de données").

Réponds uniquement avec un objet JSON strict de la forme :
{"titre": "...", "resume": "...", "analyse": "...", "tags": ["..."]}

Titre original : ${title}
Source : ${sourceNom}
Extrait officiel : ${excerpt}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API ${response.status} : ${await response.text()}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`Réponse IA non exploitable : ${text}`);
  }
  return JSON.parse(jsonMatch[0]);
}

function writeVeilleFile({ link, date, sourceNom, titre, resume, analyse, tags }) {
  const slug = uniqueSlug(slugify(titre), link);
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  const frontmatter = {
    title: titre,
    // La carte de liste (ContentCard) n'affiche que ce champ : le résumé
    // factuel court, pas l'analyse (qui elle n'apparaît que sur la fiche).
    description: resume,
    date,
    sourceNom,
    sourceUrl: link,
    tags: tags && tags.length > 0 ? tags : undefined,
  };

  // Le commentaire HTML est invisible à l'affichage (voir Prose.tsx) :
  // c'est un rappel pour la relecture humaine de la Pull Request, pas pour
  // les visiteurs du site. Le corps distingue explicitement les faits
  // (résumé) de l'avis (analyse) pour que ce soit clair pour le lecteur.
  const corps = [
    "<!-- Résumé + analyse générés automatiquement par IA à partir d'un extrait RSS officiel. Vérifier la fidélité à la source et s'approprier l'analyse avant de fusionner. -->",
    resume,
    "",
    "## Pourquoi c'est important",
    "",
    analyse || "(analyse à compléter)",
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

  let created = 0;
  for (const candidate of candidates) {
    try {
      const { titre, resume, analyse, tags } = await summarize(candidate);
      writeVeilleFile({ ...candidate, titre, resume, analyse, tags });
      created += 1;
    } catch (err) {
      console.warn(`[veille] Article ignoré ("${candidate.title}") : ${err.message}`);
    }
  }

  console.log(`[veille] ${created} nouvel(aux) article(s) généré(s) sur ${candidates.length} candidat(s).`);
}

main().catch((err) => {
  console.error("[veille] Échec du script :", err);
  process.exitCode = 1;
});
