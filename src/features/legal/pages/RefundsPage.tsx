import { LegalPageLayout } from "@/features/legal/components/LegalPageLayout";
import { REFUNDS_DOCUMENT } from "@/features/legal/content/refunds";

export function RefundsPage() {
  return <LegalPageLayout document={REFUNDS_DOCUMENT} />;
}
