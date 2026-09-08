import Link from "next/link";
import { Container } from "./Container";
import { navLinks, siteConfig } from "@/site.config";

/** En-tête du site : logo/nom + navigation principale, présent sur toutes les pages. */
export function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
