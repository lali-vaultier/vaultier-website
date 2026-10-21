import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html lang="en-GB" className={editorsNote.variable}>
      <body>{children}</body>
    </html>
  );
}
