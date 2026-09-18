import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { Tag } from "@/components/Tag";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import type { ExperienceFrontmatter } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("experiences").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getContentBySlug<ExperienceFrontmatter>(
      "experiences",
      slug,
    );
    return { title: frontmatter.title, description: frontmatter.description };
  } catch {
    return {};
  }
}

export default async function ExperiencePage({
  params,
}: PageProps<"/experience/[slug]">) {
  const { slug } = await params;

  const experience = await getContentBySlug<ExperienceFrontmatter>(
    "experiences",
    slug,
  ).catch(() => null);

  if (!experience) notFound();

  const { frontmatter, contentHtml } = experience;

  return (
    <Container>
      <p className="text-sm text-muted-foreground">
        {frontmatter.organisation}
        {frontmatter.lieu ? ` · ${frontmatter.lieu}` : ""} ·{" "}
        {frontmatter.periode}
      </p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        {frontmatter.title}
      </h1>
      <p className="mt-1 font-medium text-muted-foreground">
        {frontmatter.role}
      </p>

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
