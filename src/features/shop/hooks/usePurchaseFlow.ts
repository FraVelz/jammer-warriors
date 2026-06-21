"use client";

import { useCallback, useRef, useState } from "react";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type { PurchaseItem } from "@/features/shop/types/purchase";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToDiscordTicket() {
  const target = document.getElementById("discord-ticket");
  target?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
  target?.focus({ preventScroll: true });
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

  const openProductPurchase = useCallback(
    (product: Product) => {
      const { deliveryFee } = getSiteConfig();
      rememberTrigger();
      setTermsAccepted(false);
      setItem({
        kind: "product",
        name: product.name,
        price: product.price,
        total: product.price + deliveryFee,
        includesDelivery: true,
      });
      queueMicrotask(() => dialogRef.current?.showModal());
    },
    [rememberTrigger],
  );

  const openDiyPurchase = useCallback(
    (tutorial: DiyTutorial) => {
      rememberTrigger();
      setTermsAccepted(false);
      setItem({
        kind: "diy",
        name: tutorial.name,
        price: tutorial.price,
        total: tutorial.price,
        includesDelivery: false,
      });
      queueMicrotask(() => dialogRef.current?.showModal());
    },
    [rememberTrigger],
  );

  const confirmAndScroll = useCallback(() => {
    if (!termsAccepted) return;
    closePurchase({ restoreFocus: false });
    queueMicrotask(() => scrollToDiscordTicket());
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
