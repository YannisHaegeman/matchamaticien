import { cn } from "@/lib/utils";

/**
 * Illustration décorative abstraite : un sigil flottant — anneaux
 * concentriques, triangle inscrit et orbe central — dans l'esprit
 * d'un diagramme d'alchimiste, avec quelques étincelles et symboles
 * mathématiques qui remontent doucement. Même usage que l'ancien
 * verre de matcha glacé qu'elle remplace : sur la hero de l'accueil
 * (voir Logo.tsx pour le même motif, en miniature, dans la marque).
 */
export function AlchemyGlyph({ className }: { className?: string }) {
  const sparkles = [
    { cx: 66, cy: 300, r: 3, delay: "0s", dur: "4.2s" },
    { cx: 196, cy: 318, r: 2.2, delay: "1.1s", dur: "3.6s" },
    { cx: 118, cy: 268, r: 2.6, delay: "2s", dur: "4s" },
    { cx: 212, cy: 244, r: 1.8, delay: "2.8s", dur: "3.8s" },
  ];

  const glyphs = [
    { x: 54, y: 230, size: 22, delay: "0.6s", dur: "4.6s", char: "∞" },
    { x: 206, y: 196, size: 17, delay: "2.1s", dur: "4s", char: "φ" },
  ];

  return (
    <div className={cn("animate-float", className)}>
      <svg
        viewBox="0 0 260 380"
        className="h-full w-full"
        role="img"
        aria-label="Illustration abstraite : un sigil flottant, cercle et triangle, dans l'esprit d'un diagramme d'alchimiste"
      >
        <defs>
          <radialGradient id="glyph-aura" cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="var(--color-matcha-300)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-matcha-300)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="glyph-orb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-top)" />
            <stop offset="100%" stopColor="var(--color-matcha-600)" />
          </linearGradient>
        </defs>

        {/* halo */}
        <ellipse cx="130" cy="150" rx="150" ry="150" fill="url(#glyph-aura)" />

        {/* anneaux concentriques */}
        <circle
          cx="130"
          cy="150"
          r="118"
          stroke="var(--color-matcha-300)"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          fill="none"
        />
        <circle
          cx="130"
          cy="150"
          r="92"
          stroke="var(--color-matcha-300)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="4 7"
        />

        {/* triangle inscrit */}
        <path
          d="M130 76 L66 196 L194 196 Z"
          stroke="var(--color-accent)"
          strokeOpacity="0.7"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />

        {/* orbe central */}
        <circle cx="130" cy="150" r="30" fill="url(#glyph-orb)" />
        <circle cx="130" cy="150" r="30" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" fill="none" />

        {/* points cardinaux du triangle */}
        <circle cx="130" cy="76" r="4" fill="var(--color-gold-500)" />
        <circle cx="66" cy="196" r="4" fill="var(--color-gold-500)" />
        <circle cx="194" cy="196" r="4" fill="var(--color-gold-500)" />

        {/* ombre portée douce, pour ancrer le sigil */}
        <ellipse cx="130" cy="336" rx="58" ry="9" fill="var(--color-ink)" opacity="0.06" />

        {/* symboles mathématiques qui dérivent lentement */}
        <g
          fill="var(--color-matcha-700)"
          opacity="0.5"
          fontFamily="var(--font-serif), Georgia, serif"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {glyphs.map((g, i) => (
            <text
              key={i}
              x={g.x}
              y={g.y}
              fontSize={g.size}
              style={{
                animation: `rise-fade ${g.dur} ease-in ${g.delay} infinite`,
              }}
            >
              {g.char}
            </text>
          ))}
        </g>

        {/* étincelles qui remontent */}
        <g fill="var(--color-matcha-200)">
          {sparkles.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              style={{
                animation: `rise-fade ${s.dur} ease-in ${s.delay} infinite`,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
