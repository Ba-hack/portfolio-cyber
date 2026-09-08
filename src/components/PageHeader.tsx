/** En-tête de page standard : titre + description courte, utilisé sur chaque page de section. */
export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
