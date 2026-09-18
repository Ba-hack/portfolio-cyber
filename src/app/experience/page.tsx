import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { getAllContent } from "@/lib/content";
import type { ExperienceFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Expérience",
  description: "Stages, engagements associatifs et autres expériences.",
};

export default async function ExperiencePage() {
  const experiences = await getAllContent<ExperienceFrontmatter>("experiences");

  return (
    <Container>
      <PageHeader
        title="Expérience"
        description="Mon parcours : stages, engagements associatifs et autres expériences marquantes."
      />

      {experiences.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune expérience publiée pour l&apos;instant.
        </p>
      ) : (
        <div className="grid gap-4">
          {experiences.map((experience) => (
            <ContentCard
              key={experience.slug}
              href={`/experience/${experience.slug}`}
              title={experience.frontmatter.title}
              description={experience.frontmatter.description}
              date={experience.frontmatter.date}
              tags={experience.frontmatter.tags}
              meta={
                <span>
                  {experience.frontmatter.organisation} ·{" "}
                  {experience.frontmatter.periode}
                </span>
              }
            />
          ))}
        </div>
      )}
    </Container>
  );
}
