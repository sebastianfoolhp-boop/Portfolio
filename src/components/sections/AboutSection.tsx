import fs from "node:fs";
import path from "node:path";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import SectionHeader from "./SectionHeader";
import { HOME_ABOUT } from "@/lib/data";

// Drop your photo at public/images/about-headshot.jpg and it appears in the About section on its own.
const HEADSHOT = "/images/about-headshot.jpg";

export default function AboutSection() {
  const hasHeadshot = fs.existsSync(path.join(process.cwd(), "public", HEADSHOT));
  const facts = HOME_ABOUT.meta.split(" · ");

  return (
    <section id="about" className="px-6 pb-32 pt-28 md:px-12 md:pb-40 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeader sectionKey="about" title="About" />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          {/* Headshot */}
          <SectionReveal className="md:col-span-5 md:row-span-2">
            <Card tone="charcoal" hover={false} className="aspect-[4/5] w-full">
              {hasHeadshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={HEADSHOT} alt="Sebastian Perez" className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
              ) : (
                <span className="eyebrow m-auto">Headshot coming soon</span>
              )}
            </Card>
          </SectionReveal>

          {/* The one-line introduction, the big orange card */}
          <SectionReveal className="md:col-span-7">
            <Card tone="orange" decor="arcs" className="h-full min-h-[22rem] p-7 md:p-12">
              <span className="eyebrow">In one line</span>
              <p className="display mt-10 md:mt-auto" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>Sebas Perez</p>
            </Card>
          </SectionReveal>

          <SectionReveal className="md:col-span-7" delay={0.06}>
            <Card tone="charcoal" className="h-full p-7 md:p-9">
              <span className="eyebrow">The short version</span>
              <ul className="mt-6 space-y-3">
                {facts.map((line) => (
                  <li key={line} className="text-xl font-bold leading-tight md:text-2xl">{line}</li>
                ))}
              </ul>
            </Card>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
