"use client";

import { useState } from "react";
import { GraduationCap, Lightbulb, Pencil, RotateCcw } from "lucide-react";
import type { RenderedFlashcard, FlashcardAmbiance } from "@/types/flashcards";
import { FLASHCARD_AMBIANCES } from "@/lib/flashcards/ambiances";
import { MathAnswer } from "@/components/mathmap/MathAnswer";
import { ExamPaperOverlay } from "@/components/flashcards/ExamPaperOverlay";

type AiState = "idle" | "loading" | "done" | "error";
type Verdict = "correct" | "partiel" | "incorrect";

const VERDICT_STYLES: Record<
  Verdict,
  { label: string; color: string; bg: string; border: string }
> = {
  correct: {
    label: "Correct",
    color: "#14532d",
    bg: "rgba(34,197,94,0.16)",
    border: "rgba(34,197,94,0.4)",
  },
  partiel: {
    label: "Partiellement juste",
    color: "#78350f",
    bg: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.45)",
  },
  incorrect: {
    label: "À revoir",
    color: "#7f1d1d",
    bg: "rgba(244,63,94,0.14)",
    border: "rgba(244,63,94,0.4)",
  },
};

/**
 * La carte elle-même : un "jeton" arrondi, texturé (grain), qui
 * bascule entre la question et la réponse. On a abandonné le flip 3D
 * (perspective + rotateY) : sur Safari, cette approche faisait
 * descendre toute la carte à chaque retournement (bug de scroll lié
 * au rendu 3D, non résolu malgré plusieurs correctifs ciblés). Ici,
 * une seule face est montée à la fois dans un conteneur de hauteur
 * fixe, avec un simple fondu : la carte ne peut plus bouger, par
 * construction. Le rendu des maths passe par le même pipeline KaTeX
 * que la Carte des maths (voir MathContent).
 *
 * En plus du corrigé figé, la face question propose de taper sa
 * propre réponse et de la faire corriger par l'IA (voir
 * src/app/api/check-answer/route.ts) : la clé API reste côté
 * serveur, le client n'envoie que l'id du paquet/de la carte et le
 * texte tapé.
 */
