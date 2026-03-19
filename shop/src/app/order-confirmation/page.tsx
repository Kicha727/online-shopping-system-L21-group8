import Link from "next/link";

type OrderConfirmationPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { orderId } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Order Confirmed</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Thank you for your purchase</h1>
        <p className="mt-3 text-sm text-slate-600">Your fake payment was successful and your demo order is now complete.</p>

        <div className="mt-5 rounded-xl bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Order ID</p>
          <p className="mt-1 text-lg font-bold text-emerald-900">{orderId ?? "N/A"}</p>
        </div>

        <Link href="/" className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700">
          Continue Shopping
        </Link>
      </section>
    </main>
  );
}
