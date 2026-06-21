import type { Metadata } from "next";

export function generatePrivacyMetadata(): Metadata {
  return {
    title: "Privacy Policy",
    description:
      "How JammerShop handles your data when you order via PayPal and Discord.",
  };
}

export function generateTermsMetadata(): Metadata {
  return {
    title: "Terms of Sale & Use",
    description:
      "Terms for purchasing jammers and DIY tutorials from JammerShop.",
  };
}

export function generateRefundsMetadata(): Metadata {
  return {
    title: "Refund Policy",
    description:
      "Refund policy for physical jammers and digital DIY tutorials.",
  };
}
