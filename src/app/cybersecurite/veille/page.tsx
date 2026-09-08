import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { getAllContent } from "@/lib/content";
import type { VeilleFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Veille",
  description: "Résumés d'articles de presse cybersécurité, avec lien source.",
};

export default async function VeillePage() {
  const articles = await getAllContent<VeilleFrontmatter>("veille");

  return (
    <Container>
      <PageHeader
        title="Veille"
        description="Résumés d'articles de presse sur la cybersécurité — chaque résumé renvoie vers l'article original."
      />

      {articles.length === 0 ? (
        <p className="text-muted-foreground">
          Aucun article publié pour l&apos;instant.
        </p>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <ContentCard
              key={article.slug}
              href={`/cybersecurite/veille/${article.slug}`}
              title={article.frontmatter.title}
              description={article.frontmatter.description}
              date={article.frontmatter.date}
              tags={article.frontmatter.tags}
              meta={<span>Source : {article.frontmatter.sourceNom}</span>}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
