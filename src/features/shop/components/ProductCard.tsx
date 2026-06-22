"use client";

import { Icon } from "@/components/icons/Icon";
import type { Product } from "@/features/shop/data/products";
import { getSiteConfig } from "@/features/shop/data/site-config";
import { cn } from "@/lib/cn";
import { FeatureList } from "./FeatureList";

type ProductCardProps = {
  product: Product;
  onBuy: (product: Product) => void;
};

export function ProductCard({ product, onBuy }: ProductCardProps) {
  const { deliveryFee } = getSiteConfig();

  return (
    <article
      id={`product-${product.id}`}
      className={cn("js-card-interactive js-card-stack", "p-6")}
    >
      <Icon name={product.icon} size={40} className="text-js-text mb-2" />
      <h3 className="text-xl text-white">{product.name}</h3>
      <p className="text-js-accent my-2 text-[26px] font-bold">
        €{product.price}{" "}
        <small className="text-js-text-faint text-sm font-normal">
          + €{deliveryFee} delivery
        </small>
      </p>
      <FeatureList items={product.features} className="my-4 flex-1" />
      <button
        type="button"
        onClick={() => onBuy(product)}
        className="js-btn-buy"
        aria-label={`Buy ${product.name} for €${product.price} plus €${deliveryFee} delivery`}
      >
        buy now
      </button>
    </article>
  );
}
