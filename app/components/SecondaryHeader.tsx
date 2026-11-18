import Link from "next/link";
import ProfessionalMenu from "../professional-access/ProfessionalMenu";

export default function SecondaryHeader() {
  return (
    <header className="secondary-header">
      <Link href="/" className="legal-home-link" aria-label="Go to the Vaultier home page">
        <span aria-hidden="true">←</span>
        Home
      </Link>
      <ProfessionalMenu />
    </header>
  );
}
