import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(27,42,74,0.09)",
        boxShadow: glow
          ? "0 1px 24px rgba(27,42,74,0.1)"
          : "0 1px 12px rgba(27,42,74,0.06)",
      }}
    >
      {children}
    </div>
  );
}
