"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type { PurchaseItem } from "@/features/shop/types/purchase";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToOrderInstructions() {
  const section = document.getElementById("order-instruction");
  section?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  const discordCta = document.getElementById("discord-ticket");
  discordCta?.focus({ preventScroll: true });
}

export function usePurchaseFlow() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [item, setItem] = useState<PurchaseItem | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const rememberTrigger = useCallback(() => {
    const active = document.activeElement;
    triggerRef.current = active instanceof HTMLElement ? active : null;
  }, []);

  const restoreTriggerFocus = useCallback(() => {
    queueMicrotask(() => triggerRef.current?.focus());
  }, []);

  const closePurchase = useCallback(
    ({ restoreFocus = true }: { restoreFocus?: boolean } = {}) => {
      dialogRef.current?.close();
      setItem(null);
      setTermsAccepted(false);
      if (restoreFocus) restoreTriggerFocus();
    },
    [restoreTriggerFocus],
  );

  const openPurchase = useCallback(
    (nextItem: PurchaseItem) => {
      rememberTrigger();
      flushSync(() => {
        setTermsAccepted(false);
        setItem(nextItem);
      });

      const dialog = dialogRef.current;
      if (!dialog) return;

      if (!dialog.open) {
        dialog.showModal();
      }
    },
    [rememberTrigger],
  );

  const openProductPurchase = useCallback(
    (product: Product) => {
      const { deliveryFee } = getSiteConfig();
      openPurchase({
        kind: "product",
        name: product.name,
        price: product.price,
        total: product.price + deliveryFee,
        includesDelivery: true,
      });
    },
    [openPurchase],
  );

  const openDiyPurchase = useCallback(
    (tutorial: DiyTutorial) => {
      openPurchase({
        kind: "diy",
        name: tutorial.name,
        price: tutorial.price,
        total: tutorial.price,
        includesDelivery: false,
      });
    },
    [openPurchase],
  );

  const confirmAndScroll = useCallback(() => {
    if (!termsAccepted) return;
    closePurchase({ restoreFocus: false });
    queueMicrotask(() => scrollToOrderInstructions());
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
