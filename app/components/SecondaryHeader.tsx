import Image from "next/image";
import Link from "next/link";

export default function SecondaryHeader() {
  return (
    <header className="secondary-header">
      <Link href="/" className="secondary-header-mark" aria-label="Vaultier home">
        <Image src="/brand/vaultier-logomark.svg" alt="" width={44} height={44} priority />
      </Link>
      <nav className="secondary-navigation" aria-label="Primary navigation">
        <Link href="/about">About</Link>
        <Link href="/private-enquiry">Private Enquiry</Link>
      </nav>
    </header>
  );
}
