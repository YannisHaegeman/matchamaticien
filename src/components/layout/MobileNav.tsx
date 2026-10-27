"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/carte-des-maths", label: "Carte des maths" },
  { href: "/flashcards", label: "Flash cards" },
  { href: "/a-propos", label: "À propos" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Ferme le menu quand la route change (navigation via un lien).
  // Ajustement d'état pendant le rendu plutôt que dans un effet,
  // pour éviter un rendu supplémentaire inutile.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink"
      >
        {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
      </button>

      {open ? (
        <div className="fixed inset-x-0 top-[65px] z-40 border-b border-border bg-bg-elevated px-6 py-6 shadow-lg animate-fade-up">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-3 font-serif text-lg text-ink transition hover:bg-brand-soft",
                  pathname === link.href && "text-brand-strong"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
