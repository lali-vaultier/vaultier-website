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

const aboutScrollProgress = 0.35;

function scrollToAboutChapter(experience: HTMLElement) {
  const scrollDistance = Math.max(0, experience.offsetHeight - window.innerHeight);

  window.scrollTo({
    top: experience.offsetTop + scrollDistance * aboutScrollProgress,
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
        <stop offset="0" stopColor="#2d2216" />
        <stop offset="0.18" stopColor="#42331f" />
        <stop offset="0.4" stopColor="#6a5a46" />
        <stop offset="0.47" stopColor="#a99c88" />
        <stop offset="0.515" stopColor="#d4ccbe" />
        <stop offset="0.565" stopColor="#786750" />
        <stop offset="0.76" stopColor="#3b2d1d" />
        <stop offset="1" stopColor="#62513c" />
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
  const textileCopyOne = useRef<HTMLDivElement>(null);
  const textileCopyTwo = useRef<HTMLDivElement>(null);
  const finalPaper = useRef<HTMLDivElement>(null);
  const invitationCopy = useRef<HTMLDivElement>(null);
  const [openingInteractive, setOpeningInteractive] = useState(true);
  const [invitationVisible, setInvitationVisible] = useState(false);

  const handleAboutClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      textileCopyOne.current?.scrollIntoView({ block: "start" });
    } else if (experience.current) {
      scrollToAboutChapter(experience.current);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => {
        setOpeningInteractive(true);
        setInvitationVisible(true);
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
            setOpeningInteractive(self.progress < 0.25);
            setInvitationVisible(self.progress > 0.87);
          },
        },
      });

      timeline
        .to(openingPaper.current, { yPercent: -104, duration: 0.26 }, 0)
        .fromTo(textileCopyOne.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.24)
        .to(textileCopyOne.current, { autoAlpha: 0, y: -10, duration: 0.08 }, 0.5)
        .fromTo(textileCopyTwo.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.58)
        .to(textileCopyTwo.current, { autoAlpha: 0, y: -10, duration: 0.08 }, 0.8)
        .fromTo(finalPaper.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.87)
        .fromTo(invitationCopy.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08 }, 0.9);
    }, experience);

    let hashFrame = 0;
    if (window.location.hash === "#about") {
      hashFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (experience.current) {
          scrollToAboutChapter(experience.current);
        }
      });
    }

    return () => {
      window.cancelAnimationFrame(hashFrame);
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

          </div>
          <nav className="opening-paper-nav" aria-label="Opening navigation">
            <a href="#about" onClick={handleAboutClick} tabIndex={openingInteractive ? 0 : -1}>About</a>
            <Link href="/private-enquiry" tabIndex={openingInteractive ? 0 : -1}>Private Enquiry</Link>
          </nav>
        </div>

        <section id="about" ref={textileCopyOne} className="editorial-copy opening-copy textile-chapter" aria-labelledby="privacy-heading">
          <p className="eyebrow">Privacy is at the heart of what we do.</p>
          <h1 id="privacy-heading" className="collection-manager-heading homepage-editorial-heading">
            A private collection
            <br className="editorial-heading-break editorial-heading-break--mobile" />
            {" "}manager
            <br className="editorial-heading-break editorial-heading-break--desktop" />
            {" "}for
            <br className="editorial-heading-break editorial-heading-break--mobile" />
            {" "}valuable pieces
          </h1>
          <p className="body-copy">
            A valuable collection accumulates faster than the paperwork around it. Pieces move, values change, and
            the details end up spread across people and places.
          </p>
          <p className="body-copy body-copy-followup">
            Vaultier gives every piece a permanent, dynamic record and coordinates the valuers, insurers, restorers
            and specialists who work on it, so the collection is looked after without the collector having to.
          </p>
        </section>

        <section ref={textileCopyTwo} className="editorial-copy opening-copy textile-chapter" aria-labelledby="people-heading">
          <p className="eyebrow">For the people who look after it</p>
          <h2 id="people-heading" className="homepage-editorial-heading">
            Much of a collection
            <br className="editorial-heading-break editorial-heading-break--mobile" />
            {" "}is managed by
            <br className="editorial-heading-break editorial-heading-break--desktop" />
            {" "}someone
            <br className="editorial-heading-break editorial-heading-break--mobile" />
            {" "}trusted to hold it together
          </h2>
          <p className="body-copy">
            Vaultier is built for them too: trustees, personal assistants and family offices who keep a collection in
            order on the collector&apos;s behalf, with the access they need and nothing they don&apos;t.
          </p>
        </section>

        <div ref={finalPaper} className={`final-paper${invitationVisible ? " is-active" : ""}`} aria-hidden={!invitationVisible}>
          <div ref={invitationCopy} className="editorial-copy invitation-copy">
            <p className="eyebrow">How we work</p>
            <h2 className="homepage-editorial-heading">
              Vaultier&apos;s technology
              <br className="editorial-heading-break editorial-heading-break--mobile" />
              {" "}monitors and
              <br className="editorial-heading-break" />
              {" "}manages the collection
            </h2>
            <p className="body-copy final-body-copy">
              The team provides the judgement and discretion that technology cannot. Membership is by application.
              Vaultier accepts a limited number of collections so each is looked after properly.
            </p>
            <Link href="/private-enquiry" className="invitation-link" tabIndex={invitationVisible ? 0 : -1}>
              <span>Enquire Privately</span>
            </Link>
          </div>
          <nav className="final-paper-nav" aria-label="Website navigation">
            <Link href="/privacy" tabIndex={invitationVisible ? 0 : -1}>Privacy</Link>
            <Link href="/terms" tabIndex={invitationVisible ? 0 : -1}>Terms</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
