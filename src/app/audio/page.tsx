import NavBar from "@/components/layout/NavBar";
import GlassCard from "@/components/ui/GlassCard";
import SectionReveal from "@/components/ui/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import VideoGrid from "@/components/ui/VideoGrid";
import AudioSetsGrid from "@/components/ui/AudioSetsGrid";
import IconLinks from "@/components/ui/IconLinks";
import { AUDIO_SETS, AUDIO_YOUTUBE } from "@/lib/data";
import { getAudioSets, getYouTubeVideos } from "@/sanity/lib/queries";

export const revalidate = 60;

// Update hrefs with your real links
const AUDIO_SOCIALS = [
  { key: "youtube", href: "https://www.youtube.com/@SebasPerez-sp", label: "YouTube" },
  { key: "soundcloud", href: "https://soundcloud.com/", label: "SoundCloud" },
  { key: "tiktok", href: "https://www.tiktok.com/@sebxsjairo", label: "TikTok" },
  { key: "instagram", href: "https://www.instagram.com/sxbxssp/", label: "Instagram" },
];

export default async function AudioPage() {
  const [sanitySets, sanityVideos] = await Promise.all([
    getAudioSets().catch(() => []),
    getYouTubeVideos("audio").catch(() => []),
  ]);

  const sets = sanitySets.length > 0
    ? sanitySets.map((s) => ({ id: s._id, label: s.label, sublabel: s.sublabel ?? "", duration: s.duration ?? "", embedCode: s.embedCode, href: undefined, isTikTok: false }))
    : AUDIO_SETS.map((s) => ({ ...s, id: String(s.id), embedCode: undefined }));

  const videos = sanityVideos.length > 0
    ? sanityVideos.map((v) => ({ title: v.title, videoId: v.videoId, label: v.label }))
    : AUDIO_YOUTUBE;

  const embedSet = sets.find((s) => s.embedCode);

  return (
    <main style={{ background: "#FAF9F6" }}>
      <PageHero
        title="AUDIO"
        subtitle="DJ sets, mixes, and live sessions."
        colorGradient="radial-gradient(ellipse at 30% 60%, rgba(255,80,0,0.55) 0%, rgba(255,30,80,0.3) 45%, transparent 70%)"
      />
      <NavBar />

      {/* Social icons */}
      <section className="pt-12 pb-2 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <IconLinks links={AUDIO_SOCIALS} />
        </div>
      </section>

      <section className="py-16 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-center" style={{ color: "rgba(44,40,37,0.3)" }}>Latest Video</p>
            <div style={{ maxWidth: "66%", margin: "0 auto" }}>
              <VideoGrid videos={videos} previewCount={1} accentColor="#1B2A4A" sectionLabel="Audio" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      <section className="py-16 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(44,40,37,0.3)" }}>Sets & Mixes</p>
            <AudioSetsGrid sets={sets} />
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      <section className="py-16 pb-28 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(44,40,37,0.3)" }}>Listen</p>
            <GlassCard className="p-8">
              {embedSet?.embedCode ? (
                <div dangerouslySetInnerHTML={{ __html: embedSet.embedCode }} />
              ) : (
                <div className="flex flex-col items-center justify-center h-32 gap-3">
                  <p className="text-sm text-center" style={{ color: "rgba(44,40,37,0.35)" }}>
                    Add a SoundCloud or Spotify embed in the{" "}
                    <span style={{ color: "#1B2A4A" }}>Sanity studio</span>{" "}
                    under Sets & Mixes
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
