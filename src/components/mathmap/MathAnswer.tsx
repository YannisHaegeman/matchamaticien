"use client";

import { useMemo, type CSSProperties } from "react";
import katex from "katex";

const DISPLAY_PATTERN = /\n?\$\$([\s\S]+?)\$\$\n?/g;
const INLINE_PATTERN = /\$([^$]+)\$/g;

function renderInlineHtml(text: string): string {
  return text.replace(INLINE_PATTERN, (_, expr: string) => {
    try {
      return katex.renderToString(expr, { throwOnError: false, displayMode: false });
    } catch {
      return expr;
    }
  });
}

type Segment = { type: "text"; content: string } | { type: "display"; html: string };

function splitSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  DISPLAY_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = DISPLAY_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    const expr = match[1].trim();
    let html: string;
    try {
      html = katex.renderToString(expr, { throwOnError: false, displayMode: true });
    } catch {
      html = expr;
    }
    segments.push({ type: "display", html });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }
  return segments;
}

/**
 * Comme InlineMath (maths en ligne via $...$), mais reconnaît en plus
 * les blocs $$...$$ comme des formules "affichées" : centrées, sur
 * leur propre ligne, qui n'ont pas à respecter la hauteur d'une
 * simple ligne de texte (contrairement aux maths en ligne, qui
 * doivent rester compactes pour ne pas déborder d'une ligne de la
 * copie). Pensé pour une réponse rédigée sur plusieurs lignes — pas
 * un simple libellé, d'où le rendu en <div> (bloc) plutôt qu'un
 * <span> comme InlineMath.
 *
 * Chaque segment de texte (entre deux formules affichées, ou avant la
 * première / après la dernière) est son propre bloc, pas un <span>
 * continu : ça permet à l'appelant (via textBlockClassName /
 * textBlockStyle, typiquement un fond "papier ligné") de faire
 * recommencer son motif de fond à zéro à chaque bloc de texte, plutôt
 * que de dériver au fil des hauteurs variables des formules centrées
 * intercalées.
 *
 * Usage : taper une formule entre doubles dollars pour la centrer,
 * ex. "Soit $$\\sum_{k=1}^n k = \\frac{n(n+1)}{2}$$ une formule
 * classique." Sans aucun `$`, le rendu est identique à du texte brut.
 */
export function MathAnswer({
  text,
  className,
  textBlockClassName,
  textBlockStyle,
}: {
  text: string;
  className?: string;
  textBlockClassName?: string;
  textBlockStyle?: CSSProperties;
}) {
  const segments = useMemo(() => splitSegments(text), [text]);

  return (
    <div className={className}>
      {segments.map((seg, i) =>
        seg.type === "display" ? (
          <div key={i} className="my-2 flex justify-center overflow-x-auto px-1">
            <span dangerouslySetInnerHTML={{ __html: seg.html }} />
          </div>
        ) : seg.content.includes("$") ? (
          <div
            key={i}
            className={`whitespace-pre-wrap ${textBlockClassName ?? ""}`}
            style={textBlockStyle}
            dangerouslySetInnerHTML={{ __html: renderInlineHtml(seg.content) }}
          />
        ) : seg.content ? (
          <div key={i} className={`whitespace-pre-wrap ${textBlockClassName ?? ""}`} style={textBlockStyle}>
            {seg.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
