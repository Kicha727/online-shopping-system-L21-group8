"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { getCart, saveCart, subscribeStorageUpdate } from "@/lib/storage";
import type { CartItem } from "@/types/shop";

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setCart(getCart());
    sync();
    return subscribeStorageUpdate(sync);
  }, []);

  const merged = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((candidate) => candidate.id === item.productId);
        if (!product) return null;

        return {
          ...item,
          product,
          subtotal: product.price * item.quantity,
        };
      })
      .filter((item) => item !== null);
  }, [cart]);

  const total = merged.reduce((sum, item) => sum + item.subtotal, 0);

  const updateQuantity = (productId: string, quantity: number) => {
    const next = cart
      .map((item) => (item.productId === productId ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);

    saveCart(next);
  };

  if (merged.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 text-slate-600">Browse products and add your favorites.</p>
        <Link href="/" className="mt-5 inline-block rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <section className="space-y-4">
        {merged.map((item) => (
          <article key={item.productId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{item.product.name}</h3>
                <p className="text-sm text-slate-600">{formatPrice(item.product.price)} each</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="h-8 w-8 rounded-md border border-slate-300 font-bold text-slate-700"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold text-slate-900">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="h-8 w-8 rounded-md border border-slate-300 font-bold text-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <p className="mt-3 text-right text-sm font-semibold text-slate-800">Subtotal: {formatPrice(item.subtotal)}</p>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Summary</h2>
        <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
          <span>Total</span>
          <span className="text-lg font-extrabold text-slate-900">{formatPrice(total)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}
