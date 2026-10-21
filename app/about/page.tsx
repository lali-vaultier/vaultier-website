import type { Metadata } from "next";
import Link from "next/link";
import SecondaryHeader from "../components/SecondaryHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "About Vaultier",
  description: "About Vaultier private collection stewardship.",
};

const sections = [
  "Privacy is at the heart of what we do.",
  "For the people who look after it",
  "How we work",
];

export default function AboutPage() {
  return (
    <main className="editorial-page">
      <SecondaryHeader />
      <section className="about-introduction" aria-labelledby="about-title">
        <p className="eyebrow">Private collection stewardship</p>
        <h1 id="about-title">About Vaultier</h1>
      </section>

      <div className="about-sections">
        {sections.map((title, index) => (
          <section className="about-section" key={title} aria-labelledby={`about-section-${index + 1}`}>
            <p className="about-section-number" aria-hidden="true">0{index + 1}</p>
            <h2 id={`about-section-${index + 1}`}>{title}</h2>
            {index === sections.length - 1 ? (
              <Link href="/private-enquiry" className="invitation-link about-cta">
                <span>Enquire Privately</span>
              </Link>
            ) : null}
          </section>
        ))}
      </div>
      <SiteFooter />
    </main>
  );
}
