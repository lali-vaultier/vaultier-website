import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Access — Vaultier",
  description: "Apply to support privately managed collections through the Vaultier professional network.",
};

const professionalSignInUrl =
  process.env.NEXT_PUBLIC_PROFESSIONAL_SIGN_IN_URL || "https://accessvaultier.co/";

export default function ProfessionalAccessPage() {
  return (
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
        <Link className="professional-action professional-action-primary" href="/professional-access/apply">
          <span>Apply to Join</span>
        </Link>
      </div>
    </section>
  );
}
