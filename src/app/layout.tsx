import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sebastian — Finance · Audio · Visual",
  description: "Personal portfolio of Sebastian: finance, consulting, music, and photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
