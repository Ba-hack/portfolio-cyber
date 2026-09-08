import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { getAllContent } from "@/lib/content";
import type { FormationFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Formations",
  description: "TP et ressources pour débuter en cybersécurité.",
};

export default async function FormationsPage() {
  const formations = await getAllContent<FormationFrontmatter>("formations");

  return (
    <Container>
      <PageHeader
        title="Formations"
        description="Des TP académiques pensés pour les débutants en cybersécurité."
      />

      {formations.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune formation publiée pour l&apos;instant.
        </p>
      ) : (
        <div className="grid gap-4">
          {formations.map((formation) => (
            <ContentCard
              key={formation.slug}
              href={`/formations/${formation.slug}`}
              title={formation.frontmatter.title}
              description={formation.frontmatter.description}
              date={formation.frontmatter.date}
              tags={formation.frontmatter.tags}
              meta={
                <span className="font-mono">
                  {formation.frontmatter.niveau}
                  {formation.frontmatter.duree
                    ? ` · ${formation.frontmatter.duree}`
                    : ""}
                </span>
              }
            />
          ))}
        </div>
      )}
    </Container>
  );
}
