/** Met en forme une date ISO ("2026-01-15") en date lisible en français. */
export function formatDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
