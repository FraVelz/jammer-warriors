import Link from "next/link";
import { Icon } from "@/components/icons";
import type { LegalDocument, LegalSlug } from "@/features/legal/content/types";
import { ShopHeaderCompact } from "@/features/shop/components/ShopHeader";

const CROSS_LINKS: Record<LegalSlug, { href: string; label: string }[]> = {
  privacy: [
    { href: "/terms", label: "Terms of Sale" },
    { href: "/refunds", label: "Refund Policy" },
  ],
  terms: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/refunds", label: "Refund Policy" },
  ],
  refunds: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Sale" },
  ],
};

type LegalSectionProps = {
  section: LegalDocument["sections"][number];
};

function LegalSectionBlock({ section }: LegalSectionProps) {
  return (
    <section id={section.id} className="scroll-mt-6">
      <h2 className="text-js-accent mb-3 text-xl">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-js-text-muted mb-3">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

type LegalCrossLinksProps = {
  slug: LegalSlug;
};

export function LegalCrossLinks({ slug }: LegalCrossLinksProps) {
  const links = CROSS_LINKS[slug];
  return (
    <nav
      aria-label="Related legal pages"
      className="border-js-border text-js-text-dim mt-10 border-t pt-6 text-sm"
    >
      See also:{" "}
      {links.map((link, i) => (
        <span key={link.href}>
          {i > 0 ? " · " : ""}
          <Link href={link.href} className="text-js-accent hover:underline">
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

type LegalPageLayoutProps = {
  document: LegalDocument;
  children?: React.ReactNode;
};

export function LegalPageLayout({ document }: LegalPageLayoutProps) {
  return (
    <main className="mx-auto max-w-3xl">
      <ShopHeaderCompact />
      <Link
        href="/"
        className="text-js-accent mb-6 inline-flex items-center gap-2 text-sm hover:underline"
      >
        <Icon name="arrow-left" size={16} />
        back to shop
      </Link>
      <header className="border-js-border mb-8 border-b pb-6">
        <h1 className="text-3xl text-white">{document.title}</h1>
        <p className="text-js-text-dim mt-2 text-sm">
          Last updated: {document.lastUpdated}
        </p>
        <p className="text-js-text-muted mt-2">{document.description}</p>
      </header>

      <nav
        aria-label="On this page"
        className="border-js-border bg-js-bg-card mb-8 rounded border p-4 text-sm"
      >
        <p className="text-js-accent mb-2 font-bold">On this page</p>
        <ul className="space-y-1">
          {document.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-js-text-muted hover:text-js-accent hover:underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-10">
        {document.sections.map((section) => (
          <LegalSectionBlock key={section.id} section={section} />
        ))}
      </div>

      <LegalCrossLinks slug={document.slug} />
    </main>
  );
}
