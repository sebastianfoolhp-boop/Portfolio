import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import NavBar from "@/components/layout/NavBar";
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
  description: "Sebastian Perez — finance, strategy, music, and photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${cormorant.variable}`}>
      <body className="min-h-full flex flex-col antialiased pt-16">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
