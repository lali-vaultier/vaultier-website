import type { Metadata } from "next";
import Link from "next/link";
import SecondaryHeader from "../components/SecondaryHeader";

export const metadata: Metadata = {
  title: "Legal Disclaimer — Vaultier",
  description: "Legal information and limitations relating to Vaultier's website and services.",
};

export default function DisclaimerPage() {
  return (
    <main className="legal-page">
      <SecondaryHeader />
      <article className="legal-document">
        <header className="legal-introduction">
          <h1>Legal Disclaimer</h1>
          <dl className="legal-dates">
            <div>
              <dt>Effective date</dt>
              <dd>19 November 2026</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>19 November 2026</dd>
            </div>
          </dl>
        </header>

        <div className="legal-policy">
          <section className="legal-policy-section" aria-labelledby="disclaimer-general-information">
            <h2 id="disclaimer-general-information"><span>1.</span> General Information</h2>
            <p>This website, accessible at <strong><a href="https://vaultier.co">www.vaultier.co</a></strong> (the &quot;Website&quot;), is owned and operated by <strong>Vaultier FZ-LLC</strong> (&quot;Vaultier&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;), a company registered in the United Arab Emirates.</p>
            <p>This Legal Disclaimer (&quot;Disclaimer&quot;) governs the use of information, materials and content made available through the Website.</p>
            <p>By accessing or using the Website, you acknowledge that you have read and understood this Disclaimer. Your use of the Website is also subject to our applicable <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
            <p>If you do not agree with these provisions, you should discontinue your use of the Website.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-informational-purposes">
            <h2 id="disclaimer-informational-purposes"><span>2.</span> Informational Purposes Only</h2>
            <p>The information presented on this Website is provided for general informational purposes and to introduce Vaultier&apos;s services, capabilities and approach to private collection management.</p>
            <p>Although we endeavour to ensure that all published information is accurate, relevant and current, Vaultier makes no representation or warranty, express or implied, regarding the completeness, accuracy, reliability or continued availability of any information contained on the Website.</p>
            <p>Information may be amended, updated or withdrawn without prior notice.</p>
            <p>Nothing on this Website constitutes a binding offer, commitment or guarantee to provide any particular service.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-no-professional-advice">
            <h2 id="disclaimer-no-professional-advice"><span>3.</span> No Financial, Investment, Legal or Tax Advice</h2>
            <p>Vaultier provides private collection management, administrative coordination, recordkeeping and access to independent specialists.</p>
            <p>Unless expressly agreed otherwise in writing, Vaultier does not provide regulated financial advice, investment recommendations, legal advice, tax advice or other regulated professional advisory services.</p>
            <p>Any information concerning asset values, ownership, provenance, insurance, acquisitions, disposals, succession or wealth preservation is provided for general informational purposes only.</p>
            <p>Such information should not be interpreted as a recommendation to acquire, retain, insure, transfer or dispose of any particular asset.</p>
            <p>Visitors and prospective clients should obtain independent advice from appropriately qualified professionals before making decisions involving their assets, financial interests or legal obligations.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-valuations">
            <h2 id="disclaimer-valuations"><span>4.</span> Asset Valuations and Market Information</h2>
            <p>References to asset valuations, market values, estimates, historical prices or potential appreciation are illustrative or informational unless expressly stated otherwise.</p>
            <p>The value of luxury assets, collectibles and other privately held property may fluctuate as a result of market conditions, provenance, authenticity, condition, rarity, demand and other factors.</p>
            <p>Vaultier does not guarantee the accuracy of valuations supplied by third parties, the future value of any asset, or the price achievable through a sale or other transaction.</p>
            <p>Any formal valuation, authentication, appraisal or specialist assessment must be considered in accordance with the terms and limitations established by the professional responsible for that assessment.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-independent-specialists">
            <h2 id="disclaimer-independent-specialists"><span>5.</span> Independent Specialists and Third-Party Services</h2>
            <p>Vaultier may arrange, coordinate or facilitate access to independent specialists and service providers, including valuers, authenticators, insurers, conservators, restorers, transport providers, storage facilities and other professionals.</p>
            <p>Unless expressly stated in a separate written agreement, such specialists operate independently and are responsible for the professional services they provide.</p>
            <p>The inclusion, recommendation, introduction or approval of a specialist does not constitute an unconditional guarantee of that specialist&apos;s performance, conclusions, availability or suitability for every circumstance.</p>
            <p>The responsibilities of Vaultier and any appointed third-party provider are determined by the applicable contractual arrangements.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-collection-records">
            <h2 id="disclaimer-collection-records"><span>6.</span> Collection Records and Documentation</h2>
            <p>Vaultier&apos;s collection management services may involve maintaining digital records relating to ownership, provenance, condition, location, valuation, insurance, maintenance and the history of individual assets.</p>
            <p>The existence of a Vaultier Record does not, by itself, constitute independent certification of ownership, authenticity, legal title, provenance or market value.</p>
            <p>Information maintained within a collection record may originate from clients, authorised representatives, independent specialists or other third-party sources.</p>
            <p>Unless expressly agreed otherwise, Vaultier does not warrant that independently supplied information has been conclusively verified.</p>
            <p>The completeness and reliability of any collection record depend, in part, on the accuracy and availability of the underlying documentation and information.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-asset-protection">
            <h2 id="disclaimer-asset-protection"><span>7.</span> No Guarantee of Asset Protection or Preservation</h2>
            <p>Vaultier&apos;s services are intended to support the organisation, administration, care and continuity of privately managed collections.</p>
            <p>However, no administrative system, digital record, security measure or professional coordination service can eliminate every risk associated with owning, maintaining, storing, transporting or transferring valuable property.</p>
            <p>Vaultier does not guarantee that any asset will be protected against theft, loss, damage, deterioration, depreciation, fraud or other adverse circumstances.</p>
            <p>References to asset protection, preservation, security or continuity describe the intended purpose of our services and should not be interpreted as absolute guarantees.</p>
            <p>Any specific obligations relating to asset custody, physical protection, insurance or risk management will be governed by the relevant written agreements.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-privacy-security">
            <h2 id="disclaimer-privacy-security"><span>8.</span> Privacy and Information Security</h2>
            <p>Vaultier recognises the sensitive and confidential nature of information relating to private collections, their owners and authorised representatives.</p>
            <p>We employ organisational and technical safeguards intended to protect information entrusted to our systems.</p>
            <p>However, no website, digital platform, electronic communication system or data storage environment can be guaranteed to be entirely free from security vulnerabilities, interruptions or unauthorised access.</p>
            <p>Visitors should avoid transmitting highly sensitive information through unsecured communication channels.</p>
            <p>The collection, processing, retention and protection of personal information are addressed in our <Link href="/privacy">Privacy Policy</Link>.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-no-client-relationship">
            <h2 id="disclaimer-no-client-relationship"><span>9.</span> No Client Relationship Created</h2>
            <p>Accessing this Website, submitting an enquiry, requesting information or communicating with Vaultier does not automatically establish a client relationship.</p>
            <p>Vaultier accepts private collection management engagements subject to its internal assessment, eligibility requirements, applicable due diligence procedures and execution of the relevant written agreements.</p>
            <p>No obligation to provide services arises unless and until an engagement has been formally accepted in accordance with the applicable contractual arrangements.</p>
            <p>Vaultier reserves the right to decline enquiries or applications, subject to applicable law.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-no-guarantees">
            <h2 id="disclaimer-no-guarantees"><span>10.</span> No Guarantees or Representations</h2>
            <p>Any descriptions of Vaultier&apos;s services, processes, anticipated outcomes or operational capabilities are provided for general information.</p>
            <p>Actual services, deliverables, availability, timelines and responsibilities may vary depending on the nature of the engagement, the collection concerned, the relevant jurisdiction and the terms agreed with the client.</p>
            <p>Vaultier does not guarantee any particular financial outcome, increase in asset value, reduction in expenditure, successful acquisition or disposal, or other commercial result.</p>
            <p>Past performance, illustrative examples and descriptions of potential benefits should not be relied upon as guarantees of future outcomes.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-website-availability">
            <h2 id="disclaimer-website-availability"><span>11.</span> Website Availability and Technical Accuracy</h2>
            <p>Vaultier endeavours to maintain the accessibility, security and functionality of the Website.</p>
            <p>Nevertheless, the Website may occasionally be unavailable due to maintenance, technical issues, system updates or circumstances beyond our reasonable control.</p>
            <p>We do not warrant that the Website will operate continuously, without interruption or without error.</p>
            <p>We reserve the right to modify, suspend or discontinue any part of the Website without prior notice.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-external-links">
            <h2 id="disclaimer-external-links"><span>12.</span> Third-Party Websites and External Links</h2>
            <p>The Website may contain links to websites, platforms or resources operated by independent third parties.</p>
            <p>Such links are provided for convenience and informational purposes only.</p>
            <p>Vaultier does not control and is not responsible for the content, accuracy, availability, security practices or privacy policies of third-party websites.</p>
            <p>The inclusion of an external link does not necessarily imply endorsement, affiliation or approval.</p>
            <p>Visitors access third-party resources at their own discretion and should review the applicable terms and privacy policies.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-intellectual-property">
            <h2 id="disclaimer-intellectual-property"><span>13.</span> Intellectual Property</h2>
            <p>Unless otherwise indicated, the content, design, branding, trademarks, logos, text, graphics and other materials displayed on the Website are owned by or licensed to Vaultier.</p>
            <p>These materials are protected by applicable intellectual property laws.</p>
            <p>No content may be reproduced, distributed, modified, commercially exploited or otherwise used without prior written authorisation from Vaultier, except where permitted by applicable law.</p>
            <p>Nothing contained on the Website grants any licence or right to use Vaultier&apos;s intellectual property without express permission.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-liability">
            <h2 id="disclaimer-liability"><span>14.</span> Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, Vaultier, its directors, officers, employees, representatives and affiliates shall not be liable for losses or damages arising solely from reliance upon general information published on the Website, or from the use or inability to use the Website.</p>
            <p>This includes, to the extent permitted by law, indirect or consequential losses arising from website interruptions, inaccuracies, omissions, technical errors or third-party content.</p>
            <p>Nothing in this Disclaimer excludes or limits liability that cannot lawfully be excluded or limited, including liability for fraud or fraudulent misrepresentation.</p>
            <p>Nothing in this Disclaimer overrides any rights, remedies or obligations expressly established under a separate written agreement between Vaultier and a client.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-changes">
            <h2 id="disclaimer-changes"><span>15.</span> Changes to This Disclaimer</h2>
            <p>Vaultier reserves the right to amend or update this Disclaimer periodically to reflect changes in its services, operational practices, legal obligations or Website functionality.</p>
            <p>Any revisions will be published on this page with an updated revision date.</p>
            <p>Visitors are encouraged to review this Disclaimer periodically.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="disclaimer-governing-law">
            <h2 id="disclaimer-governing-law"><span>16.</span> Governing Law</h2>
            <p>This Disclaimer shall be governed by the applicable laws of the United Arab Emirates, subject to any mandatory legal provisions or jurisdictional requirements that may apply.</p>
            <p>Any dispute concerning a separately contracted service shall be governed by the terms of the relevant written agreement.</p>
          </section>

          <section className="legal-policy-section legal-contact" aria-labelledby="disclaimer-contact">
            <h2 id="disclaimer-contact"><span>17.</span> Contact Information</h2>
            <p>For questions, concerns or requests relating to this Disclaimer, please contact:</p>
            <address>
              <strong>Vaultier FZ-LLC</strong><br />
              United Arab Emirates<br />
              <span className="legal-label">Email:</span> <a href="mailto:operations@accessvoltier.co">operations@accessvoltier.co</a><br />
              <span className="legal-label">Website:</span> <a href="https://vaultier.co">www.vaultier.co</a>
            </address>
          </section>

          <p className="legal-end">© 2026 Vaultier FZ-LLC. All rights reserved.</p>
        </div>
      </article>
    </main>
  );
}
