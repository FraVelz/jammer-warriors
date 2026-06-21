import {
  createLegalOgImageResponse,
  ogImageContentType,
  ogImageSize,
} from "@/lib/seo/og-image-metadata";

export const alt = "JammerShop Refund Policy";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function RefundsOpenGraphImage() {
  return createLegalOgImageResponse(
    "Refund Policy",
    "Refund policy for physical jammers and digital DIY tutorials.",
  );
}
