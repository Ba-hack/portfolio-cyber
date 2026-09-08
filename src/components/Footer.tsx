import { Container } from "./Container";
import { siteConfig } from "@/site.config";

/** Pied de page : liens externes et mention de copyright. */
export function Footer() {
  const anneeCourante = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {anneeCourante} {siteConfig.name}
        </p>
        <div className="flex gap-4">
          <a
            href={siteConfig.liens.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.liens.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
