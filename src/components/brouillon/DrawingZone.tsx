"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from "react";
import { ArrowUpRight, GripHorizontal, MoveDiagonal2, Trash2, Undo2, X } from "lucide-react";
import { pointsToSmoothPath, recognizeShape, type Point, type Shape } from "@/lib/brouillon/shapeRecognition";

export type DrawingZoneData = {
  id: string;
  x: number; // % du conteneur (page)
  y: number;
  width: number;
  height: number;
  shapes: Shape[];
};

const COLORS = ["#16225c", "#d6453a", "#1f7a4d", "#b8650f", "#6b3fa0", "#1b1612"];
const MIN_SIZE = 10; // % minimum pour rester manipulable

function renderShape(shape: Shape, key: number, markerId?: string) {
  switch (shape.kind) {
    case "line":
      return (
        <line
          key={key}
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
          stroke={shape.color}
          strokeWidth={1.4}
          strokeLinecap="round"
          markerEnd={markerId ? `url(#${markerId})` : undefined}
          vectorEffect="non-scaling-stroke"
        />
      );
    case "rect":
      return (
        <rect
          key={key}
          x={shape.x}
          y={shape.y}
          width={shape.w}
          height={shape.h}
          stroke={shape.color}
          strokeWidth={1.4}
          fill="none"
          rx={1.2}
          vectorEffect="non-scaling-stroke"
        />
      );
    case "ellipse":
      return (
        <ellipse
          key={key}
          cx={shape.cx}
          cy={shape.cy}
          rx={shape.rx}
          ry={shape.ry}
          stroke={shape.color}
          strokeWidth={1.4}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      );
    case "triangle":
      return (
        <polygon
          key={key}
          points={`${shape.p1.x},${shape.p1.y} ${shape.p2.x},${shape.p2.y} ${shape.p3.x},${shape.p3.y}`}
          stroke={shape.color}
          strokeWidth={1.4}
          fill="none"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      );
    case "freehand":
      return (
        <path
          key={key}
          d={pointsToSmoothPath(shape.points) + (shape.closed ? " Z" : "")}
          stroke={shape.color}
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      );
    default:
      return null;
  }
}

/**
 * Zone de dessin : un rectangle positionné/dimensionné en % du
 * conteneur de la page (déplaçable, redimensionnable via la poignée
 * en bas à droite), à l'intérieur duquel on dessine au doigt/souris.
 * Chaque trait est analysé à la fin du geste (recognizeShape) : s'il
 * ressemble à une ligne, un rectangle, un triangle ou un cercle, il
 * est redressé en forme propre ; sinon il reste un trait à main
 * levée, juste lissé.
 */
