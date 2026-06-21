import { generateShopMetadata } from "@/lib/seo/metadata";
import { ShopJsonLd } from "@/lib/seo/shop-json-ld";
import { ShopPage } from "@/features/shop/pages/ShopPage";

export const generateMetadata = generateShopMetadata;

export default function HomePage() {
  return (
    <>
      <ShopJsonLd />
      <ShopPage />
    </>
  );
}
