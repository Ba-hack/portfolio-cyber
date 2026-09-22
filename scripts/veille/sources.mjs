/**
 * Sources RSS utilisées pour la veille cybersécurité automatique
 * (voir generate-veille.mjs).
 *
 * Chaque flux publie un titre + un extrait officiel destiné à la
 * syndication (jamais l'article complet) : c'est cet extrait, et lui
 * seul, qui sert de matière première au résumé généré par IA. On ne va
 * jamais chercher le texte intégral de l'article sur le site source.
 *
 * Vérifié manuellement le 22/09/2026 (réponse HTTP 200 + XML valide).
 * Si un flux cesse de répondre, le script l'ignore simplement (voir le
 * try/catch dans generate-veille.mjs) plutôt que d'échouer entièrement.
 */
export const sources = [
  { nom: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { nom: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
  { nom: "Dark Reading", url: "https://www.darkreading.com/rss.xml" },
  { nom: "CERT-FR — Avis", url: "https://www.cert.ssi.gouv.fr/avis/feed/" },
  { nom: "CERT-FR — Alertes", url: "https://www.cert.ssi.gouv.fr/alerte/feed/" },
];
