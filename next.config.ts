import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // The site is one scrolling page. Older separate-page links jump to the matching section instead.
  async redirects() {
    return [
      { source: "/audio", destination: "/#music", permanent: true },
      { source: "/music", destination: "/#music", permanent: true },
      { source: "/visual", destination: "/#cinema", permanent: true },
      { source: "/cinema", destination: "/#cinema", permanent: true },
      { source: "/professional", destination: "/#work", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/lab", destination: "/#lab", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
