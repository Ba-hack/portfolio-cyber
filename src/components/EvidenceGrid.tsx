import { EvidenceTypeIcon } from "@/components/EvidenceTypeIcon";
import type { Evidence } from "@/lib/types";

const libelleType: Record<Evidence["type"], string> = {
  video: "Vidéo",
  capture: "Capture",
  pdf: "PDF",
  log: "Log",
  schema: "Schéma",
};

/** Une pièce du registre de preuves peut être prévisualisée en image. */
function estPrevisualisable(type: Evidence["type"]) {
  return type === "capture" || type === "schema";
}

function Empreinte({ hash }: { hash: string }) {
  const court = hash.length > 12 ? `${hash.slice(0, 6)}…${hash.slice(-4)}` : hash;
  return (
    <span className="font-mono text-[11px] text-muted-foreground" title={`sha256:${hash}`}>
      sha256:{court}
    </span>
  );
}

/**
 * Grille des pièces du registre de preuves d'un projet. N'affiche rien si
 * la liste est vide — à l'appelant de décider d'afficher ou non le titre
 * de section "Preuves" en fonction de ça.
 */
export function EvidenceGrid({ evidences }: { evidences: Evidence[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {evidences.map((preuve) => (
        <a
          key={preuve.id}
          href={preuve.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-lg border border-border transition-colors hover:border-accent"
        >
          {estPrevisualisable(preuve.type) ? (
            // eslint-disable-next-line @next/next/no-img-element -- source variable (public/ ou URL externe), hors optimisation next/image
            <img
              src={preuve.src}
              alt={preuve.titre}
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-surface">
              <EvidenceTypeIcon
                type={preuve.type}
                className="size-10 text-muted-foreground transition-colors group-hover:text-accent"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 border-t border-border p-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-mono">
              {preuve.id} · {libelleType[preuve.type]}
            </span>
            {preuve.anonymise && (
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground">
                ANONYMISÉE
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 px-3 pb-3 text-sm">
            <span>{preuve.titre}</span>
            {preuve.hash && <Empreinte hash={preuve.hash} />}
          </div>
        </a>
      ))}
    </div>
  );
}
