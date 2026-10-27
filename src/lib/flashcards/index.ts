import { flashDecks, getDeckMeta } from "./decks";
import { probabilitesCards } from "./data/probabilites";
import type { Flashcard, FlashDeck, FlashDeckMeta } from "@/types/flashcards";

/**
 * Registre central : associe chaque id de paquet (déclaré dans
 * decks.ts) à son fichier de cartes. C'est le seul endroit, en dehors
 * de decks.ts, qu'il faut toucher pour enregistrer un nouveau paquet.
 */
const deckCards: Record<string, Flashcard[]> = {
  probabilites: probabilitesCards,
};

export function getAllDeckMetas(): FlashDeckMeta[] {
  return flashDecks;
}

export function getAllDecks(): FlashDeck[] {
  return flashDecks.map((meta) => ({
    ...meta,
    cards: deckCards[meta.id] ?? [],
  }));
}

export function getDeck(id: string): FlashDeck | undefined {
  const meta = getDeckMeta(id);
  if (!meta) return undefined;
  return { ...meta, cards: deckCards[meta.id] ?? [] };
}
