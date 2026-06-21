"use client";

import { useCallback, useRef, useState } from "react";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type { PurchaseItem } from "@/features/shop/types/purchase";

function scrollToOrderInstructions() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.getElementById("order-instruction")?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

export function usePurchaseFlow() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<PurchaseItem | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const closePurchase = useCallback(() => {
    dialogRef.current?.close();
    setItem(null);
    setTermsAccepted(false);
  }, []);

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
    queueMicrotask(() => dialogRef.current?.showModal());
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
    queueMicrotask(() => dialogRef.current?.showModal());
  }, []);

  const confirmAndScroll = useCallback(() => {
    if (!termsAccepted) return;
    closePurchase();
    scrollToOrderInstructions();
  }, [termsAccepted, closePurchase]);

  return {
    dialogRef,
    item,
    termsAccepted,
    setTermsAccepted,
    openProductPurchase,
    openDiyPurchase,
    closePurchase,
    confirmAndScroll,
  };
}
