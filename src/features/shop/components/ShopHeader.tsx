"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "#products", label: "products" },
  { href: "#diy", label: "diy" },
  { href: "#delivery", label: "delivery" },
  { href: "#contact", label: "contact" },
] as const;

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

function NavLinks({ className, linkClassName, onNavigate }: NavLinksProps) {
  const linkClass = cn("js-nav-link", linkClassName);

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusable = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className="js-header-shop">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-js-accent flex items-center gap-2 text-[28px] tracking-tight">
            <Icon name="antenna" size={28} className="text-js-accent" />
            <span>
              <span className="text-js-danger">Jammer</span>Shop
            </span>
          </h1>
          <p className="text-js-text-tagline mt-1 text-sm">
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
          ref={menuButtonRef}
          type="button"
          className="js-btn-menu"
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
            className="js-mobile-nav-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            ref={panelRef}
            id="mobile-nav"
            className="js-mobile-nav-panel"
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
