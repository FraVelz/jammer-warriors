import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Payment cancelled",
  description: "Your Stripe checkout was cancelled. No charge was made.",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <PageShell width="legal">
      <div className="js-order-section text-center">
        <h1 className="text-js-accent mb-3 flex items-center justify-center gap-2 text-2xl">
          <Icon name="triangle-alert" size={24} />
          Payment cancelled
        </h1>
        <p className="text-js-text-muted mb-6 text-sm">
          Your Stripe checkout was cancelled. No charge was made.
        </p>
        <Link href="/" className="js-btn-discord inline-flex">
          <Icon name="arrow-left" size={18} />
          Back to shop
        </Link>
      </div>
    </PageShell>
  );
}
