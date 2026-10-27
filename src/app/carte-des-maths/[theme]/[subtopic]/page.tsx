import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAllMathThemes,
  getMathThemeFull,
  getMathSubtopic,
  getMathBreadcrumb,
  RESULT_TYPE_META,
} from "@/lib/mathmap";
import { MathBreadcrumb } from "@/components/mathmap/MathBreadcrumb";
import { ResultListCard } from "@/components/mathmap/ResultListCard";
import type { MathResult, ResultType } from "@/types/mathmap";

export function generateStaticParams() {
  return getAllMathThemes().flatMap((theme) =>
    theme.subtopics.map((subtopic) => ({ theme: theme.id, subtopic: subtopic.id }))
  );
}

export async function generateMetadata(
  props: PageProps<"/carte-des-maths/[theme]/[subtopic]">
): Promise<Metadata> {
  const { theme: themeId, subtopic: subtopicId } = await props.params;
  const theme = getMathThemeFull(themeId);
  const subtopic = theme && getMathSubtopic(themeId, subtopicId);
  if (!theme || !subtopic) return {};
  return {
    title: `${subtopic.title} · ${theme.title}`,
    description: subtopic.description ?? theme.description,
  };
}

export default async function MathSubtopicPage(
  props: PageProps<"/carte-des-maths/[theme]/[subtopic]">
) {
  const { theme: themeId, subtopic: subtopicId } = await props.params;
  const theme = getMathThemeFull(themeId);
  if (!theme) notFound();
  const subtopic = getMathSubtopic(themeId, subtopicId);
  if (!subtopic) notFound();

  const grouped = new Map<ResultType, MathResult[]>();
  for (const result of subtopic.results) {
    const list = grouped.get(result.type) ?? [];
    list.push(result);
    grouped.set(result.type, list);
  }
  const orderedTypes = Object.keys(RESULT_TYPE_META) as ResultType[];

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <MathBreadcrumb items={getMathBreadcrumb({ theme, subtopic })} />

      <Link
        href={`/carte-des-maths/${theme.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand-strong"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {theme.title}
      </Link>

      <h1 className="mt-4 font-serif text-[2rem] font-semibold text-ink sm:text-[2.4rem]">
        {subtopic.title}
      </h1>
      {subtopic.description ? (
        <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
          {subtopic.description}
        </p>
      ) : null}

      {subtopic.results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-bg-card px-6 py-16 text-center">
          <p className="font-serif text-lg text-ink">Aucun résultat pour l&rsquo;instant</p>
          <p className="mt-2 text-sm text-muted">
            Ce sous-thème arrive bientôt sur la Carte des maths.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {orderedTypes.map((type) => {
            const results = grouped.get(type);
            if (!results || results.length === 0) return null;
            return (
              <div key={type}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {RESULT_TYPE_META[type].plural}
                </p>
                <div className="mt-3 space-y-2.5">
                  {results.map((result) => (
                    <ResultListCard
                      key={result.id}
                      result={result}
                      themeId={theme.id}
                      subtopicId={subtopic.id}
                      accent={theme.accent}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
