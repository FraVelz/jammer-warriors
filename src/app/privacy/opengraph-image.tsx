import {
  createLegalOgImageResponse,
  ogImageContentType,
  ogImageSize,
} from "@/lib/seo/og-image-metadata";

export const alt = "JammerShop Privacy Policy";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function PrivacyOpenGraphImage() {
  return createLegalOgImageResponse(
    "Privacy Policy",
    "How JammerShop handles your data when you order via PayPal, Stripe, or Discord.",
  );
}
