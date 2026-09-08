import Link from "next/link";
import { Container } from "@/components/Container";

/**
 * Page d'accueil : présentation courte + liens vers les 3 grandes sections
 * du site. Volontairement minimaliste pour l'instant — à enrichir avec une
 * vraie bio, une photo, etc. une fois le contenu réel disponible.
 */
export default function AccueilPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Bonjour, bienvenue sur mon site.
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Je présente ici mes projets, des TP de cybersécurité pour débutants,
        ainsi que mes recherches et une veille sur l&apos;actualité du
        secteur.
        {/* TODO: remplacer ce paragraphe par une vraie présentation personnelle. */}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <CarteAccueil
          href="/portfolio"
          titre="Portfolio"
          description="Mes projets techniques."
        />
        <CarteAccueil
          href="/formations"
          titre="Formations"
          description="Des TP pour débuter en cybersécurité."
        />
        <CarteAccueil
          href="/cybersecurite"
          titre="Cybersécurité"
          description="Recherches et veille sur le secteur."
        />
      </div>
    </Container>
  );
}

function CarteAccueil({
  href,
  titre,
  description,
}: {
  href: string;
  titre: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
    >
      <h2 className="font-semibold">{titre}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
