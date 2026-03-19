"use client";

import Link from "next/link";
import type { Product } from "@/types/shop";
import { addToCart } from "@/lib/storage";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const handleAdd = () => {
    addToCart(product.id, 1);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className={`h-44 bg-linear-to-br ${product.imageColor}`} />
      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{product.category}</p>
          <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
          <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-extrabold text-slate-900">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.id}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
