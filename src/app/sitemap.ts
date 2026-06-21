import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

const ROUTES = ["/", "/privacy", "/terms", "/refunds"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return ROUTES.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.5,
  }));
}
