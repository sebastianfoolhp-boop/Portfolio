import {
  House, User, Headphones, Film, Briefcase, FlaskConical, Mail,
  type LucideIcon,
} from "lucide-react";
import { SECTIONS, type SectionKey } from "@/lib/data";

// ============================================================
// FLOATING DOCK: icons and order
// ============================================================
// To swap an icon, change the import above and the entry below.
// Browse every available icon at https://lucide.dev/icons
// Names, order and anchors come from SECTIONS in lib/data.ts.
// `id` is the HTML id of the section the icon scrolls to (so "music" scrolls to #music).

export interface DockItem {
  id: "home" | SectionKey;
  label: string;
  icon: LucideIcon;
}

const SECTION_ICONS: Record<SectionKey, LucideIcon> = {
  about: User,
  music: Headphones,
  cinema: Film,
  work: Briefcase,
  lab: FlaskConical,
  contact: Mail,
};

// Order here is the order in the dock, left to right.
export const DOCK_ITEMS: DockItem[] = [
  { id: "home", label: "Home", icon: House },
  ...SECTIONS.map((s) => ({ id: s.key, label: s.label, icon: SECTION_ICONS[s.key] })),
];
