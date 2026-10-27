import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAllMathThemes,
  getMathThemeFull,
  getMathSubtopic,
  getResultWithLocation,
  getRelationsFor,
  getMathBreadcrumb,
  DIFFICULTY_META,
} from "@/lib/mathmap";
import { MathBreadcrumb } from "@/components/mathmap/MathBreadcrumb";
import { ResultCallout } from "@/components/mathmap/ResultCallout";
import { ResultProof } from "@/components/mathmap/ResultProof";
import { ResultRelations } from "@/components/mathmap/ResultRelations";
import { InlineMath } from "@/components/mathmap/InlineMath";
import { mathLabelText } from "@/lib/mathLabel";

export function generateStaticParams() {
  return getAllMathThemes().flatMap((theme) =>
    theme.subtopics.flatMap((subtopic) =>
      subtopic.results.map((result) => ({
        theme: theme.id,
        subtopic: subtopic.id,
        result: result.id,
      }))
    )
  );
}

export async function generateMetadata(
  props: PageProps<"/carte-des-maths/[theme]/[subtopic]/[result]">
): Promise<Metadata> {
  const { theme: themeId, subtopic: subtopicId, result: resultId } = await props.params;
  const entry = getResultWithLocation(resultId);
  if (
    !entry ||
    entry.location.themeId !== themeId ||
    entry.location.subtopicId !== subtopicId
  ) {
    return {};
  }
  return {
    title: mathLabelText(entry.result.title),
    description: `${entry.location.themeTitle} · ${entry.location.subtopicTitle}`,
  };
}

export default async function MathResultPage(
  props: PageProps<"/carte-des-maths/[theme]/[subtopic]/[result]">
) {
  const { theme: themeId, subtopic: subtopicId, result: resultId } = await props.params;
  const theme = getMathThemeFull(themeId);
  const subtopic = theme ? getMathSubtopic(themeId, subtopicId) : undefined;
  const entry = getResultWithLocation(resultId);

  if (
    !theme ||
    !subtopic ||
    !entry ||
    entry.location.themeId !== themeId ||
    entry.location.subtopicId !== subtopicId
  ) {
    notFound();
  }

  const { result } = entry;
  const { outgoing, incoming } = getRelationsFor(result.id);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <MathBreadcrumb
        items={getMathBreadcrumb({ theme, subtopic, resultTitle: result.title })}
      />

      <Link
        href={`/carte-des-maths/${theme.id}/${subtopic.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand-strong"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {subtopic.title}
      </Link>

      {result.difficulty ? (
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {DIFFICULTY_META[result.difficulty].label}
        </p>
      ) : null}

      <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-tight text-ink sm:text-[2.4rem]">
        <InlineMath text={result.title} />
      </h1>

      <div className="article-prose mt-8">
        <ResultCallout result={result} />
        {result.proof ? <ResultProof proof={result.proof} /> : null}
      </div>

      <ResultRelations outgoing={outgoing} incoming={incoming} />
    </div>
  );
}
