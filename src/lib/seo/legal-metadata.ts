import type { Metadata } from "next";

const SITE_NAME = "JammerShop";

function legalPageMetadata(
  title: string,
  description: string,
  path: `/${string}`,
): Metadata {
  const ogTitle = `${title} – ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
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
    "How JammerShop handles your data when you order via PayPal, Stripe, or Discord.",
    "/privacy",
  );
}

export function generateTermsMetadata(): Metadata {
  return legalPageMetadata(
    "Terms of Sale & Use",
    "Terms for purchasing jammers and DIY tutorials from JammerShop.",
    "/terms",
  );
}

export function generateRefundsMetadata(): Metadata {
  return legalPageMetadata(
    "Refund Policy",
    "Refund policy for physical jammers and digital DIY tutorials.",
    "/refunds",
  );
}
