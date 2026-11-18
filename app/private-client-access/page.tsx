import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Client Access — Vaultier",
  description: "Apply for private client access to Vaultier.",
};

export default function PrivateClientAccessPage() {
  return (
    <main className="private-client-access-page">
      <PrivateClientLetterpressDefinitions />
      <Link className="form-back-link private-client-home-link" href="/" aria-label="Return to the Vaultier home page">
        <span aria-hidden="true">←</span>
        Home
      </Link>

      <section
        className="editorial-copy invitation-copy security-copy private-client-access-copy"
        aria-labelledby="private-client-access-heading"
      >
        <h1 id="private-client-access-heading" className="homepage-editorial-heading">
          Private Client Access isn&apos;t available at the moment
        </h1>
        <p className="security-subheading">
          Kindly apply for an account below, and we will be in touch
        </p>
        <Link href="/private-enquiry" className="invitation-link invitation-link--olive">
          <span>Apply for a Vaultier Account</span>
        </Link>
      </section>
    </main>
  );
}

function PrivateClientLetterpressDefinitions() {
  return (
    <svg className="letterpress-definitions" aria-hidden="true" focusable="false">
      <defs>
        <filter id="letterpress-display" x="-6%" y="-10%" width="112%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.48" result="pressure" />
          <feComposite in="pressure" in2="SourceAlpha" operator="out" result="rim" />
          <feOffset in="rim" dx="-0.4" dy="-0.46" result="dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.18" result="dark-ink" />
          <feComposite in="dark-ink" in2="dark-rim" operator="in" result="shadow" />
          <feOffset in="rim" dx="0.4" dy="0.46" result="light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.5" result="light-ink" />
          <feComposite in="light-ink" in2="light-rim" operator="in" result="highlight" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="highlight" />
          </feMerge>
        </filter>
        <filter id="letterpress-fine" x="-8%" y="-16%" width="116%" height="132%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.3" result="pressure" />
          <feComposite in="pressure" in2="SourceAlpha" operator="out" result="rim" />
          <feOffset in="rim" dx="-0.26" dy="-0.3" result="dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.2" result="dark-ink" />
          <feComposite in="dark-ink" in2="dark-rim" operator="in" result="shadow" />
          <feOffset in="rim" dx="0.28" dy="0.32" result="light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.54" result="light-ink" />
          <feComposite in="light-ink" in2="light-rim" operator="in" result="highlight" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="highlight" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
