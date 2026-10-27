"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { MathSearchItem } from "@/types/mathmap";
import { cn } from "@/lib/utils";
import { InlineMath } from "@/components/mathmap/InlineMath";

export function SearchModal({
  mathItems = [],
}: {
  /** Résultats de la Carte des maths (thèmes, sous-thèmes, théorèmes...). */
  mathItems?: MathSearchItem[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return mathItems
      .filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(q))
      .slice(0, 8)
      .map((item) => ({
        key: item.id,
        href: item.href,
        title: item.title,
        subtitle: `Carte des maths · ${item.themeTitle}`,
      }));
  }, [query, mathItems]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Rechercher dans la carte des maths"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft transition hover:border-brand hover:text-brand"
      >
        <Search className="h-[17px] w-[17px]" strokeWidth={1.75} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
          <div
            className="absolute inset-0 bg-matcha-950/40 backdrop-blur-sm animate-fade-in"
            onClick={() => close()}
          />
          <div className="relative w-full max-w-xl animate-fade-up overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-4 w-4 text-muted" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Chercher un thème, un théorème, une notion…"
                className="w-full bg-transparent text-[0.95rem] text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={() => close()}
                aria-label="Fermer la recherche"
                className="text-muted hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <p className="px-4 py-6 text-center text-sm text-muted">
                  Essayez « groupes », « corps fini », « Lagrange »…
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted">
                  Aucun résultat ne correspond à « {query} ».
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => close()}
                        className={cn(
                          "block rounded-xl px-4 py-3 transition hover:bg-brand-soft"
                        )}
                      >
                        <p className="font-serif text-[1.02rem] font-medium text-ink">
                          <InlineMath text={item.title} />
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-sm text-muted">
                          {item.subtitle}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
