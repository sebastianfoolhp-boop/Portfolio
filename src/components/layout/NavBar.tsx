"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";

const LINKS = NAV_LINKS.filter((l) => l.href !== "/");

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`eyebrow link-underline whitespace-nowrap transition-colors duration-300 ${active ? "is-active" : ""}`}
      style={{ color: active ? "#1B2A4A" : "rgba(44,40,37,0.6)", fontSize: "10.5px" }}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: "rgba(250,249,246,0.94)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(27,42,74,0.12)",
      }}
    >
      {/* Desktop: links left · monogram center · contact right */}
      <nav className="hidden md:grid h-full max-w-7xl mx-auto px-8 lg:px-12 grid-cols-3 items-center">
        <div className="flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} active={pathname === l.href} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/" aria-label="Home" className="font-serif" style={{ color: "#1B2A4A", fontSize: "26px", letterSpacing: "0.28em", fontWeight: 400, paddingLeft: "0.28em" }}>
            SP
          </Link>
        </div>

        <div className="flex justify-end">
          <NavLink href="/contact" label="Contact" active={pathname === "/contact"} />
        </div>
      </nav>

      {/* Mobile: monogram left · links right */}
      <nav className="md:hidden h-full px-4 flex items-center justify-between gap-3">
        <Link href="/" aria-label="Home" className="font-serif flex-shrink-0" style={{ color: "#1B2A4A", fontSize: "22px", letterSpacing: "0.24em", paddingLeft: "0.24em" }}>
          SP
        </Link>
        <div className="flex items-center gap-3">
          {[...LINKS, { href: "/contact", label: "Contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`eyebrow link-underline whitespace-nowrap ${pathname === l.href ? "is-active" : ""}`}
              style={{ color: pathname === l.href ? "#1B2A4A" : "rgba(44,40,37,0.6)", fontSize: "9.5px", letterSpacing: "0.16em" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
