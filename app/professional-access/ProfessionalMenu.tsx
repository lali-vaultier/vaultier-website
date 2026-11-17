"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProfessionalMenu() {
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuDrawer = useRef<HTMLElement>(null);
  const menuCloseButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = (restoreFocus = false) => {
    if (restoreFocus) {
      menuButton.current?.focus();
    }

    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => menuCloseButton.current?.focus());

    document.body.style.overflow = "hidden";

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        menuButton.current?.focus();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = menuDrawer.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <button
        ref={menuButton}
        type="button"
        className="opening-menu-trigger professional-menu-trigger"
        aria-expanded={menuOpen}
        aria-controls="professional-menu-drawer"
        onClick={() => setMenuOpen(true)}
      >
        Menu <span aria-hidden="true">+</span>
      </button>

      <button
        type="button"
        className={`opening-menu-scrim${menuOpen ? " is-open" : ""}`}
        aria-label="Close menu"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => closeMenu(true)}
      />

      <aside
        id="professional-menu-drawer"
        ref={menuDrawer}
        className={`opening-menu-drawer${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Website menu"
        aria-hidden={!menuOpen}
      >
        <button
          ref={menuCloseButton}
          type="button"
          className="opening-menu-close"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => closeMenu(true)}
        >
          Close <span aria-hidden="true">−</span>
        </button>

        <nav className="opening-menu-links" aria-label="Website navigation">
          <Link
            href="/private-client-access"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => closeMenu(true)}
          >
            <span>Private Client Access</span>
            <span className="opening-menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/professional-access"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => closeMenu(true)}
          >
            <span>Professional Access</span>
            <span className="opening-menu-arrow" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/private-enquiry"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => closeMenu(true)}
          >
            <span>Private Enquiry</span>
            <span className="opening-menu-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
