import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Cybersécurité",
  description: "Recherches personnelles et veille sur l'actualité cyber.",
};

/**
 * Page "hub" de la section Cybersécurité : ne liste pas de contenu
 * directement, elle redirige vers les deux sous-sections. Ce découpage
 * sépare deux natures de contenu bien différentes :
 *   - Recherches : écrits originaux, rédigés entièrement par moi.
 *   - Veille     : résumés courts d'articles de presse externes, toujours
 *                  accompagnés d'un lien vers la source d'origine.
 */
export default function CybersecuritePage() {
  return (
    <Container>
      <PageHeader
        title="Cybersécurité"
        description="Recherches personnelles et veille sur l'actualité du secteur."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/cybersecurite/recherches"
          className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <h2 className="font-semibold">Recherches</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mes propres travaux et analyses sur des sujets cyber.
          </p>
        </Link>

        <Link
          href="/cybersecurite/veille"
          className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
        >
          <h2 className="font-semibold">Veille</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Résumés d&apos;articles de presse, avec lien vers la source.
          </p>
        </Link>
      </div>
    </Container>
  );
}
