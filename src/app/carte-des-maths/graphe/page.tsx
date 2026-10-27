import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllMathThemes, getMathGraphData } from "@/lib/mathmap";
import { DependencyGraph } from "@/components/mathmap/DependencyGraph";

export const metadata: Metadata = {
  title: "Graphe des dépendances",
  description:
    "Visualisez comment les théorèmes de la Carte des maths s'appuient les uns sur les autres.",
};

export default function MathGraphPage() {
  const { nodes, edges } = getMathGraphData();
  const themeOptions = getAllMathThemes().map((theme) => ({
    id: theme.id,
    title: theme.title,
    accent: theme.accent,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/carte-des-maths"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand-strong"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Carte des maths
      </Link>

      <div className="mt-4 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
          Réseau
        </p>
        <h1 className="mt-3 font-serif text-[2.1rem] font-semibold text-ink sm:text-[2.6rem]">
          Graphe des dépendances
        </h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
          Chaque nœud est un résultat de la carte ; chaque flèche signifie
          « est utilisé dans la démonstration de ». Filtrez par thème, par type de
          résultat ou par difficulté, et cliquez sur un nœud pour voir où il vous mène.
        </p>
      </div>

      <DependencyGraph nodes={nodes} edges={edges} themeOptions={themeOptions} />
    </div>
  );
}
