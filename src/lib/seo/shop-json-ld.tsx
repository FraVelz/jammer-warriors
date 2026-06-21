import { DIY_TUTORIALS } from "@/features/shop/data/diy-tutorials";
import { PRODUCTS } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import { getSiteUrl } from "@/lib/seo/site-url";

export function ShopJsonLd() {
  const base = getSiteUrl();
  const { deliveryFee } = getSiteConfig();

  const productItems = PRODUCTS.map((product, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    item: {
      "@type": "Product" as const,
      name: product.name,
      offers: {
        "@type": "Offer" as const,
        price: product.price + deliveryFee,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  }));

  const tutorialItems = DIY_TUTORIALS.map((tutorial, index) => ({
    "@type": "ListItem" as const,
    position: PRODUCTS.length + index + 1,
    item: {
      "@type": "Product" as const,
      name: tutorial.name,
      offers: {
        "@type": "Offer" as const,
        price: tutorial.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "JammerShop",
        url: base,
      },
      {
        "@type": "ItemList",
        itemListElement: [...productItems, ...tutorialItems],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
