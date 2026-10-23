// ============================================================
// SHATTERED PORTRAIT — geometry and tuning in one place
// ============================================================
//
// Coordinate space: the SVG viewBox below. The portrait image is drawn to fill
// it exactly, and every shard is a polygon in these units.
//
// The six polygons are assembled from shared crack polylines so they tile the
// full rectangle with no gaps or overlaps. If you edit a crack, edit it once
// here and every polygon that uses it updates.

export const VIEWBOX = { w: 1000, h: 1333 };

/** Point the shards fly away from on scroll (roughly the nose). */
export const FACE_CENTER: [number, number] = [500, 720];

export const SHATTER = {
  /** Gap between shards before any scrolling, in viewBox units. */
  initialGap: 2.5,
  /**
   * How far shards travel outward by the time the hero has scrolled away, in
   * viewBox units. On screen this is about 10px on a phone up to about 25px on
   * a large desktop, because the portrait scales with the screen. Raise it for
   * a bigger break, lower it for a subtler one.
   */
  separation: 36,
  /** How far a hovered shard lifts, in viewBox units (about 3 to 6px on screen). */
  hoverLift: 8,
  /** CSS brightness() multiplier on hover. */
  hoverBrightness: 1.22,
  /** Hover transition length in milliseconds. */
  hoverMs: 250,
  /** Fracture line colour and width (screen pixels, does not scale). */
  lineColor: "#B4B4B4",
  lineWidth: 1.1,
};

import { SECTIONS, type SectionKey } from "@/lib/data";

export type { SectionKey };

type Pt = [number, number];

/** Display name for a section, read from the shared SECTIONS list in lib/data.ts. */
const labelOf = (key: SectionKey) => SECTIONS.find((s) => s.key === key)?.label ?? key;

// ---- Crack junctions ----------------------------------------
const A: Pt = [505, 470];   // between the brows
const B: Pt = [440, 1000];  // left of the chin
const C: Pt = [640, 820];   // right cheek

// ---- Edge exits ---------------------------------------------
const T: Pt = [530, 0];      // top edge
const L1: Pt = [0, 680];     // left edge, upper
const L2: Pt = [0, 1050];    // left edge, lower
const BB: Pt = [480, 1333];  // bottom edge
const R1: Pt = [1000, 650];  // right edge, upper
const R2: Pt = [1000, 800];  // right edge, lower

// ---- Corners ------------------------------------------------
const C00: Pt = [0, 0], C10: Pt = [1000, 0], C11: Pt = [1000, 1333], C01: Pt = [0, 1333];

// ---- Crack polylines (interior points only, listed from first node to second)
const AT: Pt[]  = [[470, 380], [520, 250], [490, 120]];
const AL1: Pt[] = [[430, 560], [340, 610], [230, 640], [120, 690]];
const AR1: Pt[] = [[580, 590], [680, 620], [800, 620], [900, 640]];
const AC: Pt[]  = [[545, 580], [525, 690], [585, 760]];
const CR2: Pt[] = [[760, 790], [860, 830]];
const CB: Pt[]  = [[560, 870], [480, 920]];
const BL2: Pt[] = [[330, 980], [220, 1030], [100, 1010]];
const BBB: Pt[] = [[470, 1100], [430, 1210]];

const rev = (p: Pt[]) => [...p].reverse();

interface ShardSpec {
  id: SectionKey;
  label: string;
  points: Pt[];
  /** Degrees of rotation at full scroll. */
  rotate: number;
  /** Scale change at full scroll (0.04 = grows 4%, -0.03 = shrinks 3%). */
  depth: number;
}

// Which piece opens which section. To re-map a piece, change its `id` to any key
// from SECTIONS in lib/data.ts. Each id may be used only once.
//   upper left  -> About        upper right -> Music
//   middle left -> Cinema       middle right -> Work
//   lower left  -> The Lab      lower right -> Contact
// `rotate` (degrees) and `depth` (scale change) shape how each piece drifts as the page scrolls.
const SPECS: ShardSpec[] = [
  { id: "about",   label: labelOf("about"),   rotate: -2.5, depth:  0.015,
    points: [C00, T, ...rev(AT), A, ...AL1, L1] },
  { id: "music",   label: labelOf("music"),   rotate:  2.2, depth: -0.012,
    points: [T, C10, R1, ...rev(AR1), A, ...AT] },
  { id: "cinema",  label: labelOf("cinema"),  rotate:  1.6, depth: -0.015,
    points: [L1, ...rev(AL1), A, ...AC, C, ...CB, B, ...BL2, L2] },
  { id: "work",    label: labelOf("work"),    rotate: -1.8, depth:  0.02,
    points: [A, ...AR1, R1, R2, ...rev(CR2), C, ...rev(AC)] },
  { id: "lab",     label: labelOf("lab"),     rotate: -1.5, depth: -0.01,
    points: [L2, ...rev(BL2), B, ...BBB, BB, C01] },
  { id: "contact", label: labelOf("contact"), rotate:  2.4, depth:  0.015,
    points: [B, ...rev(CB), C, ...CR2, R2, C11, BB, ...rev(BBB)] },
];

