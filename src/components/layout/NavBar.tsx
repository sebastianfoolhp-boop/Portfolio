"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2.5 rounded-full"
      style={{
        background: "rgba(250,249,246,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(27,42,74,0.12)",
        boxShadow: "0 8px 32px rgba(27,42,74,0.12)",
      }}
    >
      {/* SP Monogram */}
      <Link href="/" className="flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: "rgba(27,42,74,0.08)",
            border: "1px solid rgba(27,42,74,0.2)",
            color: "#1B2A4A",
            fontFamily: "cursive",
            fontStyle: "italic",
          }}
        >
          SP
        </div>
      </Link>

      <div className="w-px h-5" style={{ background: "rgba(27,42,74,0.1)" }} />

      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                color: active ? "#1B2A4A" : "rgba(44,40,37,0.45)",
                background: active ? "rgba(27,42,74,0.08)" : "transparent",
                fontWeight: active ? 700 : 500,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="w-px h-5" style={{ background: "rgba(27,42,74,0.1)" }} />

      <Link
        href="/contact"
        className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
        style={{
          background: pathname === "/contact" ? "#1B2A4A" : "transparent",
          border: `1px solid ${pathname === "/contact" ? "#1B2A4A" : "rgba(27,42,74,0.25)"}`,
          color: pathname === "/contact" ? "#FAF9F6" : "#1B2A4A",
        }}
      >
        Contact
      </Link>
    </nav>
  );
}
