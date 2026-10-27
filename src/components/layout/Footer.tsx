import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { mathThemes } from "@/lib/mathmap/themes";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream-deep">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-ink">
              <Logo className="h-7 w-7 text-brand-strong" />
              <span className="font-serif text-[1.2rem] font-semibold">
                L&rsquo;Alchimie des Nombres
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted">
              Un magazine de mathématiques pensé comme une pause : des idées
              denses, servies lentement, pour donner envie de comprendre
              plutôt que d&rsquo;apprendre par cœur.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-soft">
              <li>
                <Link href="/" className="hover:text-brand-strong">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/carte-des-maths" className="hover:text-brand-strong">
                  Carte des maths
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="hover:text-brand-strong">
                  Flash cards
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-brand-strong">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Thèmes de la carte
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-soft">
              {mathThemes.slice(0, 5).map((theme) => (
                <li key={theme.id}>
                  <Link
                    href={`/carte-des-maths/${theme.id}`}
                    className="hover:text-brand-strong"
                  >
                    {theme.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>© {year} L&rsquo;Alchimie des Nombres. Transmuté avec rigueur, transmis avec émerveillement.</p>
          <p className="italic">Les maths, transmutées autrement.</p>
        </div>
      </div>
    </footer>
  );
}
