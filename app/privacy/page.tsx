import type { Metadata } from "next";
import SecondaryHeader from "../components/SecondaryHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — Vaultier",
  description: "Vaultier privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <SecondaryHeader />
      <article className="legal-document">
        <p className="eyebrow">Draft placeholder</p>
        <h1>Privacy Policy</h1>
        <div className="legal-placeholder">
          <h2>Approved legal content forthcoming.</h2>
          <p>
            This page is intentionally reserved for Vaultier&apos;s approved Privacy Policy. No legal or
            data-processing representations have been added at this stage.
          </p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
