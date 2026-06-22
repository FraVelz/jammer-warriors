import type { LegalDocument } from "./types";

export const REFUNDS_DOCUMENT: LegalDocument = {
  slug: "refunds",
  title: "Refund Policy",
  description: "Refund policy for JammerShop orders.",
  lastUpdated: "2026-06-21",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "All refund requests must be submitted through a Discord ticket with your order details " +
          "and reason for the request.",
        "We review each case individually and respond within 48–72 hours when possible.",
      ],
    },
    {
      id: "physical-products",
      title: "Pre-built jammers (physical)",
      paragraphs: [
        "If your device arrives damaged or non-functional, contact us within 7 days of delivery " +
          "with photos and your ticket reference. We may offer repair, replacement, or partial " +
          "refund at our discretion.",
        "If you refuse delivery or fail to collect a shipment, shipping costs are not refundable.",
        "Returns may require return shipping at your expense if the product was delivered as " +
          "described.",
      ],
    },
    {
      id: "digital-tutorials",
      title: "DIY tutorials (digital)",
      paragraphs: [
        "Digital tutorials are delivered via Discord after payment verification. Once files or " +
          "links are sent, refunds are generally not available except where we failed to deliver " +
          "or sent incorrect materials.",
        "If you did not receive your tutorial within 24 hours of verified payment, open or " +
          "update your Discord ticket.",
      ],
    },
    {
      id: "non-refundable",
      title: "Non-refundable cases",
      paragraphs: [
        "Change of mind after digital delivery.",
        "Orders placed without opening a Discord ticket.",
        "Seizure or rejection by customs due to local laws.",
        "Damage caused by misuse, modification, or improper handling after delivery.",
      ],
    },
    {
      id: "process",
      title: "Refund process",
      paragraphs: [
        "Open or reopen your Discord ticket with the subject REFUND and include your PayPal " +
          "transaction ID or Stripe Session ID.",
        "If approved, refunds are issued to the original payment method (PayPal account or card " +
          "via Stripe). Processing time depends on the provider (typically 3–5 business days).",
      ],
    },
    {
      id: "timeline",
      title: "Response times",
      paragraphs: [
        "We aim to acknowledge refund requests within 48 hours and resolve them within 7 " +
          "business days. Complex cases may take longer.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "All refund communication happens through Discord tickets. See our Terms of Sale for the " +
          "full ordering process.",
      ],
    },
  ],
};
