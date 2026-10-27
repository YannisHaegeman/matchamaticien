import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { MDXComponents } from "mdx/types";
import { normalizeMathDelimiters } from "@/lib/mdx";

const mathMdxComponents: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-medium text-brand-strong underline decoration-1 underline-offset-2 hover:text-brand"
    />
  ),
};

/**
 * Rend un énoncé ou une démonstration de la Carte des maths : même
 * pipeline Markdown + KaTeX que les articles (voir src/lib/mdx.ts), en
 * plus léger — pas de titres, pas de composants éditoriaux imbriqués,
 * juste du texte, des maths ($...$ / $$...$$) et des liens vers
 * d'autres résultats.
 *
 * Se compose directement comme enfant d'un conteneur qui gère déjà
 * l'espacement vertical (Callout, ResultProof...), sans div superflue.
 */
export function MathContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={normalizeMathDelimiters(source)}
      components={mathMdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
