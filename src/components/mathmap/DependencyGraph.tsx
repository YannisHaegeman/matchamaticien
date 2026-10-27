"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { X, ZoomIn, ZoomOut, RotateCcw, ArrowRight } from "lucide-react";
import type { GraphNode, MathAccent, MathDifficulty, ResultType } from "@/types/mathmap";
import { RESULT_TYPE_META, DIFFICULTY_META, resultHref } from "@/lib/mathmap";
import { ACCENT_CLASSES } from "./accent";
import { InlineMath } from "./InlineMath";
import { mathLabelText } from "@/lib/mathLabel";
import { cn } from "@/lib/utils";

interface Props {
  nodes: GraphNode[];
  edges: { source: string; target: string; type: string }[];
  themeOptions: { id: string; title: string; accent: MathAccent }[];
}

const VIEW_W = 1000;
const VIEW_H = 620;
const MAX_LABEL_CHARS = 24;

type Point = { x: number; y: number };

/** Texte affiché sous un nœud du graphe (tronqué, sans LaTeX brut). */
function graphLabel(title: string): string {
  const label = mathLabelText(title);
  return label.length > MAX_LABEL_CHARS
    ? `${label.slice(0, MAX_LABEL_CHARS - 2)}…`
    : label;
}

/** Simulation par forces, écrite à la main (pas de dépendance supplémentaire) :
 *  répulsion entre tous les nœuds — renforcée localement pour empêcher deux
 *  libellés voisins de se chevaucher, quelle que soit leur longueur —,
 *  ressort le long des arêtes, attraction légère vers le centre du thème
 *  (pour que les nœuds d'un même thème se regroupent visuellement),
 *  centrage global. */
function simulate(
  nodes: GraphNode[],
  edges: { source: string; target: string }[],
  themeCenters: Map<string, Point>
): Map<string, Point> {
  const pos = new Map<string, Point>();
  const vel = new Map<string, Point>();
  // Demi-largeur estimée du libellé de chaque nœud, pour l'écart minimal
  // ci-dessous. Estimation grossière (7 unités/caractère) : elle n'a pas
  // besoin d'être exacte, seulement de repousser un peu plus les nœuds aux
  // titres longs que ceux aux titres courts.
  const labelHalfWidth = new Map<string, number>();

  nodes.forEach((n, i) => {
    const center = themeCenters.get(n.themeId) ?? { x: VIEW_W / 2, y: VIEW_H / 2 };
    const angle = (i * 137.5 * Math.PI) / 180; // angle doré : répartition sans chevauchement systématique
    const radius = 30 + (i % 6) * 12;
    pos.set(n.id, {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    });
    vel.set(n.id, { x: 0, y: 0 });
    labelHalfWidth.set(n.id, (graphLabel(n.title).length * 7) / 2);
  });

  const REPULSION = 1400;
  const LABEL_MARGIN = 12;
  const COLLISION_STRENGTH = 1.6;
  const MAX_COLLISION_FORCE = 30;
  const SPRING = 0.02;
  const IDEAL_EDGE = 70;
  const CLUSTER_PULL = 0.02;
  const CENTER_PULL = 0.002;
  const DAMPING = 0.82;
  const ITERATIONS = 220;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const pa = pos.get(a.id)!;
      const va = vel.get(a.id)!;
      let fx = 0;
      let fy = 0;

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = nodes[j];
        const pb = pos.get(b.id)!;
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const distSq = Math.max(dx * dx + dy * dy, 4);
        const dist = Math.sqrt(distSq);
        let force = REPULSION / distSq;

        // Écart minimal pour que les deux libellés ne se chevauchent pas.
        // Poussée corrective douce et plafonnée : elle aide à séparer les
        // nœuds proches sans jamais dominer la simulation (ce qui, en
        // l'absence de plafond, pouvait la faire diverger vers les bords).
        const desiredMin =
          labelHalfWidth.get(a.id)! + labelHalfWidth.get(b.id)! + LABEL_MARGIN;
        if (dist < desiredMin) {
          force += Math.min((desiredMin - dist) * COLLISION_STRENGTH, MAX_COLLISION_FORCE);
        }

        fx += (dx / dist) * force;
        fy += (dy / dist) * force;
      }

      const center = themeCenters.get(a.themeId) ?? { x: VIEW_W / 2, y: VIEW_H / 2 };
      fx += (center.x - pa.x) * CLUSTER_PULL;
      fy += (center.y - pa.y) * CLUSTER_PULL;
      fx += (VIEW_W / 2 - pa.x) * CENTER_PULL;
      fy += (VIEW_H / 2 - pa.y) * CENTER_PULL;

      va.x = (va.x + fx) * DAMPING;
      va.y = (va.y + fy) * DAMPING;
    }

    for (const edge of edges) {
      const pa = pos.get(edge.source);
      const pb = pos.get(edge.target);
      if (!pa || !pb) continue;
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const stretch = (dist - IDEAL_EDGE) * SPRING;
      const fx = (dx / dist) * stretch;
      const fy = (dy / dist) * stretch;
      const va = vel.get(edge.source)!;
      const vb = vel.get(edge.target)!;
      va.x += fx;
      va.y += fy;
      vb.x -= fx;
      vb.y -= fy;
    }

    for (const n of nodes) {
      const p = pos.get(n.id)!;
      const v = vel.get(n.id)!;
      p.x = Math.min(VIEW_W - 20, Math.max(20, p.x + v.x));
      p.y = Math.min(VIEW_H - 20, Math.max(20, p.y + v.y));
    }
  }

  return pos;
}

