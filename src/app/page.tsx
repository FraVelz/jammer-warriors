import { generateShopMetadata } from "@/lib/seo/metadata";
import { ShopPage } from "@/features/shop/pages/ShopPage";

export const generateMetadata = generateShopMetadata;

export default function HomePage() {
  return <ShopPage />;
}
