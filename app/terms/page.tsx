sed: --: No such file or directory
import type { Metadata } from "next";
import Link from "next/link";
import SecondaryHeader from "../components/SecondaryHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Use — Vaultier",
  description: "Terms governing access to and use of the Vaultier website.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <SecondaryHeader />
      <article className="legal-document">
        <header className="legal-introduction">
          <h1>Terms of Use</h1>
          <dl className="legal-dates">
            <div>
              <dt>Effective date</dt>
              <dd>22 Oct 2026</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>22 Oct 2026</dd>
            </div>
          </dl>
        </header>

        <div className="legal-policy">
          <section className="legal-policy-section" aria-labelledby="terms-introduction">
            <h2 id="terms-introduction"><span>1.</span> Introduction</h2>
            <p>Welcome to Vaultier.</p>
            <p>These Terms of Use govern your access to and use of the website located at <a href="https://vaultier.co">https://vaultier.co</a> (the &quot;Website&quot;), including its content, features and private enquiry facilities.</p>
            <p>The Website is operated by <strong>VAULTIER FZ-LLC</strong>, trading as Vaultier (&quot;Vaultier&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;).</p>
            <p>By accessing or using the Website, you agree to these Terms of Use. If you do not agree, please discontinue your use of the Website.</p>
            <p>These Terms apply to visitors, prospective members, collectors, authorised representatives, professional advisers and other individuals accessing the Website.</p>
            <p>Separate agreements may govern any collection-management, advisory, coordination or membership services subsequently provided by Vaultier.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="about-vaultier">
            <h2 id="about-vaultier"><span>2.</span> About Vaultier</h2>
            <p>Vaultier is a private collection-management business focused on the documentation, protection, care and continuity of valuable collections.</p>
            <p>Our intended services combine technology-supported collection records with the coordination of relevant professional specialists, including valuers, insurers, conservators, restorers and other collection-related service providers.</p>
            <p>Information presented on the Website describes Vaultier&apos;s business, intended services and approach to private collection management.</p>
            <p>The availability, scope and terms of particular services may vary and will be confirmed through the relevant application, onboarding or contractual process.</p>
            <p>Nothing on the Website constitutes a guarantee that any particular service, feature or professional engagement will be available to a visitor or prospective member.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="website-access">
            <h2 id="website-access"><span>3.</span> Access to the Website</h2>
            <p>You may access the publicly available areas of the Website for lawful personal, professional or informational purposes.</p>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Website in violation of applicable laws or regulations.</li>
              <li>Attempt to gain unauthorised access to the Website, its systems or associated information.</li>
              <li>Interfere with the Website&apos;s security, operation or availability.</li>
              <li>Introduce malicious code or other harmful material.</li>
              <li>Misrepresent your identity, professional capacity or authority.</li>
              <li>Submit information that is knowingly false, misleading or unlawful.</li>
              <li>Collect or extract information from the Website through unauthorised automated means.</li>
              <li>Reproduce, distribute or commercially exploit Website content without appropriate permission.</li>
            </ul>
            <p>Vaultier may restrict or suspend access where reasonably necessary to protect the Website, its users, its information or its legitimate business interests.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="private-enquiries">
            <h2 id="private-enquiries"><span>4.</span> Private Enquiries and Membership Applications</h2>
            <p>Vaultier operates an application-led approach to prospective membership and collection-management relationships.</p>
            <p>The submission of a private enquiry, invitation request or membership application does not constitute acceptance into membership or create a contractual relationship for the provision of collection-management services.</p>
            <p>Vaultier may review enquiries and applications to determine whether a prospective relationship is appropriate, taking into account the nature of the collection, the services requested, operational capacity and other legitimate considerations.</p>
            <p>Vaultier is under no obligation to accept an application or provide services solely because an enquiry has been submitted.</p>
            <p>Any acceptance, membership entitlement, service commitment or commercial arrangement will be subject to separate written confirmation and, where applicable, a formal agreement.</p>
            <p>References to private invitations, limited membership or collection reviews do not constitute an unconditional offer of membership or services.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="submitted-information">
            <h2 id="submitted-information"><span>5.</span> Information Submitted Through the Website</h2>
            <p>When submitting an enquiry or communicating with Vaultier, you agree to provide information that is accurate to the best of your knowledge.</p>
            <p>If you submit information on behalf of another individual, collector, trust, family office or organisation, you confirm that you have appropriate authority to do so.</p>
            <p>You should not submit confidential collection records, sensitive financial information, identification documents, access credentials or detailed asset-location information through an initial enquiry unless Vaultier has expressly requested such information through an appropriate channel.</p>
            <p>Submission of an enquiry does not, by itself, establish a professional advisory, fiduciary, agency or collection-management relationship.</p>
            <p>Personal information submitted through the Website will be handled in accordance with our <Link href="/privacy">Privacy Policy</Link> and applicable data protection law.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="confidentiality">
            <h2 id="confidentiality"><span>6.</span> Confidentiality and Discretion</h2>
            <p>Vaultier recognises the importance of discretion in matters relating to private collections and their owners.</p>
            <p>We seek to handle information received through our Website responsibly and in accordance with our <Link href="/privacy">Privacy Policy</Link> and applicable confidentiality obligations.</p>
            <p>However, use of the Website or submission of an initial enquiry does not automatically establish a contractual duty of confidentiality beyond obligations imposed by applicable law.</p>
            <p>Where a prospective relationship requires the exchange of particularly sensitive information, the parties may agree appropriate confidentiality arrangements before such information is disclosed.</p>
            <p>Formal confidentiality, access-control and information-handling obligations relating to collection-management services may be set out in separate agreements.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="website-content">
            <h2 id="website-content"><span>7.</span> Website Content and Information</h2>
            <p>The information on the Website is provided for general information about Vaultier and its services.</p>
            <p>We seek to ensure that published information is clear and accurate. However, descriptions of services, capabilities, availability and operating arrangements may change as Vaultier develops.</p>
            <p>Website content should not be interpreted as a representation that a particular service or feature is currently operational unless expressly confirmed.</p>
            <p>Vaultier may amend, remove or update Website content without prior notice.</p>
            <p>We do not guarantee that all information published on the Website will be complete, current or free from errors at all times.</p>
            <p>Nothing in these Terms excludes liability for fraudulent misrepresentation or any other liability that cannot lawfully be excluded.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="professional-advice">
            <h2 id="professional-advice"><span>8.</span> No Professional Advice</h2>
            <p>Information made available through the Website is not intended to constitute legal, financial, investment, tax, insurance, valuation or other regulated professional advice.</p>
            <p>References to insurance, valuations, provenance, acquisitions, conservation, succession or other collection-related matters are descriptive of potential collection-management activities.</p>
            <p>They should not be relied upon as individual professional recommendations.</p>
            <p>Visitors should obtain advice from appropriately qualified professionals where required.</p>
            <p>Vaultier does not represent, solely by referring to third-party professional services on the Website, that it is itself authorised to provide regulated services.</p>
            <p>Any regulated activity, where applicable, must be undertaken by an appropriately authorised person or entity and subject to the relevant legal and contractual requirements.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="third-party-specialists">
            <h2 id="third-party-specialists"><span>9.</span> Third-Party Specialists and Services</h2>
            <p>Vaultier&apos;s collection-management model may involve coordination with independent specialists and service providers.</p>
            <p>These may include insurers, insurance brokers, valuers, conservators, restorers, custodians, transport providers and professional advisers.</p>
            <p>Such parties may operate independently of Vaultier and may be subject to their own professional responsibilities, engagement terms and regulatory obligations.</p>
            <p>References to third-party services on the Website do not constitute a guarantee of availability, performance, suitability or outcome.</p>
            <p>The responsibilities of Vaultier and any third-party specialist in an actual service engagement will be determined by the applicable agreements and legal obligations.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="intellectual-property">
            <h2 id="intellectual-property"><span>10.</span> Intellectual Property</h2>
            <p>Unless otherwise stated, the Website and its original content, design, visual presentation, text, graphics, logos, trademarks, distinctive brand elements and underlying intellectual property are owned by Vaultier or used with appropriate permission.</p>
            <p>This includes the Vaultier name, VLTR logomark, visual identity and proprietary Website materials, to the extent protected by applicable intellectual property law.</p>
            <p>You may view and use the Website for its intended purposes.</p>
            <p>You may not reproduce, modify, distribute, publish, license, sell or commercially exploit protected Website materials without prior written permission, except as permitted by applicable law.</p>
            <p>No intellectual property rights are transferred to you by accessing the Website.</p>
            <p>All third-party trademarks and intellectual property remain the property of their respective owners.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="third-party-links">
            <h2 id="third-party-links"><span>11.</span> Links to Third-Party Websites</h2>
            <p>The Website may contain links to websites or services operated by third parties.</p>
            <p>Such links are provided for convenience or relevant information and do not necessarily imply endorsement, affiliation or approval.</p>
            <p>Vaultier does not control the content, security, availability or privacy practices of third-party websites.</p>
            <p>Access to third-party websites is subject to their respective terms and policies.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="availability-security">
            <h2 id="availability-security"><span>12.</span> Website Availability and Security</h2>
            <p>Vaultier seeks to maintain a reliable and secure Website.</p>
            <p>However, we do not guarantee uninterrupted availability, continuous accessibility or that the Website will be free from technical errors, vulnerabilities or interruptions.</p>
            <p>Access may occasionally be affected by maintenance, updates, service-provider interruptions or circumstances outside our reasonable control.</p>
            <p>You are responsible for taking reasonable precautions when accessing online services, including maintaining the security of your devices and communications.</p>
            <p>Nothing in these Terms diminishes Vaultier&apos;s obligations under applicable data protection, consumer protection or other mandatory laws.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="liability">
            <h2 id="liability"><span>13.</span> Limitation of Liability</h2>
            <p>To the extent permitted by applicable law, Vaultier will not be liable for losses arising solely from reliance on general informational Website content where such reliance is unreasonable or the information is not intended as professional advice.</p>
            <p>We will not be responsible for interruptions or failures caused by circumstances beyond our reasonable control, except where liability cannot lawfully be excluded.</p>
            <p>Nothing in these Terms excludes or restricts liability for:</p>
            <ul>
              <li>Death or personal injury caused by negligence.</li>
              <li>Fraud or fraudulent misrepresentation.</li>
              <li>Breach of obligations that cannot lawfully be excluded or restricted.</li>
              <li>Any other liability that applicable law prohibits us from excluding.</li>
            </ul>
            <p>These Terms do not exclude or restrict any mandatory statutory rights available to consumers.</p>
            <p>Any additional allocation of responsibility or liability relating to collection-management services will be addressed in the applicable service agreement, subject to law.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="privacy-personal-information">
            <h2 id="privacy-personal-information"><span>14.</span> Privacy and Personal Information</h2>
            <p>Your use of the Website may involve the collection and processing of personal information.</p>
            <p>Our <Link href="/privacy">Privacy Policy</Link> explains how personal information is collected, used, retained, disclosed and protected, together with the rights available to individuals under applicable data protection law.</p>
            <p>The Privacy Policy is available at:</p>
            <p><Link href="/privacy">https://vaultier.co/privacy</Link></p>
            <p>The Privacy Policy should be read alongside these Terms of Use.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="terms-changes">
            <h2 id="terms-changes"><span>15.</span> Changes to the Website and These Terms</h2>
            <p>Vaultier may update the Website and these Terms of Use to reflect changes in our operations, services, legal obligations or business requirements.</p>
            <p>The latest version of these Terms will be published on the Website with its effective date.</p>
            <p>Changes will apply prospectively from their effective date, subject to applicable law.</p>
            <p>Where legally required, we will provide additional notice of material changes.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="governing-law">
            <h2 id="governing-law"><span>16.</span> Governing Law and Jurisdiction</h2>
            <p>These Terms of Use are governed by the laws of <strong>[Confirm governing jurisdiction]</strong>, subject to any mandatory laws and protections applicable to users in other jurisdictions.</p>
            <p>Any dispute arising in connection with these Terms will be subject to the jurisdiction of <strong>[Confirm appropriate courts]</strong>, except where applicable law provides otherwise.</p>
            <p>Nothing in this section removes mandatory rights or legal protections that cannot lawfully be excluded.</p>
          </section>

          <section className="legal-policy-section" aria-labelledby="general-provisions">
            <h2 id="general-provisions"><span>17.</span> General Provisions</h2>
            <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in effect to the extent permitted by law.</p>
            <p>A failure by Vaultier to exercise or enforce a right under these Terms does not constitute a waiver of that right.</p>
            <p>These Terms govern use of the public Website only and do not replace any separately executed confidentiality, membership, collection-management or professional services agreement.</p>
          </section>

          <section className="legal-policy-section legal-contact" aria-labelledby="terms-contact">
            <h2 id="terms-contact"><span>18.</span> Contact</h2>
            <p>For enquiries relating to these Terms of Use, please contact:</p>
            <address>
              <strong>VAULTIER</strong><br />
              <span className="legal-label">Legal entity:</span> VAULTIER FZ-LLC<br />
              <span className="legal-label">Registered address:</span> VUNE2853, Compass Building - Al Hulaila, Al Hulaila Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates<br />
              <span className="legal-label">General enquiries:</span> <a href="mailto:operations@accessvaultier.co">operations@accessvaultier.co</a><br />
              <span className="legal-label">Website:</span> <a href="https://vaultier.co">https://vaultier.co</a>
            </address>
          </section>

          <p className="legal-end">End of Terms of Use</p>
        </div>
      </article>
      <SiteFooter current="terms" />
    </main>
  );
}
