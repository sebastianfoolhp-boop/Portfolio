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

export const VIEWBOX = { w: 1000, h: 1343 };

/** Point the shards fly away from on scroll (roughly the nose). */
export const FACE_CENTER: [number, number] = [499, 600];

export const SHATTER = {
  /** Gap between shards before any scrolling, in viewBox units. */
  initialGap: 0,
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
  /** Thickness (viewBox units) and colour of the silver highlight along each crack. The gap width is GAP_MAX below. */
  edge: 2.0,
  edgeColor: "#EFEFEF",
};

import { SECTIONS, type SectionKey } from "@/lib/data";

export type { SectionKey };

type Pt = [number, number];

/** Display name for a section, read from the shared SECTIONS list in lib/data.ts. */
const labelOf = (key: SectionKey) => SECTIONS.find((s) => s.key === key)?.label ?? key;

// ============================================================
// FRACTURE LAYOUT. Edit the numbers in this block to reshape the pieces.
// ============================================================
// The portrait image is public/images/portrait-shatter.jpg (1082 x 1453 pixels, no cracks in it).
// Every point below is in that image's own pixels; P() converts to viewBox units.
// Each crack is written once, as a few guide points, then roughened by jag() into a natural
// zigzag. Both pieces that touch a crack use the very same points, so they always fit together.
const IMG = { w: 1082, h: 1453 };
const K = VIEWBOX.w / IMG.w;
const P = (x: number, y: number): Pt => [
  x >= IMG.w ? VIEWBOX.w : Math.round(x * K * 10) / 10,
  y >= IMG.h ? VIEWBOX.h : Math.round(y * K * 10) / 10,
];

/** Small deterministic random numbers so the zigzags are the same on every load. */
function rng(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Turn straight guide segments into a jagged crack (end points stay exactly where you put them). */
function jag(guides: [number, number][], seed: number, step = 62, amp = 9): Pt[] {
  const rand = rng(seed);
  const out: Pt[] = [];
  for (let i = 0; i < guides.length - 1; i++) {
    const [x0, y0] = guides[i];
    const [x1, y1] = guides[i + 1];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / len, ny = (x1 - x0) / len;
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      const off = k === n ? 0 : (rand() * 2 - 1) * amp;
      out.push(P(x0 + (x1 - x0) * t + nx * off, y0 + (y1 - y0) * t + ny * off));
    }
  }
  return out.slice(0, -1); // the last point is the junction itself, added by the polygon
}

// ---- Junctions (where cracks meet) ----------------------------
const J1 = P(530, 500);   // between the brows
const J2 = P(475, 740);   // just above the lips, under the nose

// ---- Where cracks leave the picture (on its border) ---------
const T = P(670, 0), L1 = P(0, 430), R1 = P(1082, 600), L2 = P(0, 860), R2 = P(1082, 980), B = P(620, 1453);

// ---- Corners ------------------------------------------------
const C00: Pt = [0, 0], C10: Pt = [VIEWBOX.w, 0], C11: Pt = [VIEWBOX.w, VIEWBOX.h], C01: Pt = [0, VIEWBOX.h];

// ---- The seven cracks, each listed in the direction named ----
const V = jag([[670, 0], [610, 220], [565, 380], [530, 500]], 11);                      // top edge -> brows
const HL = jag([[530, 500], [440, 452], [370, 448], [290, 500], [0, 430]], 23);        // brows -> left edge
const HR = jag([[530, 500], [620, 462], [760, 440], [860, 520], [1082, 600]], 37);     // brows -> right edge
const N = jag([[530, 500], [540, 560], [500, 640], [470, 700], [475, 740]], 41);       // brows -> down the nose -> above the lips
const ML = jag([[475, 740], [400, 762], [330, 730], [290, 850], [200, 800], [0, 860]], 53);   // above lips -> left edge
const MR = jag([[475, 740], [560, 742], [650, 738], [720, 820], [800, 880], [1082, 980]], 67); // above lips -> right edge
const V2 = jag([[475, 740], [520, 800], [505, 870], [560, 950], [600, 1100], [560, 1250], [620, 1453]], 79); // lips -> bottom edge

const rev = (p: Pt[]) => [...p].reverse();

