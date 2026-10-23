import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Decor, { type DecorKind } from "./Decor";

// ============================================================
// Card colors. Text color is picked per card for strong contrast.
// To change a color, edit the --color-pop-* values in globals.css.
// ============================================================
export type Tone = "charcoal" | "dark" | "outline" | "orange" | "lime" | "cobalt" | "purple" | "sun";

const TONES: Record<Tone, string> = {
  charcoal: "bg-[#161616] text-ink border border-white/[0.07]",
  dark: "bg-[#0b0b0b] text-ink border border-white/[0.12]",
  outline: "bg-transparent text-ink border border-dashed border-white/25",
  orange: "card-colored bg-pop-orange text-black",
  lime: "card-colored bg-pop-lime text-black",
  cobalt: "card-colored card-light-text bg-pop-cobalt text-white",
  purple: "card-colored card-light-text bg-pop-purple text-white",
  sun: "card-colored bg-pop-sun text-black",
};

interface CardProps {
  tone?: Tone;
  /** Makes the whole card a link. */
  href?: string;
  /** Open the link in a new tab (use for other websites). */
  external?: boolean;
  /** Faint line art in a corner of the card. */
  decor?: DecorKind;
  /** Lift and grow on hover. On by default. */
  hover?: boolean;
  className?: string;
  /** Inline style, used for things like the Lab's per-card tilt. */
  style?: CSSProperties;
  children: ReactNode;
}

/** A rounded content card. Used for every colored or charcoal block below the homepage. */
export default function Card({
  tone = "charcoal",
  href,
  external = false,
  decor,
  hover = true,
  className = "",
  style,
  children,
}: CardProps) {
  const cls = `card ${hover ? "card-hover" : ""} ${TONES[tone]} ${className}`;
  const inner = (
    <>
      {decor && <Decor kind={decor} />}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${cls} block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
        style={style}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return <div className={cls} style={style}>{inner}</div>;
}

/** The little arrow that nudges when its card is hovered. */
export function CardArrow({ className = "h-6 w-6" }: { className?: string }) {
  return <ArrowUpRight aria-hidden strokeWidth={2} className={`card-arrow shrink-0 ${className}`} />;
}
