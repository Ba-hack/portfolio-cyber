import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { formations, certifications } from "./data";

export const metadata: Metadata = {
  title: "Formation & Certifications",
  description: "Parcours académique et certifications.",
};

export default function FormationPage() {
  return (
    <Container>
      <PageHeader title="Formation & Certifications" />

      <section>
        <h2 className="text-lg font-semibold">Formation</h2>
        <ul className="mt-4 space-y-4">
          {formations.map((formation) => (
            <li
              key={formation.intitule}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{formation.intitule}</p>
                <p className="text-sm text-muted-foreground">
                  {formation.periode}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {formation.etablissement}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <ul className="mt-4 space-y-4">
          {certifications.map((cert) => (
            <li key={cert.nom} className="rounded-lg border border-border p-4">
              <p className="font-medium">
                {cert.nom}
                {cert.enPreparation && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    (en préparation)
                  </span>
                )}
              </p>
              {cert.contexte && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.contexte}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
