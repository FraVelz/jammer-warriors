import type Stripe from "stripe";
import {
  resolvePurchase,
  UnknownSkuError,
} from "@/features/shop/lib/resolve-purchase";
import { getStripe } from "@/lib/stripe/server";
import { resolveSiteUrl } from "@/lib/env/public-env";
import type { PurchaseKind } from "@/features/shop/types/purchase";

export type CreateCheckoutSessionInput = {
  kind: PurchaseKind;
  skuId: string;
};

export type CreateCheckoutSessionResult =
  | { ok: true; url: string }
  | { ok: false; status: number; error: string };

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CreateCheckoutSessionResult> {
  let purchase;
  try {
    purchase = resolvePurchase(input.kind, input.skuId);
  } catch (error) {
    if (error instanceof UnknownSkuError) {
      return { ok: false, status: 400, error: error.message };
    }
    throw error;
  }

  const siteUrl = resolveSiteUrl();
  const stripe = getStripe();

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    purchase.lineItems.map((item) => ({
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: item.amountCents,
        product_data: {
          name: item.name,
        },
      },
    }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    metadata: {
      kind: purchase.kind,
      skuId: purchase.skuId,
      itemName: purchase.itemName,
    },
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
  });

  if (!session.url) {
    return {
      ok: false,
      status: 500,
      error: "Stripe did not return a checkout URL",
    };
  }

  return { ok: true, url: session.url };
}
