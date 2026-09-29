/**
 * Contenu de la page Formation & Certifications.
 *
 * Volontairement en TypeScript plutôt qu'en Markdown : contrairement aux
 * projets (contenu long, un fichier par entrée, pensé pour être ajouté
 * facilement), ceci est une liste courte et stable (le parcours
 * académique et les certifications) — un simple tableau typé est plus
 * direct à maintenir qu'un dossier de fichiers .md pour ce cas précis.
 */

export interface Formation {
  intitule: string;
  etablissement: string;
  periode: string;
}

export const formations: Formation[] = [
  {
    intitule: "Ingénieur Généraliste, parcours Industrie 4.0",
    etablissement: "École Centrale Casablanca — Maroc",
    periode: "Depuis 2024",
  },
  {
    intitule: "Classe Préparatoire PCSI/PC",
    etablissement: "CPGE Thiès — Sénégal",
    periode: "2022 – 2024",
  },
  {
    intitule: "Baccalauréat Scientifique, Mention Très Bien",
    etablissement: "Lycée de Mbar — Sénégal",
    periode: "2022",
  },
];

export interface Certification {
  nom: string;
  /** Ligne de contexte courte : quel projet ou quelle compétence elle a nourri. */
  contexte?: string;
  enPreparation?: boolean;
}

export const certifications: Certification[] = [
  {
    nom: "Cisco CCNA 200-301",
    contexte:
      "Bases réseaux (routage, VLAN) mobilisées dans la segmentation LAN/DMZ du lab Blue Team.",
  },
  {
    nom: "CompTIA PenTest+",
    contexte:
      "Méthodologie de test d'intrusion, en écho direct à la pratique du lab Red Team.",
  },
  {
    nom: "Google Cybersecurity",
    contexte: "Fondamentaux de la cybersécurité (SOC, gestion des risques).",
  },
  {
    nom: "EC-Council",
  },
  {
    nom: "Google Project Management",
    contexte: "Méthodes de gestion de projet (planification, priorisation).",
  },
  {
    nom: "AWS Cloud Support Associate",
    enPreparation: true,
    contexte: "Sécurité et support des environnements cloud.",
  },
];
