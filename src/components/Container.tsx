/**
 * Conteneur de mise en page : centre le contenu et limite sa largeur,
 * pour ne pas répéter ces classes Tailwind sur chaque page.
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
