import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { Tag } from "@/components/Tag";
import { formatDate } from "@/lib/format";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import type { PortfolioFrontmatter } from "@/lib/types";

// Génère au build une page statique pour chaque fichier content/portfolio/*.md.
export function generateStaticParams() {
  return getAllSlugs("portfolio").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  try {
    const { frontmatter } = await getContentBySlug<PortfolioFrontmatter>(
      "portfolio",
      slug,
    );
    return { title: frontmatter.title, description: frontmatter.description };
  } catch {
    return {};
  }
}

export default async function ProjetPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;

  // getContentBySlug lève une erreur si le fichier .md n'existe pas :
  // on l'attrape pour afficher la page 404 standard de Next.js plutôt
  // qu'un plantage serveur.
  const projet = await getContentBySlug<PortfolioFrontmatter>(
    "portfolio",
    slug,
  ).catch(() => null);

  if (!projet) notFound();

  const { frontmatter, contentHtml } = projet;

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

      {(frontmatter.lienDemo || frontmatter.lienDepot) && (
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {frontmatter.lienDemo && (
            <a
              href={frontmatter.lienDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2"
            >
              Voir la démo
            </a>
          )}
          {frontmatter.lienDepot && (
            <a
              href={frontmatter.lienDepot}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2"
            >
              Code source
            </a>
          )}
        </div>
      )}

      <div className="mt-8">
        <Prose html={contentHtml} />
      </div>
    </Container>
  );
}
