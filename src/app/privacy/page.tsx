import { PrivacyPage } from "@/features/legal/pages/PrivacyPage";
import { generatePrivacyMetadata } from "@/lib/seo/legal-metadata";

export const generateMetadata = generatePrivacyMetadata;

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
