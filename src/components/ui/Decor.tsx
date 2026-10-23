export type DecorKind = "arcs" | "rings" | "lines" | "dots" | "burst";

/**
 * Faint geometric line art that sits in a corner of a card. It uses the card's own
 * text color at low opacity, so it works on every card color.
 */
export default function Decor({ kind }: { kind: DecorKind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;

  if (kind === "arcs") {
    return (
      <svg aria-hidden viewBox="0 0 240 240" className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 opacity-25">
        {[40, 80, 120, 160].map((r) => <circle key={r} cx="240" cy="240" r={r} {...common} />)}
      </svg>
    );
  }
  if (kind === "rings") {
    return (
      <svg aria-hidden viewBox="0 0 240 240" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 opacity-25">
        <circle cx="120" cy="120" r="100" {...common} />
        <circle cx="120" cy="120" r="64" {...common} />
        <circle cx="120" cy="120" r="28" {...common} />
      </svg>
    );
  }
  if (kind === "lines") {
    return (
      <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute bottom-0 right-0 h-60 w-60 opacity-25">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={20 + i * 28} y1="200" x2={120 + i * 28} y2="0" {...common} />)}
      </svg>
    );
  }
  if (kind === "dots") {
    return (
      <svg aria-hidden viewBox="0 0 160 160" className="pointer-events-none absolute right-5 top-5 h-36 w-36 opacity-30">
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={14 + (i % 6) * 26} cy={14 + Math.floor(i / 6) * 26} r="2.6" fill="currentColor" />
        ))}
      </svg>
    );
  }
  // burst
  return (
    <svg aria-hidden viewBox="0 0 240 240" className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 opacity-25">
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <line key={i} x1={120 + Math.cos(a) * 34} y1={120 + Math.sin(a) * 34} x2={120 + Math.cos(a) * 110} y2={120 + Math.sin(a) * 110} {...common} />;
      })}
    </svg>
  );
}
