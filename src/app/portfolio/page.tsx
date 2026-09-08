import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { getAllContent } from "@/lib/content";
import type { PortfolioFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projets techniques réalisés.",
};

export default async function PortfolioPage() {
  const projets = await getAllContent<PortfolioFrontmatter>("portfolio");

  return (
    <Container>
      <PageHeader
        title="Portfolio"
        description="Une sélection de projets sur lesquels j'ai travaillé."
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
              tags={projet.frontmatter.tags}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
