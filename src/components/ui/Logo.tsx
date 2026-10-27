import { cn } from "@/lib/utils";

/**
 * Marque de L'Alchimie des Nombres : un sigil abstrait — un cercle,
 * un triangle inscrit et trois points en orbite — dans l'esprit d'un
 * diagramme d'alchimiste, plutôt qu'un symbole figuratif. Même motif,
 * en plus grand, dans l'illustration de la hero (voir AlchemyGlyph).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.1" />
      <path
        d="M20 7 L8.74 26.5 L31.26 26.5 Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="1.8" fill="currentColor" />
      <circle cx="34.7" cy="11.5" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="37" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="5.3" cy="11.5" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
