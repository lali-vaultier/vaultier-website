import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Sign In — Vaultier",
  description: "Apply to join the Vaultier professional network.",
};

export default function ProfessionalSignInPage() {
  return (
    <section
      className="professional-hero professional-unavailable"
      aria-labelledby="professional-sign-in-heading"
    >
      <h1 id="professional-sign-in-heading">Professional Sign In isn&apos;t available at the moment</h1>
      <p className="professional-unavailable-subheading">
        Kindly apply to join below, and we will be in touch
      </p>
      <div className="professional-actions professional-actions-single">
        <Link className="professional-action professional-action-secondary" href="/professional-access/apply">
          <span>Apply to Join</span>
        </Link>
      </div>
    </section>
  );
}
