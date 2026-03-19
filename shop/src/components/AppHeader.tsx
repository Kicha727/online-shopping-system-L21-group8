"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartItemCount, getCurrentUser, setCurrentUser, subscribeStorageUpdate } from "@/lib/storage";

export default function AppHeader() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      setCount(cartItemCount());
      setName(getCurrentUser()?.name ?? null);
    };

    sync();
    return subscribeStorageUpdate(sync);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          HKMU-Cart
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
            Shop
          </Link>
          <Link href="/cart" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
            Cart ({count})
          </Link>
          <Link href="/checkout" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
            Checkout
          </Link>
          <Link href="/auth" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
            {name ? `Hi, ${name}` : "Login"}
          </Link>
          {name ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
