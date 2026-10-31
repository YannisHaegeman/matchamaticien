"use client";

import { useEffect } from "react";
import { X, GraduationCap } from "lucide-react";
import type { RenderedFlashcard } from "@/types/flashcards";
import { MathAnswer } from "@/components/mathmap/MathAnswer";

type AiState = "idle" | "loading" | "done" | "error";
type Verdict = "correct" | "partiel" | "incorrect";

const PAPER_BG = "#fffdf6";
const RULE_COLOR = "#c7d4ec";
const MARGIN_RED = "#d6453a";
const PRINT_INK = "#2b2620";

const VERDICT_STYLES: Record<
  Verdict,
  { label: string; color: string; bg: string; border: string }
> = {
  correct: { label: "Correct", color: "#14532d", bg: "rgba(34,197,94,0.16)", border: "rgba(34,197,94,0.4)" },
  partiel: {
    label: "Partiellement juste",
    color: "#78350f",
    bg: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.45)",
  },
  incorrect: { label: "À revoir", color: "#7f1d1d", bg: "rgba(244,63,94,0.14)", border: "rgba(244,63,94,0.4)" },
};

/**
 * Vue plein écran qui habille la saisie de réponse en "copie
 * d'examen" : papier ligné, marge rouge, en-tête Nom/Classe/Date,
 * énoncé affiché comme un sujet imprimé.
 *
 * La feuille lignée n'affiche QUE le rendu : c'est un bloc en lecture
 * seule (InlineMath), jamais un champ éditable, donc jamais de
 * curseur à aligner avec le texte compilé (c'était la source des
 * décalages visuels des versions précédentes, le LaTeX source et sa
 * version compilée n'ayant jamais la même longueur). La saisie réelle
 * se fait dans une case compacte, non lignée, juste en dessous — même
 * mécanique que le mode normal, pour ne pas dupliquer la logique.
 */
export function ExamPaperOverlay({
  open,
  onClose,
  card,
  deckTitle,
  index,
  total,
  userAnswer,
  onChangeAnswer,
  aiState,
  aiError,
  aiResult,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  card: RenderedFlashcard;
  deckTitle: string;
  index: number;
  total: number;
  userAnswer: string;
  onChangeAnswer: (value: string) => void;
  aiState: AiState;
  aiError: string | null;
  aiResult: { verdict: Verdict; feedback: string } | null;
  onSubmit: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const today = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(),
  );
  const verdictStyle = aiResult ? VERDICT_STYLES[aiResult.verdict] : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#120d2e]/85 p-3 backdrop-blur-sm sm:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[14px] font-bold text-cream hover:bg-white/15"
          >
            <X className="h-4 w-4" strokeWidth={2.4} />
            Fermer
          </button>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-cream/75">
            <GraduationCap className="h-4 w-4" strokeWidth={2.2} />
            Mode copie d&rsquo;examen
          </span>
        </div>

        {/* La copie : en-tête imprimé + feuille lignée, uniquement en lecture (le rendu LaTeX en direct) */}
        <div className="relative overflow-hidden rounded-[1.5rem] shadow-2xl" style={{ background: PAPER_BG }}>
          <div className="absolute inset-y-0 left-[56px] w-px sm:left-[72px]" style={{ background: MARGIN_RED }} />

          <div className="relative">
            <div className="border-b px-5 py-4 pl-[72px] sm:px-6 sm:pl-[88px]" style={{ borderColor: RULE_COLOR }}>
              <div
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-sans text-[12.5px] sm:text-[13px]"
                style={{ color: PRINT_INK }}
              >
                <span>
                  Nom :{" "}
                  <span className="inline-block w-24 border-b border-dotted sm:w-28" style={{ borderColor: `${PRINT_INK}66` }}>
                    &nbsp;
                  </span>
                </span>
                <span>
                  Classe :{" "}
                  <span className="inline-block w-16 border-b border-dotted sm:w-20" style={{ borderColor: `${PRINT_INK}66` }}>
                    &nbsp;
                  </span>
                </span>
                <span className="ml-auto">{today}</span>
              </div>
              <p
                className="m-0 mt-2.5 font-sans text-[12px] font-extrabold uppercase tracking-[0.06em]"
                style={{ color: PRINT_INK }}
              >
                {deckTitle} · Exercice n&deg; {index + 1} sur {total}
              </p>
              {card.context ? (
                <div
                  className="m-0 mt-1.5 font-sans text-[13px] italic leading-snug opacity-80 [&_p]:m-0 [&_p]:inline"
                  style={{ color: PRINT_INK }}
                >
                  {card.context}
                </div>
              ) : null}
              <div className="m-0 mt-1.5 font-sans text-[14.5px] font-semibold leading-snug [&_p]:m-0" style={{ color: PRINT_INK }}>
                {card.question}
              </div>
            </div>

            <div className="min-h-[32vh] px-5 py-4 pl-[72px] sm:px-6 sm:pl-[88px]">
              {userAnswer.trim() ? (
                <MathAnswer
                  text={userAnswer}
                  className="font-exam break-words text-[20px] leading-[35px] text-[#16225c] sm:text-[22px]"
                  textBlockStyle={{
                    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 34px, ${RULE_COLOR} 34px, ${RULE_COLOR} 35px)`,
                    backgroundPosition: "0 25px",
                  }}
                />
              ) : (
                <span className="font-sans text-[15px] italic opacity-40">
                  Ta réponse s&rsquo;affichera ici, compilée, au fur et à mesure… (astuce : entoure une formule de
                  doubles dollars, <code>$$...$$</code>, pour la centrer)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Saisie réelle : case compacte, non lignée, pour optimiser l'espace */}
        <div className="shrink-0 rounded-[1.25rem] bg-white/95 px-5 py-4 shadow-xl">
          <label
            htmlFor={`exam-answer-${card.id}`}
            className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#6b6151]"
          >
            Ta réponse
          </label>
          <textarea
            id={`exam-answer-${card.id}`}
            value={userAnswer}
            onChange={(e) => onChangeAnswer(e.target.value)}
            rows={4}
            placeholder="Rédige ta réponse ici (LaTeX accepté, ex. $\mathbb{P}(A)$)…"
            className="w-full resize-y rounded-xl bg-[#f6f3ea] px-3 py-2 text-[15px] leading-relaxed text-[#1b1612] outline-none"
            style={{ boxShadow: `inset 0 0 0 1px ${RULE_COLOR}` }}
          />
          <div className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onSubmit}
              disabled={aiState === "loading" || !userAnswer.trim()}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#d42a1c] px-5 py-2.5 text-[14px] font-extrabold text-[#faf5e9] disabled:opacity-50"
              style={{ textShadow: "0 1px 0 rgba(0,0,0,0.12)" }}
            >
              {aiState === "loading" ? "Correction en cours…" : "Corriger avec l'IA"}
            </button>
          </div>
          {aiState === "error" && aiError ? (
            <p className="m-0 mt-2 text-[14px] font-semibold" style={{ color: "#7f1d1d" }}>
              {aiError}
            </p>
          ) : null}
          {aiState === "done" && aiResult && verdictStyle ? (
            <div
              className="mt-3 flex flex-col gap-1 rounded-xl px-3.5 py-3"
              style={{ background: verdictStyle.bg, boxShadow: `inset 0 0 0 1px ${verdictStyle.border}` }}
            >
              <span className="text-[12px] font-extrabold uppercase tracking-[0.06em]" style={{ color: verdictStyle.color }}>
                {verdictStyle.label}
              </span>
              <p className="m-0 text-[14.5px] leading-relaxed" style={{ color: verdictStyle.color }}>
                {aiResult.feedback}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
