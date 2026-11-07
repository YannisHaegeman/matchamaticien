export type Point = { x: number; y: number };

export type Shape =
  | { kind: "freehand"; points: Point[]; color: string; closed: boolean }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number; color: string; arrow: boolean }
  | { kind: "rect"; x: number; y: number; w: number; h: number; color: string }
  | { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number; color: string }
  | { kind: "triangle"; p1: Point; p2: Point; p3: Point; color: string };

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function perpDistance(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return Math.abs((p.x - a.x) * dy - (p.y - a.y) * dx) / len;
}

/** Douglas-Peucker sur une chaîne ouverte : ne garde que les points qui
 * s'écartent de plus de `epsilon` du segment direct. */
function simplifyOpen(points: Point[], epsilon: number): Point[] {
  if (points.length < 3) return points;
  const start = points[0];
  const end = points[points.length - 1];
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDistance(points[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = simplifyOpen(points.slice(0, index + 1), epsilon);
    const right = simplifyOpen(points.slice(index), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [start, end];
}

/** Simplifie un contour fermé (début ≈ fin) en coupant la boucle en
 * deux chaînes ouvertes via le point le plus éloigné du départ, pour
 * que Douglas-Peucker reste pertinent sur toute la boucle. Le nombre
 * de sommets restants sert de nombre de "coins" détectés. */
function simplifyClosed(points: Point[], epsilon: number): Point[] {
  const pts = points.slice(0, -1);
  if (pts.length < 3) return pts;
  let farIndex = 0;
  let farDist = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = dist(pts[i], pts[0]);
    if (d > farDist) {
      farDist = d;
      farIndex = i;
    }
  }
  const chain1 = simplifyOpen(pts.slice(0, farIndex + 1), epsilon);
  const chain2 = simplifyOpen(pts.slice(farIndex), epsilon);
  return [...chain1.slice(0, -1), ...chain2.slice(0, -1)];
}

/** Lissage léger (moyenne glissante) pour un trait gardé "à main
 * levée" — adoucit les tremblements sans en changer la forme. */
export function smoothPoints(points: Point[]): Point[] {
  if (points.length < 3) return points;
  const out: Point[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1];
    const b = points[i];
    const c = points[i + 1];
    out.push({ x: (a.x + b.x * 2 + c.x) / 4, y: (a.y + b.y * 2 + c.y) / 4 });
  }
  out.push(points[points.length - 1]);
  return out;
}

export function pointsToSmoothPath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const mid = { x: (prev.x + curr.x) / 2, y: (prev.y + curr.y) / 2 };
    d += ` Q ${prev.x} ${prev.y} ${mid.x} ${mid.y}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

/**
 * Devine la forme géométrique la plus proche d'un trait à main levée
 * (ligne/flèche, rectangle, triangle, cercle/ellipse), pour un rendu
 * "propre" plutôt que le tracé brut — sinon garde un trait lissé.
 * Les coordonnées d'entrée et de sortie sont dans le même espace
 * (en pratique : pixels à l'écran au moment du tracé).
 */
export function recognizeShape(rawPoints: Point[], color: string, arrowMode: boolean): Shape {
  const points = rawPoints.length > 2 ? smoothPoints(rawPoints) : rawPoints;
  const first = points[0];
  const last = points[points.length - 1];
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const bboxW = maxX - minX;
  const bboxH = maxY - minY;
  const bboxDiag = Math.hypot(bboxW, bboxH);
  const closeGap = dist(first, last);
  const isClosed = bboxDiag > 10 && closeGap < Math.max(16, 0.22 * bboxDiag);

  if (!isClosed) {
    const straightLen = dist(first, last);
    if (straightLen > 10) {
      const maxDev = points.reduce((m, p) => Math.max(m, perpDistance(p, first, last)), 0);
      if (maxDev < Math.max(7, 0.07 * straightLen)) {
        return { kind: "line", x1: first.x, y1: first.y, x2: last.x, y2: last.y, color, arrow: arrowMode };
      }
    }
    return { kind: "freehand", points, color, closed: false };
  }

  const epsilon = Math.max(6, bboxDiag * 0.045);
  const simplified = simplifyClosed(points, epsilon);
  const corners = simplified.length;

  if (corners === 3) {
    return { kind: "triangle", p1: simplified[0], p2: simplified[1], p3: simplified[2], color };
  }
  if (corners === 4 || corners === 5) {
    return { kind: "rect", x: minX, y: minY, w: bboxW, h: bboxH, color };
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const radii = points.map((p) => Math.hypot((p.x - cx) / (bboxW / 2 || 1), (p.y - cy) / (bboxH / 2 || 1)));
  const meanR = radii.reduce((a, b) => a + b, 0) / radii.length;
  const variance = radii.reduce((a, b) => a + (b - meanR) ** 2, 0) / radii.length;
  const cv = Math.sqrt(variance) / (meanR || 1);
  if (bboxDiag > 14 && cv < 0.28) {
    return { kind: "ellipse", cx, cy, rx: bboxW / 2, ry: bboxH / 2, color };
  }

  return { kind: "freehand", points, color, closed: true };
}