export interface Shard extends ShardSpec {
  centroid: Pt;
  /** Unit vector pointing away from FACE_CENTER. */
  dir: Pt;
  area: number;
  /** SVG path of this shard's crack edges only (edges on the outer border are omitted). */
  crackPath: string;
}

function onBorder(a: Pt, b: Pt): boolean {
  return (a[0] === 0 && b[0] === 0) || (a[0] === VIEWBOX.w && b[0] === VIEWBOX.w)
      || (a[1] === 0 && b[1] === 0) || (a[1] === VIEWBOX.h && b[1] === VIEWBOX.h);
}

function crackPath(points: Pt[]): string {
  const parts: string[] = [];
  let pen = false;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    if (onBorder(a, b)) { pen = false; continue; }
    if (!pen) { parts.push(`M${a[0]} ${a[1]}`); pen = true; }
    parts.push(`L${b[0]} ${b[1]}`);
  }
  return parts.join(" ");
}

/**
 * Where the shard's outline ends up at full scroll (translation + rotation +
 * scale about its centroid). Used to size the portrait box so that even fully
 * separated, every piece stays inside the visible area.
 */
function fullScrollBounds(s: { points: Pt[]; centroid: Pt; dir: Pt; rotate: number; depth: number }) {
  const [cx, cy] = s.centroid;
  const rad = (s.rotate * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  const k = 1 + s.depth;
  const tx = s.dir[0] * SHATTER.separation, ty = s.dir[1] * SHATTER.separation;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [px, py] of s.points) {
    const ux = (px - cx) * k, uy = (py - cy) * k;
    const x = cx + ux * cos - uy * sin + tx;
    const y = cy + ux * sin + uy * cos + ty;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

function centroidAndArea(points: Pt[]): { centroid: Pt; area: number } {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    const cross = x0 * y1 - x1 * y0;
    a += cross; cx += (x0 + x1) * cross; cy += (y0 + y1) * cross;
  }
  a /= 2;
  return { centroid: [cx / (6 * a), cy / (6 * a)], area: Math.abs(a) };
}

export const SHARDS: Shard[] = SPECS.map((s) => {
  const { centroid, area } = centroidAndArea(s.points);
  const vx = centroid[0] - FACE_CENTER[0], vy = centroid[1] - FACE_CENTER[1];
  const len = Math.hypot(vx, vy) || 1;
  return { ...s, centroid, area, dir: [vx / len, vy / len], crackPath: crackPath(s.points) };
});

/** Extra room (viewBox units) for the hover lift and crack-line stroke. */
const EDGE_MARGIN = 14;

const FULL_BOUNDS = SHARDS.map(fullScrollBounds);
const PAD = {
  left: Math.max(0, -Math.min(...FULL_BOUNDS.map((b) => b.minX))) + EDGE_MARGIN,
  top: Math.max(0, -Math.min(...FULL_BOUNDS.map((b) => b.minY))) + EDGE_MARGIN,
  right: Math.max(0, Math.max(...FULL_BOUNDS.map((b) => b.maxX)) - VIEWBOX.w) + EDGE_MARGIN,
  bottom: Math.max(0, Math.max(...FULL_BOUNDS.map((b) => b.maxY)) - VIEWBOX.h) + EDGE_MARGIN,
};

/**
 * The SVG's actual view: the portrait rectangle plus the room the pieces need
 * when fully separated. The component sizes this whole box to fit the screen,
 * so raising `SHATTER.separation` shrinks the resting portrait a little rather
 * than letting pieces run off the page.
 */
export const VIEW = {
  x: -PAD.left,
  y: -PAD.top,
  w: VIEWBOX.w + PAD.left + PAD.right,
  h: VIEWBOX.h + PAD.top + PAD.bottom,
};
