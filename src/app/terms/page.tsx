import { TermsPage } from "@/features/legal/pages/TermsPage";
import { generateTermsMetadata } from "@/lib/seo/legal-metadata";

export const generateMetadata = generateTermsMetadata;

export default function TermsRoute() {
  return <TermsPage />;
}
