/**
 * Types de l'espace Flash cards.
 *
 * Même principe que la Carte des maths : aucune carte n'est codée en
 * dur dans un composant. Les paquets (« decks ») et leur contenu
 * vivent dans des objets typés sous src/lib/flashcards/, et les
 * composants de src/components/flashcards/ ne font que l'afficher.
 */
import type { ReactNode } from "react";

/** Palette ("ambiance") visuelle d'un paquet — voir src/lib/flashcards/ambiances.ts. */
export type FlashcardAmbiance = "prairie" | "coquelicot" | "safran" | "indigo";

export interface Flashcard {
  /** Unique au sein du paquet. */
  id: string;
  /**
   * Contexte optionnel affiché au-dessus de la question (énoncé,
   * rappel de notations...). Markdown/LaTeX, mêmes conventions que la
   * Carte des maths ($...$ / $$...$$).
   */
  context?: string;
  /** La question, affichée en grand et en gras. */
  question: string;
  /** Indice optionnel, révélé par un bouton sur la carte. */
  hint?: string;
  /** La réponse, affichée au dos de la carte. */
  answer: string;
  /** Remarque optionnelle affichée sous la réponse. */
  remark?: string;
  /** Référence affichée en coin de carte, ex. "TD 2 · Ex. 1.1". */
  source?: string;
}

export interface FlashDeckMeta {
  /** Unique sur tout le site, utilisé dans l'URL /flashcards/<id>. */
  id: string;
  /** Affiché en badge sur chaque carte et comme titre du paquet. */
  title: string;
  description: string;
  ambiance: FlashcardAmbiance;
  /** Nom d'icône lucide-react, pour la liste des paquets. */
  icon: string;
}

export interface FlashDeck extends FlashDeckMeta {
  cards: Flashcard[];
}

/**
 * Version "rendue" d'une Flashcard : les champs Markdown/LaTeX ont
 * déjà été transformés en JSX côté serveur (voir MathContent, qui
 * s'appuie sur MDXRemote — un composant serveur asynchrone). Le
 * lecteur de paquet (DeckPlayer, FlashCard) est un composant client,
 * qui a besoin d'état (carte courante, carte retournée...) ; il ne
 * peut donc pas rendre MDXRemote lui-même, et reçoit à la place ce
 * contenu déjà rendu par la page serveur qui l'appelle.
 */
export interface RenderedFlashcard {
  id: string;
  context?: ReactNode;
  question: ReactNode;
  hint?: ReactNode;
  answer: ReactNode;
  remark?: ReactNode;
  source?: string;
}
