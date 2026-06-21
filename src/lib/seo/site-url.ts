import { resolveSiteUrl } from "@/lib/env/public-env";

export function getSiteUrl(): string {
  return resolveSiteUrl();
}
