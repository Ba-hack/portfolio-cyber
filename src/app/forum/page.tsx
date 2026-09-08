import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Forum",
  description: "Espace d'échange communautaire, à venir.",
};

/**
 * Page d'attente pour le forum.
 *
 * Contrairement au reste du site (contenu Markdown statique), un forum
 * nécessite des comptes utilisateurs, du contenu écrit par les visiteurs
 * et donc une vraie base de données + de la modération. C'est une étape
 * volontairement mise de côté pour ce premier scratch — cette page sert
 * de placeholder en attendant.
 */
export default function ForumPage() {
  return (
    <Container>
      <PageHeader title="Forum" />
      <p className="text-muted-foreground">
        Cette section n&apos;est pas encore disponible. Elle nécessitera une
        base de données et un système de comptes utilisateurs — ce sera une
        prochaine étape du projet.
      </p>
    </Container>
  );
}
