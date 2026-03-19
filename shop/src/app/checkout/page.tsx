import CheckoutClient from "@/components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Checkout</h1>
      <p className="mt-2 text-sm text-slate-600">Enter shipping details and complete a fake payment flow.</p>
      <div className="mt-6">
        <CheckoutClient />
      </div>
    </main>
  );
}
