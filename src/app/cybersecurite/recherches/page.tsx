import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { getAllContent } from "@/lib/content";
import type { RechercheFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Recherches",
  description: "Recherches et analyses personnelles en cybersécurité.",
};

export default async function RecherchesPage() {
  const recherches = await getAllContent<RechercheFrontmatter>("recherches");

  return (
    <Container>
      <PageHeader
        title="Recherches"
        description="Mes travaux et analyses personnelles sur des sujets cybersécurité."
      />

      {recherches.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune recherche publiée pour l&apos;instant.
        </p>
      ) : (
        <div className="grid gap-4">
          {recherches.map((recherche) => (
            <ContentCard
              key={recherche.slug}
              href={`/cybersecurite/recherches/${recherche.slug}`}
              title={recherche.frontmatter.title}
              description={recherche.frontmatter.description}
              date={recherche.frontmatter.date}
              tags={recherche.frontmatter.tags}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