export function FlashCard({
  card,
  ambiance,
  deckId,
  deckTitle,
  index,
  total,
}: {
  card: RenderedFlashcard;
  ambiance: FlashcardAmbiance;
  deckId: string;
  deckTitle: string;
  index: number;
  total: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [aiState, setAiState] = useState<AiState>("idle");
  const [aiResult, setAiResult] = useState<{ verdict: Verdict; feedback: string } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showExamPaper, setShowExamPaper] = useState(false);
  const p = FLASHCARD_AMBIANCES[ambiance];

  const panelStyle = {
    background: p.panel,
    boxShadow: `inset 0 0 0 1px ${p.line}`,
  };

  const faceStyle = {
    background: p.card,
    color: p.ink,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.08), 0 36px 60px -24px ${p.shadow}, 0 16px 28px -14px rgba(0,0,0,0.3)`,
  };

  async function handleCheckAnswer() {
    if (!userAnswer.trim() || aiState === "loading") return;
    setAiState("loading");
    setAiError(null);
    try {
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deckId, cardId: card.id, userAnswer }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error || "La correction a échoué, réessaie.");
        setAiState("error");
        return;
      }
      setAiResult({ verdict: data.verdict as Verdict, feedback: data.feedback as string });
      setAiState("done");
    } catch {
      setAiError("Impossible de contacter le serveur.");
      setAiState("error");
    }
  }

  const verdictStyle = aiResult ? VERDICT_STYLES[aiResult.verdict] : null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative h-[460px] sm:h-[560px]">
        {!flipped ? (
          // Face avant — question
          <div
            key="front"
            className="texture-grain animate-fade-in absolute inset-0 flex flex-col gap-4 overflow-hidden rounded-[2.75rem] p-7 sm:p-9"
            style={faceStyle}
          >
            <CardHeader p={p} deckTitle={deckTitle} index={index} total={total} />

            <div className="flex min-h-0 flex-1 flex-col justify-center gap-3.5 overflow-auto">
              {card.context ? (
                <div
                  className="rounded-[1.25rem] px-4 py-3.5 text-[15px] leading-relaxed [&_p]:m-0 [&_p]:inline"
                  style={panelStyle}
                >
                  <span className="font-extrabold" style={{ color: p.label }}>
                    Contexte ·{" "}
                  </span>
                  {card.context}
                </div>
              ) : null}

              <div className="m-0 text-[1.55rem] font-extrabold leading-snug sm:text-[1.75rem] [&_p]:m-0">
                {card.question}
              </div>

              {showHint && card.hint ? (
                <div
                  className="rounded-[1.25rem] px-4 py-3.5 text-[15px] leading-relaxed [&_p]:m-0 [&_p]:inline"
                  style={{
                    ...panelStyle,
                    boxShadow: `inset 0 0 0 1px ${p.line}, 0 8px 18px -10px rgba(0,0,0,0.35)`,
                  }}
                >
                  <span className="font-extrabold" style={{ color: p.label }}>
                    Indice ·{" "}
                  </span>
                  {card.hint}
                </div>
              ) : null}

              {showAnswerInput ? (
                <div
                  className="flex flex-col gap-2.5 rounded-[1.25rem] px-4 py-3.5"
                  style={panelStyle}
                >
                  <label
                    htmlFor={`answer-${card.id}`}
                    className="text-[13px] font-extrabold uppercase tracking-[0.06em]"
                    style={{ color: p.label }}
                  >
                    Ta réponse
                  </label>
                  <textarea
                    id={`answer-${card.id}`}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    rows={4}
                    placeholder="Rédige ta réponse ici (LaTeX accepté, ex. $\mathbb{P}(A)$)…"
                    className="w-full resize-y rounded-xl bg-white/85 px-3 py-2 text-[15px] leading-relaxed text-[#1b1612] outline-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${p.line}` }}
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-[11px] font-extrabold uppercase tracking-[0.08em]"
                      style={{ color: p.inkSoft }}
                    >
                      Aperçu
                    </span>
                    <div
                      className="min-h-[2.5rem] rounded-xl bg-white/60 px-3 py-2 text-[15px] leading-relaxed text-[#1b1612]"
                      style={{ boxShadow: `inset 0 0 0 1px ${p.line}` }}
                    >
                      {userAnswer.trim() ? (
                        <MathAnswer text={userAnswer} />
                      ) : (
                        <span className="italic opacity-50">Ta réponse s&rsquo;affichera ici au fur et à mesure…</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCheckAnswer}
                      disabled={aiState === "loading" || !userAnswer.trim()}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-extrabold disabled:opacity-50"
                      style={{
                        background: `linear-gradient(180deg, ${p.accentTop} 0%, ${p.accent} 100%)`,
                        color: p.btnInk,
                        textShadow: "0 1px 0 rgba(0,0,0,0.12)",
                      }}
                    >
                      {aiState === "loading" ? "Correction en cours…" : "Corriger avec l'IA"}
                    </button>
                  </div>
                  {aiState === "error" && aiError ? (
                    <p className="m-0 text-[14px] font-semibold" style={{ color: "#7f1d1d" }}>
                      {aiError}
                    </p>
                  ) : null}
                  {aiState === "done" && aiResult && verdictStyle ? (
                    <div
                      className="flex flex-col gap-1 rounded-xl px-3.5 py-3"
                      style={{
                        background: verdictStyle.bg,
                        boxShadow: `inset 0 0 0 1px ${verdictStyle.border}`,
                      }}
                    >
                      <span
                        className="text-[12px] font-extrabold uppercase tracking-[0.06em]"
                        style={{ color: verdictStyle.color }}
                      >
                        {verdictStyle.label}
                      </span>
                      <p className="m-0 text-[14.5px] leading-relaxed" style={{ color: verdictStyle.color }}>
                        {aiResult.feedback}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-end gap-3">
              {card.hint ? (
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 py-3 text-[15px] font-bold"
                  style={{
                    border: `1px solid ${p.line}`,
                    background: p.panel,
                    color: p.ink,
                    boxShadow: "0 8px 16px -10px rgba(0,0,0,0.4)",
                  }}
                >
                  <Lightbulb className="h-4 w-4" strokeWidth={2.2} />
                  {showHint ? "Masquer l'indice" : "Voir l'indice"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setShowAnswerInput((s) => !s)}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 py-3 text-[15px] font-bold"
                style={{
                  border: `1px solid ${p.line}`,
                  background: p.panel,
                  color: p.ink,
                  boxShadow: "0 8px 16px -10px rgba(0,0,0,0.4)",
                }}
              >
                <Pencil className="h-4 w-4" strokeWidth={2.2} />
                {showAnswerInput ? "Masquer ma réponse" : "Taper ma réponse"}
              </button>
              {showAnswerInput ? (
                <button
                  type="button"
                  onClick={() => setShowExamPaper(true)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 py-3 text-[15px] font-bold"
                  style={{
                    border: `1px solid ${p.line}`,
                    background: p.panel,
                    color: p.ink,
                    boxShadow: "0 8px 16px -10px rgba(0,0,0,0.4)",
                  }}
                >
                  <GraduationCap className="h-4 w-4" strokeWidth={2.2} />
                  Mode copie d&rsquo;examen
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="btn-3d ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-extrabold"
                style={{
                  background: `linear-gradient(180deg, ${p.accentTop} 0%, ${p.accent} 100%)`,
                  color: p.btnInk,
                  textShadow: "0 1px 0 rgba(0,0,0,0.12)",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.12), 0 5px 0 ${p.accentEdge}, 0 16px 24px -10px ${p.shadow}`,
                }}
              >
                Voir la réponse
              </button>
            </div>
            {card.source ? (
              <p
                className="m-0 text-right text-[11px] font-semibold leading-tight"
                style={{ color: p.inkSoft }}
              >
                {card.source}
              </p>
            ) : null}
          </div>
        ) : (
          // Face arrière — réponse
          <div
            key="back"
            className="texture-grain animate-fade-in absolute inset-0 flex flex-col gap-4 overflow-hidden rounded-[2.75rem] p-7 sm:p-9"
            style={faceStyle}
          >
            <CardHeader p={p} deckTitle={deckTitle} index={index} total={total} />

            <div className="flex min-h-0 flex-1 flex-col justify-center gap-3.5 overflow-auto">
              <div
                className="text-[13px] font-extrabold uppercase tracking-[0.08em]"
                style={{ color: p.inkSoft }}
              >
                Réponse
              </div>
              <div className="m-0 text-[1.2rem] font-extrabold leading-snug sm:text-[1.35rem] [&_p]:m-0">
                {card.answer}
              </div>
              {card.remark ? (
                <div
                  className="rounded-[1.25rem] px-4 py-3.5 text-[15px] leading-relaxed [&_p]:m-0 [&_p]:inline"
                  style={panelStyle}
                >
                  <span className="font-extrabold" style={{ color: p.label }}>
                    Remarque ·{" "}
                  </span>
                  {card.remark}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 py-3 text-[15px] font-bold"
                style={{
                  border: `1px solid ${p.line}`,
                  background: p.panel,
                  color: p.ink,
                  boxShadow: "0 8px 16px -10px rgba(0,0,0,0.4)",
                }}
              >
                <RotateCcw className="h-4 w-4" strokeWidth={2.2} />
                Revoir la question
              </button>
              {card.source ? (
                <p
                  className="m-0 ml-auto text-right text-[11px] font-semibold leading-tight"
                  style={{ color: p.inkSoft }}
                >
                  {card.source}
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <ExamPaperOverlay
        open={showExamPaper}
        onClose={() => setShowExamPaper(false)}
        card={card}
        deckTitle={deckTitle}
        index={index}
        total={total}
        userAnswer={userAnswer}
        onChangeAnswer={setUserAnswer}
        aiState={aiState}
        aiError={aiError}
        aiResult={aiResult}
        onSubmit={handleCheckAnswer}
      />
    </div>
  );
}

function CardHeader({
  p,
  deckTitle,
  index,
  total,
}: {
  p: (typeof FLASHCARD_AMBIANCES)[FlashcardAmbiance];
  deckTitle: string;
  index: number;
  total: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className="rounded-full px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.04em]"
        style={{ background: p.panel, boxShadow: `inset 0 0 0 1px ${p.line}`, color: p.label }}
      >
        {deckTitle}
      </span>
      <span className="text-[13px] font-extrabold" style={{ color: p.inkSoft }}>
        {index + 1} / {total}
      </span>
    </div>
  );
}
