import type { MathAccent } from "@/types/mathmap";

/**
 * Déclinaisons de chaque couleur d'accent utilisées par la Carte des
 * maths (bulles, badges, arêtes du graphe). S'appuie sur les tokens de
 * couleur déjà définis dans globals.css (matcha / espresso / gold),
 * aucune nouvelle couleur introduite.
 */
export const ACCENT_CLASSES: Record<
  MathAccent,
  { soft: string; solid: string; ring: string; stroke: string }
> = {
  matcha: {
    soft: "bg-matcha-500/15",
    solid: "bg-matcha-600 text-on-brand",
    ring: "ring-matcha-400",
    stroke: "var(--color-matcha-500)",
  },
  espresso: {
    soft: "bg-espresso-500/15",
    solid: "bg-espresso-600 text-on-brand",
    ring: "ring-espresso-400",
    stroke: "var(--color-espresso-500)",
  },
  gold: {
    soft: "bg-gold-500/15",
    solid: "bg-gold-500 text-on-brand",
    ring: "ring-gold-400",
    stroke: "var(--color-gold-500)",
  },
};
