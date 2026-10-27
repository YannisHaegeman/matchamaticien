"use client";

import { useMemo } from "react";
import katex from "katex";

/**
 * Affiche un texte pouvant mélanger prose et maths en ligne ($...$),
 * avec un rendu KaTeX correct — utilisé pour les titres de résultats
 * partout où ils apparaissent hors du corps d'un énoncé/démonstration
 * (cartes, fil d'Ariane, panneau du graphe...), pour ne jamais laisser
 * transparaître du LaTeX brut à l'écran.
 *
 * Sans aucun `$` dans le texte, le rendu est identique à un simple texte.
 */
export function InlineMath({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => {
    if (!text.includes("$")) return null;
    return text.replace(/\$([^$]+)\$/g, (_, expr: string) => {
      try {
        return katex.renderToString(expr, { throwOnError: false, displayMode: false });
      } catch {
        return expr;
      }
    });
  }, [text]);

  if (html === null) return <span className={className}>{text}</span>;
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
