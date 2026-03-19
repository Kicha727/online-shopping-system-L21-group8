"use client";

import { addToCart } from "@/lib/storage";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const handleAdd = () => {
    addToCart(productId, 1);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
    >
      Add to Cart
    </button>
  );
}
