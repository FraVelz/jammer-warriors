import type { MetadataRoute } from "next";
import {
  LEGAL_SITEMAP_DATES,
  SHOP_LAST_UPDATED,
} from "@/lib/seo/sitemap-dates";
import { getSiteUrl } from "@/lib/seo/site-url";

const ROUTES = [
  {
    path: "/",
    lastModified: SHOP_LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/privacy",
    lastModified: LEGAL_SITEMAP_DATES.privacy,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    path: "/terms",
    lastModified: LEGAL_SITEMAP_DATES.terms,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    path: "/refunds",
    lastModified: LEGAL_SITEMAP_DATES.refunds,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return ROUTES.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
