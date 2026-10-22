import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InvitationForm from "../request-invitation/InvitationForm";

export const metadata: Metadata = {
  title: "Private Enquiry — Vaultier",
  description: "Make a private enquiry with Vaultier collection stewardship.",
};

export default function PrivateEnquiryPage() {
  return (
    <main className="form-page">
      <header className="form-topbar">
        <Link href="/" className="form-logomark-link" aria-label="Vaultier home">
          <Image
            className="form-logomark"
            src="/brand/vaultier-logomark.svg"
            alt=""
            width={500}
            height={500}
            priority
            unoptimized
          />
        </Link>
        <nav className="form-route-nav" aria-label="Website navigation">
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </header>
      <section className="form-frame" aria-label="Private enquiry letter">
        <FormLetterpressDefinitions />
        <div className="form-shell">
          <header className="form-header">
            <h1>Private Enquiry</h1>
          </header>
          <InvitationForm />
          <p className="form-note">Requests are handled in confidence. An acknowledgement does not constitute approval.</p>
        </div>
      </section>
    </main>
  );
}

function FormLetterpressDefinitions() {
  return (
    <svg className="letterpress-definitions" aria-hidden="true" focusable="false">
      <defs>
        <filter id="form-letterpress-display" x="-6%" y="-10%" width="112%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.48" result="form-display-pressure" />
          <feComposite in="form-display-pressure" in2="SourceAlpha" operator="out" result="form-display-rim" />
          <feOffset in="form-display-rim" dx="-0.4" dy="-0.46" result="form-display-dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.18" result="form-display-dark-ink" />
          <feComposite in="form-display-dark-ink" in2="form-display-dark-rim" operator="in" result="form-display-shadow" />
          <feOffset in="form-display-rim" dx="0.4" dy="0.46" result="form-display-light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.5" result="form-display-light-ink" />
          <feComposite in="form-display-light-ink" in2="form-display-light-rim" operator="in" result="form-display-highlight" />
          <feMerge>
            <feMergeNode in="form-display-shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="form-display-highlight" />
          </feMerge>
        </filter>
        <filter id="form-letterpress-fine" x="-6%" y="-14%" width="112%" height="128%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.34" result="form-pressure" />
          <feComposite in="form-pressure" in2="SourceAlpha" operator="out" result="form-rim" />
          <feOffset in="form-rim" dx="-0.28" dy="-0.32" result="form-dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.2" result="form-dark-ink" />
          <feComposite in="form-dark-ink" in2="form-dark-rim" operator="in" result="form-shadow" />
          <feOffset in="form-rim" dx="0.28" dy="0.32" result="form-light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.52" result="form-light-ink" />
          <feComposite in="form-light-ink" in2="form-light-rim" operator="in" result="form-highlight" />
          <feMerge>
            <feMergeNode in="form-shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="form-highlight" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