// ---- How the cracks are drawn ---------------------------------
// Every crack is a tapered black gap (thin where it ends at the picture's edge, widest in the middle)
// with a thin silver highlight along its upper-left lip, like a chip in glazed porcelain.
const GAP_MAX = 6.5;
function ribbon(pts: Pt[], taperStart: boolean, taperEnd: boolean) {
  const len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[len.length - 1];
  const left: Pt[] = [], right: Pt[] = [];
  let lit = 0;
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const tl = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / tl, ny = (b[0] - a[0]) / tl;
    const t = len[i] / total;
    const grow = Math.min(taperStart ? t / 0.16 : 1, taperEnd ? (1 - t) / 0.16 : 1, 1);
    const w = GAP_MAX * (0.16 + 0.84 * grow) * (0.82 + 0.3 * Math.abs(Math.sin(i * 2.3 + total)));
    left.push([p[0] + (nx * w) / 2, p[1] + (ny * w) / 2]);
    right.push([p[0] - (nx * w) / 2, p[1] - (ny * w) / 2]);
    lit += -nx - ny; // positive when the left edge faces up and to the left
  });
  const f = (q: Pt) => `${Math.round(q[0] * 10) / 10} ${Math.round(q[1] * 10) / 10}`;
  const dark = `M${left.map(f).join(" L")} L${[...right].reverse().map(f).join(" L")} Z`;
  const edge = lit >= 0 ? left : right;
  return { dark, light: `M${edge.map(f).join(" L")}` };
}

interface ShardSpec {
  /** Unique name of this piece. */
  id: string;
  /** The section this piece opens. */
  section: SectionKey;
  label: string;
  points: Pt[];
  /** Degrees of rotation at full scroll. */
  rotate: number;
  /** Scale change at full scroll (0.04 = grows 4%, -0.03 = shrinks 3%). */
  depth: number;
}

// Exactly six pieces, one per section. Each polygon is built from the cracks above, so every
// crack is a shared edge between two neighbours:
//   upper left -> About          upper right -> Music
//   middle left -> Cinema        middle right -> Work
//   lower left -> The Lab        lower right -> Contact
// To re-map a piece, change its `section` to any key from SECTIONS in lib/data.ts.
const SPECS: ShardSpec[] = [
  { id: "p-about",   section: "about",   label: labelOf("about"),   rotate: -2.4, depth:  0.015,
    points: [C00, T, ...V, J1, ...HL, L1] },
  { id: "p-music",   section: "music",   label: labelOf("music"),   rotate:  2.2, depth: -0.012,
    points: [T, C10, R1, ...rev(HR), J1, ...rev(V)] },
  { id: "p-cinema",  section: "cinema",  label: labelOf("cinema"),  rotate:  1.6, depth: -0.012,
    points: [L1, ...rev(HL), J1, ...N, J2, ...ML, L2] },
  { id: "p-work",    section: "work",    label: labelOf("work"),    rotate: -1.8, depth:  0.015,
    points: [R1, R2, ...rev(MR), J2, ...rev(N), J1, ...HR] },
  { id: "p-lab",     section: "lab",     label: labelOf("lab"),     rotate: -1.4, depth: -0.01,
    points: [L2, ...rev(ML), J2, ...V2, B, C01] },
  { id: "p-contact", section: "contact", label: labelOf("contact"), rotate:  2.0, depth:  0.012,
    points: [J2, ...MR, R2, C11, B, ...rev(V2)] },
];

/** Every crack, start to end, drawn identically on whichever pieces touch it. */
const FULL_CRACKS: { pts: Pt[]; s: boolean; e: boolean }[] = [
  { pts: [T, ...V, J1], s: true, e: false },
  { pts: [J1, ...HL, L1], s: false, e: true },
  { pts: [J1, ...HR, R1], s: false, e: true },
  { pts: [J1, ...N, J2], s: false, e: false },
  { pts: [J2, ...ML, L2], s: false, e: true },
  { pts: [J2, ...MR, R2], s: false, e: true },
  { pts: [J2, ...V2, B], s: false, e: true },
];
const ART = FULL_CRACKS.map((c) => ribbon(c.pts, c.s, c.e));
/** SVG path data for all the dark gaps, and for the silver highlights. */
export const CRACK_GAPS = ART.map((a) => a.dark).join(" ");
export const CRACK_EDGES = ART.map((a) => a.light).join(" ");

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
