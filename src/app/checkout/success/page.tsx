import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { PageShell } from "@/components/layout/PageShell";
import { DiscordInviteLink } from "@/features/shop/components/DiscordInviteLink";
import { isStripeConfigured } from "@/lib/env/server-env";
import { getDiscordInvite } from "@/lib/site-settings/get-discord-invite";
import { getStripe } from "@/lib/stripe/server";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export const metadata = {
  title: "Payment successful",
  robots: { index: false, follow: false },
};

function formatEuros(amountCents: number | null | undefined): string {
  if (amountCents == null) return "—";
  return `€${(amountCents / 100).toFixed(2)}`;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId || !isStripeConfigured()) {
    notFound();
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    notFound();
  }

  let discordInvite: string | null = null;
  try {
    discordInvite = await getDiscordInvite();
  } catch {
    discordInvite = null;
  }
  const itemName = session.metadata?.itemName ?? "Your order";
  const kind = session.metadata?.kind;
  const isProduct = kind === "product";

  return (
    <PageShell width="legal">
      <div className="js-order-section">
        <h1 className="text-js-accent mb-3 flex items-center justify-center gap-2 text-2xl">
          <Icon name="shield" size={24} />
          Payment successful
        </h1>
        <p className="text-js-text-muted mb-4 text-center text-sm">
          Thank you! Your payment was confirmed by Stripe.
        </p>

        <div className="js-order-email-box mb-6">
          <div className="js-order-email-label">
            <Icon name="package" size={14} />
            Order summary
          </div>
          <p className="text-js-accent text-lg font-bold">{itemName}</p>
          <p className="text-js-text-muted mt-1 text-sm">
            Total paid:{" "}
            <strong className="text-js-accent">
              {formatEuros(session.amount_total)}
            </strong>
          </p>
        </div>

        <div className="border-js-border space-y-3 border-t pt-4 text-sm">
          <p className="text-js-danger font-bold">
            NEXT STEP — DISCORD TICKET:
          </p>
          <ol className="text-js-text-muted list-inside list-decimal space-y-2">
            <li>
              Join our Discord:{" "}
              <DiscordInviteLink
                invite={discordInvite}
                className="js-text-link break-all"
              >
                {discordInvite ?? "Discord invite not configured yet"}
              </DiscordInviteLink>
            </li>
            <li>Open a ticket</li>
            <li>
              Paste your Stripe Session ID:{" "}
              <code className="text-js-accent text-xs break-all">
                {sessionId}
              </code>
            </li>
            <li>
              {isProduct
                ? "We ship within 24h after verification"
                : "We send the tutorial within minutes after verification"}
            </li>
          </ol>

          <p className="text-js-danger-soft flex items-start gap-1">
            <Icon name="triangle-alert" size={16} className="mt-0.5 shrink-0" />
            <span>NO TICKET = NO {isProduct ? "DELIVERY" : "TUTORIAL"}</span>
          </p>
        </div>

        {discordInvite ? (
          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="js-btn-discord mt-6"
          >
            <Icon name="message-circle" size={20} />
            JOIN DISCORD & OPEN TICKET
          </a>
        ) : (
          <p className="text-js-text-dim mt-6 text-center text-sm">
            Discord invite not configured yet — contact support via PayPal email
            on the shop page.
          </p>
        )}

        <p className="text-js-text-dim mt-4 text-center text-sm">
          <Link href="/" className="js-text-link">
            Back to shop
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
