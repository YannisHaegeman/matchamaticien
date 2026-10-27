import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AlchemyGlyph } from "@/components/ui/AlchemyGlyph";
import { mathThemes } from "@/lib/mathmap/themes";
import { getAllDecks } from "@/lib/flashcards";

export function Hero() {
  const cardCount = getAllDecks().reduce((acc, d) => acc + d.cards.length, 0);

  return (
    <section className="texture-grain relative overflow-hidden border-b border-border">
      {/* fond texturé */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,var(--color-matcha-100),transparent)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-matcha-300) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)",
        }}
      />

      {/* un peu de vague en relief, en bas de la hero — même recette
          que le fond des flash cards, en très discret sur fond clair. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 580 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-20 w-full sm:h-24"
      >
        <defs>
          <filter id="hero-wave-soft" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="hero-wave-rim" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        <path
          d="M0 40 C 140 10, 300 48, 460 20 C 520 8, 560 4, 580 10 L580 80 L0 80 Z"
          fill="var(--color-matcha-100)"
          fillOpacity="0.6"
        />
        <path
          d="M0 40 C 140 10, 300 48, 460 20 C 520 8, 560 4, 580 10"
          transform="translate(0 4)"
          fill="none"
          stroke="var(--color-matcha-300)"
          strokeWidth="12"
          opacity="0.3"
          filter="url(#hero-wave-soft)"
        />
        <path
          d="M0 40 C 140 10, 300 48, 460 20 C 520 8, 560 4, 580 10"
          fill="none"
          stroke="var(--color-matcha-400)"
          strokeWidth="1.5"
          opacity="0.55"
          filter="url(#hero-wave-rim)"
        />
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-4 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-matcha-300 bg-matcha-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-matcha-700">
            <Compass className="h-3.5 w-3.5" />
            Une carte, pas un manuel
          </span>

          <h1 className="mt-7 max-w-3xl animate-fade-up font-serif text-[2.5rem] font-black leading-[1.08] tracking-tight text-ink [animation-delay:80ms] sm:text-[3.4rem] md:text-[3.9rem]">
            Les mathématiques,
            <br />
            <span className="italic text-brand-strong">transmutées</span> en
            compréhension.
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-[1.08rem] leading-relaxed text-ink-soft [animation-delay:160ms] sm:text-[1.15rem]">
            L&rsquo;Alchimie des Nombres, c&rsquo;est une carte conceptuelle
            des mathématiques de l&rsquo;agrégation — et des flash cards pour
            réviser par petites touches, une question à la fois.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Button href="/carte-des-maths" size="lg">
              Explorer la carte des maths
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/flashcards" variant="secondary" size="lg">
              Réviser en flash cards
            </Button>
          </div>

          <div className="mt-14 grid w-full max-w-2xl animate-fade-up grid-cols-3 gap-6 border-t border-border/70 pt-8 [animation-delay:320ms] lg:mx-0">
            <Stat value={`${mathThemes.length}`} label="thèmes de la carte" />
            <Stat value={`${cardCount}`} label="flash cards" />
            <Stat value="100%" label="LaTeX rendu" />
          </div>
        </div>

        <div className="order-first flex justify-center animate-fade-up [animation-delay:120ms] lg:order-last">
          <AlchemyGlyph className="w-[150px] sm:w-[190px] lg:w-[260px]" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-2xl font-black text-brand-strong sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
    </div>
  );
}
