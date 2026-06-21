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

export function ShopPage() {
  const {
    dialogRef,
    item,
    termsAccepted,
    setTermsAccepted,
    openProductPurchase,
    openDiyPurchase,
    closePurchase,
    confirmAndScroll,
  } = usePurchaseFlow();

  return (
    <PageShell width="shop">
      <ShopHeader />
      <LegalWarning />
      <ProductsSectionTitle />
      <ProductGrid products={PRODUCTS} onBuy={openProductPurchase} />
      <DeliveryNote />
      <DiySection tutorials={DIY_TUTORIALS} onBuy={openDiyPurchase} />
      <OrderInstructions />
      <ContactSection />
      <ShopFooter />
      <PurchaseModal
        dialogRef={dialogRef}
        item={item}
        termsAccepted={termsAccepted}
        onTermsChange={setTermsAccepted}
        onClose={closePurchase}
        onConfirm={confirmAndScroll}
      />
    </PageShell>
  );
}
