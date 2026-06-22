import { DIY_TUTORIALS } from "@/features/shop/data/diy-tutorials";
import { PRODUCTS } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type { PurchaseKind } from "@/features/shop/types/purchase";

export type ResolvedLineItem = {
  name: string;
  amountCents: number;
};

export type ResolvedPurchase = {
  kind: PurchaseKind;
  skuId: string;
  itemName: string;
  price: number;
  total: number;
  includesDelivery: boolean;
  lineItems: ResolvedLineItem[];
};

export class UnknownSkuError extends Error {
  constructor(kind: PurchaseKind, skuId: string) {
    super(`Unknown ${kind} sku: ${skuId}`);
    this.name = "UnknownSkuError";
  }
}

function eurosToCents(amount: number): number {
  return Math.round(amount * 100);
}

export function resolvePurchase(
  kind: PurchaseKind,
  skuId: string,
): ResolvedPurchase {
  const { deliveryFee } = getSiteConfig();

  if (kind === "product") {
    const product = PRODUCTS.find((entry) => entry.id === skuId);
    if (!product) {
      throw new UnknownSkuError(kind, skuId);
    }

    const lineItems: ResolvedLineItem[] = [
      { name: product.name, amountCents: eurosToCents(product.price) },
      { name: "Delivery", amountCents: eurosToCents(deliveryFee) },
    ];

    return {
      kind,
      skuId,
      itemName: product.name,
      price: product.price,
      total: product.price + deliveryFee,
      includesDelivery: true,
      lineItems,
    };
  }

  const tutorial = DIY_TUTORIALS.find((entry) => entry.id === skuId);
  if (!tutorial) {
    throw new UnknownSkuError(kind, skuId);
  }

  return {
    kind,
    skuId,
    itemName: tutorial.name,
    price: tutorial.price,
    total: tutorial.price,
    includesDelivery: false,
    lineItems: [
      { name: tutorial.name, amountCents: eurosToCents(tutorial.price) },
    ],
  };
}
