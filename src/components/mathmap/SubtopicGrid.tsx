import Link from "next/link";
import type { MathSubtopic, MathThemeMeta } from "@/types/mathmap";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES } from "./accent";

export function SubtopicGrid({
  theme,
  subtopics,
}: {
  theme: MathThemeMeta;
  subtopics: MathSubtopic[];
}) {
  if (subtopics.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-border bg-bg-card px-6 py-16 text-center">
        <p className="font-serif text-lg text-ink">Ce thème arrive bientôt</p>
        <p className="mt-2 text-sm text-muted">
          Les premiers sous-thèmes de « {theme.title} » sont en préparation.
        </p>
      </div>
    );
  }

  const accent = ACCENT_CLASSES[theme.accent];

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {subtopics.map((subtopic) => (
        <Link
          key={subtopic.id}
          href={`/carte-des-maths/${theme.id}/${subtopic.id}`}
          className="card-relief group flex flex-col rounded-2xl border border-border bg-bg-card p-6 transition-all hover:-translate-y-1 hover:border-matcha-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_16px_35px_-18px_rgba(26,19,68,0.4)]"
        >
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full font-serif text-lg font-semibold text-ink",
              accent.soft
            )}
          >
            {subtopic.results.length}
          </span>
          <p className="mt-4 font-serif text-[1.15rem] font-semibold text-ink">
            {subtopic.title}
          </p>
          {subtopic.description ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {subtopic.description}
            </p>
          ) : null}
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-muted">
            {subtopic.results.length === 0
              ? "À venir"
              : `${subtopic.results.length} résultat${subtopic.results.length !== 1 ? "s" : ""}`}
          </p>
        </Link>
      ))}
    </div>
  );
}
