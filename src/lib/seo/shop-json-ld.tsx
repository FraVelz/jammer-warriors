import { DIY_TUTORIALS } from "@/features/shop/data/diy-tutorials";
import { PRODUCTS } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import { getSiteUrl } from "@/lib/seo/site-url";

export function ShopJsonLd() {
  const base = getSiteUrl();
  const { deliveryFee } = getSiteConfig();
  const catalogUrl = `${base}/#products`;
  const diyUrl = `${base}/#diy`;

  const productItems = PRODUCTS.map((product, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    item: {
      "@type": "Product" as const,
      name: product.name,
      url: catalogUrl,
      offers: {
        "@type": "Offer" as const,
        price: product.price + deliveryFee,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: catalogUrl,
      },
    },
  }));

  const tutorialItems = DIY_TUTORIALS.map((tutorial, index) => ({
    "@type": "ListItem" as const,
    position: PRODUCTS.length + index + 1,
    item: {
      "@type": "Product" as const,
      name: tutorial.name,
      url: diyUrl,
      offers: {
        "@type": "Offer" as const,
        price: tutorial.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: diyUrl,
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
        "@type": "WebSite",
        name: "JammerShop",
        url: base,
      },
      {
        "@type": "ItemList",
        url: catalogUrl,
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
