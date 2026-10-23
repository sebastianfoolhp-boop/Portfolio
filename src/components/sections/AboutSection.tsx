import SectionReveal from "@/components/ui/SectionReveal";
import Card, { type Tone } from "@/components/ui/Card";
import SectionHeader from "./SectionHeader";
import { HOME_ABOUT, ABOUT_PLACEHOLDERS } from "@/lib/data";

// Color and width of each waiting card, in the order of ABOUT_PLACEHOLDERS (lib/data.ts).
// Extra rows added to that list fall back to a plain charcoal card.
const LOOKS: { tone: Tone; span: string }[] = [
  { tone: "charcoal", span: "md:col-span-5" }, // Personal background
  { tone: "cobalt", span: "md:col-span-4" },   // Interests
  { tone: "charcoal", span: "md:col-span-4" }, // Motivations
  { tone: "sun", span: "md:col-span-4" },      // Values
  { tone: "charcoal", span: "md:col-span-12" },// Personal story
];

export default function AboutSection() {
  const facts = HOME_ABOUT.meta.split(" · ");

  return (
    <section id="about" className="px-6 pb-32 pt-28 md:px-12 md:pb-40 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeader sectionKey="about" title="About" />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          {/* The one-line introduction, the big orange card */}
          <SectionReveal className="md:col-span-7 md:row-span-2">
            <Card tone="orange" decor="arcs" className="h-full min-h-[22rem] p-7 md:p-12">
              <span className="eyebrow">In one line</span>
              <p className="display mt-10 md:mt-auto" style={{ fontSize: "clamp(2rem, 4.4vw, 4rem)" }}>{HOME_ABOUT.body}</p>
              <p className="card-sub mt-8 text-sm font-bold uppercase tracking-[0.14em]">{HOME_ABOUT.heading}</p>
            </Card>
          </SectionReveal>

          <SectionReveal className="md:col-span-5" delay={0.06}>
            <Card tone="charcoal" className="h-full p-7 md:p-9">
              <span className="eyebrow">The short version</span>
              <ul className="mt-6 space-y-3">
                {facts.map((line) => (
                  <li key={line} className="text-xl font-bold leading-tight md:text-2xl">{line}</li>
                ))}
              </ul>
            </Card>
          </SectionReveal>

          {/* Rows waiting for your own words */}
          {ABOUT_PLACEHOLDERS.map((label, i) => {
            const look = LOOKS[i] ?? { tone: "charcoal" as Tone, span: "md:col-span-4" };
            return (
              <SectionReveal key={label} className={look.span} delay={0.08 + i * 0.05}>
                <Card tone={look.tone} className="h-full min-h-[13rem] p-7 md:p-8">
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-10 md:mt-auto" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)" }}>{label}</h3>
                  <span className="card-sub mt-4 text-sm font-bold">Coming soon</span>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
