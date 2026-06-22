import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { DiscordInviteLink } from "@/features/shop/components/DiscordInviteLink";
import { getSiteConfig } from "@/features/shop/data/site-config";

export function ContactSection({
  stripeEnabled,
  discordInvite,
}: {
  stripeEnabled: boolean;
  discordInvite: string | null;
}) {
  const { paypalEmail } = getSiteConfig();

  return (
    <section id="contact" className="js-contact-section">
      <p className="text-js-text-muted flex items-start gap-2 text-[15px]">
        <Icon name="message-circle" size={18} className="mt-0.5 shrink-0" />
        <span>
          questions? orders? support?
          <br />
          join our{" "}
          <DiscordInviteLink invite={discordInvite} className="js-text-link">
            Discord server
          </DiscordInviteLink>{" "}
          – we reply within hours.
        </span>
      </p>
      <p className="text-js-text-faint mt-2 flex items-center gap-2 text-sm">
        <Icon name="mail" size={16} />
        PayPal: <strong className="text-js-accent">{paypalEmail}</strong>
        {stripeEnabled && (
          <>
            {" · "}
            <Icon name="plug" size={16} />
            Stripe at checkout
          </>
        )}
      </p>
    </section>
  );
}

export function ShopFooter() {
  return (
    <footer className="js-footer">
      <p>© 2026 JammerShop – real devices, real tutorials</p>
      <p className="js-footer-note">
        <Icon name="triangle-alert" size={14} />
        <span>
          for educational & testing use only.
          <br />
          you are solely responsible for compliance with local laws.
        </span>
      </p>
      <p className="mt-2">
        <Link href="/privacy" className="js-text-link">
          privacy
        </Link>
        {" · "}
        <Link href="/terms" className="js-text-link">
          terms
        </Link>
        {" · "}
        <Link href="/refunds" className="js-text-link">
          refunds
        </Link>
      </p>
    </footer>
  );
}
