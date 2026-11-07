"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import type { FlashcardAmbiance } from "@/types/flashcards";
import type { QcmQuestion } from "@/types/qcm";
import { FLASHCARD_AMBIANCES } from "@/lib/flashcards/ambiances";
import { MathAnswer } from "@/components/mathmap/MathAnswer";

type Answer = {
  selected: Set<string>;
  validated: boolean;
};

/**
 * Mélange déterministe (sans dépendance externe) : les options d'une
 * question sont toujours dans le même ordre pour un id de question
 * donné, mais cet ordre n'est pas celui du document source — on évite
 * ainsi que la bonne réponse se devine par sa position (ex. toujours
 * en deuxième position).
 */
function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function QcmPlayer({ questions }: { questions: QcmQuestion[] }) {
  const ambiance: FlashcardAmbiance = "indigo";
  const p = FLASHCARD_AMBIANCES[ambiance];
  const total = questions.length;

  const shuffled = useMemo(
    () => questions.map((q) => ({ ...q, options: seededShuffle(q.options, q.id) })),
    [questions],
  );

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState(false);

  const question = shuffled[index];
  const current: Answer = answers[question?.id] ?? { selected: new Set(), validated: false };

  function setCurrent(next: Answer) {
    setAnswers((prev) => ({ ...prev, [question.id]: next }));
  }

  function toggleOption(optionId: string) {
    if (current.validated) return;
    const nextSelected = new Set(current.selected);
    if (nextSelected.has(optionId)) nextSelected.delete(optionId);
    else nextSelected.add(optionId);
    setCurrent({ selected: nextSelected, validated: false });
  }

  function validate() {
    if (current.selected.size === 0) return;
    setCurrent({ ...current, validated: true });
  }

  function go(delta: number) {
    const nextIndex = index + delta;
    if (nextIndex < 0) return;
    if (nextIndex >= total) {
      setFinished(true);
      return;
    }
    setIndex(nextIndex);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setFinished(false);
  }

  const answeredCount = Object.values(answers).filter((a) => a.validated).length;
  const correctCount = Object.entries(answers).filter(([qId, a]) => {
    if (!a.validated) return false;
    const q = shuffled.find((x) => x.id === qId);
    if (!q) return false;
    const correctIds = new Set(q.options.filter((o) => o.correct).map((o) => o.id));
    if (correctIds.size !== a.selected.size) return false;
    for (const id of correctIds) if (!a.selected.has(id)) return false;
    return true;
  }).length;

  return (
    <div
      className="texture-grain relative min-h-[calc(100vh-65px)] overflow-hidden"
      style={{ background: p.ground, overflowAnchor: "none" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
        {index === 0 && !finished && Object.keys(answers).length === 0 ? (
          <div
            className="rounded-[1.5rem] px-5 py-4 text-[14px] leading-relaxed"
            style={{ background: p.panel, color: p.ink, boxShadow: `inset 0 0 0 1px ${p.line}` }}
          >
            <span className="font-extrabold" style={{ color: p.label }}>
              QCM de rédaction mathématique ·{" "}
            </span>
            Pour chaque question, coche la ou les rédactions correctes (il peut y en avoir
            plusieurs), puis valide pour voir la correction et l&rsquo;explication.
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/flashcards"
            className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-bold transition hover:opacity-80"
            style={{ background: p.panel, color: p.ink, boxShadow: `inset 0 0 0 1px ${p.line}` }}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
            Retour
          </Link>
          {answeredCount > 0 ? (
            <span
              className="rounded-full px-4 py-2 text-[13px] font-extrabold"
              style={{ background: p.panel, color: p.ink, boxShadow: `inset 0 0 0 1px ${p.line}` }}
            >
              {correctCount} / {answeredCount} correctes
            </span>
          ) : null}
        </div>

        {finished ? (
          <ResultScreen p={p} correct={correctCount} answered={answeredCount} total={total} onRestart={restart} />
        ) : question ? (
          <QuestionCard
            key={question.id}
            p={p}
            question={question}
            index={index}
            total={total}
            answer={current}
            onToggle={toggleOption}
            onValidate={validate}
          />
        ) : null}

        {!finished ? (
          <div className="flex items-center justify-center gap-4">
            <NavButton onClick={() => go(-1)} disabled={index === 0} label="Question précédente" p={p}>
              <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            </NavButton>

            <div
              className="h-1.5 w-36 overflow-hidden rounded-full sm:w-56"
              style={{ background: p.line }}
              role="progressbar"
              aria-valuenow={index + 1}
              aria-valuemin={1}
              aria-valuemax={total}
              aria-label={`Question ${index + 1} sur ${total}`}
            >
              <div
                className="h-full rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${((index + 1) / total) * 100}%`, background: p.accent }}
              />
            </div>

            <NavButton
              onClick={() => go(1)}
              disabled={false}
              label={index === total - 1 ? "Terminer le QCM" : "Question suivante"}
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

function QuestionCard({
  p,
  question,
  index,
  total,
  answer,
  onToggle,
  onValidate,
}: {
  p: (typeof FLASHCARD_AMBIANCES)[FlashcardAmbiance];
  question: QcmQuestion;
  index: number;
  total: number;
  answer: Answer;
  onToggle: (optionId: string) => void;
  onValidate: () => void;
}) {
  const isFullyCorrect = useMemo(() => {
    if (!answer.validated) return false;
    const correctIds = new Set(question.options.filter((o) => o.correct).map((o) => o.id));
    if (correctIds.size !== answer.selected.size) return false;
    for (const id of correctIds) if (!answer.selected.has(id)) return false;
    return true;
  }, [answer, question.options]);

  const faceStyle = {
    background: p.card,
    color: p.ink,
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.08), 0 36px 60px -24px " +
      p.shadow +
      ", 0 16px 28px -14px rgba(0,0,0,0.3)",
  };

  return (
    <div
      className="texture-grain animate-fade-in flex flex-col gap-4 overflow-hidden rounded-[2.75rem] p-7 sm:p-9"
      style={faceStyle}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="rounded-full px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.04em]"
          style={{ background: p.panel, boxShadow: `inset 0 0 0 1px ${p.line}`, color: p.label }}
        >
          QCM rédaction
        </span>
        <span className="text-[13px] font-extrabold" style={{ color: p.inkSoft }}>
          {index + 1} / {total}
        </span>
      </div>

      <div
        className="w-fit rounded-full px-3.5 py-1.5 text-[12.5px] font-extrabold [&_div]:m-0"
        style={{ background: p.panel, color: p.label, boxShadow: `inset 0 0 0 1px ${p.line}` }}
      >
        <MathAnswer text={question.section} />
      </div>

      <div className="m-0 text-[1.2rem] font-extrabold leading-snug sm:text-[1.35rem]">
        <MathAnswer text={question.prompt} />
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = answer.selected.has(option.id);
          let ring = p.line;
          let bg = p.panel;
          if (answer.validated) {
            if (option.correct) {
              ring = "rgba(34,197,94,0.75)";
              bg = "rgba(34,197,94,0.16)";
            } else if (isSelected) {
              ring = "rgba(244,63,94,0.75)";
              bg = "rgba(244,63,94,0.16)";
            }
          } else if (isSelected) {
            ring = p.accent;
          }
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              disabled={answer.validated}
              className="flex items-start gap-3 rounded-[1.25rem] px-4 py-3.5 text-left text-[15px] leading-relaxed transition disabled:cursor-default"
              style={{ background: bg, boxShadow: `inset 0 0 0 2px ${ring}` }}
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] text-[13px] font-black"
                style={{
                  background: isSelected ? p.accent : "transparent",
                  color: isSelected ? p.btnInk : p.ink,
                  boxShadow: `inset 0 0 0 2px ${isSelected ? p.accent : p.line}`,
                }}
                aria-hidden="true"
              >
                {isSelected ? "✓" : ""}
              </span>
              <span className="flex-1">
                <MathAnswer text={option.text} />
              </span>
              {answer.validated && option.correct ? (
                <span className="shrink-0 text-[13px] font-extrabold" style={{ color: "#16a34a" }}>
                  ✓
                </span>
              ) : null}
              {answer.validated && !option.correct && isSelected ? (
                <span className="shrink-0 text-[13px] font-extrabold" style={{ color: "#e11d48" }}>
                  ✗
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {!answer.validated ? (
        <button
          type="button"
          onClick={onValidate}
          disabled={answer.selected.size === 0}
          className="btn-3d mt-1 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-extrabold disabled:opacity-50"
          style={{
            background: `linear-gradient(180deg, ${p.accentTop} 0%, ${p.accent} 100%)`,
            color: p.btnInk,
            textShadow: "0 1px 0 rgba(0,0,0,0.12)",
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.12), 0 5px 0 ${p.accentEdge}, 0 16px 24px -10px ${p.shadow}`,
          }}
        >
          Valider ma réponse
        </button>
      ) : (
        // Fond clair et quasi opaque (plutôt qu'une teinte translucide
        // posée sur la carte, trop sombre selon l'ambiance pour un
        // texte foncé) : le contraste reste bon quelle que soit la
        // couleur de fond du paquet (ex. indigo, très sombre).
        <div
          className="flex flex-col gap-1.5 rounded-[1.25rem] px-4 py-3.5"
          style={{
            background: isFullyCorrect ? "rgba(236,253,245,0.96)" : "rgba(255,241,242,0.96)",
            boxShadow: `inset 0 0 0 1px ${isFullyCorrect ? "rgba(34,197,94,0.5)" : "rgba(244,63,94,0.5)"}`,
          }}
        >
          <span
            className="text-[12px] font-extrabold uppercase tracking-[0.06em]"
            style={{ color: isFullyCorrect ? "#14532d" : "#7f1d1d" }}
          >
            {isFullyCorrect ? "Exact !" : "Pas tout à fait"}
          </span>
          <div
            className="text-[14.5px] leading-relaxed"
            style={{ color: isFullyCorrect ? "#14532d" : "#7f1d1d" }}
          >
            <MathAnswer text={question.explanation} />
          </div>
        </div>
      )}
    </div>
  );
}

function ResultScreen({
  p,
  correct,
  answered,
  total,
  onRestart,
}: {
  p: (typeof FLASHCARD_AMBIANCES)[FlashcardAmbiance];
  correct: number;
  answered: number;
  total: number;
  onRestart: () => void;
}) {
  return (
    <div
      className="texture-grain animate-fade-in flex flex-col items-center gap-5 overflow-hidden rounded-[2.75rem] p-8 text-center sm:p-10"
      style={{
        background: p.card,
        color: p.ink,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.08), 0 36px 60px -24px ${p.shadow}`,
      }}
    >
      <span
        className="rounded-full px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em]"
        style={{ background: p.panel, color: p.label, boxShadow: `inset 0 0 0 1px ${p.line}` }}
      >
        QCM terminé
      </span>
      <p className="m-0 font-serif text-[1.8rem] font-extrabold">
        {correct} / {answered || total} bonnes réponses
      </p>
      <p className="m-0 max-w-sm text-[15px] leading-relaxed" style={{ color: p.inkSoft }}>
        {answered < total
          ? `Tu as répondu à ${answered} question${answered > 1 ? "s" : ""} sur ${total}.`
          : "Tu as répondu à toutes les questions."}
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="btn-3d inline-flex min-h-11 items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-extrabold"
        style={{
          background: `linear-gradient(180deg, ${p.accentTop} 0%, ${p.accent} 100%)`,
          color: p.btnInk,
          textShadow: "0 1px 0 rgba(0,0,0,0.12)",
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.12), 0 5px 0 ${p.accentEdge}, 0 16px 24px -10px ${p.shadow}`,
        }}
      >
        <RotateCcw className="h-4 w-4" strokeWidth={2.2} />
        Recommencer
      </button>
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
