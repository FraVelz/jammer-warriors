"use client";

import { PageShell } from "@/components/layout/PageShell";
import { LegalWarning } from "@/features/legal/components/LegalWarning";
import { DIY_TUTORIALS } from "@/features/shop/data/diy-tutorials";
import { PRODUCTS } from "@/features/shop/data/products";
import {
  ContactSection,
  ShopFooter,
} from "@/features/shop/components/ShopFooter";
import { DeliveryNote } from "@/features/shop/components/DeliveryNote";
import { DiySection } from "@/features/shop/components/DiySection";
import { OrderInstructions } from "@/features/shop/components/OrderInstructions";
import { ProductGrid } from "@/features/shop/components/ProductGrid";
import { ProductsSectionTitle } from "@/features/shop/components/ProductsSectionTitle";
import { PurchaseModal } from "@/features/shop/components/PurchaseModal";
import { ShopHeader } from "@/features/shop/components/ShopHeader";
import { usePurchaseFlow } from "@/features/shop/hooks/usePurchaseFlow";

type ShopPageProps = {
  stripeEnabled: boolean;
  discordInvite: string;
};

export function ShopPage({ stripeEnabled, discordInvite }: ShopPageProps) {
  const {
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
    handleConfirm,
  } = usePurchaseFlow();

  return (
    <PageShell width="shop">
      <ShopHeader />
      <LegalWarning />
      <section
        id="products"
        aria-labelledby="products-heading"
        className="mb-12 sm:mb-14"
      >
        <ProductsSectionTitle />
        <ProductGrid products={PRODUCTS} onBuy={openProductPurchase} />
      </section>
      <DeliveryNote />
      <DiySection tutorials={DIY_TUTORIALS} onBuy={openDiyPurchase} />
      <OrderInstructions
        stripeEnabled={stripeEnabled}
        discordInvite={discordInvite}
      />
      <ContactSection
        stripeEnabled={stripeEnabled}
        discordInvite={discordInvite}
      />
      <ShopFooter />
      <PurchaseModal
        dialogRef={dialogRef}
        item={item}
        termsAccepted={termsAccepted}
        onTermsChange={setTermsAccepted}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        stripeEnabled={stripeEnabled}
        stripeLoading={stripeLoading}
        stripeError={stripeError}
        discordInvite={discordInvite}
        onClose={closePurchase}
        onConfirm={handleConfirm}
      />
    </PageShell>
  );
}
