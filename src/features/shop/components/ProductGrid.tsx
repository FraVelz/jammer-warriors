"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import { FeatureList } from "./FeatureList";

type ProductCardProps = {
  product: Product;
  onBuy: (product: Product) => void;
};

export function ProductCard({ product, onBuy }: ProductCardProps) {
  const { deliveryFee } = getSiteConfig();

  return (
    <article className="border-js-border bg-js-bg-card hover:border-js-accent rounded border p-6 transition-colors">
      <Icon name={product.icon} size={40} className="text-js-text mb-2" />
      <h2 className="text-xl text-white">{product.name}</h2>
      <p className="text-js-accent my-2 text-[26px] font-bold">
        €{product.price}{" "}
        <small className="text-js-text-faint text-sm font-normal">
          + €{deliveryFee} delivery
        </small>
      </p>
      <FeatureList items={product.features} className="my-4" />
      <button
        type="button"
        onClick={() => onBuy(product)}
        className="bg-js-accent text-js-bg hover:bg-js-accent-hover mt-2 inline-block cursor-pointer rounded-sm px-6 py-2.5 text-sm font-bold"
      >
        buy now
      </button>
    </article>
  );
}

type ProductGridProps = {
  products: Product[];
  onBuy: (product: Product) => void;
};

export function ProductGrid({ products, onBuy }: ProductGridProps) {
  return (
    <div
      id="products"
      className="mb-12 grid grid-cols-1 gap-5 sm:mb-14 sm:grid-cols-2 sm:gap-6"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} />
      ))}
    </div>
  );
}

export function ProductsSectionTitle() {
  return (
    <div className="mb-5">
      <h2 className="text-js-accent flex items-center gap-2">
        <Icon name="plug" size={24} />
        pre-built jammers (ready to use)
      </h2>
      <p className="text-js-text-dim mt-2 text-sm">
        Educational and testing use only.{" "}
        <Link href="/terms" className="text-js-accent hover:underline">
          Read terms
        </Link>
        .
      </p>
    </div>
  );
}
