import type { LegalDocument } from "./types";

export const PRIVACY_DOCUMENT: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  description: "How JammerShop handles your information.",
  lastUpdated: "2026-06-21",
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        "JammerShop is a small storefront for educational jammers and DIY tutorials. We collect " +
          "only the information needed to process your order and deliver your product.",
        "We do not sell your personal data to third parties.",
      ],
    },
    {
      id: "data-collected",
      title: "Information we collect",
      paragraphs: [
        "When you purchase via PayPal, PayPal processes your payment and may share your name, " +
          "email, and transaction ID with us as the seller.",
        "When you pay via Stripe Checkout, Stripe processes your card payment and may share your " +
          "name, email, and payment reference with us. Card details are handled by Stripe and are " +
          "not stored on our servers.",
        "When you open a Discord ticket, we receive your Discord username, messages, and any " +
          "payment proof (screenshots) or Stripe Session IDs you provide.",
        "If Vercel Analytics is enabled on this site, anonymous usage data (pages visited, " +
          "browser type, country) may be collected. We do not use advertising trackers.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      paragraphs: [
        "This site may use essential cookies required for basic functionality. Analytics " +
          "cookies, if used, are described above and are not used for targeted advertising.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      paragraphs: [
        "PayPal — payment processing. See PayPal's privacy policy at paypal.com.",
        "Stripe — card payment processing. See Stripe's privacy policy at stripe.com.",
        "Discord — support tickets and delivery coordination. See Discord's privacy policy at " +
          "discord.com.",
        "Vercel — hosting and optional analytics. See vercel.com/legal/privacy-policy.",
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      paragraphs: [
        "Order-related messages and payment proof in Discord tickets are kept as long as needed " +
          "to fulfill orders, handle disputes, and comply with applicable law. You may request " +
          "deletion after your order is complete.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "Depending on your jurisdiction, you may have the right to access, correct, or delete " +
          "personal data we hold. Contact us via Discord ticket or the PayPal email listed on " +
          "the shop to submit a request.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "For privacy questions, open a ticket on our Discord server or email the PayPal address " +
          "shown on the homepage.",
      ],
    },
  ],
};
