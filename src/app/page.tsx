import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/site.config";

/**
 * Initiales calculées à partir du nom, utilisées comme repli sobre pour le
 * portrait tant qu'aucune photo n'est fournie dans /public (voir
 * siteConfig.cvUrl pour le même principe côté CV).
 */
function initiales(nom: string): string {
  const mots = nom.trim().split(/\s+/);
  return (mots[0]?.[0] ?? "") + (mots[mots.length - 1]?.[0] ?? "");
}

export default function AccueilPage() {
  return (
    <Container>
      <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-center">
        <Reveal className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-lg text-accent">{siteConfig.titre}</p>

          <p className="mt-6 max-w-xl text-muted-foreground">
            Élève ingénieur généraliste à l&apos;École Centrale Casablanca,
            spécialisé en cybersécurité offensive et défensive — du pentest
            classique aux environnements industriels (IT/OT). Actuellement
            en stage chez CF Consulting sur la sécurisation de plateformes
            bancaires digitales, je recherche un stage de fin d&apos;études
            (PFE) à partir de février 2027.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Voir les projets
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              Me contacter
            </Link>
            {siteConfig.cvUrl && (
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
              >
                Télécharger mon CV
              </a>
            )}
          </div>
        </Reveal>

        {/* Portrait : cadre sobre avec initiales tant qu'aucune photo
            n'est fournie. Remplacer par une vraie image dans /public une
            fois disponible (garder le rendu net, sans overlay opaque). */}
        <Reveal className="shrink-0">
          <div
            aria-hidden="true"
            className="flex size-32 items-center justify-center rounded-full border border-border bg-surface text-3xl font-semibold text-muted-foreground sm:size-40"
          >
            {initiales(siteConfig.name)}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/portfolio"
            className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
          >
            <h2 className="font-semibold">Projets</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Labs Red Team / Blue Team, IT/OT, et ce site lui-même.
            </p>
          </Link>
          <Link
            href="/formation"
            className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
          >
            <h2 className="font-semibold">Formation & Certifications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mon parcours académique et mes certifications.
            </p>
          </Link>
        </div>
      </Reveal>
    </Container>
  );
}
