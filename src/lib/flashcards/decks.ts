import type { FlashDeckMeta } from "@/types/flashcards";

/**
 * Référentiel des paquets de flash cards.
 *
 * Pour ajouter un paquet :
 *   1. ajoute une entrée ici (id, titre, description, ambiance,
 *      icône) ;
 *   2. crée src/lib/flashcards/data/<id>.ts, exportant
 *      `<id>Cards: Flashcard[]` ;
 *   3. enregistre ce fichier dans le registre de
 *      src/lib/flashcards/index.ts.
 *
 * Rien d'autre à modifier : la liste des paquets, leur page et le
 * sitemap se mettent à jour automatiquement.
 */
export const flashDecks: FlashDeckMeta[] = [
  {
    id: "probabilites",
    title: "Probabilités",
    description:
      "Mesure de probabilité, dénombrement, lois usuelles (binomiale, géométrique, Poisson, binomiale négative), espérance et variance, espaces Lⁿ.",
    ambiance: "prairie",
    icon: "Dice5",
  },
  {
    id: "analyse",
    title: "Analyse",
    description:
      "Intégrale de Riemann : fonctions intégrables (bornées, continues, monotones), pièges classiques — sous forme de QCM.",
    ambiance: "safran",
    icon: "FunctionSquare",
  },
  {
    id: "outils",
    title: "Outils d'étude locale",
    description:
      "Bornes sup/inf, voisinages, suites (limites, valeurs d'adhérence, O/o/∼), Bolzano-Weierstrass, continuité, accroissements finis, Taylor-Lagrange.",
    ambiance: "coquelicot",
    icon: "Ruler",
  },
  {
    id: "integrales",
    title: "Intégrales généralisées",
    description:
      "Convergence sur un intervalle non borné ou ouvert, intégrabilité, comparaison, règle des équivalents, intégration par parties et changement de variable généralisés, règle d'Abel.",
    ambiance: "indigo",
    icon: "AreaChart",
  },
  {
    id: "series",
    title: "Séries numériques",
    description:
      "Convergence d'une série, critère de Cauchy, convergence absolue, séries géométriques et de Riemann, comparaison et règle des équivalents, comparaison séries-intégrales.",
    ambiance: "prairie",
    icon: "Sigma",
  },
  {
    id: "td-integrales",
    title: "TD : Intégrales généralisées",
    description:
      "Feuille d'exercices (TD2) sur les intégrales généralisées : calculs explicites, étude de nature, intégration par parties, changements de variable, formules de récurrence, semi-convergence — solutions complètes et détaillées.",
    ambiance: "safran",
    icon: "PencilRuler",
  },
];

export function getDeckMeta(id: string): FlashDeckMeta | undefined {
  return flashDecks.find((d) => d.id === id);
}
