import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { getAllContent } from "@/lib/content";
import type { ContentItem, PortfolioFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Projets & Expérience",
  description: "Projets techniques réalisés et expérience professionnelle.",
};

/**
 * Trie par `ordre` (1 = premier) quand il est défini ; les entrées sans
 * `ordre` sont reléguées après celles qui en ont un, triées entre elles
 * par date décroissante (comportement de repli de `getAllContent`).
 */
function parOrdreManuel<T extends { ordre?: number }>(
  items: Array<ContentItem<T>>,
) {
  return [...items].sort((a, b) => {
    const ordreA = a.frontmatter.ordre ?? Number.MAX_SAFE_INTEGER;
    const ordreB = b.frontmatter.ordre ?? Number.MAX_SAFE_INTEGER;
    return ordreA - ordreB;
  });
}

export default async function PortfolioPage() {
  const projets = parOrdreManuel(
    await getAllContent<PortfolioFrontmatter>("portfolio"),
  );

  return (
    <Container>
      <PageHeader
        title="Projets & Expérience"
        description="Une sélection de projets sur lesquels j'ai travaillé, et mon expérience professionnelle."
      />

      {projets.length === 0 ? (
        <p className="text-muted-foreground">
          Aucun projet publié pour l&apos;instant.
        </p>
      ) : (
        <div className="grid gap-4">
          {projets.map((projet) => (
            <ContentCard
              key={projet.slug}
              href={`/portfolio/${projet.slug}`}
              title={projet.frontmatter.title}
              description={projet.frontmatter.description}
              date={projet.frontmatter.date}
              dateLabel={projet.frontmatter.periode}
              tags={projet.frontmatter.tags}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
