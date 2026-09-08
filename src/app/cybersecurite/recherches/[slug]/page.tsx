import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { Tag } from "@/components/Tag";
import { formatDate } from "@/lib/format";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import type { RechercheFrontmatter } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("recherches").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cybersecurite/recherches/[slug]">) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getContentBySlug<RechercheFrontmatter>(
      "recherches",
      slug,
    );
    return { title: frontmatter.title, description: frontmatter.description };
  } catch {
    return {};
  }
}

export default async function RecherchePage({
  params,
}: PageProps<"/cybersecurite/recherches/[slug]">) {
  const { slug } = await params;

  const recherche = await getContentBySlug<RechercheFrontmatter>(
    "recherches",
    slug,
  ).catch(() => null);

  if (!recherche) notFound();

  const { frontmatter, contentHtml } = recherche;

  return (
    <Container>
      <p className="text-sm text-muted-foreground">
        <time dateTime={frontmatter.date}>
          {formatDate(frontmatter.date)}
        </time>
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
    </Container>
  );
}
