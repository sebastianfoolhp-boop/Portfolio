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
export const FACE_CENTER: [number, number] = [497, 640];

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
  /** Fracture line colour and width (screen pixels, does not scale). */
  lineColor: "#B4B4B4",
  lineWidth: 1.1,
};

import { SECTIONS, type SectionKey } from "@/lib/data";

export type { SectionKey };

type Pt = [number, number];

/** Display name for a section, read from the shared SECTIONS list in lib/data.ts. */
const labelOf = (key: SectionKey) => SECTIONS.find((s) => s.key === key)?.label ?? key;

// The portrait image (public/images/portrait-shatter.jpg) has its cracks drawn into it.
// The points below were traced on that image in its own pixels (1086 x 1448) and are
// converted to viewBox units by P(). Re-trace them if you ever swap the image.
const K = 1000 / 1086;
const P = (x: number, y: number): Pt => [
  x >= 1086 ? 1000 : Math.round(x * K * 10) / 10,
  y >= 1448 ? 1333 : Math.round(y * K * 10) / 10,
];
const line = (...pts: [number, number][]): Pt[] => pts.map(([x, y]) => P(x, y));

// ---- Crack junctions (where cracks meet) --------------------
const J1 = P(570, 548);   // between the brows
const J2 = P(738, 683);   // right cheek
const J3 = P(652, 857);   // right jaw
const J4 = P(468, 1010);  // chin
const J5 = P(328, 850);   // left jaw
const J6 = P(470, 1078);  // throat
const J7 = P(558, 1163);  // collar

// ---- Where cracks leave the picture (on its border) ---------
const TOPb = P(800, 0);
const Lb1 = P(0, 204), Lb2 = P(0, 436);
const Rb1 = P(1086, 775), Rb2 = P(1086, 960);
const Bb = P(685, 1448);

// ---- Corners ------------------------------------------------
const C00: Pt = [0, 0], C10: Pt = [1000, 0], C11: Pt = [1000, 1333], C01: Pt = [0, 1333];

// ---- Crack polylines (interior points only, in the direction named) ----
const A_ = line([350, 358], [400, 380], [445, 410], [470, 450], [520, 478], [568, 515]);       // left edge -> J1
const B_ = line([580, 525], [600, 500], [630, 440], [650, 390], [680, 330], [697, 312]);        // J1 -> top edge
const C1 = line([620, 585], [690, 625], [728, 655]);                                            // J1 -> J2
const C2 = line([800, 710], [818, 722]);                                                        // J2 -> right edge
const D1 = line([715, 720], [690, 780]);                                                        // J2 -> J3
const D2 = line([620, 900], [560, 945], [500, 985]);                                            // J3 -> J4
const E3 = line([700, 880], [765, 935]);                                                        // J3 -> right edge
const E_ = line([295, 600], [340, 625], [395, 655], [440, 690], [445, 705], [435, 730], [400, 780], [350, 830]); // left edge -> J5
const F = line([350, 885], [385, 935], [420, 980]);                                             // J5 -> J4
const G = line([462, 1040], [450, 1070]);                                                       // J4 -> J6
const I = line([500, 1115], [530, 1150]);                                                       // J6 -> J7
const K_ = line([575, 1195], [600, 1240], [625, 1285], [655, 1345], [675, 1405]);               // J7 -> bottom edge

const rev = (p: Pt[]) => [...p].reverse();

interface ShardSpec {
  /** Unique name of this piece. */
  id: string;
  /** The section this piece opens. Several pieces may open the same section. */
  section: SectionKey;
  label: string;
  points: Pt[];
  /** Degrees of rotation at full scroll. */
  rotate: number;
  /** Scale change at full scroll (0.04 = grows 4%, -0.03 = shrinks 3%). */
  depth: number;
}

// Six pieces, one per section. Which piece opens which section:
//   top left -> About            top right -> Music
//   centre of the face -> Cinema right cheek -> Work
//   left cheek, neck and lower left -> The Lab
//   right jaw, neck and lower right -> Contact
// To re-map a piece, change its `section` to any key from SECTIONS in lib/data.ts.
const SPECS: ShardSpec[] = [
  { id: "p-about",    section: "about",   label: labelOf("about"),   rotate: -2.5, depth:  0.015,
    points: [C00, TOPb, ...rev(B_), J1, ...rev(A_), Lb1] },
  { id: "p-music",    section: "music",   label: labelOf("music"),   rotate:  2.2, depth: -0.012,
    points: [TOPb, C10, Rb1, ...rev(C2), J2, ...rev(C1), J1, ...B_] },
  { id: "p-cinema",   section: "cinema",  label: labelOf("cinema"),  rotate:  1.4, depth: -0.012,
    points: [Lb1, ...A_, J1, ...C1, J2, ...D1, J3, ...D2, J4, ...rev(F), J5, ...rev(E_), Lb2] },
  { id: "p-work",     section: "work",    label: labelOf("work"),    rotate: -1.8, depth:  0.02,
    points: [J2, ...C2, Rb1, Rb2, ...rev(E3), J3, ...rev(D1)] },
  { id: "p-lab",      section: "lab",     label: labelOf("lab"),     rotate: -1.6, depth: -0.01,
    points: [Lb2, ...E_, J5, ...F, J4, ...G, J6, ...I, J7, ...K_, Bb, C01] },
  { id: "p-contact",  section: "contact", label: labelOf("contact"), rotate:  2.2, depth:  0.012,
    points: [J3, ...E3, Rb2, C11, Bb, ...rev(K_), J7, ...rev(I), J6, ...rev(G), J4, ...rev(D2)] },
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
