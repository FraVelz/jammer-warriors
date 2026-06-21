import { DIY_TUTORIALS } from "@/features/shop/data/diy-tutorials";
import { PRODUCTS } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import { getSiteUrl } from "@/lib/seo/site-url";

export function ShopJsonLd() {
  const base = getSiteUrl();
  const { deliveryFee } = getSiteConfig();
  const catalogUrl = `${base}/#products`;

  const productItems = PRODUCTS.map((product, index) => {
    const productUrl = `${base}/#product-${product.id}`;

    return {
      "@type": "ListItem" as const,
      position: index + 1,
      item: {
        "@type": "Product" as const,
        name: product.name,
        url: productUrl,
        offers: {
          "@type": "Offer" as const,
          price: product.price + deliveryFee,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: productUrl,
        },
      },
    };
  });

  const tutorialItems = DIY_TUTORIALS.map((tutorial, index) => {
    const tutorialUrl = `${base}/#diy-${tutorial.id}`;

    return {
      "@type": "ListItem" as const,
      position: PRODUCTS.length + index + 1,
      item: {
        "@type": "Product" as const,
        name: tutorial.name,
        url: tutorialUrl,
        offers: {
          "@type": "Offer" as const,
          price: tutorial.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: tutorialUrl,
        },
      },
    };
  });

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
