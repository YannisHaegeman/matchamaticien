import Link from "next/link";
import { getMathSearchIndex } from "@/lib/mathmap";
import { Logo } from "@/components/ui/Logo";
import { SearchModal } from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/carte-des-maths", label: "Carte des maths" },
  { href: "/flashcards", label: "Flash cards" },
  { href: "/a-propos", label: "À propos" },
];

export function Header() {
  const mathIndex = getMathSearchIndex();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-cream/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream/70">
      <div className="mx-auto flex h-[65px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink transition hover:opacity-80"
        >
          <Logo className="h-7 w-7 text-brand-strong sm:h-8 sm:w-8" />
          <span className="font-serif text-[1.1rem] font-semibold leading-none tracking-tight sm:text-[1.28rem]">
            L&rsquo;Alchimie des Nombres
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[0.94rem] font-medium text-ink-soft transition hover:bg-brand-soft hover:text-brand-strong"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchModal mathItems={mathIndex} />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
