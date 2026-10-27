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
];

export function getDeckMeta(id: string): FlashDeckMeta | undefined {
  return flashDecks.find((d) => d.id === id);
}
