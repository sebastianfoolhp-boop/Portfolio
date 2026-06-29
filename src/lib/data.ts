// ============================================================
// SITE DATA — edit content here, never in the page components
// ============================================================

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Audio", href: "/audio" },
  { label: "Visual", href: "/visual" },
  { label: "Professional", href: "/professional" },
];

// -----------------------------------------------------------
// Home
// -----------------------------------------------------------
export const HOME_HERO = {
  name: "SEBASTIAN",
  tagline: "La buena fai.",
  heroCopy: "I live at the intersection of spreadsheets and speaker stacks.",
};

export const HOME_ABOUT = {
  heading: `Sebastian "Sebas" Perez`,
  body: `Colombian roots, global ambitions, and a permanent bias toward doing the hard thing.`,
};

export const HOME_TEASERS = [
  {
    label: "Audio",
    href: "/audio",
    sublabel: "DJ Sets · Mixes · Production",
    gradient: "from-blue-accent/30 to-violet-accent/20",
    glow: "shadow-glow-blue",
  },
  {
    label: "Visual",
    href: "/visual",
    sublabel: "Photography · cinematography",
    gradient: "from-violet-accent/30 to-cyan-accent/20",
    glow: "shadow-glow-violet",
  },
  {
    label: "Professional",
    href: "/professional",
    sublabel: "Finance · Consulting · Strategy",
    gradient: "from-cyan-accent/20 to-blue-accent/30",
    glow: "shadow-glow-cyan",
  },
];

// -----------------------------------------------------------
// Audio / Music page
// -----------------------------------------------------------
export const AUDIO_SETS = [
  { id: 1, label: "Short Mix - TikTok", sublabel: "Tech House", duration: "", href: "https://www.tiktok.com/@sebxsjairo/video/7628510053397450015?is_from_webapp=1&sender_device=pc&web_id=7656645709009405471", isTikTok: true },
  { id: 2, label: "Short Mix - TikTok", sublabel: "Pop/Rap", duration: "", href: "https://www.tiktok.com/@sebxsjairo/video/7628509507957673246?is_from_webapp=1&sender_device=pc&web_id=7656645709009405471", isTikTok: true },
  { id: 3, label: "Short Mix - TikTok", sublabel: "Phonk Tech House", duration: "", href: "https://www.tiktok.com/@sebxsjairo/video/7628508511298702622?is_from_webapp=1&sender_device=pc&web_id=7656645709009405471", isTikTok: true },
  { id: 4, label: "Short Mix - TikTok", sublabel: "House", duration: "", href: "https://www.tiktok.com/@sebxsjairo/video/7626649668910337311?is_from_webapp=1&sender_device=pc&web_id=7656645709009405471", isTikTok: true },
  { id: 5, label: "", sublabel: "", duration: "", href: "", isTikTok: false },
  { id: 6, label: "", sublabel: "", duration: "", href: "", isTikTok: false },
];

export const AUDIO_GEAR = [
  { name: "Denon Prime 2", category: "Controller" },
  { name: "Ableton Live", category: "DAW" },
  { name: "rekordbox", category: "Library" },
];

// Paste real embed codes here later
// e.g. '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=..."></iframe>'
export const AUDIO_EMBEDS: string[] = [];

// -----------------------------------------------------------
// Visual page
// -----------------------------------------------------------
// To swap in real photos: update src to your image path in /public/images/
export const GALLERY_IMAGES = [
  { id: 1, src: "", alt: "Photo placeholder 01", category: "Photography", aspect: "landscape" },
  { id: 2, src: "", alt: "Photo placeholder 02", category: "Photography", aspect: "portrait" },
  { id: 3, src: "", alt: "Photo placeholder 03", category: "Cinematography", aspect: "landscape" },
  { id: 4, src: "", alt: "Photo placeholder 04", category: "Photography", aspect: "portrait" },
  { id: 5, src: "", alt: "Photo placeholder 05", category: "Photography", aspect: "landscape" },
  { id: 6, src: "", alt: "Photo placeholder 06", category: "Cinematography", aspect: "landscape" },
  { id: 7, src: "", alt: "Photo placeholder 07", category: "Photography", aspect: "portrait" },
  { id: 8, src: "", alt: "Photo placeholder 08", category: "Photography", aspect: "landscape" },
];

