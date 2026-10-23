"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTransform, useMotionTemplate, type MotionValue } from "framer-motion";
import { SHARDS, SHATTER, VIEWBOX, VIEW, type Shard, type SectionKey } from "./shards";
import { scrollToSection } from "@/lib/scrollToSection";

const PORTRAIT_SRC = "/images/portrait-bw.jpg";

interface PieceProps {
  shard: Shard;
  progress: MotionValue<number>;
  reduced: boolean;
  active: boolean;
  onActivate: (id: SectionKey, el: SVGElement) => void;
  onDeactivate: (id: SectionKey) => void;
  onSelect: (id: SectionKey) => void;
}

function ShardPiece({ shard, progress, reduced, active, onActivate, onDeactivate, onSelect }: PieceProps) {
  const gRef = useRef<SVGGElement>(null);
  const [cx, cy] = shard.centroid;
  const [dx, dy] = shard.dir;
  const travel = reduced ? SHATTER.initialGap : SHATTER.separation;

  // SCROLL movement. These motion values write straight to the SVG transform
  // attribute of the OUTER group, so there are no scroll listeners and no React
  // re-renders. Hover lives on the INNER group below, so the two never conflict.
  const x = useTransform(progress, [0, 1], [dx * SHATTER.initialGap, dx * travel]);
  const y = useTransform(progress, [0, 1], [dy * SHATTER.initialGap, dy * travel]);
  const r = useTransform(progress, [0, 1], [0, reduced ? 0 : shard.rotate]);
  const s = useTransform(progress, [0, 1], [1, reduced ? 1 : 1 + shard.depth]);
  const transform = useMotionTemplate`translate(${x} ${y}) translate(${cx} ${cy}) rotate(${r}) scale(${s}) translate(${-cx} ${-cy})`;

  useEffect(() => {
    const el = gRef.current;
    if (!el) return;
    el.setAttribute("transform", transform.get());
    return transform.on("change", (v) => el.setAttribute("transform", v));
  }, [transform]);

  const points = shard.points.map((p) => p.join(",")).join(" ");
  const ms = reduced ? 120 : SHATTER.hoverMs;

  return (
    <g ref={gRef} data-shard={shard.id}>
      {/* HOVER movement: lift and brighten this piece only */}
      <g
        style={{
          transform: active && !reduced ? `translateY(${-SHATTER.hoverLift}px)` : "translateY(0)",
          filter: active ? `brightness(${SHATTER.hoverBrightness})` : "none",
          transition: `transform ${ms}ms ease-out, filter ${ms}ms ease-out`,
        }}
      >
        <g clipPath={`url(#${shard.id}-clip)`}>
          <image href={PORTRAIT_SRC} x={0} y={0} width={VIEWBOX.w} height={VIEWBOX.h} preserveAspectRatio="none" />
        </g>
        {/* Fracture edges: interior cracks only, hidden wherever they would cross empty black. */}
        <path
          d={shard.crackPath}
          fill="none"
          mask="url(#shard-line-mask)"
          stroke={active ? "#FFFFFF" : SHATTER.lineColor}
          strokeWidth={active ? SHATTER.lineWidth * 2 : SHATTER.lineWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ transition: `stroke ${ms}ms ease-out, stroke-width ${ms}ms ease-out` }}
        />
        {/* Polygon-shaped hit area: this is what the cursor, finger and keyboard interact with. */}
        <polygon
          points={points}
          fill="transparent"
          role="link"
          tabIndex={0}
          aria-label={`Go to ${shard.label}`}
          data-shard-button={shard.id}
          style={{ cursor: "pointer", outline: "none", touchAction: "manipulation" }}
          onPointerEnter={(e) => { if (e.pointerType === "mouse" || e.pointerType === "pen") onActivate(shard.id, e.currentTarget); }}
          onPointerLeave={(e) => { if (e.pointerType === "mouse" || e.pointerType === "pen") onDeactivate(shard.id); }}
          // Touch has no hover: show the name while the finger is down, then navigate on release.
          onPointerDown={(e) => { if (e.pointerType === "touch") onActivate(shard.id, e.currentTarget); }}
          onPointerUp={(e) => { if (e.pointerType === "touch") onDeactivate(shard.id); }}
          onPointerCancel={() => onDeactivate(shard.id)}
          // Keyboard focus shows the same highlight as hover.
          onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) onActivate(shard.id, e.currentTarget); }}
          onBlur={() => onDeactivate(shard.id)}
          onClick={() => onSelect(shard.id)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(shard.id); } }}
        />
      </g>
    </g>
  );
}

interface ShatteredPortraitProps {
  /** 0 = assembled, 1 = fully separated. Driven by how far the hero has scrolled away. */
  progress: MotionValue<number>;
  reduced: boolean;
}

export default function ShatteredPortrait({ progress, reduced }: ShatteredPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionKey | null>(null);
  const [labelPos, setLabelPos] = useState<{ x: number; y: number } | null>(null);

  // Place the label at the centre of the shard's actual on-screen rectangle.
  const onActivate = useCallback((id: SectionKey, el: SVGElement) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.getBoundingClientRect();
    const s = el.getBoundingClientRect();
    setLabelPos({ x: s.left + s.width / 2 - w.left, y: s.top + s.height / 2 - w.top });
    setActive(id);
  }, []);
  const onDeactivate = useCallback((id: SectionKey) => setActive((cur) => (cur === id ? null : cur)), []);
  const onSelect = useCallback((id: SectionKey) => scrollToSection(id), []);

  const activeShard = active ? SHARDS.find((s) => s.id === active) : undefined;

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
        role="group"
        aria-label="Portrait made of six pieces. Each piece links to a section of this page."
      >
        <defs>
          {/* Silhouette of the portrait: any non-black pixel becomes white. Used to hide crack lines over empty black. */}
          <filter id="shard-silhouette" colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
            <feColorMatrix type="matrix" values="0.34 0.33 0.33 0 0  0.34 0.33 0.33 0 0  0.34 0.33 0.33 0 0  0 0 0 1 0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="14" intercept="-0.1" />
              <feFuncG type="linear" slope="14" intercept="-0.1" />
              <feFuncB type="linear" slope="14" intercept="-0.1" />
            </feComponentTransfer>
          </filter>
          <mask id="shard-line-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse"
            x={0} y={0} width={VIEWBOX.w} height={VIEWBOX.h}>
            <image href={PORTRAIT_SRC} x={0} y={0} width={VIEWBOX.w} height={VIEWBOX.h}
              preserveAspectRatio="none" filter="url(#shard-silhouette)" />
          </mask>
          {SHARDS.map((s) => (
            <clipPath key={s.id} id={`${s.id}-clip`}>
              <polygon points={s.points.map((p) => p.join(",")).join(" ")} />
            </clipPath>
          ))}
        </defs>
        {SHARDS.map((s) => (
          <ShardPiece
            key={s.id}
            shard={s}
            progress={progress}
            reduced={reduced}
            active={active === s.id}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            onSelect={onSelect}
          />
        ))}
      </svg>

      {/* Section name over the hovered, pressed or focused piece */}
      {activeShard && labelPos && (
        <div
          className="pointer-events-none absolute"
          style={{ left: labelPos.x, top: labelPos.y, transform: "translate(-50%, -50%)" }}
        >
          <span
            className="eyebrow"
            style={{
              display: "block",
              color: "#FFFFFF",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.55)",
              padding: "7px 14px",
              whiteSpace: "nowrap",
              animation: reduced ? "none" : "label-in 200ms ease-out both",
            }}
          >
            {activeShard.label}
          </span>
        </div>
      )}
    </div>
  );
}
