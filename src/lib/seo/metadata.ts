import type { Metadata } from "next";

const SITE_NAME = "JammerShop";
const DEFAULT_TITLE = "Jammer Shop – Real Jammers & DIY";
const DEFAULT_DESCRIPTION =
  "Pre-built jammers and DIY tutorials. PayPal orders, Discord ticket delivery. Educational and testing use only.";
const SHOP_DESCRIPTION =
  "Real devices, real tutorials. Pre-built jammers and step-by-step DIY guides.";

function sharedOpenGraph(): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  };
}

function sharedTwitter(): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SHOP_DESCRIPTION,
  };
}

export function rootLayoutMetadata(): Metadata {
  return {
    title: {
      default: DEFAULT_TITLE,
      template: `%s – ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    openGraph: sharedOpenGraph(),
    twitter: sharedTwitter(),
  };
}

export function generateShopMetadata(): Metadata {
  return {
    title: DEFAULT_TITLE,
    description: SHOP_DESCRIPTION,
    openGraph: {
      ...sharedOpenGraph(),
      title: DEFAULT_TITLE,
      description: SHOP_DESCRIPTION,
    },
    twitter: {
      ...sharedTwitter(),
      title: DEFAULT_TITLE,
      description: SHOP_DESCRIPTION,
    },
  };
}
