import { LegalPageLayout } from "@/features/legal/components/LegalPageLayout";
import { PRIVACY_DOCUMENT } from "@/features/legal/content/privacy";

export function PrivacyPage() {
  return <LegalPageLayout document={PRIVACY_DOCUMENT} />;
}
