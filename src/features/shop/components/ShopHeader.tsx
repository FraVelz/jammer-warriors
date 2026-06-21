import Link from "next/link";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "#products", label: "products" },
  { href: "#diy", label: "diy" },
  { href: "#delivery", label: "delivery" },
  { href: "#contact", label: "contact" },
] as const;

const NAV_LINK_CLASS =
  "js-nav-link text-sm text-[#aaa] transition-colors hover:text-js-accent";

export function ShopHeader() {
  return (
    <header className="border-js-accent mb-10 flex flex-wrap items-start justify-between gap-4 border-b-2 pb-5">
      <div>
        <h1 className="text-js-accent flex items-center gap-2 text-[28px] tracking-tight">
          <Icon name="antenna" size={28} className="text-js-accent" />
          <span>
            <span className="text-js-danger">Jammer</span>Shop
          </span>
        </h1>
        <p className="mt-1 text-sm text-[#777]">
          real devices • real tutorials • no bullshit
        </p>
      </div>
      <nav className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className={NAV_LINK_CLASS}>
            {label}
          </Link>
        ))}
        <Link href="/terms" className={NAV_LINK_CLASS}>
          legal
        </Link>
      </nav>
    </header>
  );
}

export function ShopHeaderCompact({ className }: { className?: string }) {
  return (
    <div className={cn("border-js-border mb-8 border-b pb-4", className)}>
      <Link
        href="/"
        className="text-js-accent inline-flex items-center gap-2 hover:underline"
      >
        <Icon name="antenna" size={20} />
        <span className="text-lg font-bold tracking-tight">JammerShop</span>
      </Link>
    </div>
  );
}
