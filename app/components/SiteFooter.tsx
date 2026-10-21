import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/" className="site-footer-mark" aria-label="Vaultier home">
        <Image src="/brand/vaultier-logomark.svg" alt="" width={32} height={32} />
      </Link>
      <nav aria-label="Footer navigation">
        <Link href="/private-enquiry">Private Enquiry</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
}
