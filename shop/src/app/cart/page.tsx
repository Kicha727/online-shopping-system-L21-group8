import CartClient from "@/components/CartClient";

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Shopping Cart</h1>
      <p className="mt-2 text-sm text-slate-600">Adjust quantity, remove products, then continue to checkout.</p>
      <div className="mt-6">
        <CartClient />
      </div>
    </main>
  );
}
