import type { Metadata } from "next";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/nunito/900.css";
import "@fontsource/nunito/600-italic.css";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";

const siteUrl = "https://matchamaticien.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "L'Alchimie des Nombres — Les mathématiques, transmutées autrement",
    template: "%s · L'Alchimie des Nombres",
  },
  description:
    "L'Alchimie des Nombres est une carte conceptuelle des mathématiques de l'agrégation, et un espace de flash cards pour réviser — où chaque résultat se transforme en compréhension, pas à pas.",
  keywords: [
    "mathématiques",
    "blog de mathématiques",
    "vulgarisation scientifique",
    "cours de maths",
    "alchimie des nombres",
  ],
  authors: [{ name: "L'Alchimie des Nombres" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "L'Alchimie des Nombres",
    title: "L'Alchimie des Nombres — Les mathématiques, transmutées autrement",
    description:
      "Une carte des maths et des flash cards pour réviser, entre rigueur académique et émerveillement.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Alchimie des Nombres",
    description: "Les mathématiques, transmutées autrement.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('matcha-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}`,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
