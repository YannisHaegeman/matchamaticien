import { visit } from "unist-util-visit";
import { toString as hastToString } from "hast-util-to-string";
import type { Element, Root } from "hast";
import { slugify } from "@/lib/utils";

/**
 * Plugin rehype partagé : ajoute un id="..." sur chaque h2/h3, calculé
 * avec le même slugify que src/lib/utils.ts, afin que les tables des
 * matières pointent toujours vers la bonne ancre. Utilisé par la
 * Carte des maths (MathContent).
 */
export function rehypeHeadingIds() {
  return (tree: Root) => {
    const seen = new Map<string, number>();
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const text = hastToString(node);
      let id = slugify(text);
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      node.properties = { ...node.properties, id };
    });
  };
}

/**
 * Convertit la syntaxe LaTeX \[ ... \] et \( ... \) (souvent utilisée
 * dans les sources LaTeX classiques) vers la syntaxe $$ ... $$ / $ ... $
 * comprise par remark-math, pour que les deux écritures fonctionnent.
 */
export function normalizeMathDelimiters(source: string): string {
  return source
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, expr: string) => `$$${expr}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, expr: string) => `$${expr}$`);
}
