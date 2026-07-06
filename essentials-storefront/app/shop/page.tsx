import { ProductGrid } from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/medusa";

interface ShopPageProps {
  searchParams: Promise<{ type?: string; collection?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  
  const products = await getProducts({
    limit: 24,
    type: resolvedSearchParams.type,
    collection: resolvedSearchParams.collection,
  }).catch(() => []);

  let typeLabel = "ALL PRODUCTS";
  if (resolvedSearchParams.type) {
    typeLabel = resolvedSearchParams.type.replace(/-/g, " ").toUpperCase();
  } else if (resolvedSearchParams.collection) {
    typeLabel = resolvedSearchParams.collection.replace(/-/g, " ").toUpperCase();
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <h1 className="text-gag-white font-display text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">
          {typeLabel}
        </h1>
        <p className="text-gag-concrete text-xs uppercase tracking-widest">
          Showing {products.length} items
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
