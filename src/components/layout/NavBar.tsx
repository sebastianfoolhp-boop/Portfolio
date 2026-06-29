"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-4 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full"
      style={{
        background: "rgba(250,249,246,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(27,42,74,0.12)",
        boxShadow: "0 8px 32px rgba(27,42,74,0.12)",
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      {/* SP Monogram */}
      <Link href="/" className="flex-shrink-0">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm"
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

      <div className="w-px h-4 sm:h-5 flex-shrink-0" style={{ background: "rgba(27,42,74,0.1)" }} />

      <div className="flex items-center gap-0.5 sm:gap-1">
        {NAV_LINKS.filter(l => l.href !== "/").map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap"
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

      <div className="w-px h-4 sm:h-5 flex-shrink-0" style={{ background: "rgba(27,42,74,0.1)" }} />

      <Link
        href="/contact"
        className="flex-shrink-0 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
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
