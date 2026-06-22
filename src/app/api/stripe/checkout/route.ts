import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/features/shop/lib/create-checkout-session";
import { isStripeConfigured } from "@/lib/env/server-env";
import { enforceRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import type { PurchaseKind } from "@/features/shop/types/purchase";

type CheckoutBody = {
  kind?: unknown;
  skuId?: unknown;
};

function isPurchaseKind(value: unknown): value is PurchaseKind {
  return value === "product" || value === "diy";
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe checkout is not available" },
      { status: 503 },
    );
  }

  const rateLimit = await enforceRateLimit(
    request,
    "stripe-checkout",
    10,
    15 * 60 * 1000,
  );
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many checkout attempts. Please wait a few minutes." },
      { status: 429, headers: rateLimitHeaders(rateLimit) },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { kind, skuId } = body;

  if (!isPurchaseKind(kind) || typeof skuId !== "string" || !skuId.trim()) {
    return NextResponse.json(
      { error: "kind and skuId are required" },
      { status: 400 },
    );
  }

  const result = await createCheckoutSession({ kind, skuId: skuId.trim() });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({ url: result.url });
}
