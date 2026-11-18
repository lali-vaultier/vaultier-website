import type { Metadata } from "next";
import Link from "next/link";
import ProfessionalApplicationForm from "../ProfessionalApplicationForm";

export const metadata: Metadata = {
  title: "Apply to Join — Professional Access — Vaultier",
  description: "Apply to support privately managed collections through the Vaultier professional network.",
};

export default function ProfessionalApplicationPage() {
  return (
    <section className="form-page professional-application-form-page" aria-labelledby="apply-to-join-heading">
      <header className="form-topbar">
        <Link
          className="form-back-link"
          href="/professional-access"
          aria-label="Go back to Professional Access"
        >
          <span aria-hidden="true">←</span>
          Go back
        </Link>
      </header>

      <section className="form-frame" aria-label="Professional application letter">
        <FormLetterpressDefinitions />
        <div className="form-shell">
          <header className="form-header">
            <h1 id="apply-to-join-heading">Apply to join</h1>
          </header>

          <ProfessionalApplicationForm />

          <p className="form-note">
            Applications are considered from established limited companies and registered sole traders. Admission is
            based on relevant experience, professional standing, appropriate insurance and the needs of the network.
          </p>
        </div>
      </section>
    </section>
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
