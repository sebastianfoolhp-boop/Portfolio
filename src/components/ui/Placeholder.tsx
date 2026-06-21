interface PlaceholderProps {
  label?: string;
  className?: string;
  aspect?: "landscape" | "portrait" | "square" | "video";
}

const aspectMap = {
  landscape: "aspect-video",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  video: "aspect-video",
};

export default function Placeholder({ label, className = "", aspect = "landscape" }: PlaceholderProps) {
  return (
    <div
      className={`${aspectMap[aspect]} rounded-3xl flex items-center justify-center relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1), rgba(6,182,212,0.08))",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.3) 0%, transparent 60%)",
        }}
      />
      {label && (
        <span className="text-white/30 text-sm font-medium tracking-wide text-center px-4 z-10">
          {label}
        </span>
      )}
    </div>
  );
}
