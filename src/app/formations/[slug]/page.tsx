import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { Tag } from "@/components/Tag";
import { formatDate } from "@/lib/format";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import type { FormationFrontmatter } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("formations").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/formations/[slug]">) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getContentBySlug<FormationFrontmatter>(
      "formations",
      slug,
    );
    return { title: frontmatter.title, description: frontmatter.description };
  } catch {
    return {};
  }
}

export default async function FormationPage({
  params,
}: PageProps<"/formations/[slug]">) {
  const { slug } = await params;

  const formation = await getContentBySlug<FormationFrontmatter>(
    "formations",
    slug,
  ).catch(() => null);

  if (!formation) notFound();

  const { frontmatter, contentHtml } = formation;

  return (
    <Container>
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={frontmatter.date}>
          {formatDate(frontmatter.date)}
        </time>
        <span aria-hidden>·</span>
        <span className="font-mono">
          {frontmatter.niveau}
          {frontmatter.duree ? ` · ${frontmatter.duree}` : ""}
        </span>
      </div>

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
