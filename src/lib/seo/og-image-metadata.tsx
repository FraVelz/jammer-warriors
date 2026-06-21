import { ImageResponse } from "next/og";
import { OgImage } from "./og-image";
import { OgImageLegal } from "./og-image-legal";

export const ogImageAlt = "JammerShop – Real Jammers & DIY";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function createOgImageResponse() {
  return new ImageResponse(<OgImage />, {
    ...ogImageSize,
  });
}

export function createLegalOgImageResponse(title: string, description: string) {
  return new ImageResponse(
    <OgImageLegal title={title} description={description} />,
    {
      ...ogImageSize,
    },
  );
}
