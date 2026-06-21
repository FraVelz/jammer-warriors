import { PRIVACY_DOCUMENT } from "@/features/legal/content/privacy";
import { REFUNDS_DOCUMENT } from "@/features/legal/content/refunds";
import { TERMS_DOCUMENT } from "@/features/legal/content/terms";

function latestDate(dates: string[]): string {
  return dates.sort((a, b) => b.localeCompare(a))[0]!;
}

/** Stable sitemap dates derived from content, not build time. */
export const SHOP_LAST_UPDATED = latestDate([
  PRIVACY_DOCUMENT.lastUpdated,
  TERMS_DOCUMENT.lastUpdated,
  REFUNDS_DOCUMENT.lastUpdated,
]);

export const LEGAL_SITEMAP_DATES = {
  privacy: PRIVACY_DOCUMENT.lastUpdated,
  terms: TERMS_DOCUMENT.lastUpdated,
  refunds: REFUNDS_DOCUMENT.lastUpdated,
} as const;
