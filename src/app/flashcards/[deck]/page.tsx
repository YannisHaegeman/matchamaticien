import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDeckMetas, getDeck } from "@/lib/flashcards";
import { DeckPlayer } from "@/components/flashcards/DeckPlayer";
import { MathContent } from "@/components/mathmap/MathContent";
import type { RenderedFlashcard } from "@/types/flashcards";

export function generateStaticParams() {
  return getAllDeckMetas().map((deck) => ({ deck: deck.id }));
}

export async function generateMetadata(
  props: PageProps<"/flashcards/[deck]">
): Promise<Metadata> {
  const { deck: deckId } = await props.params;
  const deck = getDeck(deckId);
  if (!deck) return {};
  return { title: deck.title, description: deck.description };
}

export default async function DeckPage(props: PageProps<"/flashcards/[deck]">) {
  const { deck: deckId } = await props.params;
  const deck = getDeck(deckId);
  if (!deck) notFound();

  // MDXRemote (next-mdx-remote/rsc) est un composant serveur
  // asynchrone : il doit être rendu ici, côté serveur, puis transmis
  // déjà rendu au lecteur de paquet (DeckPlayer), qui est un
  // composant client — voir RenderedFlashcard.
  const cards: RenderedFlashcard[] = deck.cards.map((card) => ({
    id: card.id,
    source: card.source,
    context: card.context ? <MathContent source={card.context} /> : undefined,
    question: <MathContent source={card.question} />,
    hint: card.hint ? <MathContent source={card.hint} /> : undefined,
    answer: <MathContent source={card.answer} />,
    remark: card.remark ? <MathContent source={card.remark} /> : undefined,
  }));

  return <DeckPlayer deck={deck} cards={cards} />;
}
