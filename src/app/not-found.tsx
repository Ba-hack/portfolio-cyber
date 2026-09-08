import Link from "next/link";
import { Container } from "@/components/Container";

/** Page 404 personnalisée, affichée par notFound() ou pour toute route inconnue. */
export default function NotFound() {
  return (
    <Container className="text-center">
      <h1 className="text-3xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-muted-foreground">
        Cette page n&apos;existe pas ou plus.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-accent underline underline-offset-2"
      >
        Retour à l&apos;accueil
      </Link>
    </Container>
  );
}
