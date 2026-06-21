import type { Metadata } from "next";

const SITE_NAME = "JammerShop";

function legalPageMetadata(title: string, description: string): Metadata {
  const ogTitle = `${title} – ${SITE_NAME}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export function generatePrivacyMetadata(): Metadata {
  return legalPageMetadata(
    "Privacy Policy",
    "How JammerShop handles your data when you order via PayPal and Discord.",
  );
}

export function generateTermsMetadata(): Metadata {
  return legalPageMetadata(
    "Terms of Sale & Use",
    "Terms for purchasing jammers and DIY tutorials from JammerShop.",
  );
}

export function generateRefundsMetadata(): Metadata {
  return legalPageMetadata(
    "Refund Policy",
    "Refund policy for physical jammers and digital DIY tutorials.",
  );
}
