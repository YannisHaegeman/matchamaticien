"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  NotebookPen,
  Shapes,
  SpellCheck2,
  Undo2,
  X,
} from "lucide-react";
import { MathAnswer } from "@/components/mathmap/MathAnswer";
import { DrawingZoneView, type DrawingZoneData } from "@/components/brouillon/DrawingZone";

const PAPER_BG = "#fffdf6";
const RULE_COLOR = "#c7d4ec";
const MARGIN_RED = "#d6453a";
const INK = "#16225c";

const STORAGE_KEY = "matcha-brouillon-pages-v2";
const LEGACY_STORAGE_KEY = "matcha-brouillon-pages-v1";

type PageData = {
  text: string;
  zones: DrawingZoneData[];
};

function emptyPage(): PageData {
  return { text: "", zones: [] };
}

function newZoneId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `zone-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

/** Répartit `pages` en garantissant toujours un nombre pair (une page
 * de droite vide "en attente" tant qu'on n'a pas écrit dessus). */
function normalize(pages: PageData[]): PageData[] {
  if (pages.length === 0) return [emptyPage(), emptyPage()];
  return pages.length % 2 === 0 ? pages : [...pages, emptyPage()];
}

function loadPages(): PageData[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        Array.isArray(parsed) &&
        parsed.every((p) => p && typeof p.text === "string" && Array.isArray(p.zones))
      ) {
        return normalize(parsed);
      }
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed) && parsed.every((p) => typeof p === "string")) {
        return normalize(parsed.map((text: string) => ({ text, zones: [] })));
      }
    }
  } catch {
    // ignore (brouillon vide par défaut)
  }
  return null;
}

/**
 * Une moitié d'écran : la "copie" (feuille lignée, rendu LaTeX en
 * direct, exactement comme en mode copie d'examen) au-dessus, et une
 * case de saisie compacte non lignée en dessous, pour écrire le texte
 * brut (maths entre $...$, formule centrée entre $$...$$). Des zones
 * de dessin librement placées/dimensionnées peuvent flotter par-dessus
 * la feuille lignée (schémas, figures géométriques…). Un bouton
 * "Vérifier la formulation" envoie le texte brut à l'IA pour corriger
 * la rédaction mathématique (quantificateurs, connecteurs logiques,
 * notations…) ; un bouton "Revenir à l'original" permet de comparer.
 */
function Page({
  page,
  onChangeText,
  onChangeZones,
  pageNumber,
  side,
}: {
  page: PageData;
  onChangeText: (value: string) => void;
  onChangeZones: (zones: DrawingZoneData[]) => void;
  pageNumber: number;
  side: "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [original, setOriginal] = useState<string | null>(null);

  function addZone() {
    const zone: DrawingZoneData = { id: newZoneId(), x: 12, y: 14, width: 55, height: 42, shapes: [] };
    onChangeZones([...page.zones, zone]);
  }

  function updateZone(updated: DrawingZoneData) {
    onChangeZones(page.zones.map((z) => (z.id === updated.id ? updated : z)));
  }

  function deleteZone(id: string) {
    onChangeZones(page.zones.filter((z) => z.id !== id));
  }

  async function handleCheck() {
    if (checking || !page.text.trim()) return;
    setChecking(true);
    setCheckError(null);
    const before = page.text;
    try {
      const res = await fetch("/api/check-formulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: before }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.corrected !== "string") {
        setCheckError(data.error || "La vérification a échoué, réessaie.");
        return;
      }
      if (original === null) setOriginal(before);
      onChangeText(data.corrected);
    } catch {
      setCheckError("La vérification a échoué, réessaie.");
    } finally {
      setChecking(false);
    }
  }

  function handleRevert() {
    if (original === null) return;
    onChangeText(original);
    setOriginal(null);
    setCheckError(null);
  }

  return (
    <div
      className={`flex min-h-0 flex-1 flex-col ${side === "left" ? "rounded-l-2xl" : "rounded-r-2xl"}`}
      style={{ background: PAPER_BG }}
    >
      <div ref={containerRef} className="relative flex min-h-0 flex-1 flex-col">
        <div className="absolute inset-y-0 left-[48px] w-px sm:left-[64px]" style={{ background: MARGIN_RED }} />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 pl-[64px] sm:px-6 sm:pl-[80px]">
          {page.text.trim() ? (
            <MathAnswer
              text={page.text}
              className="font-exam break-words text-[19px] leading-[35px] text-[#16225c] sm:text-[21px]"
              textBlockStyle={{
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 34px, ${RULE_COLOR} 34px, ${RULE_COLOR} 35px)`,
                backgroundPosition: "0 25px",
              }}
            />
          ) : (
            <span className="font-sans text-[14px] italic opacity-35">Page vierge…</span>
          )}
        </div>

        {page.zones.map((zone) => (
          <DrawingZoneView key={zone.id} zone={zone} containerRef={containerRef} onChange={updateZone} onDelete={() => deleteZone(zone.id)} />
        ))}

        <button
          type="button"
          onClick={addZone}
          className="absolute bottom-7 right-2.5 flex items-center gap-1.5 rounded-full bg-[#16225c]/90 px-3 py-1.5 text-[11px] font-bold text-white shadow-md hover:bg-[#16225c] sm:right-3.5"
        >
          <Shapes className="h-3.5 w-3.5" />
          Zone de dessin
        </button>

        <p className="m-0 pb-2 text-center font-sans text-[11px] font-semibold opacity-45" style={{ color: INK }}>
          {pageNumber}
        </p>
      </div>

      <div className="shrink-0 border-t px-3 py-2.5 sm:px-4" style={{ borderColor: RULE_COLOR, background: "rgba(255,255,255,0.6)" }}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCheck}
            disabled={checking || !page.text.trim()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16225c] px-3 py-1.5 text-[11px] font-bold text-white hover:opacity-90 disabled:opacity-40"
          >
            {checking ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <SpellCheck2 className="h-3.5 w-3.5" />}
            {checking ? "Vérification…" : "Vérifier la formulation"}
          </button>
          {original !== null ? (
            <button
              type="button"
              onClick={handleRevert}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#16225c] shadow-sm hover:bg-[#f0ede2]"
              style={{ boxShadow: `inset 0 0 0 1px ${RULE_COLOR}` }}
            >
              <Undo2 className="h-3.5 w-3.5" />
              Revenir à l&rsquo;original
            </button>
          ) : null}
          {checkError ? <span className="text-[11px] font-semibold text-[#d6453a]">{checkError}</span> : null}
        </div>
        <textarea
          value={page.text}
          onChange={(e) => onChangeText(e.target.value)}
          rows={3}
          placeholder="Écris ici… (LaTeX accepté, $...$ et $$...$$)"
          className="w-full resize-none rounded-lg bg-[#f6f3ea] px-3 py-2 text-[14px] leading-relaxed text-[#1b1612] outline-none"
          style={{ boxShadow: `inset 0 0 0 1px ${RULE_COLOR}` }}
        />
      </div>
    </div>
  );
}