export function DrawingZoneView({
  zone,
  containerRef,
  onChange,
  onDelete,
}: {
  zone: DrawingZoneData;
  containerRef: RefObject<HTMLDivElement | null>;
  onChange: (zone: DrawingZoneData) => void;
  onDelete: () => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [arrowMode, setArrowMode] = useState(false);
  const [liveStroke, setLiveStroke] = useState<Point[] | null>(null);
  const drawRef = useRef<{ rect: DOMRect; points: Point[] } | null>(null);
  const dragRef = useRef<{
    kind: "move" | "resize";
    startClientX: number;
    startClientY: number;
    startZone: DrawingZoneData;
    containerRect: DOMRect;
  } | null>(null);

  function toLocal(rect: DOMRect, p: Point): Point {
    return { x: (p.x / rect.width) * 100, y: (p.y / rect.height) * 100 };
  }

  function handleDrawPointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const start = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    drawRef.current = { rect, points: [start] };
    setLiveStroke([toLocal(rect, start)]);
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function handleDrawPointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    const state = drawRef.current;
    if (!state) return;
    const next = { x: e.clientX - state.rect.left, y: e.clientY - state.rect.top };
    const last = state.points[state.points.length - 1];
    if (Math.hypot(next.x - last.x, next.y - last.y) < 1.5) return;
    state.points.push(next);
    setLiveStroke(state.points.map((p) => toLocal(state.rect, p)));
  }

  function handleDrawPointerUp() {
    const state = drawRef.current;
    drawRef.current = null;
    setLiveStroke(null);
    if (!state || state.points.length < 2 || state.rect.width === 0 || state.rect.height === 0) return;
    const shape = recognizeShape(state.points, color, arrowMode);
    const normalized = normalizeShape(shape, state.rect.width, state.rect.height);
    onChange({ ...zone, shapes: [...zone.shapes, normalized] });
  }

  function startHandleDrag(e: ReactPointerEvent, kind: "move" | "resize") {
    e.stopPropagation();
    if (!containerRef.current) return;
    dragRef.current = {
      kind,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startZone: zone,
      containerRect: containerRef.current.getBoundingClientRect(),
    };
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function handleHandleMove(e: ReactPointerEvent) {
    const state = dragRef.current;
    if (!state) return;
    const dxPct = ((e.clientX - state.startClientX) / state.containerRect.width) * 100;
    const dyPct = ((e.clientY - state.startClientY) / state.containerRect.height) * 100;
    if (state.kind === "move") {
      const x = clamp(state.startZone.x + dxPct, 0, 100 - state.startZone.width);
      const y = clamp(state.startZone.y + dyPct, 0, 100 - state.startZone.height);
      onChange({ ...zone, x, y });
    } else {
      const width = clamp(state.startZone.width + dxPct, MIN_SIZE, 100 - state.startZone.x);
      const height = clamp(state.startZone.height + dyPct, MIN_SIZE, 100 - state.startZone.y);
      onChange({ ...zone, width, height });
    }
  }

  function handleHandleUp() {
    dragRef.current = null;
  }

  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-md border border-dashed border-[#9aa3c4] bg-[#fffdf6]/90 shadow-sm"
      style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.width}%`, height: `${zone.height}%` }}
    >
      <div className="flex shrink-0 items-center gap-1 border-b border-[#e4ddc9] bg-white/70 px-1.5 py-1">
        <button
          type="button"
          onPointerDown={(e) => startHandleDrag(e, "move")}
          onPointerMove={handleHandleMove}
          onPointerUp={handleHandleUp}
          aria-label="Déplacer la zone"
          className="flex h-6 w-6 shrink-0 cursor-grab items-center justify-center rounded text-[#6b6151] hover:bg-black/5 active:cursor-grabbing"
        >
          <GripHorizontal className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              aria-label={`Couleur ${c}`}
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ background: c, boxShadow: color === c ? "0 0 0 2px white, 0 0 0 3.5px #6b6151" : "0 0 0 1px rgba(0,0,0,0.15)" }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setArrowMode((a) => !a)}
          aria-pressed={arrowMode}
          title="Traits droits en flèches"
          className={`ml-1 flex h-6 items-center gap-1 rounded-full px-2 text-[10px] font-bold uppercase tracking-wide ${
            arrowMode ? "bg-[#16225c] text-white" : "bg-black/5 text-[#6b6151] hover:bg-black/10"
          }`}
        >
          <ArrowUpRight className="h-3 w-3" />
          Flèche
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChange({ ...zone, shapes: zone.shapes.slice(0, -1) })}
            disabled={zone.shapes.length === 0}
            aria-label="Annuler le dernier trait"
            className="flex h-6 w-6 items-center justify-center rounded text-[#6b6151] hover:bg-black/5 disabled:opacity-30"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...zone, shapes: [] })}
            disabled={zone.shapes.length === 0}
            aria-label="Effacer la zone"
            className="flex h-6 w-6 items-center justify-center rounded text-[#6b6151] hover:bg-black/5 disabled:opacity-30"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Supprimer la zone de dessin"
            className="flex h-6 w-6 items-center justify-center rounded text-[#8a2f27] hover:bg-black/5"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="min-h-0 flex-1 touch-none"
        onPointerDown={handleDrawPointerDown}
        onPointerMove={handleDrawPointerMove}
        onPointerUp={handleDrawPointerUp}
        onPointerLeave={handleDrawPointerUp}
      >
        <defs>
          {zone.shapes.map((shape, i) =>
            shape.kind === "line" && shape.arrow ? (
              <marker
                key={i}
                id={`arrowhead-${zone.id}-${i}`}
                markerWidth="8"
                markerHeight="8"
                refX="5.5"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill={shape.color} />
              </marker>
            ) : null,
          )}
        </defs>
        {zone.shapes.map((shape, i) =>
          renderShape(shape, i, shape.kind === "line" && shape.arrow ? `arrowhead-${zone.id}-${i}` : undefined),
        )}
        {liveStroke ? (
          <path
            d={pointsToSmoothPath(liveStroke)}
            stroke={color}
            strokeWidth={1.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.85}
          />
        ) : null}
      </svg>

      <div
        onPointerDown={(e) => startHandleDrag(e, "resize")}
        onPointerMove={handleHandleMove}
        onPointerUp={handleHandleUp}
        className="absolute bottom-0.5 right-0.5 flex h-4 w-4 cursor-nwse-resize items-center justify-center text-[#9aa3c4] hover:text-[#6b6151]"
        aria-label="Redimensionner la zone"
      >
        <MoveDiagonal2 className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), Math.max(min, max));
}

/** Convertit une forme dont les coordonnées sont en pixels (espace du
 * tracé) vers l'espace normalisé 0-100 du viewBox, pour un stockage
 * indépendant de la taille actuelle de la zone. */
function normalizeShape(shape: Shape, width: number, height: number): Shape {
  const nx = (v: number) => (v / width) * 100;
  const ny = (v: number) => (v / height) * 100;
  switch (shape.kind) {
    case "line":
      return { ...shape, x1: nx(shape.x1), y1: ny(shape.y1), x2: nx(shape.x2), y2: ny(shape.y2) };
    case "rect":
      return { ...shape, x: nx(shape.x), y: ny(shape.y), w: nx(shape.w), h: ny(shape.h) };
    case "ellipse":
      return { ...shape, cx: nx(shape.cx), cy: ny(shape.cy), rx: nx(shape.rx), ry: ny(shape.ry) };
    case "triangle":
      return {
        ...shape,
        p1: { x: nx(shape.p1.x), y: ny(shape.p1.y) },
        p2: { x: nx(shape.p2.x), y: ny(shape.p2.y) },
        p3: { x: nx(shape.p3.x), y: ny(shape.p3.y) },
      };
    case "freehand":
      return { ...shape, points: shape.points.map((p) => ({ x: nx(p.x), y: ny(p.y) })) };
    default:
      return shape;
  }
}
