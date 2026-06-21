import { LegalPageLayout } from "@/features/legal/components/LegalPageLayout";
import { TERMS_DOCUMENT } from "@/features/legal/content/terms";

export function TermsPage() {
  return <LegalPageLayout document={TERMS_DOCUMENT} />;
}
