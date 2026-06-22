import { connection } from "next/server";
import { generateShopMetadata } from "@/lib/seo/metadata";
import { ShopJsonLd } from "@/lib/seo/shop-json-ld";
import { ShopPage } from "@/features/shop/pages/ShopPage";
import { isStripeConfigured } from "@/lib/env/server-env";

export const generateMetadata = generateShopMetadata;

export default async function HomePage() {
  await connection();
  const stripeEnabled = isStripeConfigured();

  return (
    <>
      <ShopJsonLd />
      <ShopPage stripeEnabled={stripeEnabled} />
    </>
  );
}
