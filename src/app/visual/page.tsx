import NavBar from "@/components/layout/NavBar";
import SectionReveal from "@/components/ui/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/ui/GalleryGrid";
import VideoGrid from "@/components/ui/VideoGrid";
import IconLinks from "@/components/ui/IconLinks";
import { GALLERY_IMAGES, VISUAL_YOUTUBE } from "@/lib/data";
import { getGalleryImages, getYouTubeVideos, galleryImageUrl } from "@/sanity/lib/queries";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

export const revalidate = 60;

// Update hrefs with your real links
const VISUAL_LINKS = [
  { key: "onedrive", href: "https://onedrive.live.com/", label: "OneDrive Photos" },
  { key: "youtube", href: "https://youtube.com/@", label: "YouTube Channel" },
];

export default async function VisualPage() {
  const [sanityPhotos, sanityVideos] = await Promise.all([
    getGalleryImages().catch(() => []),
    getYouTubeVideos("visual").catch(() => []),
  ]);

  const photos: GalleryImage[] = sanityPhotos.length > 0
    ? sanityPhotos.map((p) => ({
        id: p._id,
        src: galleryImageUrl(p, 800),
        alt: p.alt ?? "",
        category: p.category ?? "Photography",
        aspect: p.aspect ?? "landscape",
      }))
    : GALLERY_IMAGES;

  const videos = sanityVideos.length > 0
    ? sanityVideos.map((v) => ({ title: v.title, videoId: v.videoId, label: v.label }))
    : VISUAL_YOUTUBE;

  return (
    <main style={{ background: "#FAF9F6" }}>
      <PageHero
        title="VISUAL"
        subtitle="Photography and cinematography."
        colorGradient="radial-gradient(ellipse at 65% 40%, rgba(0,120,255,0.55) 0%, rgba(0,200,255,0.25) 45%, transparent 70%)"
      />
      <NavBar />

      {/* Icon links */}
      <section className="pt-12 pb-2 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <IconLinks links={VISUAL_LINKS} />
        </div>
      </section>

      <section className="py-16 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "rgba(44,40,37,0.3)" }}>Latest Video</p>
            <VideoGrid videos={videos} previewCount={2} accentColor="#1B2A4A" sectionLabel="Visual" />
          </div>
        </SectionReveal>
      </section>

      <div className="px-6 md:px-16"><div className="max-w-6xl mx-auto h-px" style={{ background: "rgba(27,42,74,0.07)" }} /></div>

      <section className="py-16 pb-28 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "rgba(44,40,37,0.3)" }}>Photography</p>
              <a href="https://onedrive.live.com/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium transition-opacity duration-200 hover:opacity-70"
                style={{ color: "#1B2A4A" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.363 10.72A5.622 5.622 0 0 0 14.4 7.2a5.634 5.634 0 0 0-4.938 2.934A4.324 4.324 0 0 0 5.4 14.4a4.326 4.326 0 0 0 4.32 4.32h9.12a3.36 3.36 0 0 0 .523-6.72v.72zM18.84 17.28H9.72a2.88 2.88 0 1 1 .36-5.748l.744.096.312-.672a4.2 4.2 0 0 1 3.264-2.376 4.176 4.176 0 0 1 4.308 2.94l.252.756.804.048a1.92 1.92 0 0 1-.924 3.612v-.656z"/>
                </svg>
                Click here to see full library ↗
              </a>
            </div>
            <GalleryGrid images={photos} previewCount={4} />
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
