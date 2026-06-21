import {
  createLegalOgImageResponse,
  ogImageContentType,
  ogImageSize,
} from "@/lib/seo/og-image-metadata";

export const alt = "JammerShop Terms of Sale & Use";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TermsOpenGraphImage() {
  return createLegalOgImageResponse(
    "Terms of Sale & Use",
    "Terms for purchasing jammers and DIY tutorials from JammerShop.",
  );
}
