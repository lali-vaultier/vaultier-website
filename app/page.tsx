"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const abbreviationPaths = [
  "M129.4,208.8c3.2,7,6.2,9.2,7,9.6h-9.9c-1.2,0-2.3-.8-2.8-1.9l-44.4-119.6c-4.7-11.9-9.1-14.4-10.1-15h13.5c.8,0,1.4.7,1.2,1.4-.4,2,.2,5.9,2.7,12.4l40.6,108.2.6,1.5,40.7-110.3c2.2-6,2.1-9.5,1.3-11.4-.4-.8.2-1.8,1.1-1.8h9.2c-.6.4-5.2,2.5-9.7,15l-41.2,111c-.1.3,0,.7,0,1Z",
  "M342.4,218.6c4.8-1.5,5.9-3.7,5.9-8.7v-117.1c0-3.8-.9-9-7.4-11.2h2.2c4.7,0,7.1,0,8.7,0,6.2,0,22.5,0,30.2,0,32.9,0,43.5,16.8,43.8,32.8.3,18-12.3,35.8-42.8,36.3l46.2,59.8c3.4,3.9,6.8,7.3,11.2,8.1h-22.1c4-2.3,3.2-6-1.2-11.5l-43.3-56.4c-5.7-.2-17.9-.1-17.9-.1v59.1c0,5,1.1,7,6.2,9,.1,0-19.7,0-19.7,0ZM384,83.8h-24.4c-2,.2-3.6,3-3.6,5v59.1c8.7,0,21.9,0,27.7,0,28.7,0,36.2-17.5,36.2-32s-7.1-32-35.8-32Z",
  "M332.3,82.3c.5,2.9,1.5,6.7,3,13.1.7,2.9-1.4,1-2.3,0-5.7-7-15.7-11.6-26.4-11.6h-15.1c-.7,0-1.3.6-1.3,1.3v119.6c0,6.5,4.1,10.7,6.3,13.7h-20.5c2.5-3,6.1-7.3,6.1-13.8v-119c0-1.4-.7-1.8-2.3-1.8h-13.6c-10.9,0-20.5,4.4-26.1,11.6-1.7,2.2-3.3,2.7-2.8,0,1.2-5.7,2.4-11.6,2.6-13,0-.2.2-.3.4-.3h91.5c.2,0,.4.1.4.3Z",
  "M200.4,198.7c0,11.8,1.2,15.1,2.1,16.5.3.5.9,1.3,1.5,1.3h44c9.7,0,13.5-3.2,20.3-10.2h0c-2.3,5.8-3,7.1-5.1,9.1-2.3,2.3-6.1,3.1-8.9,3.1h-65.7s4.1-3.3,4.1-18.8v-99.5c0-14.5-.2-17.8-4.1-18.8h15.5c-3.2,1.1-3.7,3.1-3.7,18.8v98.4Z",
];

const mobileLetterLayout = [
  { id: "V", pathIndex: 0, transform: "translate(-49.6 -17)" },
  { id: "L", pathIndex: 3, transform: "translate(-153.4 127)" },
  { id: "T", pathIndex: 2, transform: "translate(-211.4 272)" },
  { id: "R", pathIndex: 1, transform: "translate(-315.5 417)" },
];

const chapterScrollProgress = {
  about: 0.16,
  services: 0.36,
  privateClient: {
    desktop: 0.36,
    mobile: 0.615,
  },
  security: 1,
} as const;

const aboutChapter = {
  id: "about",
  heading: "Grow and preserve your collection through time with Vaultier",
  paragraphs: [
    "Vaultier assigns every valuable piece a permanent digital record, with technology that handles insurance, valuations, care and specialist work.",
    "A White Glove team is dedicated entirely to the care and expansion of your collection.",
  ],
} as const;

