import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-linear-to-r from-sky-600 via-indigo-600 to-cyan-500 px-6 py-10 text-white shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Online Shopping Demo</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Find your next favorite item</h1>
        <p className="mt-3 max-w-2xl text-sm text-cyan-50 sm:text-base">
          Clean UI, local storage cart, fake checkout, and no backend. Everything is client-side for demo purposes.
        </p>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
