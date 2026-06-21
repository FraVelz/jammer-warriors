export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type LegalDocument = {
  slug: "privacy" | "terms" | "refunds";
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export type LegalSlug = LegalDocument["slug"];
