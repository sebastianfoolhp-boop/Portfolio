import Dock from "@/components/dock/Dock";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Dock />
    </>
  );
}
