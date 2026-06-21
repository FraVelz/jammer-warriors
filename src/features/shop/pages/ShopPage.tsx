"use client";

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
import {
  ProductGrid,
  ProductsSectionTitle,
} from "@/features/shop/components/ProductGrid";
import { PurchaseModal } from "@/features/shop/components/PurchaseModal";
import { ShopHeader } from "@/features/shop/components/ShopHeader";
import { usePurchaseFlow } from "@/features/shop/hooks/usePurchaseFlow";

export function ShopPage() {
  const {
    item,
    termsAccepted,
    setTermsAccepted,
    openProductPurchase,
    openDiyPurchase,
    closePurchase,
    confirmAndScroll,
  } = usePurchaseFlow();

  return (
    <>
      <ShopHeader />
      <LegalWarning />
      <OrderInstructions />
      <ProductsSectionTitle />
      <ProductGrid products={PRODUCTS} onBuy={openProductPurchase} />
      <DeliveryNote />
      <DiySection tutorials={DIY_TUTORIALS} onBuy={openDiyPurchase} />
      <ContactSection />
      <ShopFooter />
      <PurchaseModal
        item={item}
        termsAccepted={termsAccepted}
        onTermsChange={setTermsAccepted}
        onClose={closePurchase}
        onConfirm={confirmAndScroll}
      />
    </>
  );
}
