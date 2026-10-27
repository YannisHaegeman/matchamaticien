import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FLASHCARD_AMBIANCES } from "@/lib/flashcards/ambiances";

export function ClosingCta() {
  const p = FLASHCARD_AMBIANCES.indigo;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-matcha-900" />
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-matcha-300) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* un peu de vague en relief, pour faire écho au fond des flash
          cards sur ce bandeau déjà bien indigo. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 580 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 w-full opacity-70 sm:h-36"
      >
        <defs>
          <filter id="cta-wave-soft" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="cta-wave-rim" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        <path
          d="M0 96 C 150 56, 320 110, 455 78 C 520 62, 560 56, 580 60 L580 160 L0 160 Z"
          fill={p.hillC}
        />
        <path
          d="M0 96 C 150 56, 320 110, 455 78 C 520 62, 560 56, 580 60"
          transform="translate(0 6)"
          fill="none"
          stroke={p.sheen}
          strokeWidth={16}
          opacity={0.3}
          filter="url(#cta-wave-soft)"
        />
        <path
          d="M0 96 C 150 56, 320 110, 455 78 C 520 62, 560 56, 580 60"
          fill="none"
          stroke={p.sheen}
          strokeWidth={2}
          opacity={0.7}
          filter="url(#cta-wave-rim)"
        />
      </svg>

      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-8">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-on-brand sm:text-[2.4rem]">
          Prêt à vous perdre vingt minutes dans les mathématiques ?
        </h2>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-matcha-100">
          Pas d&rsquo;inscription, pas de par-cœur : juste une carte à
          parcourir, un thème après l&rsquo;autre.
        </p>
        <div className="mt-8">
          <Button
            href="/carte-des-maths"
            size="lg"
            className="bg-cream text-matcha-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_5px_0_var(--color-matcha-800),0_16px_24px_-10px_rgba(0,0,0,0.4)] [text-shadow:none] hover:bg-matcha-50"
          >
            Explorer la carte des maths
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