export function DependencyGraph({ nodes, edges, themeOptions }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [positions, setPositions] = useState<Map<string, Point> | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hiddenThemes, setHiddenThemes] = useState<Set<string>>(new Set());
  const [hiddenTypes, setHiddenTypes] = useState<Set<ResultType>>(new Set());
  const [hiddenDifficulties, setHiddenDifficulties] = useState<Set<MathDifficulty>>(
    new Set()
  );
  const dragState = useRef<{ dragging: boolean; lastX: number; lastY: number }>({
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const themeIds = Array.from(new Set(nodes.map((n) => n.themeId)));
    const centers = new Map<string, Point>();
    themeIds.forEach((id, i) => {
      const angle = (i / Math.max(themeIds.length, 1)) * 2 * Math.PI;
      centers.set(id, {
        x: VIEW_W / 2 + Math.cos(angle) * (VIEW_W * 0.32),
        y: VIEW_H / 2 + Math.sin(angle) * (VIEW_H * 0.32),
      });
    });
    const result = simulate(nodes, edges, centers);
    // Calcul de layout ponctuel au montage (pas une synchronisation avec un
    // système externe qui changerait dans le temps) : la simulation ne
    // s'exécute qu'une fois, volontairement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleNodeIds = useMemo(() => {
    const set = new Set<string>();
    for (const n of nodes) {
      if (hiddenThemes.has(n.themeId)) continue;
      if (hiddenTypes.has(n.type)) continue;
      if (n.difficulty && hiddenDifficulties.has(n.difficulty)) continue;
      set.add(n.id);
    }
    return set;
  }, [nodes, hiddenThemes, hiddenTypes, hiddenDifficulties]);

  const neighborIds = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const e of edges) {
      if (e.source === selectedId) set.add(e.target);
      if (e.target === selectedId) set.add(e.source);
    }
    return set;
  }, [selectedId, edges]);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null;

  function toggle<T>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  function zoomBy(factor: number) {
    setView((v) => {
      const nextK = Math.min(2.6, Math.max(0.45, v.k * factor));
      const cx = VIEW_W / 2;
      const cy = VIEW_H / 2;
      return {
        k: nextK,
        x: cx - (cx - v.x) * (nextK / v.k),
        y: cy - (cy - v.y) * (nextK / v.k),
      };
    });
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragState.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current.dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleFactor = VIEW_W / rect.width;
    const dx = (e.clientX - dragState.current.lastX) * scaleFactor;
    const dy = (e.clientY - dragState.current.lastY) * scaleFactor;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  }

  function onPointerUp() {
    dragState.current.dragging = false;
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-bg-card p-3">
        <span className="px-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          Thèmes
        </span>
        {themeOptions.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => toggle(hiddenThemes, t.id, setHiddenThemes)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              hiddenThemes.has(t.id)
                ? "border-border text-muted opacity-50"
                : cn("border-transparent text-on-brand", ACCENT_CLASSES[t.accent].solid)
            )}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-bg-card p-3">
        <span className="px-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          Type
        </span>
        {(Object.keys(RESULT_TYPE_META) as ResultType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => toggle(hiddenTypes, type, setHiddenTypes)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              hiddenTypes.has(type)
                ? "border-border text-muted opacity-50"
                : "border-brand-strong bg-brand-soft text-brand-strong"
            )}
          >
            {RESULT_TYPE_META[type].label}
          </button>
        ))}
        <span className="ml-3 px-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          Difficulté
        </span>
        {(Object.keys(DIFFICULTY_META) as MathDifficulty[]).map((diff) => (
          <button
            key={diff}
            type="button"
            onClick={() => toggle(hiddenDifficulties, diff, setHiddenDifficulties)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              hiddenDifficulties.has(diff)
                ? "border-border text-muted opacity-50"
                : "border-brand-strong bg-brand-soft text-brand-strong"
            )}
          >
            {DIFFICULTY_META[diff].label}
          </button>
        ))}
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-bg-elevated">
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => zoomBy(1.25)}
            aria-label="Zoomer"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-card text-ink-soft shadow-sm transition hover:border-brand hover:text-brand"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => zoomBy(1 / 1.25)}
            aria-label="Dézoomer"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-card text-ink-soft shadow-sm transition hover:border-brand hover:text-brand"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView({ x: 0, y: 0, k: 1 })}
            aria-label="Réinitialiser la vue"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-card text-ink-soft shadow-sm transition hover:border-brand hover:text-brand"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-[70vh] max-h-[640px] min-h-[380px] w-full cursor-grab touch-none active:cursor-grabbing"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            {positions &&
              edges.map((edge, i) => {
                const pa = positions.get(edge.source);
                const pb = positions.get(edge.target);
                if (!pa || !pb) return null;
                const visible =
                  visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target);
                if (!visible) return null;
                const dimmed =
                  neighborIds !== null &&
                  !(neighborIds.has(edge.source) && neighborIds.has(edge.target));
                return (
                  <line
                    key={`${edge.source}-${edge.target}-${i}`}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke="var(--color-muted)"
                    strokeWidth={dimmed ? 1 : 1.4}
                    strokeOpacity={dimmed ? 0.12 : 0.45}
                    markerEnd="url(#mathmap-arrow)"
                  />
                );
              })}

            <defs>
              <marker
                id="mathmap-arrow"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-muted)" opacity={0.6} />
              </marker>
            </defs>

            {positions &&
              nodes.map((node) => {
                const p = positions.get(node.id);
                if (!p || !visibleNodeIds.has(node.id)) return null;
                const dimmed = neighborIds !== null && !neighborIds.has(node.id);
                const isSelected = node.id === selectedId;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${p.x} ${p.y})`}
                    onClick={() =>
                      setSelectedId((current) => (current === node.id ? null : node.id))
                    }
                    className="cursor-pointer"
                    opacity={dimmed ? 0.18 : 1}
                  >
                    <circle
                      r={isSelected ? 11 : 8}
                      fill={ACCENT_CLASSES[node.accent].stroke}
                      stroke="var(--color-bg-elevated)"
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />
                    <text
                      x={0}
                      y={21}
                      textAnchor="middle"
                      fontSize={11}
                      fill="var(--color-ink-soft)"
                      className="pointer-events-none select-none"
                    >
                      {graphLabel(node.title)}
                    </text>
                  </g>
                );
              })}
          </g>
        </svg>

        {selectedNode ? (
          <div className="absolute bottom-3 left-3 right-3 z-10 max-w-sm rounded-2xl border border-border bg-bg-card p-4 shadow-xl sm:left-3 sm:right-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-strong">
                  {RESULT_TYPE_META[selectedNode.type].label}
                </p>
                <p className="mt-1 font-serif text-[1.05rem] font-semibold leading-snug text-ink">
                  <InlineMath text={selectedNode.title} />
                </p>
                <p className="mt-1 text-xs text-muted">
                  {selectedNode.themeTitle} · {selectedNode.subtopicTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Fermer"
                className="text-muted hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Link
              href={resultHref(selectedNode)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-strong hover:text-brand"
            >
              Voir la fiche <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Glissez pour déplacer la carte, molette pour zoomer, cliquez sur un nœud pour
        voir ses informations.
      </p>
    </div>
  );
}
