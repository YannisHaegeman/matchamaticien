import type { FlashcardAmbiance } from "@/types/flashcards";

interface AmbiancePalette {
  /** Fond de la page (derrière la carte). */
  ground: string;
  /** Fond de la carte elle-même. */
  card: string;
  shadow: string;
  accent: string;
  accentTop: string;
  accentEdge: string;
  btnInk: string;
  ink: string;
  inkSoft: string;
  label: string;
  panel: string;
  line: string;
  /**
   * Les "vagues" en relief dessinées derrière la carte (voir le SVG
   * dans DeckPlayer) : deux bandes hautes qui se chevauchent (hillA
   * devant hillB) et un liseré bas (hillC), chacune soulignée d'un
   * filet de lumière (sheen) qui donne le relief des crêtes.
   */
  hillA: string;
  hillB: string;
  hillC: string;
  sheen: string;
  /** Couleur du petit personnage posé sur la crête, dans le coin. */
  legs: string;
}

/**
 * Les 4 palettes de l'esthétique flash cards — un ton chaud et saturé
 * par paquet, pour les distinguer d'un coup d'œil. Pour ajouter une
 * ambiance : une entrée ici, puis l'utiliser comme `ambiance` d'un
 * paquet dans src/lib/flashcards/decks.ts.
 */
export const FLASHCARD_AMBIANCES: Record<FlashcardAmbiance, AmbiancePalette> = {
  prairie: {
    ground: "linear-gradient(180deg, #1a4a18 0%, #2a6e24 50%, #3a8c30 100%)",
    card: "linear-gradient(180deg, #1c561b 0%, #256c22 50%, #2e7e29 100%)",
    shadow: "rgba(2,25,2,0.55)",
    accent: "#d42a1c",
    accentTop: "#ef4434",
    accentEdge: "#8a120a",
    btnInk: "#ffffff",
    ink: "#f6f2e6",
    inkSoft: "#d6ebcb",
    label: "#ffb8ab",
    panel: "rgba(0,30,0,0.24)",
    line: "rgba(220,255,200,0.18)",
    hillA: "rgba(0,20,0,0.2)",
    hillB: "rgba(0,25,0,0.1)",
    hillC: "rgba(190,240,150,0.12)",
    sheen: "rgba(225,255,190,0.6)",
    legs: "#f1efe8",
  },
  coquelicot: {
    ground: "linear-gradient(180deg, #8a140a 0%, #bd2112 50%, #da3a1e 100%)",
    card: "linear-gradient(180deg, #a3170c 0%, #bd1f10 50%, #cf2a17 100%)",
    shadow: "rgba(50,3,0,0.55)",
    accent: "#13212c",
    accentTop: "#2a3c4c",
    accentEdge: "#000000",
    btnInk: "#ffffff",
    ink: "#fff4ec",
    inkSoft: "#ffd8cb",
    label: "#ffe3bd",
    panel: "rgba(60,0,0,0.22)",
    line: "rgba(255,215,195,0.2)",
    hillA: "rgba(60,0,0,0.2)",
    hillB: "rgba(60,0,0,0.1)",
    hillC: "rgba(255,180,150,0.12)",
    sheen: "rgba(255,205,175,0.6)",
    legs: "#13212c",
  },
  safran: {
    ground: "linear-gradient(180deg, #1d4a86 0%, #1d4a86 26%, #e8981a 26.2%, #f2ab24 60%, #f6b934 100%)",
    card: "linear-gradient(180deg, #f0a01a 0%, #f4ae24 45%, #f7bb38 100%)",
    shadow: "rgba(10,25,60,0.5)",
    accent: "#123a6b",
    accentTop: "#1d518f",
    accentEdge: "#0a2142",
    btnInk: "#ffffff",
    ink: "#0e2547",
    inkSoft: "#5a3a06",
    label: "#123a6b",
    panel: "rgba(255,245,215,0.34)",
    line: "rgba(14,37,71,0.18)",
    hillA: "rgba(110,50,0,0.14)",
    hillB: "rgba(120,60,0,0.08)",
    hillC: "rgba(255,240,180,0.2)",
    sheen: "rgba(255,248,215,0.75)",
    legs: "#123a6b",
  },
  indigo: {
    ground: "linear-gradient(180deg, #1a1350 0%, #2e2386 50%, #4334b0 100%)",
    card: "linear-gradient(180deg, #1e165c 0%, #2c2180 50%, #3a2ca0 100%)",
    shadow: "rgba(5,3,25,0.6)",
    accent: "#f4f1ff",
    accentTop: "#ffffff",
    accentEdge: "#a79fd6",
    btnInk: "#1d1660",
    ink: "#f4f1ff",
    inkSoft: "#cdc6f5",
    label: "#ddd7ff",
    panel: "rgba(0,0,25,0.3)",
    line: "rgba(205,195,255,0.18)",
    hillA: "rgba(0,0,20,0.25)",
    hillB: "rgba(5,0,30,0.12)",
    hillC: "rgba(180,170,255,0.1)",
    sheen: "rgba(215,205,255,0.55)",
    legs: "#1b1612",
  },
};
