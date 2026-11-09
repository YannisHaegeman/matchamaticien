"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Vue plein écran pour le bouton "Explication" au dos d'une carte :
 * une ou plusieurs images (schémas, comparaisons...) affichées en
 * grand, empilées et défilables. Même mécanique d'ouverture/fermeture
 * que ExamPaperOverlay et la galerie de l'Espace satisfaction
 * (verrouillage du scroll de la page, fermeture à Échap).
 */
export function ExplanationOverlay({
  open,
  onClose,
  images,
  title,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#120d2e]/92 p-3 backdrop-blur-sm sm:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[14px] font-bold text-cream hover:bg-white/15"
          >
            <X className="h-4 w-4" strokeWidth={2.4} />
            Fermer
          </button>
          {title ? (
            <span className="text-right text-[13px] font-extrabold uppercase tracking-[0.06em] text-cream/75">
              {title}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col items-center gap-4 pb-4">
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={title ? `${title} — ${i + 1}/${images.length}` : `Explication ${i + 1}/${images.length}`}
              className="w-full max-w-3xl rounded-2xl shadow-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
