import type { Metadata } from "next";
import ProfessionalApplicationForm from "../ProfessionalApplicationForm";

export const metadata: Metadata = {
  title: "Apply to Join — Professional Access — Vaultier",
  description: "Apply to support privately managed collections through the Vaultier professional network.",
};

export default function ProfessionalApplicationPage() {
  return (
    <>
      <section className="professional-application professional-application-route" aria-labelledby="apply-to-join-heading">
        <div className="professional-section-heading">
          <h1 id="apply-to-join-heading">Apply to join</h1>
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
    </>
  );
}
