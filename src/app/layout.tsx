import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/site.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Métadonnées par défaut, appliquées à toutes les pages qui ne définissent
// pas les leurs. `template` permet à chaque page de ne fournir que son
// propre titre : Next construit "Titre de la page | Nom du site".
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

// Choix de thème mémorisé (voir ThemeToggle.tsx), appliqué AVANT
// l'hydratation React pour éviter un flash du mauvais thème au
// chargement (l'utilisateur verrait sinon une bascule brutale clair →
// sombre une fraction de seconde après l'affichage initial).
const scriptAntiFlashTheme = `
  try {
    var theme = window.localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* strategy="beforeInteractive" : exécuté avant l'hydratation React,
            donc avant le premier rendu visible — c'est ce qui évite le
            flash du mauvais thème. Voir next/script dans la doc Next.js. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {scriptAntiFlashTheme}
        </Script>
        <Header />
        <main className="flex-1 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
