import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastian Perez",
  description: "A collection of what I create, what I do and everything I'm curious about.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Root layout only: fonts and the page shell. The floating dock lives in
// app/(site)/layout.tsx so it never appears over the Sanity Studio at /studio.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${cormorant.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-void text-ink">{children}</body>
    </html>
  );
}
