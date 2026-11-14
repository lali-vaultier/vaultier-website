import type { ReactNode } from "react";
import Link from "next/link";
import VltrEngravedMark from "../components/VltrEngravedMark";

export default function ProfessionalAccessLayout({ children }: { children: ReactNode }) {
  return (
    <main className="professional-page">
      <ProfessionalLetterpressDefinitions />

      <header className="professional-header">
        <Link href="/" className="professional-brand" aria-label="Vaultier home">
          <span className="professional-brand-mark"><VltrEngravedMark /></span>
          <span className="professional-brand-subheading">Private Collection Management</span>
        </Link>
        <nav className="professional-navigation" aria-label="Primary navigation">
          <Link href="/#private-client-access">Private Client Access</Link>
          <Link href="/professional-access" aria-current="page">Professional Access</Link>
          <Link href="/private-enquiry">Private Enquiry</Link>
        </nav>
      </header>

      {children}

      <footer className="professional-footer">
        <nav aria-label="Footer navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/#security">Security</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:operations@accessvaultier.co">Contact</a>
        </nav>
      </footer>
    </main>
  );
}

function ProfessionalLetterpressDefinitions() {
  return (
    <svg className="letterpress-definitions" aria-hidden="true" focusable="false">
      <defs>
        <filter id="professional-letterpress-display" x="-6%" y="-10%" width="112%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.42" result="professional-pressure" />
          <feComposite in="professional-pressure" in2="SourceAlpha" operator="out" result="professional-rim" />
          <feOffset in="professional-rim" dx="-0.35" dy="-0.4" result="professional-dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.18" result="professional-dark-ink" />
          <feComposite
            in="professional-dark-ink"
            in2="professional-dark-rim"
            operator="in"
            result="professional-shadow"
          />
          <feOffset in="professional-rim" dx="0.35" dy="0.4" result="professional-light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.48" result="professional-light-ink" />
          <feComposite
            in="professional-light-ink"
            in2="professional-light-rim"
            operator="in"
            result="professional-highlight"
          />
          <feMerge>
            <feMergeNode in="professional-shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="professional-highlight" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
