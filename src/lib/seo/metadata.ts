import type { Metadata } from "next";

export function rootLayoutMetadata(): Metadata {
  return {
    title: {
      default: "Jammer Shop – Real Jammers & DIY",
      template: "%s – JammerShop",
    },
    description:
      "Pre-built jammers and DIY tutorials. PayPal orders, Discord ticket delivery. Educational and testing use only.",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
  };
}

export function generateShopMetadata(): Metadata {
  return {
    title: "Jammer Shop – Real Jammers & DIY",
    description:
      "Real devices, real tutorials. Pre-built jammers and step-by-step DIY guides.",
  };
}
