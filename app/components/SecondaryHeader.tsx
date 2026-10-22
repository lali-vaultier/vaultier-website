import Link from "next/link";
import VltrEngravedMark from "./VltrEngravedMark";

export default function SecondaryHeader() {
  return (
    <header className="secondary-header">
      <Link href="/" className="secondary-header-mark" aria-label="Vaultier home">
        <VltrEngravedMark />
      </Link>
      <nav className="secondary-navigation" aria-label="Primary navigation">
        <Link href="/#about">About</Link>
      </nav>
    </header>
  );
}
