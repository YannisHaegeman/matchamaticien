"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { SatisfactionReel, SatisfactionSeries } from "@/lib/satisfaction";

/**
 * Galerie "Espace satisfaction" : les reels sont groupés par série
 * (affichage), mais naviguables comme un flux continu une fois le
 * lecteur plein écran ouvert (liste à plat, flèches/clavier pour
 * passer au reel suivant — y compris d'une série à l'autre).
 */
export function ReelsGallery({
  series,
  reels,
}: {
  series: SatisfactionSeries[];
  reels: SatisfactionReel[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setOpenIndex((i) => (i === null ? i : (i + 1) % reels.length));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpenIndex((i) => (i === null ? i : (i - 1 + reels.length) % reels.length));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [openIndex, reels.length]);

  const current = openIndex === null ? null : reels[openIndex];

  return (
    <>
      <div className="flex flex-col gap-12">
        {series.map((s) => (
          <section key={s.name}>
            <h2 className="mb-4 font-serif text-[1.4rem] font-bold text-white/90">{s.name}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {s.reels.map((reel) => {
                const flatIndex = reels.indexOf(reel);
                return (
                  <button
                    key={reel.code}
                    type="button"
                    onClick={() => setOpenIndex(flatIndex)}
                    className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10 transition hover:ring-white/30"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/satisfaction/posters/${reel.code}.jpg`}
                      alt={reel.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <span className="absolute left-2 top-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/80 backdrop-blur-sm">
                      {reel.episode}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                        <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                      </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-2.5 text-left text-[12.5px] font-semibold leading-snug text-white/95">
                      {reel.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {current ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + reels.length) % reels.length))}
            aria-label="Reel précédent"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % reels.length))}
            aria-label="Reel suivant"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex max-h-[80vh] w-full max-w-[420px] flex-col items-center gap-3">
            <video
              key={current.code}
              className="aspect-[9/16] max-h-[75vh] w-auto rounded-2xl bg-black shadow-2xl"
              src={`/satisfaction/videos/${current.code}.mp4`}
              poster={`/satisfaction/posters/${current.code}.jpg`}
              controls
              autoPlay
              loop
              playsInline
            />
            <div className="text-center">
              <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/50">
                {current.series} · {current.episode}
              </p>
              <p className="m-0 mt-0.5 font-serif text-[1.05rem] font-bold text-white">{current.title}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
