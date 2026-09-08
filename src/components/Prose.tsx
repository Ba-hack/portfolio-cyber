/**
 * Affiche le HTML généré à partir d'un fichier Markdown (voir lib/content.ts).
 *
 * `dangerouslySetInnerHTML` est nécessaire ici car remark produit une
 * chaîne HTML, pas des éléments React. Ce n'est pas risqué dans notre cas
 * car le contenu vient uniquement de fichiers .md du dépôt (écrits par
 * nous, jamais saisis par un visiteur) — voir la note sécurité du README
 * si cette hypothèse change un jour (ex: contenu utilisateur du forum).
 */
export function Prose({ html }: { html: string }) {
  return (
    <div
      className="prose-contenu"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
