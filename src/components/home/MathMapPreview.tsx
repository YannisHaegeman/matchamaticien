import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getAllMathThemes, countThemeResults } from "@/lib/mathmap";
import { ACCENT_CLASSES } from "@/components/mathmap/accent";
import { Button } from "@/components/ui/Button";

/**
 * Teaser de la Carte des maths sur l'accueil : un aperçu des thèmes,
 * avec un lien vers la carte complète. Les données viennent entièrement
 * de src/lib/mathmap — ajouter un thème ici n'a rien de spécial à faire.
 */
export function MathMapPreview() {
  const themes = getAllMathThemes();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
            La carte des maths
          </p>
          <h2 className="mt-3 font-serif text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.3rem]">
            Des thèmes reliés entre eux
          </h2>
        </div>
        <Button href="/carte-des-maths" variant="secondary" size="md">
          Voir la carte complète
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => {
          const Icon = (Icons[theme.icon as keyof typeof Icons] ??
            Icons.Shapes) as LucideIcon;
          const accent = ACCENT_CLASSES[theme.accent];
          const resultCount = countThemeResults(theme);

          return (
            <Link
              key={theme.id}
              href={`/carte-des-maths/${theme.id}`}
              className="group flex flex-col rounded-2xl border border-border bg-bg-card p-5 transition hover:border-brand hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)]"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${accent.soft} text-ink`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <p className="mt-4 font-serif text-[1.05rem] font-semibold text-ink">
                {theme.shortTitle ?? theme.title}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {theme.description}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.1em] text-brand-strong">
                {resultCount > 0
                  ? `${resultCount} résultat${resultCount > 1 ? "s" : ""}`
                  : "À venir"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
