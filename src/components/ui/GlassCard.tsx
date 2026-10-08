import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: glow ? "#FFFFFF" : "rgba(255,255,255,0.6)",
        border: "1px solid rgba(27,42,74,0.14)",
      }}
    >
      {children}
    </div>
  );
}
