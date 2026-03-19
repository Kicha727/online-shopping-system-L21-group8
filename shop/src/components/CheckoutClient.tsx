"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { clearCart, getCart, getCurrentUser, saveOrder, subscribeStorageUpdate } from "@/lib/storage";
import { formatPrice } from "@/lib/format";
import type { CartItem, User } from "@/types/shop";

export default function CheckoutClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const sync = () => {
      setUser(getCurrentUser());
      setCart(getCart());
    };

    sync();
    return subscribeStorageUpdate(sync);
  }, []);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) return sum;
      return sum + product.price * item.quantity;
    }, 0);
  }, [cart]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleFakePayment = () => {
    if (!user || cart.length === 0 || !fullName || !address || !city) {
      return;
    }

    setProcessing(true);
    window.setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;

      saveOrder({
        id: orderId,
        userId: user.id,
        itemCount,
        total,
        createdAt: new Date().toISOString(),
      });

      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 1400);
  };

  if (!user) {
    return (
      <section className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h2 className="text-xl font-bold text-amber-900">Login required</h2>
        <p className="mt-2 text-sm text-amber-800">Please login or register before checking out.</p>
        <Link href="/auth" className="mt-4 inline-block rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white">
          Go to Login / Register
        </Link>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 text-sm text-slate-600">Add a few products before checkout.</p>
        <Link href="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Full Name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
              placeholder="John Doe"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Address
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
              placeholder="123 Main Street"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            City
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
              placeholder="Seattle"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span className="text-base font-bold text-slate-900">{formatPrice(total)}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={processing}
          onClick={handleFakePayment}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          {processing ? "Processing fake payment..." : "Pay Now (Fake)"}
        </button>
      </section>
    </div>
  );
}
