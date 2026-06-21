"use client";

import type { Product } from "@/features/shop/data/products";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  onBuy: (product: Product) => void;
};

export function ProductGrid({ products, onBuy }: ProductGridProps) {
  return (
    <div id="products" className={cn("js-shop-grid", "mb-12 sm:mb-14")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} />
      ))}
    </div>
  );
}