// Paste real YouTube/Vimeo embed URLs here later
export const VIDEO_EMBEDS: { title: string; src: string }[] = [
  // { title: "Showreel 2024", src: "https://www.youtube.com/embed/..." },
];

// -----------------------------------------------------------
// Professional page
// -----------------------------------------------------------
export const PROFESSIONAL_STATS = [
  { value: "AI", label: "Certification from UF" },
  { value: "JPMorgan", label: "Commercial Banking Summer '26 Intern" },
  { value: "7", label: "Case competitions" },
  { value: "2", label: "Languages: EN & ES" },
];

export const COMPETITION_RESULTS = [
  { name: "Belgrade International Case Competition", result: "Finalist", year: "2024" },
  { name: "Chulalongkorn International Case Competition", result: "Third Place", year: "2024" },
  { name: "Miami Herbert Case Competition", result: "First Place", year: "2023" },
];

export const PROFESSIONAL_NARRATIVE = [
  {
    number: "01",
    heading: "Every business has untapped potential.",
    paragraphs: [
      "The question is never whether it exists.",
      "It's whether you're willing to go find it.",
    ],
  },
  {
    number: "02",
    heading: "Momentum doesn't build itself.",
    paragraphs: [
      "Sometimes you need someone to see what you can't.",
      "Sometimes you just need a push in the right direction.",
    ],
  },
  {
    number: "03",
    heading: "That's what I do.",
    paragraphs: [
      "I help businesses cut through the noise, find their edge, and move the needle.",
      "Growth starts with an honest conversation. Let's have one.",
    ],
  },
];

export const PROFESSIONAL_CARDS = [
  {
    title: "Education",
    body: "B.S. Business Administration, University of Florida. Focus on finance, communication, and leadership.",
  },
  {
    title: "Leadership",
    body: "Co-founded UF's chapter of 180 Degrees Consulting — one of the world's largest student consultancies.",
  },
  {
    title: "Case Competitions",
    body: "Active competitor in case circuits internationally, 2x international finalist and 3x domestic champion.",
  },
  {
    title: "Communication",
    body: "Finance lead and analyst experience; comfortable owning both the model and the client-facing narrative.",
  },
];

export const TESTIMONIAL = {
  quote: "Sebastian brings a rare combination of analytical precision and genuine creative instinct. He's one of the most well-rounded people I've worked with.",
  name: "Teammate / Professor",
  role: "Placeholder — add real quote here",
};

// -----------------------------------------------------------
// Contact page — update these with your real links/email
// -----------------------------------------------------------
export const CONTACT_LINKS = [
  {
    icon: "linkedin",
    label: "LinkedIn",
    description: "Connect with me professionally",
    href: "https://linkedin.com/in/",
  },
  {
    icon: "instagram",
    label: "Instagram",
    description: "Photos, sets, and everything in between",
    href: "https://www.instagram.com/sxbxssp/",
  },
  {
    icon: "email",
    label: "Email",
    description: "sebastiaperez@ufl.edu",
    href: "mailto:sebastiaperez@ufl.edu",
  },
];

// -----------------------------------------------------------
// YouTube videos — add your latest videos here
// To get the embed URL: youtube.com/watch?v=VIDEO_ID → use VIDEO_ID below
// Thumbnail is auto-fetched from YouTube at https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
// -----------------------------------------------------------
export const AUDIO_YOUTUBE: { title: string; videoId: string; label?: string }[] = [
  { title: "Latest DJ Set", videoId: "xfKKhH5rUEg", label: "Reggaeton" },
];

export const VISUAL_YOUTUBE: { title: string; videoId: string; label?: string }[] = [
  // Example — uncomment and replace VIDEO_ID:
  // { title: "Showreel 2024", videoId: "dQw4w9WgXcQ", label: "Cinematography" },
];

// -----------------------------------------------------------
// Socials (legacy — kept for nav/footer use)
// -----------------------------------------------------------
export const SOCIALS = {
  instagram: "https://www.instagram.com/sxbxssp/",
  linkedin: "https://linkedin.com/in/",
  soundcloud: "https://soundcloud.com/",
};