const serviceChapters = [
  {
    id: "vaultier-record",
    eyebrow: "The Vaultier Record: A tool for wealth preservation",
    heading: "Preserve the identity, history and value of every piece",
    paragraphs: [
      "Each Vaultier Record details the piece’s ownership, provenance, documentation, valuation, condition and location. The Record is updated as the piece is insured, moved, restored, sold, gifted or inherited.",
    ],
  },
  {
    id: "white-glove",
    eyebrow: "White Glove",
    heading: "Your Collection in Experienced Hands",
    paragraphs: [
      "Vaultier arranges the work each piece requires, from insurance and valuation to restoration, maintenance, transport and storage. A small team is dedicated to the care and maintenance of your collection.",
    ],
  },
  {
    id: "collection-guidance",
    eyebrow: "Collection Guidance",
    heading: "Better-informed acquisitions and sales",
    paragraphs: [
      "Before a piece is acquired or sold, Vaultier arranges independent advice on provenance, authenticity, condition and value from approved and vetted specialists within our private Guild.",
    ],
  },
  {
    id: "private-client-access",
    eyebrow: "Private Client Access",
    heading: "For collectors and their authorised representatives",
    paragraphs: [
      "Family offices, authorised representatives and personal assistants can manage the collection on the collector’s behalf, with the collector as involved as they choose to be.",
    ],
  },
] as const;

type ChapterProgress = number | { desktop: number; mobile: number };

function resolveChapterProgress(progress: ChapterProgress) {
  if (typeof progress === "number") return progress;

  return window.matchMedia("(max-width: 760px)").matches ? progress.mobile : progress.desktop;
}

function scrollToExperienceProgress(experience: HTMLElement, progress: number) {
  const scrollDistance = Math.max(0, experience.offsetHeight - window.innerHeight);

  window.scrollTo({
    top: experience.offsetTop + scrollDistance * progress,
    behavior: "instant",
  });
}

function VltrDesktopPaths({ prefix }: { prefix: string }) {
  return (
    <>
      {abbreviationPaths.map((path, index) => (
        <path key={`${prefix}-desktop-${index}`} d={path} />
      ))}
    </>
  );
}

function VltrMobilePaths({ prefix }: { prefix: string }) {
  return (
    <>
      {mobileLetterLayout.map(({ id, pathIndex, transform }) => (
        <path key={`${prefix}-mobile-${id}`} d={abbreviationPaths[pathIndex]} transform={transform} />
      ))}
    </>
  );
}