/**
 * Cahier de brouillon : même mécanique que le mode copie d'examen
 * (saisie brute en bas, rendu LaTeX en direct sur le papier ligné),
 * mais en double page plein écran, paginé, et sans les éléments
 * propres à l'examen (pas d'en-tête Nom/Classe). Chaque page peut
 * aussi accueillir des zones de dessin (schémas à main levée,
 * redressés en formes propres) et vérifier sa rédaction mathématique
 * via l'IA. Le contenu est sauvegardé automatiquement dans le
 * navigateur.
 *
 * Réservé aux grands écrans (voir le garde-fou dans page.tsx) : la
 * mise en double page plein écran n'a pas de sens en dessous d'une
 * certaine largeur.
 */
export function Notebook() {
  const [pages, setPages] = useState<PageData[]>(() => [emptyPage(), emptyPage()]);
  const [loaded, setLoaded] = useState(false);
  const [spread, setSpread] = useState(0);
  const [jumpValue, setJumpValue] = useState("");
  const spreadRef = useRef(spread);
  useEffect(() => {
    spreadRef.current = spread;
  }, [spread]);

  useEffect(() => {
    const restored = loadPages();
    if (restored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPages(restored);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch {
      // stockage indisponible (navigation privée, quota…) : tant pis, pas bloquant
    }
  }, [pages, loaded]);

  const goPrev = useCallback(() => {
    setSpread((s) => Math.max(0, s - 1));
  }, []);

  const goNext = useCallback(() => {
    setPages((prev) => {
      const currentLast = Math.ceil(prev.length / 2) - 1;
      if (spreadRef.current >= currentLast) {
        return [...prev, emptyPage(), emptyPage()];
      }
      return prev;
    });
    setSpread((s) => s + 1);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  function updatePageText(index: number, value: string) {
    setPages((prev) => prev.map((p, i) => (i === index ? { ...p, text: value } : p)));
  }

  function updatePageZones(index: number, zones: DrawingZoneData[]) {
    setPages((prev) => prev.map((p, i) => (i === index ? { ...p, zones } : p)));
  }

  function handleJump(e: React.FormEvent) {
    e.preventDefault();
    const n = Number.parseInt(jumpValue, 10);
    if (!Number.isFinite(n) || n < 1) return;
    const clamped = Math.min(n, pages.length);
    setSpread(Math.floor((clamped - 1) / 2));
    setJumpValue("");
  }

  const leftIndex = spread * 2;
  const rightIndex = spread * 2 + 1;

  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: "#15102b" }}>
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[14px] font-bold text-cream hover:bg-white/15"
        >
          <X className="h-4 w-4" strokeWidth={2.4} />
          Fermer
        </Link>

        <span className="inline-flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-cream/75">
          <NotebookPen className="h-4 w-4" strokeWidth={2.2} />
          Cahier de brouillon
        </span>

        <form onSubmit={handleJump} className="flex items-center gap-2 text-[13px] text-cream/70">
          <span className="hidden sm:inline">
            Pages {leftIndex + 1}–{rightIndex + 1} / {pages.length}
          </span>
          <input
            type="number"
            min={1}
            max={pages.length}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            placeholder="Aller à…"
            className="w-20 rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-cream outline-none placeholder:text-cream/40"
          />
        </form>
      </div>

      <div className="flex min-h-0 flex-1 items-stretch gap-2 px-2 pb-4 sm:gap-4 sm:px-6 sm:pb-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={spread === 0}
          aria-label="Page précédente"
          className="flex w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-25 disabled:hover:bg-white/10 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex min-h-0 w-full max-w-6xl flex-1 items-stretch overflow-hidden rounded-2xl shadow-2xl">
          <Page
            page={pages[leftIndex] ?? emptyPage()}
            onChangeText={(v) => updatePageText(leftIndex, v)}
            onChangeZones={(z) => updatePageZones(leftIndex, z)}
            pageNumber={leftIndex + 1}
            side="left"
          />
          <div className="w-px shrink-0 bg-gradient-to-b from-transparent via-black/25 to-transparent" />
          <Page
            page={pages[rightIndex] ?? emptyPage()}
            onChangeText={(v) => updatePageText(rightIndex, v)}
            onChangeZones={(z) => updatePageZones(rightIndex, z)}
            pageNumber={rightIndex + 1}
            side="right"
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Page suivante"
          className="flex w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
