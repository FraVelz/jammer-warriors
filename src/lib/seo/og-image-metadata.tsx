import { ImageResponse } from "next/og";
import { OgImage } from "./og-image";

export const ogImageAlt = "JammerShop – Real Jammers & DIY";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function createOgImageResponse() {
  return new ImageResponse(<OgImage />, {
    ...ogImageSize,
  });
}
