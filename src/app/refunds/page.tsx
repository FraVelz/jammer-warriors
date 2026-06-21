import { RefundsPage } from "@/features/legal/pages/RefundsPage";
import { generateRefundsMetadata } from "@/lib/seo/legal-metadata";

export const generateMetadata = generateRefundsMetadata;

export default function RefundsRoute() {
  return <RefundsPage />;
}
