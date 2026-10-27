import type { Metadata } from "next";
import { Network } from "lucide-react";
import { getAllMathThemes } from "@/lib/mathmap";
import { ThemeBubbleMap } from "@/components/mathmap/ThemeBubbleMap";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Carte des maths",
  description:
    "Une carte conceptuelle interactive des mathématiques de l'agrégation : thèmes, sous-thèmes, théorèmes et démonstrations, reliés entre eux.",
};

export default function CarteDesMathsPage() {
  const themes = getAllMathThemes();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
          Explorer
        </p>
        <h1 className="mt-3 font-serif text-[2.1rem] font-semibold text-ink sm:text-[2.6rem]">
          Carte des maths
        </h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
          Une carte conceptuelle des mathématiques de l&rsquo;agrégation, pensée pour
          descendre progressivement dans le détail : cliquez sur un thème pour voir ses
          sous-thèmes, puis un sous-thème pour voir ses théorèmes et leurs
          démonstrations — en découvrant, à chaque étape, comment les résultats
          s&rsquo;appuient les uns sur les autres.
        </p>
        <div className="mt-6">
          <Button href="/carte-des-maths/graphe" variant="secondary" size="md">
            <Network className="h-4 w-4" strokeWidth={1.9} />
            Voir le graphe des dépendances
          </Button>
        </div>
      </div>

      <ThemeBubbleMap themes={themes} />
    </div>
  );
}
