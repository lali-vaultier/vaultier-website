import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const editorsNote = localFont({
  src: "./fonts/editors-note-hairline-italic.otf",
  variable: "--font-editorial",
  display: "swap",
  style: "italic",
  weight: "100",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const openSauce = localFont({
  src: "./fonts/open-sauce-two-light.ttf",
  variable: "--font-open-sauce",
  display: "swap",
  weight: "300",
  preload: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export function generateMetadata(): Metadata {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(origin),
    title: "Vaultier — Luxury, Protected.",
    description: "Private stewardship for exceptional collections.",
    openGraph: {
      title: "Vaultier — Luxury, Protected.",
      description: "Private stewardship for exceptional collections.",
    },
    twitter: { card: "summary", title: "Vaultier — Luxury, Protected.", description: "Private stewardship for exceptional collections." },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${editorsNote.variable} ${openSauce.variable}`} data-scroll-behavior="smooth">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
