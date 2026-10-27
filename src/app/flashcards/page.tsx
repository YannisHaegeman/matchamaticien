import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getAllDecks } from "@/lib/flashcards";
import { FLASHCARD_AMBIANCES } from "@/lib/flashcards/ambiances";

export const metadata: Metadata = {
  title: "Flash cards",
  description:
    "Des paquets de flash cards pour réviser par petites touches : une question, un indice si besoin, une réponse.",
};

export default function FlashcardsPage() {
  const decks = getAllDecks();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-strong">
        Réviser
      </p>
      <h1 className="mt-3 font-serif text-[2.1rem] font-extrabold text-ink sm:text-[2.6rem]">
        Flash cards
      </h1>
      <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
        Un paquet, une question à la fois : on y réfléchit, on jette un œil à
        l&rsquo;indice si besoin, puis on retourne la carte. De quoi réviser
        par petites touches, sans relire tout un cours.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {decks.map((deck) => {
          const palette = FLASHCARD_AMBIANCES[deck.ambiance];
          const Icon = (Icons[deck.icon as keyof typeof Icons] ??
            Icons.Layers) as LucideIcon;

          return (
            <Link
              key={deck.id}
              href={`/flashcards/${deck.id}`}
              className="card-relief group overflow-hidden rounded-[1.75rem] border border-border bg-bg-card transition hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_28px_-14px_rgba(26,19,68,0.3)]"
            >
              <div
                className="texture-grain flex h-28 items-center justify-between px-6"
                style={{ background: palette.ground }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: palette.panel, boxShadow: `inset 0 0 0 1px ${palette.line}` }}
                >
                  <Icon className="h-5 w-5" style={{ color: palette.ink }} strokeWidth={2} />
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.06em]"
                  style={{ background: palette.panel, color: palette.label, boxShadow: `inset 0 0 0 1px ${palette.line}` }}
                >
                  {deck.cards.length} carte{deck.cards.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="p-6">
                <p className="font-serif text-[1.15rem] font-extrabold text-ink">
                  {deck.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {deck.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-strong">
                  Réviser ce paquet
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
