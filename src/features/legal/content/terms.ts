import type { LegalDocument } from "./types";

export const TERMS_DOCUMENT: LegalDocument = {
  slug: "terms",
  title: "Terms of Sale & Use",
  description: "Terms for purchasing from JammerShop.",
  lastUpdated: "2026-06-21",
  sections: [
    {
      id: "educational-use",
      title: "Educational and testing use only",
      paragraphs: [
        "All products and tutorials sold on JammerShop are intended solely for educational purposes, laboratory testing, and authorized research in environments where such use is legal.",
        "You must not use our products to interfere with communications, networks, or devices without explicit legal authorization.",
      ],
    },
    {
      id: "local-laws",
      title: "Your responsibility",
      paragraphs: [
        "Radio-frequency jammers and similar devices are illegal or restricted in many countries and regions. By purchasing, you confirm that you have verified the laws in your jurisdiction and accept full responsibility for compliance.",
        "JammerShop does not provide legal advice. If you are unsure whether you may possess or use these devices, do not order.",
      ],
    },
    {
      id: "age-requirement",
      title: "Age requirement",
      paragraphs: [
        "You must be at least 18 years old, or the age of majority in your jurisdiction, to purchase from JammerShop.",
      ],
    },
    {
      id: "prohibited-use",
      title: "Prohibited use",
      paragraphs: [
        "You may not use our products or tutorials for unlawful interference, harassment, theft of service, evasion of law enforcement, or any malicious purpose.",
        "Unauthorized resale or redistribution of digital tutorials is prohibited unless explicitly permitted in writing.",
      ],
    },
    {
      id: "products",
      title: "Products",
      paragraphs: [
        "Pre-built jammers are physical devices shipped after payment verification. DIY tutorials are digital guides delivered via Discord after payment verification.",
        "Specifications on the product pages are approximate and may vary slightly between batches.",
      ],
    },
    {
      id: "ordering",
      title: "Ordering process",
      paragraphs: [
        "Orders are placed by sending payment via PayPal to the email listed on the site, then opening a ticket on our Discord server with payment proof.",
        "No ticket means no delivery. We do not process orders received only by email or direct message without a Discord ticket.",
        "Alternative payment methods (crypto, bank transfer) may be discussed in a Discord ticket but are not guaranteed.",
      ],
    },
    {
      id: "shipping-restrictions",
      title: "Shipping restrictions",
      paragraphs: [
        "We ship worldwide where legally permitted. Some countries prohibit import or possession of jammers. It is your duty to confirm eligibility before ordering.",
        "We may refuse or cancel orders to restricted destinations. Shipping fees are non-refundable if delivery fails due to customs or local law.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      paragraphs: [
        "Products and tutorials are provided as-is without warranty of fitness for a particular purpose. JammerShop is not liable for fines, seizures, injuries, or damages arising from your use or misuse of our products.",
        "Our maximum liability for any order is limited to the amount you paid for that order.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      paragraphs: [
        "We may update these terms at any time. The date at the top of this page indicates the last revision. Continued use of the site or new orders after changes constitutes acceptance.",
      ],
    },
  ],
};
