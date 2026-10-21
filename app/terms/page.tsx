import type { Metadata } from "next";
import SecondaryHeader from "../components/SecondaryHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Use — Vaultier",
  description: "Vaultier terms of use.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <SecondaryHeader />
      <article className="legal-document">
        <p className="eyebrow">Draft placeholder</p>
        <h1>Terms of Use</h1>
        <div className="legal-placeholder">
          <h2>Approved legal content forthcoming.</h2>
          <p>
            This page is intentionally reserved for Vaultier&apos;s approved Terms of Use. No contractual
            or compliance representations have been added at this stage.
          </p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
