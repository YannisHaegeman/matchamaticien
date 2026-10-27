"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { FlashDeck, RenderedFlashcard } from "@/types/flashcards";
import { FLASHCARD_AMBIANCES } from "@/lib/flashcards/ambiances";
import { FlashCard } from "./FlashCard";

/**
 * Lecteur d'un paquet : gère la carte courante et la navigation
 * précédent/suivant. La carte est remontée (clé = son id) à chaque
 * changement d'index, pour repartir à chaque fois côté "question"
 * sans avoir à propager l'état de retournement jusqu'ici.
 */
export function DeckPlayer({
  deck,
  cards,
}: {
  deck: FlashDeck;
  cards: RenderedFlashcard[];
}) {
  const [index, setIndex] = useState(0);
  const p = FLASHCARD_AMBIANCES[deck.ambiance];
  const card = cards[index];
  const total = cards.length;

  function go(delta: number) {
    setIndex((i) => Math.min(Math.max(i + delta, 0), total - 1));
  }

  return (
    <div
      className="texture-grain relative min-h-[calc(100vh-65px)] overflow-hidden"
      style={{ background: p.ground, overflowAnchor: "none" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Vagues en relief : trois bandes de collines superposées,
          chacune soulignée d'un filet de lumière (glow large +
          liseré net) qui dessine le relief de la crête — repris tel
          quel de l'esthétique d'origine des flash cards. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 580 580"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="wave-soft" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="wave-rim" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        <path
          d="M0 340 C 130 280, 290 370, 420 305 C 500 268, 550 262, 580 272 L580 0 L0 0 Z"
          fill={p.hillB}
        />
        <path
          d="M0 205 C 110 150, 250 240, 370 182 C 460 140, 530 120, 580 132 L580 0 L0 0 Z"
          fill={p.hillA}
        />
        <path
          d="M0 565 C 150 505, 320 548, 455 518 C 520 504, 560 500, 580 503 L580 580 L0 580 Z"
          fill={p.hillC}
        />
        <path
          d="M0 205 C 110 150, 250 240, 370 182 C 460 140, 530 120, 580 132"
          transform="translate(0 10)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={20}
          opacity={0.35}
          filter="url(#wave-soft)"
        />
        <path
          d="M0 205 C 110 150, 250 240, 370 182 C 460 140, 530 120, 580 132"
          transform="translate(0 2)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={2}
          opacity={0.8}
          filter="url(#wave-rim)"
        />
        <path
          d="M0 340 C 130 280, 290 370, 420 305 C 500 268, 550 262, 580 272"
          transform="translate(0 10)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={20}
          opacity={0.35}
          filter="url(#wave-soft)"
        />
        <path
          d="M0 340 C 130 280, 290 370, 420 305 C 500 268, 550 262, 580 272"
          transform="translate(0 2)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={2}
          opacity={0.8}
          filter="url(#wave-rim)"
        />
        <path
          d="M0 565 C 150 505, 320 548, 455 518 C 520 504, 560 500, 580 503"
          transform="translate(0 10)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={20}
          opacity={0.35}
          filter="url(#wave-soft)"
        />
        <path
          d="M0 565 C 150 505, 320 548, 455 518 C 520 504, 560 500, 580 503"
          transform="translate(0 2)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={2}
          opacity={0.8}
          filter="url(#wave-rim)"
        />
        <g transform="translate(545 468)">
          <circle cx="5" cy="4" r="3.6" fill="#1b1410" />
          <rect x="0.5" y="8" width="9" height="15" rx="3" fill={p.accent} />
          <rect x="1.5" y="21" width="7" height="14" rx="2" fill={p.legs} />
        </g>
      </svg>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/flashcards"
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-bold transition hover:opacity-80"
          style={{ background: p.panel, color: p.ink, boxShadow: `inset 0 0 0 1px ${p.line}` }}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
          Tous les paquets
        </Link>

        {card ? (
          <FlashCard
            key={card.id}
            card={card}
            ambiance={deck.ambiance}
            deckId={deck.id}
            deckTitle={deck.title}
            index={index}
            total={total}
          />
        ) : (
          <p className="text-center text-lg font-bold" style={{ color: p.ink }}>
            Ce paquet n&rsquo;a pas encore de carte.
          </p>
        )}

        {total > 1 ? (
          <div className="flex items-center justify-center gap-4">
            <NavButton onClick={() => go(-1)} disabled={index === 0} label="Carte précédente" p={p}>
              <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            </NavButton>

            {/* Un point par carte pour les petits paquets ; au-delà, les
                points deviendraient trop nombreux (ils débordaient du
                conteneur sur mobile) — on bascule sur une barre de
                progression, qui reste lisible quel que soit le nombre
                de cartes. */}
            {total <= 12 ? (
              <div className="flex max-w-[220px] flex-wrap items-center justify-center gap-1.5 sm:max-w-none">
                {cards.map((c, i) => (
                  <span
                    key={c.id}
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full transition"
                    style={{
                      background: i === index ? p.accent : p.line,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div
                className="h-1.5 w-36 overflow-hidden rounded-full sm:w-56"
                style={{ background: p.line }}
                role="progressbar"
                aria-valuenow={index + 1}
                aria-valuemin={1}
                aria-valuemax={total}
                aria-label={`Carte ${index + 1} sur ${total}`}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-300 ease-out"
                  style={{
                    width: `${((index + 1) / total) * 100}%`,
                    background: p.accent,
                  }}
                />
              </div>
            )}

            <NavButton
              onClick={() => go(1)}
              disabled={index === total - 1}
              label="Carte suivante"
              p={p}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
            </NavButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  p,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  p: (typeof FLASHCARD_AMBIANCES)[keyof typeof FLASHCARD_AMBIANCES];
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full transition disabled:opacity-30"
      style={{ background: p.panel, color: p.ink, boxShadow: `inset 0 0 0 1px ${p.line}` }}
    >
      {children}
    </button>
  );
}
