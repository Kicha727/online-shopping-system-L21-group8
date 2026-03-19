import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "./productActions";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-semibold text-indigo-700 hover:text-indigo-500">
        &larr; Back to products
      </Link>

      <section className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className={`h-64 bg-linear-to-br ${product.imageColor}`} />
        <div className="space-y-4 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{product.category}</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{product.name}</h1>
          <p className="text-base leading-7 text-slate-700">{product.description}</p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-2xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
