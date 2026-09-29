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

      {/* Résumé "case study" : c'est ce qu'un recruteur lira en premier,
          avant même la démarche détaillée ci-dessous. */}
      <p className="mt-6 text-lg text-muted-foreground">
        {frontmatter.description}
      </p>

      <div className="mt-8">
        <Prose html={contentHtml} />
      </div>

      {/* Blocs média optionnels : aucun n'est renseigné pour l'instant,
          mais le frontmatter les prévoit déjà (voir lib/types.ts). Chaque
          bloc ne s'affiche que si le champ correspondant est présent. */}
      {frontmatter.images && frontmatter.images.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {frontmatter.images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element -- images de contenu Markdown, hors optimisation next/image
            <img
              key={src}
              src={src}
              alt=""
              className="rounded-lg border border-border"
            />
          ))}
        </div>
      )}

      {(frontmatter.pdf || frontmatter.video) && (
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          {frontmatter.pdf && (
            <a
              href={frontmatter.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-accent px-4 py-2 font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Télécharger le rapport (PDF) →
            </a>
          )}
          {frontmatter.video && (
            <a
              href={frontmatter.video}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-accent px-4 py-2 font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Voir la démo vidéo →
            </a>
          )}
        </div>
      )}

      {frontmatter.stack && frontmatter.stack.length > 0 && (
        <div className="mt-10 border-t border-border pt-6">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {frontmatter.stack.map((techno) => (
              <Tag key={techno}>{techno}</Tag>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
