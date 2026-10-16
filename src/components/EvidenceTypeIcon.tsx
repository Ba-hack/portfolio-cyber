import type { EvidenceType } from "@/lib/types";

/**
 * Petites icônes SVG faites main (pas de librairie d'icônes dans le
 * projet) : une par type de preuve, pour identifier la pièce d'un coup
 * d'œil dans la grille.
 */
export function EvidenceTypeIcon({
  type,
  className,
}: {
  type: EvidenceType;
  className?: string;
}) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (type) {
    case "video":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="13" height="14" rx="2" />
          <path d="M16 9.5 21 6v12l-5-3.5" />
        </svg>
      );
    case "capture":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 15l5-5 4 4 4-3 5 4" />
          <circle cx="8" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pdf":
      return (
        <svg {...commonProps}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M9.5 13v5M9.5 13h1.2a1.5 1.5 0 0 1 0 3H9.5" />
          <path d="M13.5 18v-5h1.8" />
        </svg>
      );
    case "log":
      return (
        <svg {...commonProps}>
          <path d="M4 4h16v16H4z" />
          <path d="M7.5 9h2M7.5 12h9M7.5 15h6" />
        </svg>
      );
    case "schema":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="6" height="5" rx="1" />
          <rect x="15" y="4" width="6" height="5" rx="1" />
          <rect x="9" y="15" width="6" height="5" rx="1" />
          <path d="M6 9v3a1 1 0 0 0 1 1h3m8-4v3a1 1 0 0 1-1 1h-3" />
        </svg>
      );
  }
}
