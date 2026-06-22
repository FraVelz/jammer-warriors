"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type {
  PaymentMethod,
  PurchaseItem,
} from "@/features/shop/types/purchase";

type PurchaseModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  item: PurchaseItem | null;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  stripeEnabled: boolean;
  stripeLoading: boolean;
  stripeError: string | null;
  discordInvite: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function PurchaseModal({
  dialogRef,
  item,
  termsAccepted,
  onTermsChange,
  paymentMethod,
  onPaymentMethodChange,
  stripeEnabled,
  stripeLoading,
  stripeError,
  discordInvite,
  onClose,
  onConfirm,
}: PurchaseModalProps) {
  const requestClose = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="js-modal-dialog"
      aria-labelledby="purchase-modal-title"
      onClose={onClose}
    >
      {item ? (
        <div className="js-modal-panel">
          <PurchaseModalContent
            item={item}
            termsAccepted={termsAccepted}
            onTermsChange={onTermsChange}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={onPaymentMethodChange}
            stripeEnabled={stripeEnabled}
            stripeLoading={stripeLoading}
            stripeError={stripeError}
            discordInvite={discordInvite}
            onClose={requestClose}
            onConfirm={onConfirm}
          />
        </div>
      ) : null}
    </dialog>
  );
}

type PurchaseModalContentProps = {
  item: PurchaseItem;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  stripeEnabled: boolean;
  stripeLoading: boolean;
  stripeError: string | null;
  discordInvite: string;
  onClose: () => void;
  onConfirm: () => void;
};

function PurchaseModalContent({
  item,
  termsAccepted,
  onTermsChange,
  paymentMethod,
  onPaymentMethodChange,
  stripeEnabled,
  stripeLoading,
  stripeError,
  discordInvite,
  onClose,
  onConfirm,
}: PurchaseModalContentProps) {
  const { paypalEmail, deliveryFee } = getSiteConfig();
  const isProduct = item.kind === "product";
  const isPaypal = paymentMethod === "paypal";

  return (
    <>
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2
          id="purchase-modal-title"
          className="flex items-center gap-2 text-xl text-white"
        >
          <Icon
            name={isProduct ? "package" : "wrench"}
            size={22}
            className="text-js-accent"
          />
          {item.name}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-js-text-dim cursor-pointer hover:text-white"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="text-js-text-muted space-y-2 text-sm">
        <p>
          Price: <strong className="text-js-accent">€{item.price}</strong>
        </p>
        {isProduct && (
          <p>
            Delivery: <strong className="text-js-accent">€{deliveryFee}</strong>
          </p>
        )}
        <p className="text-js-accent text-lg font-bold">TOTAL: €{item.total}</p>
      </div>

      {stripeEnabled && (
        <fieldset className="border-js-border mt-4 space-y-2 border-t pt-4">
          <legend className="text-js-text-muted text-sm font-bold">
            Payment method
          </legend>
          <label className="text-js-text-muted flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="payment-method"
              value="paypal"
              checked={isPaypal}
              onChange={() => onPaymentMethodChange("paypal")}
            />
            PayPal (manual transfer)
          </label>
          <label className="text-js-text-muted flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="payment-method"
              value="stripe"
              checked={!isPaypal}
              onChange={() => onPaymentMethodChange("stripe")}
            />
            Stripe (card)
          </label>
        </fieldset>
      )}

      <div className="border-js-border mt-4 space-y-3 border-t pt-4 text-sm">
        {isPaypal ? (
          <>
            <p className="text-js-danger font-bold">PAYPAL:</p>
            <p className="text-js-text-muted flex items-center gap-2">
              <Icon name="mail" size={16} />
              Send €{item.total} to:{" "}
              <strong className="text-js-accent">{paypalEmail}</strong>
            </p>
          </>
        ) : (
          <>
            <p className="text-js-danger font-bold">STRIPE CHECKOUT:</p>
            <p className="text-js-text-muted">
              You will be redirected to Stripe to pay €{item.total} securely by
              card. After payment, open a Discord ticket with your Session ID.
            </p>
          </>
        )}

        <p className="text-js-danger font-bold">AFTER PAYMENT:</p>
        <ol className="text-js-text-muted list-inside list-decimal space-y-1">
          <li>
            Join our Discord:{" "}
            <a
              href={discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="js-text-link break-all"
            >
              {discordInvite}
            </a>
          </li>
          <li>Open a ticket</li>
          <li>
            {isPaypal
              ? "Send your payment proof (screenshot)"
              : "Paste your Stripe Session ID from the success page"}
          </li>
          <li>
            {isProduct
              ? "We ship within 24h"
              : "We send the tutorial within minutes"}
          </li>
        </ol>

        <p className="text-js-danger-soft flex items-start gap-1">
          <Icon name="triangle-alert" size={16} className="mt-0.5 shrink-0" />
          <span>
            NO TICKET = NO {isProduct ? "DELIVERY" : "TUTORIAL"}
            {!stripeEnabled && (
              <>
                <br />
                For other payment methods, open a ticket.
              </>
            )}
          </span>
        </p>
      </div>

      <label className="text-js-text-muted mt-5 flex cursor-pointer items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(event) => onTermsChange(event.target.checked)}
          className="mt-1"
        />
        <span>
          I confirm I have read the{" "}
          <Link href="/terms" className="js-text-link">
            Terms
          </Link>{" "}
          and accept full responsibility for compliance with my local laws.
        </span>
      </label>

      {stripeError && (
        <p className="text-js-danger-soft mt-3 text-sm" role="alert">
          {stripeError}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!termsAccepted || stripeLoading}
          onClick={onConfirm}
          className={cn(
            "cursor-pointer rounded-sm px-6 py-2.5 text-sm font-bold",
            termsAccepted && !stripeLoading
              ? "bg-js-accent text-js-bg hover:bg-js-accent-hover"
              : "bg-js-btn-disabled-bg text-js-btn-disabled-text cursor-not-allowed",
          )}
        >
          {stripeLoading
            ? "Redirecting to Stripe…"
            : isPaypal
              ? "I understand — show payment steps"
              : "Pay with Stripe"}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={stripeLoading}
          className="js-btn-cancel"
        >
          cancel
        </button>
      </div>
    </>
  );
}
