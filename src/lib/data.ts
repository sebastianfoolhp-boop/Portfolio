// ============================================================
// SITE DATA — edit content here, never in the page components
// ============================================================

import tiktokVideos from "./tiktok-videos.json";
import type { TikTokVideo } from "./tiktok";

// -----------------------------------------------------------
// Sections: the single source of truth for the page order and anchors.
// The whole site is one scrolling page. Each entry here is a section whose
// HTML id is its `key` (so "about" is #about). The floating dock and the
// shattered portrait both read this list, so renaming a section here updates
// both at once. The order below is the order on the page.
// (To change which ICON the dock shows, see components/dock/dockItems.ts.)
// (To change which PIECE of the portrait opens which section, see components/shatter/shards.ts.)
// -----------------------------------------------------------
export const SECTIONS = [
  { key: "about", label: "About" },
  { key: "music", label: "Music" },
  { key: "cinema", label: "Cinema" },
  { key: "work", label: "Work" },
  { key: "lab", label: "The Lab" },
  { key: "contact", label: "Contact" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];

// -----------------------------------------------------------
// Home
// -----------------------------------------------------------
export const HOME_INTRO = {
  // Typed out on load. "tone: muted" renders that part in subtle gray italic.
  headline: [
    { text: "Hi, my name is ", tone: "base" },
    { text: "Sebas", tone: "base" },
    { text: "(tian)", tone: "muted" },
    { text: ".", tone: "base" },
  ],
  sentence: "Here is a collection of what I create, what I do and everything I'm curious about.",
};

export const HOME_ABOUT = {
  heading: `Sebastian "Sebas" Perez`,
  body: `Colombian roots, global ambitions, and a permanent bias toward doing the hard thing.`,
  meta: `UF Warrington, Class of 2027 · Philosophy Minor · Incoming Analyst at McKinsey and Company`,
};

// About section: rows waiting for your own words. Edit this list to rename or add rows.
export const ABOUT_PLACEHOLDERS = ["Personal background", "Interests", "Motivations", "Values", "Personal story"];

// The Lab section: rows waiting for your own work. Edit this list to rename or add rows.
export const LAB = {
  description: "A space for experimentation, unconventional thinking and intellectual curiosity.",
  items: [
    "Sketches",
    "Book reflections",
    "Behind the scenes",
    "Personal writing",
  ],
};

// Social platforms, used by the Music and Contact sections. Replace placeholder links with your own.
export const SOCIAL_LINKS = [
  { key: "youtube", href: "https://www.youtube.com/@SebasPerez-sp", label: "YouTube" },
  { key: "soundcloud", href: "https://soundcloud.com/", label: "SoundCloud" },
  { key: "tiktok", href: "https://www.tiktok.com/@sebxsjairo", label: "TikTok" },
  { key: "instagram", href: "https://www.instagram.com/sxbxssp/", label: "Instagram" },
];

// -----------------------------------------------------------
// Audio / Music page
// -----------------------------------------------------------
// The TikTok mixes come from src/lib/tiktok-videos.json. To add one, add a line there with the video's
// link and its genre, then run `npm run tiktok:thumbs` (or just deploy: the cover image is fetched
// automatically at build time). Each entry here becomes one card in the Music section.
export const AUDIO_SETS = (tiktokVideos as TikTokVideo[]).map((v, i) => ({
  id: i + 1,
  label: "Short Mix - TikTok",
  sublabel: v.genre,
  duration: "",
  href: v.url,
  isTikTok: true,
}));

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
  { id: 4, src: "", alt: "Photo placeholder 04", category: "Photography", aspect: "portrait" },
  { id: 5, src: "", alt: "Photo placeholder 05", category: "Photography", aspect: "landscape" },
];

// Paste real YouTube/Vimeo embed URLs here later
export const VIDEO_EMBEDS: { title: string; src: string }[] = [
  // { title: "Showreel 2024", src: "https://www.youtube.com/embed/..." },
];

// -----------------------------------------------------------
// Work section
// -----------------------------------------------------------
export const WORK_HERO = {
  headline: "Building a career at the edge of finance and strategy.",
  pull: "Fortune favors the bold.",
  meta1: "Incoming Analyst at McKinsey and Company · Previous JPMorgan Commercial Banking Summer Analyst",
  meta2: "UF Warrington, May 2027 · Philosophy Minor · Florida",
};

export const EXPERIENCE = [
  {
    period: "Incoming",
    org: "McKinsey and Company",
    role: "Incoming Analyst at McKinsey and Company",
    detail: "",
  },
  {
    period: "Summer 2026",
    org: "JPMorgan Chase",
    role: "Previous JPMorgan Commercial Banking Summer Analyst",
    detail: "Commercial Banking intern training program.",
  },
  {
    period: "University of Florida",
    org: "180 Degrees Consulting",
    role: "Co-Founder, UF Chapter",
    detail: "Pro-bono strategy consulting for nonprofits and social enterprises, as part of one of the world's largest student consultancies.",
  },
];

export const WORK_STATS = [
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

export const WORK_NARRATIVE = [
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

export const WORK_CARDS = [
  {
    title: "Education",
    body: "B.S. Business Administration, UF Warrington College of Business, May 2027. Minor in Philosophy. Focus on finance, communication, and leadership.",
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
    description: "Connect with me personally",
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
