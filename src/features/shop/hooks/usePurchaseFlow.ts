"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type {
  PaymentMethod,
  PurchaseItem,
} from "@/features/shop/types/purchase";

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

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
      setPaymentMethod("paypal");
      setStripeLoading(false);
      setStripeError(null);
      if (restoreFocus) restoreTriggerFocus();
    },
    [restoreTriggerFocus],
  );

  const openPurchase = useCallback(
    (nextItem: PurchaseItem) => {
      rememberTrigger();
      flushSync(() => {
        setTermsAccepted(false);
        setPaymentMethod("paypal");
        setStripeLoading(false);
        setStripeError(null);
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
        skuId: product.id,
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
        skuId: tutorial.id,
        name: tutorial.name,
        price: tutorial.price,
        total: tutorial.price,
        includesDelivery: false,
      });
    },
    [openPurchase],
  );

  const confirmAndScroll = useCallback(() => {
    if (!termsAccepted || paymentMethod !== "paypal") return;
    closePurchase({ restoreFocus: false });
    queueMicrotask(() => scrollToOrderInstructions());
  }, [termsAccepted, paymentMethod, closePurchase]);

  const confirmStripeCheckout = useCallback(async () => {
    if (!termsAccepted || !item || paymentMethod !== "stripe") return;

    setStripeLoading(true);
    setStripeError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: item.kind, skuId: item.skuId }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setStripeError(data.error ?? "Could not start Stripe checkout");
        setStripeLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setStripeError("Network error. Please try again.");
      setStripeLoading(false);
    }
  }, [termsAccepted, item, paymentMethod]);

  const handleConfirm = useCallback(() => {
    if (paymentMethod === "stripe") {
      void confirmStripeCheckout();
      return;
    }
    confirmAndScroll();
  }, [paymentMethod, confirmStripeCheckout, confirmAndScroll]);

  return {
    dialogRef,
    item,
    termsAccepted,
    setTermsAccepted,
    paymentMethod,
    setPaymentMethod,
    stripeLoading,
    stripeError,
    openProductPurchase,
    openDiyPurchase,
    closePurchase,
    confirmAndScroll,
    confirmStripeCheckout,
    handleConfirm,
  };
}
