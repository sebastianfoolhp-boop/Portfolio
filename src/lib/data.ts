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
  tagline: " A closer look at what drives me.",
  // DRAFT — review and edit this copy
  heroCopy: "I live at the intersection of spreadsheets and speaker stacks.",
};

export const HOME_ABOUT = {
  heading: "Two worlds, one perspective.",
  // DRAFT — review and edit
  body: `A business student at UF with Colombian roots, I'm passionate about finance, music, and anything with an international angle. I love connecting ideas across worlds, whether that's in a business, a DJ set, or somewhere I've never been before.`,
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
  { id: 1, label: "Live Set 01", sublabel: "House · Deep", duration: "1h 12m" },
  { id: 2, label: "Live Set 02", sublabel: "Tech House", duration: "58m" },
  { id: 3, label: "Live Set 03", sublabel: "Afro House", duration: "1h 05m" },
  { id: 4, label: "Live Set 04", sublabel: "Melodic Techno", duration: "1h 20m" },
  { id: 5, label: "Live Set 05", sublabel: "Sunset Session", duration: "45m" },
  { id: 6, label: "Live Set 06", sublabel: "Late Night", duration: "1h 30m" },
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
  { value: "10+", label: "Case competitions" },
  { value: "5+", label: "Countries competed in" },
  { value: "3", label: "International podium finishes" },
  { value: "180°", label: "Consulting chapter co-founded" },
];

export const COMPETITION_RESULTS = [
  { name: "Belgrade International Case Competition", result: "Finalist", year: "2024" },
  { name: "Chulalongkorn International Case Competition", result: "Third Place", year: "2024" },
  { name: "Miami Herbert Case Competition", result: "First Place", year: "2023" },
];

export const PROFESSIONAL_NARRATIVE = [
  {
    number: "01",
    heading: "Why finance and strategy matter to me",
    // DRAFT
    paragraphs: [
      "Finance, at its core, is about making decisions under uncertainty. What draws me in is not the models themselves but what they represent: a structured way to cut through noise and tell a true story about where value lives and where it doesn't.",
      "I think about financial analysis the same way I think about a good mix or a well-framed shot. The technique is in service of something bigger. The goal is clarity, and then impact.",
    ],
  },
  {
    number: "02",
    heading: "What I have done so far",
    // DRAFT
    paragraphs: [
      "I helped co-found the 180 Degrees Consulting chapter at the University of Florida, bringing pro-bono consulting to nonprofits and social enterprises that otherwise wouldn't have access to that kind of strategic support.",
      "I've competed in case competitions across multiple countries, going up against graduate students and professionals on problems ranging from M&A strategy to market entry to financial restructuring. Those rooms taught me how to think fast, communicate clearly, and back a position.",
    ],
  },
  {
    number: "03",
    heading: "What I bring that's different",
    // DRAFT
    paragraphs: [
      "I lead with analytical rigor and back it with the kind of creative pattern recognition that comes from spending serious time in music and visual storytelling. Those aren't separate skills. They cross-pollinate.",
      "Reading a room during a live set and reading a client during a pitch are not that different. Both require you to stay calibrated to what's actually landing and adjust in real time. That's a muscle I've been building for years, across contexts most people keep separate.",
    ],
  },
];

export const PROFESSIONAL_CARDS = [
  {
    title: "Education",
    body: "B.S. Business Administration, University of Florida. Focus on finance and strategic management.",
  },
  {
    title: "Leadership",
    body: "Co-founded 180 Degrees Consulting UF chapter — one of the world's largest student consultancies.",
  },
  {
    title: "Case Competitions",
    body: "Active competitor in international case circuits across North America, Europe, and Southeast Asia.",
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
    href: "https://linkedin.com/in/", // ← paste your LinkedIn URL here
  },
  {
    icon: "instagram",
    label: "Instagram",
    description: "Photos, sets, and everything in between",
    href: "https://instagram.com/", // ← paste your Instagram URL here
  },
  {
    icon: "email",
    label: "Email",
    description: "sebastianfoolhp@gmail.com", // ← update if needed
    href: "mailto:sebastianfoolhp@gmail.com",
  },
];

// -----------------------------------------------------------
// YouTube videos — add your latest videos here
// To get the embed URL: youtube.com/watch?v=VIDEO_ID → use VIDEO_ID below
// Thumbnail is auto-fetched from YouTube at https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
// -----------------------------------------------------------
export const AUDIO_YOUTUBE: { title: string; videoId: string; label?: string }[] = [
  // Example — uncomment and replace VIDEO_ID:
  // { title: "Live Set @ [Venue]", videoId: "dQw4w9WgXcQ", label: "House · Deep" },
];

export const VISUAL_YOUTUBE: { title: string; videoId: string; label?: string }[] = [
  // Example — uncomment and replace VIDEO_ID:
  // { title: "Showreel 2024", videoId: "dQw4w9WgXcQ", label: "Cinematography" },
];

// -----------------------------------------------------------
// Socials (legacy — kept for nav/footer use)
// -----------------------------------------------------------
export const SOCIALS = {
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/in/",
  soundcloud: "https://soundcloud.com/",
};
