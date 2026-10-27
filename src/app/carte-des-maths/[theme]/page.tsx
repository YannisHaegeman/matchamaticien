import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import {
  getAllMathThemes,
  getMathThemeFull,
  countThemeResults,
  getMathBreadcrumb,
} from "@/lib/mathmap";
import { MathBreadcrumb } from "@/components/mathmap/MathBreadcrumb";
import { SubtopicGrid } from "@/components/mathmap/SubtopicGrid";
import { ACCENT_CLASSES } from "@/components/mathmap/accent";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getAllMathThemes().map((theme) => ({ theme: theme.id }));
}

export async function generateMetadata(
  props: PageProps<"/carte-des-maths/[theme]">
): Promise<Metadata> {
  const { theme: themeId } = await props.params;
  const theme = getMathThemeFull(themeId);
  if (!theme) return {};
  return { title: theme.title, description: theme.description };
}

export default async function MathThemePage(
  props: PageProps<"/carte-des-maths/[theme]">
) {
  const { theme: themeId } = await props.params;
  const theme = getMathThemeFull(themeId);
  if (!theme) notFound();

  const Icon = (Icons[theme.icon as keyof typeof Icons] ??
    Icons.Sparkles) as LucideIcon;
  const accent = ACCENT_CLASSES[theme.accent];
  const count = countThemeResults(theme);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <MathBreadcrumb items={getMathBreadcrumb({ theme })} />

      <Link
        href="/carte-des-maths"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand-strong"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Retour à la carte
      </Link>

      <div className="mt-4 max-w-2xl">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            accent.solid
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <h1 className="mt-5 font-serif text-[2.1rem] font-semibold text-ink sm:text-[2.6rem]">
          {theme.title}
        </h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
          {theme.description}
        </p>
        {count > 0 ? (
          <p className="mt-2 text-sm text-muted">
            {count} résultat{count !== 1 ? "s" : ""} au total
          </p>
        ) : null}
      </div>

      <SubtopicGrid theme={theme} subtopics={theme.subtopics} />
    </div>
  );
}
