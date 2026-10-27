import { MathContent } from "./MathContent";

/** Démonstration d'un résultat — même habillage visuel que <Proof> dans les articles. */
export function ResultProof({ proof }: { proof: string }) {
  return (
    <div className="not-prose my-8 border-t border-b border-dashed border-ink/15 py-6">
      <p className="mb-3 font-serif text-[1.05rem] font-semibold italic text-ink-soft">
        Démonstration
      </p>
      <div className="space-y-4 text-[1.02rem] leading-[1.75] text-ink-soft [&_.katex-display]:my-4">
        <MathContent source={proof} />
      </div>
      <p className="mt-4 text-right text-lg text-matcha-600" aria-hidden="true">
        ∎
      </p>
    </div>
  );
}
