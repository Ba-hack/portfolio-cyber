/** Petit badge pour afficher un mot-clé (tag) sur une carte de contenu. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
      {children}
    </span>
  );
}
