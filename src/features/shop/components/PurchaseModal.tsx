"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { getSiteConfig } from "@/features/shop/data/site-config";
import type { PurchaseItem } from "@/features/shop/types/purchase";

type PurchaseModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  item: PurchaseItem | null;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export function PurchaseModal({
  dialogRef,
  item,
  termsAccepted,
  onTermsChange,
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
  onClose: () => void;
  onConfirm: () => void;
};

function PurchaseModalContent({
  item,
  termsAccepted,
  onTermsChange,
  onClose,
  onConfirm,
}: PurchaseModalContentProps) {
  const { paypalEmail, discordInvite, deliveryFee } = getSiteConfig();
  const isProduct = item.kind === "product";

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

      <div className="border-js-border mt-4 space-y-3 border-t pt-4 text-sm">
        <p className="text-js-danger font-bold">PAYPAL ONLY:</p>
        <p className="text-js-text-muted flex items-center gap-2">
          <Icon name="mail" size={16} />
          Send €{item.total} to:{" "}
          <strong className="text-js-accent">{paypalEmail}</strong>
        </p>

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
          <li>Send your payment proof (screenshot)</li>
          <li>
            {isProduct
              ? "We ship within 24h"
              : "We send the tutorial within minutes"}
          </li>
        </ol>

        <p className="text-js-danger-soft flex items-start gap-2">
          <Icon name="triangle-alert" size={16} className="mt-0.5 shrink-0" />
          <span>
            NO TICKET = NO {isProduct ? "DELIVERY" : "TUTORIAL"}
            <br />
            For other payment methods, open a ticket.
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

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!termsAccepted}
          onClick={onConfirm}
          className={cn(
            "cursor-pointer rounded-sm px-6 py-2.5 text-sm font-bold",
            termsAccepted
              ? "bg-js-accent text-js-bg hover:bg-js-accent-hover"
              : "bg-js-btn-disabled-bg text-js-btn-disabled-text cursor-not-allowed",
          )}
        >
          I understand — show payment steps
        </button>
        <button type="button" onClick={onClose} className="js-btn-cancel">
          cancel
        </button>
      </div>
    </>
  );
}
