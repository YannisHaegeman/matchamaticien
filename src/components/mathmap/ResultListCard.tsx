import Link from "next/link";
import { DIFFICULTY_META, resultHref } from "@/lib/mathmap";
import { ResultTypeBadge } from "./ResultTypeBadge";
import { InlineMath } from "./InlineMath";
import type { MathAccent, MathResult } from "@/types/mathmap";

export function ResultListCard({
  result,
  themeId,
  subtopicId,
  accent,
}: {
  result: MathResult;
  themeId: string;
  subtopicId: string;
  accent: MathAccent;
}) {
  return (
    <Link
      href={resultHref({ themeId, subtopicId, id: result.id })}
      className="card-relief group flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-matcha-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_14px_30px_-18px_rgba(26,19,68,0.35)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <ResultTypeBadge type={result.type} accent={accent} className="shrink-0" />
        <p className="truncate font-serif text-[1.02rem] font-medium text-ink transition-colors group-hover:text-brand-strong">
          <InlineMath text={result.title} />
        </p>
      </div>
      {result.difficulty ? (
        <span className="shrink-0 text-xs font-medium text-muted">
          {DIFFICULTY_META[result.difficulty].label}
        </span>
      ) : null}
    </Link>
  );
}
