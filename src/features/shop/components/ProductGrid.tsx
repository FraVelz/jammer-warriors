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
    <div className={cn("js-shop-grid")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} />
      ))}
    </div>
  );
}
