"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

function NavLinks({ className, linkClassName, onNavigate }: NavLinksProps) {
  const linkClass = cn(NAV_LINK_CLASS, linkClassName);

  return (
    <div className={className}>
      {NAV_LINKS.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass} onClick={onNavigate}>
          {label}
        </Link>
      ))}
      <Link href="/terms" className={linkClass} onClick={onNavigate}>
        legal
      </Link>
    </div>
  );
}

export function ShopHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="border-js-accent mb-10 border-b-2 pb-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
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

        <nav
          className="hidden shrink-0 items-center gap-5 sm:flex"
          aria-label="Main"
        >
          <NavLinks className="flex items-center gap-5" />
        </nav>

        <button
          type="button"
          className="border-js-border text-js-text-muted hover:border-js-accent hover:text-js-accent flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded border sm:hidden"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Open menu"
        >
          <Icon name="menu" size={20} />
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/70 sm:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav"
            className="border-js-border bg-js-bg-card fixed top-0 right-0 z-50 flex h-full w-[min(280px,85vw)] flex-col border-l p-5 shadow-xl sm:hidden"
            aria-label="Main"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-js-accent text-sm font-bold tracking-wide uppercase">
                menu
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="text-js-text-dim hover:text-white"
                aria-label="Close menu"
              >
                <Icon name="x" size={20} />
              </button>
            </div>
            <NavLinks
              className="flex flex-col gap-1"
              linkClassName="rounded px-2 py-3 text-base"
              onNavigate={closeMenu}
            />
          </nav>
        </>
      ) : null}
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