function MetallicInlayDefinitions({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) {
  return (
    <defs>
      <linearGradient
        id={id}
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1={height}
        x2={width}
        y2="0"
      >
        <stop offset="0" stopColor="#242829" />
        <stop offset="0.18" stopColor="#383e40" />
        <stop offset="0.4" stopColor="#555c5f" />
        <stop offset="0.47" stopColor="#7b8386" />
        <stop offset="0.515" stopColor="#a8aeb0" />
        <stop offset="0.565" stopColor="#626a6d" />
        <stop offset="0.76" stopColor="#2f3436" />
        <stop offset="1" stopColor="#4c5355" />
      </linearGradient>
    </defs>
  );
}

function LetterpressDefinitions() {
  return (
    <svg className="letterpress-definitions" aria-hidden="true" focusable="false">
      <defs>
        <filter id="letterpress-display" x="-6%" y="-10%" width="112%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.48" result="pressure" />
          <feComposite in="pressure" in2="SourceAlpha" operator="out" result="rim" />
          <feOffset in="rim" dx="-0.4" dy="-0.46" result="dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.18" result="dark-ink" />
          <feComposite in="dark-ink" in2="dark-rim" operator="in" result="shadow" />
          <feOffset in="rim" dx="0.4" dy="0.46" result="light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.5" result="light-ink" />
          <feComposite in="light-ink" in2="light-rim" operator="in" result="highlight" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="highlight" />
          </feMerge>
        </filter>
        <filter id="letterpress-fine" x="-8%" y="-16%" width="116%" height="132%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.3" result="pressure" />
          <feComposite in="pressure" in2="SourceAlpha" operator="out" result="rim" />
          <feOffset in="rim" dx="-0.26" dy="-0.3" result="dark-rim" />
          <feFlood floodColor="#42331f" floodOpacity="0.2" result="dark-ink" />
          <feComposite in="dark-ink" in2="dark-rim" operator="in" result="shadow" />
          <feOffset in="rim" dx="0.28" dy="0.32" result="light-rim" />
          <feFlood floodColor="#fffaf1" floodOpacity="0.54" result="light-ink" />
          <feComposite in="light-ink" in2="light-rim" operator="in" result="highlight" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="highlight" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export default function Home() {
  const experience = useRef<HTMLElement>(null);
  const openingPaper = useRef<HTMLDivElement>(null);
  const aboutSection = useRef<HTMLElement>(null);
  const servicesSection = useRef<HTMLElement>(null);
  const servicesGrid = useRef<HTMLDivElement>(null);
  const finalPaper = useRef<HTMLDivElement>(null);
  const privateEnquiryCopy = useRef<HTMLDivElement>(null);
  const securityPaper = useRef<HTMLDivElement>(null);
  const securityCopy = useRef<HTMLDivElement>(null);
  const securityNav = useRef<HTMLElement>(null);
  const [openingInteractive, setOpeningInteractive] = useState(true);
  const [privateEnquiryVisible, setPrivateEnquiryVisible] = useState(false);
  const [securityVisible, setSecurityVisible] = useState(false);

  const handleChapterClick = (event: MouseEvent<HTMLAnchorElement>, progress: ChapterProgress) => {
    event.preventDefault();
    const target = event.currentTarget.getAttribute("href");

    if (target?.startsWith("#")) {
      window.history.pushState(null, "", target);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (target?.startsWith("#")) {
        document.querySelector(target)?.scrollIntoView({ block: "start" });
      }
    } else if (experience.current) {
      scrollToExperienceProgress(experience.current, resolveChapterProgress(progress));
    }

    if (target?.startsWith("#")) {
      window.requestAnimationFrame(() => {
        (document.querySelector(target) as HTMLElement | null)?.focus({ preventScroll: true });
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => {
        setOpeningInteractive(true);
        setPrivateEnquiryVisible(true);
        setSecurityVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: experience.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setOpeningInteractive(self.progress < 0.1);
            setPrivateEnquiryVisible(self.progress >= 0.68 && self.progress < 0.9);
            setSecurityVisible(self.progress >= 0.88);
          },
        },
      });

      timeline.to(openingPaper.current, { yPercent: -104, duration: 0.12 }, 0);

      const getServicesGridOffset = () => {
        const section = servicesSection.current;
        const grid = servicesGrid.current;

        if (!section || !grid || !window.matchMedia("(max-width: 760px)").matches) return 0;

        const styles = window.getComputedStyle(section);
        const availableHeight =
          window.innerHeight - Number.parseFloat(styles.paddingTop) - Number.parseFloat(styles.paddingBottom);

        return Math.min(0, availableHeight - grid.scrollHeight);
      };

      timeline
        .fromTo(aboutSection.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.04 }, 0.12)
        .to(aboutSection.current, { autoAlpha: 0, y: -10, duration: 0.04 }, 0.27)
        .fromTo(servicesSection.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.04 }, 0.31)
        .fromTo(servicesGrid.current, { y: 0 }, { y: getServicesGridOffset, duration: 0.27 }, 0.35)
        .to(servicesSection.current, { autoAlpha: 0, duration: 0.04 }, 0.64);

      timeline
        .fromTo(finalPaper.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0.68)
        .fromTo(privateEnquiryCopy.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.05 }, 0.7)
        .to(privateEnquiryCopy.current, { opacity: 0, y: -10, duration: 0.04 }, 0.85)
        .fromTo(securityPaper.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0.88)
        .fromTo(securityCopy.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.04 }, 0.9)
        .fromTo(securityNav.current, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.95);
    }, experience);

    let hashFrame = 0;
    const navigateToHash = () => {
      const serviceProgress = window.matchMedia("(max-width: 760px)").matches
        ? {
            "#services": 0.34,
            "#vaultier-record": 0.34,
            "#white-glove": 0.42,
            "#collection-guidance": 0.5,
            "#private-client-access": 0.615,
          }
        : {
            "#services": chapterScrollProgress.services,
            "#vaultier-record": chapterScrollProgress.services,
            "#white-glove": chapterScrollProgress.services,
            "#collection-guidance": chapterScrollProgress.services,
            "#private-client-access": chapterScrollProgress.services,
          };
      const hashProgress = {
        "": 0,
        "#about": chapterScrollProgress.about,
        ...serviceProgress,
        "#security": chapterScrollProgress.security,
      }[window.location.hash];

      if (hashProgress === undefined) return;

      hashFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (experience.current) {
          scrollToExperienceProgress(experience.current, hashProgress);
        }
      });
    };

    navigateToHash();
    window.addEventListener("hashchange", navigateToHash);
    window.addEventListener("popstate", navigateToHash);

    return () => {
      window.cancelAnimationFrame(hashFrame);
      window.removeEventListener("hashchange", navigateToHash);
      window.removeEventListener("popstate", navigateToHash);
      context.revert();
    };
  }, []);

  return (
    <main ref={experience} className="experience">
      <section className="invitation-stage" aria-label="Vaultier private invitation">
        <LetterpressDefinitions />
        <div className="textile" aria-hidden="true" />

        <div ref={openingPaper} className="opening-paper">
          <div className="opening-paper-content">
            <svg
              className="blind-deboss-mark blind-deboss-mark-desktop"
              viewBox="0 0 500 287.5"
              role="img"
              aria-label="Vaultier abbreviation"
              preserveAspectRatio="xMidYMid meet"
            >
              <MetallicInlayDefinitions id="opening-vltr-metal-desktop" width={500} height={287.5} />
              <g className="blind-deboss-mark-highlight" transform="translate(0.65 0.72)">
                <VltrDesktopPaths prefix="deboss-highlight" />
              </g>
              <g className="blind-deboss-mark-shadow" transform="translate(-0.68 -0.76)">
                <VltrDesktopPaths prefix="deboss-shadow" />
              </g>
              <g className="opening-vltr-metal-face" fill="url(#opening-vltr-metal-desktop)">
                <VltrDesktopPaths prefix="deboss-face" />
              </g>
            </svg>
            <svg
              className="blind-deboss-mark blind-deboss-mark-mobile"
              viewBox="0 0 150 700"
              role="img"
              aria-label="Vaultier abbreviation"
              preserveAspectRatio="xMidYMid meet"
            >
              <MetallicInlayDefinitions id="opening-vltr-metal-mobile" width={150} height={700} />
              <g className="blind-deboss-mark-highlight" transform="translate(0.65 0.72)">
                <VltrMobilePaths prefix="deboss-mobile-highlight" />
              </g>
              <g className="blind-deboss-mark-shadow" transform="translate(-0.68 -0.76)">
                <VltrMobilePaths prefix="deboss-mobile-shadow" />
              </g>
              <g className="opening-vltr-metal-face" fill="url(#opening-vltr-metal-mobile)">
                <VltrMobilePaths prefix="deboss-mobile-face" />
              </g>
            </svg>
            <p className="opening-paper-subheading">Private Collection Management</p>
          </div>
          <nav className="opening-paper-nav" aria-label="Opening navigation">
            <a
              href="#private-client-access"
              onClick={(event) => handleChapterClick(event, chapterScrollProgress.privateClient)}
              tabIndex={openingInteractive ? 0 : -1}
            >
              Private Client Access
            </a>
            <Link href="/professional-access" tabIndex={openingInteractive ? 0 : -1}>Professional Access</Link>
            <Link href="/private-enquiry" tabIndex={openingInteractive ? 0 : -1}>Private Enquiry</Link>
          </nav>
        </div>

        <section
          id={aboutChapter.id}
          ref={aboutSection}
          className="editorial-copy opening-copy textile-chapter"
          aria-labelledby="about-heading"
          tabIndex={-1}
        >
          <h1 id="about-heading" className="homepage-editorial-heading">
            {aboutChapter.heading}
          </h1>
          {aboutChapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body-copy">
              {paragraph}
            </p>
          ))}
        </section>

        <section
          id="services"
          ref={servicesSection}
          className="editorial-copy opening-copy services-grid-section"
          aria-label="Vaultier collection services"
          tabIndex={-1}
        >
          <div ref={servicesGrid} className="services-grid">
            {serviceChapters.map((chapter) => {
              const headingId = `${chapter.id}-heading`;

              return (
                <article
                  id={chapter.id}
                  key={chapter.id}
                  className="services-grid-item"
                  aria-labelledby={headingId}
                  tabIndex={-1}
                >
                  {chapter.eyebrow ? <p className="eyebrow">{chapter.eyebrow}</p> : null}
                  <h2 id={headingId} className="homepage-editorial-heading">
                    {chapter.heading}
                  </h2>
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="body-copy">
                      {paragraph}
                    </p>
                  ))}
                </article>
              );
            })}
          </div>
        </section>

        <div
          ref={finalPaper}
          className={`final-paper${privateEnquiryVisible ? " is-active" : ""}`}
          aria-hidden={!privateEnquiryVisible}
        >
          <div ref={privateEnquiryCopy} className="editorial-copy invitation-copy">
            <p className="eyebrow">Applications and Invitations</p>
            <h2 className="homepage-editorial-heading">Place the collection under private management</h2>
            <p className="body-copy final-body-copy">
              Vaultier accepts a limited number of collections by application or invitation.
            </p>
            <p className="body-copy body-copy-followup final-body-copy balanced-body-copy">
              An enquiry may be made by a collector, family office, personal assistant or other authorised
              representative. All information submitted is treated in confidence.
            </p>
            <Link href="/private-enquiry" className="invitation-link" tabIndex={privateEnquiryVisible ? 0 : -1}>
              <span>Apply for a Vaultier Account</span>
            </Link>
          </div>
        </div>

        <div
          id="security"
          ref={securityPaper}
          className={`final-paper security-paper${securityVisible ? " is-active" : ""}`}
          aria-hidden={!securityVisible}
        >
          <div ref={securityCopy} className="editorial-copy invitation-copy security-copy">
            <h2 className="homepage-editorial-heading">Privacy and Security</h2>
            <p className="security-subheading">Your privacy is our utmost concern.</p>
            <p className="body-copy final-body-copy">
              Vaultier uses encrypted systems and permission-based access to protect sensitive collection information.
              Item locations are visible only to people who have been expressly authorised.
            </p>
            <p className="body-copy body-copy-followup final-body-copy">
              Important activity is recorded, and identity checks are required before sensitive instructions are
              carried out.
            </p>
          </div>
          <nav ref={securityNav} className="final-paper-nav" aria-label="Website navigation">
            <Link href="/privacy" tabIndex={securityVisible ? 0 : -1}>Privacy</Link>
            <a
              href="#security"
              onClick={(event) => handleChapterClick(event, chapterScrollProgress.security)}
              tabIndex={securityVisible ? 0 : -1}
            >
              Security
            </a>
            <Link href="/terms" tabIndex={securityVisible ? 0 : -1}>Terms</Link>
            <a href="mailto:operations@accessvaultier.co" tabIndex={securityVisible ? 0 : -1}>Contact</a>
          </nav>
        </div>
      </section>
    </main>
  );
}
