import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Me contacter par email ou sur LinkedIn.",
};

/**
 * Volontairement pas de numéro de téléphone ni d'adresse ici : un email
 * professionnel et un lien LinkedIn suffisent pour un premier contact, le
 * téléphone se communique en direct pendant un échange.
 */
export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        title="Contact"
        description="La meilleure façon de me joindre."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.liens.email}`}
          className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <h2 className="font-semibold">Email</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {siteConfig.liens.email}
          </p>
        </a>
        <a
          href={siteConfig.liens.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <h2 className="font-semibold">LinkedIn</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            linkedin.com/in/salihu-bah
          </p>
        </a>
        <a
          href={siteConfig.liens.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <h2 className="font-semibold">GitHub</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            github.com/Ba-hack
          </p>
        </a>
      </div>

      {siteConfig.cvUrl && (
        <a
          href={siteConfig.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Télécharger mon CV
        </a>
      )}
    </Container>
  );
}
