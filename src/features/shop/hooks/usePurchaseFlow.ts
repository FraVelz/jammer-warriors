"use client";

import { useCallback, useState } from "react";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type { PurchaseItem } from "@/features/shop/types/purchase";

function scrollToOrderInstructions() {
  document.getElementById("order-instruction")?.scrollIntoView({
    behavior: "smooth",
  });
}

export function usePurchaseFlow() {
  const [item, setItem] = useState<PurchaseItem | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const openProductPurchase = useCallback((product: Product) => {
    const { deliveryFee } = getSiteConfig();
    setTermsAccepted(false);
    setItem({
      kind: "product",
      name: product.name,
      price: product.price,
      total: product.price + deliveryFee,
      includesDelivery: true,
    });
  }, []);

  const openDiyPurchase = useCallback((tutorial: DiyTutorial) => {
    setTermsAccepted(false);
    setItem({
      kind: "diy",
      name: tutorial.name,
      price: tutorial.price,
      total: tutorial.price,
      includesDelivery: false,
    });
  }, []);

  const closePurchase = useCallback(() => {
    setItem(null);
    setTermsAccepted(false);
  }, []);

  const confirmAndScroll = useCallback(() => {
    if (!termsAccepted) return;
    closePurchase();
    scrollToOrderInstructions();
  }, [termsAccepted, closePurchase]);

  return {
    item,
    termsAccepted,
    setTermsAccepted,
    openProductPurchase,
    openDiyPurchase,
    closePurchase,
    confirmAndScroll,
  };
}
