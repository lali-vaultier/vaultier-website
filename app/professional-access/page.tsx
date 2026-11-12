import type { Metadata } from "next";
import Link from "next/link";
import VltrEngravedMark from "../components/VltrEngravedMark";
import ProfessionalApplicationForm from "./ProfessionalApplicationForm";

export const metadata: Metadata = {
  title: "Professional Access — Vaultier",
  description: "Apply to support privately managed collections through the Vaultier professional network.",
};

const professionalSignInUrl =
  process.env.NEXT_PUBLIC_PROFESSIONAL_SIGN_IN_URL || "https://accessvaultier.co/";

export default function ProfessionalAccessPage() {
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

      <section className="professional-hero" aria-labelledby="professional-access-heading">
        <p className="professional-kicker">Professional Access</p>
        <h1 id="professional-access-heading">Work with private collections through Vaultier</h1>
        <div className="professional-introduction">
          <p>
            Vaultier appoints established specialists to support the care, protection and development of privately
            managed collections.
          </p>
          <p>
            Approved members are considered for paid instructions relevant to their specialism, repeat work as
            collections develop and long-term relationships with collectors, family offices and authorised
            representatives.
          </p>
        </div>
        <div className="professional-actions">
          <a className="professional-action professional-action-secondary" href={professionalSignInUrl}>
            <span>Professional Sign In</span>
          </a>
          <a className="professional-action professional-action-primary" href="#apply-to-join">
            <span>Apply to Join</span>
          </a>
        </div>
      </section>

      <section id="apply-to-join" className="professional-application" aria-labelledby="apply-to-join-heading">
        <div className="professional-section-heading">
          <p className="professional-kicker">Professional Network</p>
          <h2 id="apply-to-join-heading">Apply to join</h2>
        </div>
        <ProfessionalApplicationForm />
      </section>

      <section className="professional-membership" aria-labelledby="membership-heading">
        <h2 id="membership-heading">Membership</h2>
        <p>Applications are considered from established limited companies and registered sole traders.</p>
        <p className="professional-membership-note">
          Admission is based on relevant experience, professional standing, appropriate insurance and the needs of
          the network.
        </p>
      </section>

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
