import Link from "next/link";

export default function SiteFooter({ current }: { current: "privacy" | "terms" }) {
  return (
    <footer className="site-footer">
      <nav aria-label="Footer navigation">
        <Link href="/private-enquiry">Private Enquiry</Link>
        {current === "privacy" ? (
          <Link href="/terms">Terms of Use</Link>
        ) : (
          <Link href="/privacy">Privacy Policy</Link>
        )}
      </nav>
    </footer>
  );
}
