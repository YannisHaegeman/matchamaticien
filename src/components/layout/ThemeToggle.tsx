"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Lecture du thème réel appliqué par le script inline de layout.tsx
    // (exécuté avant l'hydratation, pour éviter un flash). Le rendu
    // serveur reste neutre (isDark = null) pour ne pas désynchroniser
    // l'hydratation ; on ne corrige l'icône qu'une fois côté client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("matcha-theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponible (mode privé, etc.) : on ignore silencieusement.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft transition hover:border-brand hover:text-brand"
    >
      {isDark ? (
        <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} />
      )}
    </button>
  );
}
