"use client";

import { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MathTheme } from "@/types/mathmap";
import { cn } from "@/lib/utils";
import { countThemeResults } from "@/lib/mathmap";
import { ACCENT_CLASSES } from "./accent";

function fallbackPosition(index: number, total: number) {
  const angle = (index / Math.max(total, 1)) * 2 * Math.PI - Math.PI / 2;
  return { x: 50 + 36 * Math.cos(angle), y: 50 + 32 * Math.sin(angle) };
}

/**
 * Carte constellation des grands thèmes (desktop) avec repli en liste
 * verticale (mobile). La position de chaque bulle vient de
 * `theme.position` (voir src/lib/mathmap/themes.ts) ; un thème sans
 * position déclarée est simplement placé automatiquement sur un cercle,
 * pour qu'ajouter un thème sans se soucier du layout reste possible.
 */
export function ThemeBubbleMap({ themes }: { themes: MathTheme[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const positioned = themes.map((theme, i) => ({
    theme,
    pos: theme.position ?? fallbackPosition(i, themes.length),
  }));

  const edgeKeys = new Set<string>();
  const edges: { a: (typeof positioned)[number]; b: (typeof positioned)[number] }[] =
    [];
  for (const item of positioned) {
    for (const targetId of item.theme.connections ?? []) {
      const target = positioned.find((p) => p.theme.id === targetId);
      if (!target) continue;
      const key = [item.theme.id, targetId].sort().join("|");
      if (edgeKeys.has(key)) continue;
      edgeKeys.add(key);
      edges.push({ a: item, b: target });
    }
  }

  const activeNeighbors = new Set<string>();
  if (hovered) {
    activeNeighbors.add(hovered);
    for (const edge of edges) {
      if (edge.a.theme.id === hovered) activeNeighbors.add(edge.b.theme.id);
      if (edge.b.theme.id === hovered) activeNeighbors.add(edge.a.theme.id);
    }
  }

  return (
    <div className="mt-10">
      {/* Desktop : carte constellation */}
      <div className="relative hidden aspect-[16/9] w-full md:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {edges.map((edge) => {
            const isActive = hovered
              ? activeNeighbors.has(edge.a.theme.id) &&
                activeNeighbors.has(edge.b.theme.id)
              : false;
            const dimmed = hovered !== null && !isActive;
            return (
              <line
                key={`${edge.a.theme.id}-${edge.b.theme.id}`}
                x1={edge.a.pos.x}
                y1={edge.a.pos.y}
                x2={edge.b.pos.x}
                y2={edge.b.pos.y}
                stroke={isActive ? "var(--color-matcha-500)" : "var(--color-border)"}
                strokeWidth={isActive ? 0.55 : 0.28}
                strokeOpacity={dimmed ? 0.3 : 1}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {positioned.map(({ theme, pos }) => {
          const accent = ACCENT_CLASSES[theme.accent];
          const Icon = (Icons[theme.icon as keyof typeof Icons] ??
            Icons.Sparkles) as LucideIcon;
          const dimmed = hovered !== null && !activeNeighbors.has(theme.id);
          const count = countThemeResults(theme);

          return (
            <Link
              key={theme.id}
              href={`/carte-des-maths/${theme.id}`}
              onMouseEnter={() => setHovered(theme.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(theme.id)}
              onBlur={() => setHovered(null)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={cn(
                "group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-opacity duration-300",
                dimmed && "opacity-40"
              )}
            >
              <span
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-full border-2 border-bg-elevated shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_30px_-12px_rgba(26,19,68,0.45)] transition-transform duration-300 ease-out group-hover:scale-110",
                  accent.solid
                )}
              >
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <span className="whitespace-nowrap rounded-full bg-bg-elevated px-3 py-1 text-center font-serif text-[0.92rem] font-semibold text-ink shadow-sm">
                {theme.shortTitle ?? theme.title}
              </span>
              <span className="text-[0.68rem] font-medium text-muted">
                {count > 0 ? `${count} résultats` : "À venir"}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Mobile : structure verticale */}
      <div className="grid gap-3 sm:grid-cols-2 md:hidden">
        {themes.map((theme) => {
          const accent = ACCENT_CLASSES[theme.accent];
          const Icon = (Icons[theme.icon as keyof typeof Icons] ??
            Icons.Sparkles) as LucideIcon;
          const count = countThemeResults(theme);
          return (
            <Link
              key={theme.id}
              href={`/carte-des-maths/${theme.id}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-bg-card p-4 transition hover:border-matcha-300"
            >
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                  accent.solid
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-serif text-[1rem] font-semibold text-ink">
                  {theme.title}
                </p>
                <p className="text-xs text-muted">
                  {count > 0 ? `${count} résultats` : "À venir"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
