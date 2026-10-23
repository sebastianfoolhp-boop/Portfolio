import type { CSSProperties } from "react";
import { PenLine, BookOpen, Clapperboard, Feather, type LucideIcon } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Card, { type Tone } from "@/components/ui/Card";
import type { DecorKind } from "@/components/ui/Decor";
import SectionHeader from "./SectionHeader";
import { LAB } from "@/lib/data";

// ============================================================
// The Lab is the playful section: every card has its own color, width,
// tilt and offset. These rows line up with LAB.items in lib/data.ts, in order.
// `tilt` is a slight rotation on wide screens (cards straighten when hovered).
// ============================================================
interface Look {
  tone: Tone;
  span: string;      // grid width on wide screens
  offset: string;    // vertical nudge on wide screens
  tilt: string;
  decor: DecorKind;
  icon: LucideIcon;
  minH: string;
}

const LOOKS: Look[] = [
  { tone: "sun",     span: "md:col-span-5", offset: "",         tilt: "-1.4deg", decor: "lines", icon: PenLine,      minH: "min-h-[19rem]" }, // Sketches
  { tone: "purple",  span: "md:col-span-7", offset: "md:mt-14", tilt: "0.9deg",  decor: "rings", icon: BookOpen,     minH: "min-h-[19rem]" }, // Book reflections
  { tone: "orange",  span: "md:col-span-6", offset: "md:mt-2",  tilt: "-0.8deg", decor: "arcs",  icon: Clapperboard, minH: "min-h-[17rem]" }, // Behind the scenes
  { tone: "outline", span: "md:col-span-6", offset: "md:mt-12", tilt: "1deg",    decor: "lines", icon: Feather,      minH: "min-h-[17rem]" }, // Personal writing
];

const FALLBACK: Look = { tone: "charcoal", span: "md:col-span-4", offset: "", tilt: "0deg", decor: "dots", icon: Feather, minH: "min-h-[14rem]" };

export default function LabSection() {
  return (
    <section id="lab" className="px-6 pb-32 pt-28 md:px-12 md:pb-40 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeader sectionKey="lab" title="The Lab" lead={LAB.description} />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
          {LAB.items.map((label, i) => {
            const look = LOOKS[i] ?? FALLBACK;
            const Icon = look.icon;
            return (
              <SectionReveal key={label} className={`${look.span} ${look.offset}`} delay={i * 0.06}>
                <Card
                  tone={look.tone}
                  decor={look.decor}
                  className={`card-tilt h-full p-7 md:p-9 ${look.minH}`}
                  style={{ "--tilt": look.tilt } as CSSProperties}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon aria-hidden strokeWidth={1.6} className="h-9 w-9" />
                    <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display mt-12 md:mt-auto" style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}>{label}</h3>
                  <span className="card-sub mt-6 inline-flex w-fit rounded-full border border-current px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
                    Coming soon
                  </span>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
