/**
 * Indicateur "niveau de preuve" : 4 barres, remplies selon le nombre de
 * pièces du registre (plafonné à 4). Calculé à l'appel à partir du nombre
 * réel de pièces — jamais un champ à maintenir à la main, donc toujours
 * exact.
 */
export function EvidenceStrength({ level }: { level: number }) {
  const niveau = Math.max(0, Math.min(4, level));

  return (
    <span
      className="inline-flex items-center gap-0.5"
      title={`Niveau de preuve : ${niveau}/4`}
      aria-label={`Niveau de preuve : ${niveau} sur 4`}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className={
            i < niveau
              ? "h-2.5 w-1 rounded-sm bg-accent"
              : "h-2.5 w-1 rounded-sm bg-border"
          }
        />
      ))}
    </span>
  );
}
