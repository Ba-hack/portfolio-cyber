import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/site.config";

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
            classique aux environnements industriels (IT/OT). Autonome et
            avant tout pratique : je préfère mettre mes compétences à
            l&apos;épreuve dans des labs personnels plutôt que de m&apos;en
            tenir à la théorie, et je fais une veille active sur
            l&apos;actualité cybersécurité pour rester à jour sur les
            menaces et les outils du secteur.
          </p>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Je recherche maintenant un stage de fin
            d&apos;études (PFE) à partir de février 2027.
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

        {/* Portrait net, sans overlay : la photo doit rester reconnaissable
            (voir consignes de design du site). `fill` + `object-cover`
            recadre proprement l'image (portrait 3:4) dans le cercle. */}
        <Reveal className="shrink-0">
          <div className="relative size-32 overflow-hidden rounded-full border border-border sm:size-40">
            <Image
              src="/portrait.jpg"
              alt={`Portrait de ${siteConfig.name}`}
              fill
              sizes="(min-width: 640px) 10rem, 8rem"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/portfolio"
            className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
          >
            <h2 className="font-semibold">Projets & Expérience</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Stage, labs Red Team / Blue Team, et ce site lui-même.
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
