/**
 * Convertit un titre pouvant contenir des maths ($...$) en texte brut
 * lisible, pour les contextes qui ne peuvent pas afficher de KaTeX :
 * balise <title> du navigateur, labels compacts du graphe SVG (qui ne
 * peut pas héberger de HTML sans complexité inutile).
 *
 * Pour un affichage riche, préférer le composant <InlineMath> qui rend
 * vraiment les maths avec KaTeX.
 */
export function mathLabelText(source: string): string {
  const SYMBOLS: Record<string, string> = {
    "\\mathbb{N}": "ℕ",
    "\\mathbb{Z}": "ℤ",
    "\\mathbb{Q}": "ℚ",
    "\\mathbb{R}": "ℝ",
    "\\mathbb{C}": "ℂ",
    "\\times": "×",
    "\\setminus": "∖",
    "\\ast": "∗",
    "\\star": "⋆",
    "\\cdot": "·",
    "\\leqslant": "⩽",
    "\\geqslant": "⩾",
    "\\trianglelefteq": "⊴",
    "\\varnothing": "∅",
    "\\simeq": "≃",
    "\\neq": "≠",
    "\\in": "∈",
    "\\forall": "∀",
    "\\exists": "∃",
    "\\,": " ",
  };

  let text = source.replace(/\$\$?/g, "");
  for (const [macro, symbol] of Object.entries(SYMBOLS)) {
    text = text.split(macro).join(symbol);
  }

  return text
    .replace(/\\[a-zA-Z]+/g, "") // commandes LaTeX restantes, non reconnues
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
