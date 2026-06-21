import Link from "next/link";
import { Icon } from "@/components/icons";
import { getSiteConfig } from "@/features/shop/data/site-config";

export function ContactSection() {
  const { paypalEmail, discordInvite } = getSiteConfig();

  return (
    <section
      id="contact"
      className="border-js-border bg-js-bg-card mt-12 rounded border p-6"
    >
      <p className="text-js-text-muted flex items-start gap-2 text-[15px]">
        <Icon name="message-circle" size={18} className="mt-0.5 shrink-0" />
        <span>
          questions? orders? support?
          <br />
          join our{" "}
          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-js-accent hover:underline"
          >
            Discord server
          </a>{" "}
          – we reply within hours.
        </span>
      </p>
      <p className="text-js-text-faint mt-2 flex items-center gap-2 text-sm">
        <Icon name="mail" size={16} />
        PayPal: <strong className="text-js-accent">{paypalEmail}</strong>
      </p>
    </section>
  );
}

export function ShopFooter() {
  return (
    <footer className="mt-14 border-t border-[#222] pt-8 text-center text-[13px] text-[#555]">
      <p>© 2026 JammerShop – real devices, real tutorials</p>
      <p className="mt-2 flex items-center justify-center gap-2 text-xs text-[#444]">
        <Icon name="triangle-alert" size={14} />
        <span>
          for educational & testing use only.
          <br />
          you are solely responsible for compliance with local laws.
        </span>
      </p>
      <p className="mt-2">
        <Link href="/privacy" className="text-js-accent hover:underline">
          privacy
        </Link>
        {" · "}
        <Link href="/terms" className="text-js-accent hover:underline">
          terms
        </Link>
        {" · "}
        <Link href="/refunds" className="text-js-accent hover:underline">
          refunds
        </Link>
      </p>
    </footer>
  );
}
