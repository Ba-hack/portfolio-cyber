import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { Tag } from "@/components/Tag";
import { formatDate } from "@/lib/format";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import type { VeilleFrontmatter } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("veille").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cybersecurite/veille/[slug]">) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getContentBySlug<VeilleFrontmatter>(
      "veille",
      slug,
    );
    return { title: frontmatter.title, description: frontmatter.description };
  } catch {
    return {};
  }
}

export default async function ArticleVeillePage({
  params,
}: PageProps<"/cybersecurite/veille/[slug]">) {
  const { slug } = await params;

  const article = await getContentBySlug<VeilleFrontmatter>(
    "veille",
    slug,
  ).catch(() => null);

  if (!article) notFound();

  const { frontmatter, contentHtml } = article;

  return (
    <Container>
      <p className="text-sm text-muted-foreground">
        <time dateTime={frontmatter.date}>
          {formatDate(frontmatter.date)}
        </time>
        {" · "}
        Source : {frontmatter.sourceNom}
      </p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        {frontmatter.title}
      </h1>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Prose html={contentHtml} />
      </div>

      {/*
       * Lien mis en avant vers l'article original : ce contenu n'est
       * qu'un résumé, jamais une copie de l'article de presse (respect
       * du droit d'auteur — voir la note dans le README).
       */}
      <a
        href={frontmatter.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Lire l&apos;article original sur {frontmatter.sourceNom} →
      </a>
    </Container>
  );
}
