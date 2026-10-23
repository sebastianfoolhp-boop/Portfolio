import fs from "node:fs";
import path from "node:path";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/sections/AboutSection";
import MusicSection from "@/components/sections/MusicSection";
import CinemaSection from "@/components/sections/CinemaSection";
import WorkSection from "@/components/sections/WorkSection";
import LabSection from "@/components/sections/LabSection";
import ContactSection from "@/components/sections/ContactSection";

// Music and Cinema read from Sanity, so the page refreshes its data at most once a minute.
// Drop a full-color version of the portrait here (same shape, face on black) and the homepage uses it.
const COLOR_PORTRAIT = "/images/portrait-color.jpg";

export const revalidate = 60;

// The whole site is this one page. The order below is the order on screen, and each
// section's HTML id (#home, #about, #music, #cinema, #work, #lab, #contact) is what the
// dock and the portrait pieces scroll to. To reorder, change both this list and SECTIONS in lib/data.ts.
export default function Page() {
  return (
    <main>
      <Hero portraitSrc={fs.existsSync(path.join(process.cwd(), "public", COLOR_PORTRAIT)) ? COLOR_PORTRAIT : undefined} />
      <AboutSection />
      <MusicSection />
      <CinemaSection />
      <WorkSection />
      <LabSection />
      <ContactSection />
    </main>
  );
}
