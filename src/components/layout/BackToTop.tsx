"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 640);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Revenir en haut de page"
      className={cn(
        "fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-brand-strong shadow-lg transition-all duration-300 sm:bottom-8 sm:right-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2} />
    </button>
  );
}
