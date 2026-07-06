import { ProductGrid } from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/medusa";

export default async function DropsPage() {
  const products = await getProducts({ limit: 24 }).catch(() => []);

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <h1 className="text-gag-white font-display text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">
          All Drops
        </h1>
        <p className="text-gag-concrete text-sm max-w-md">
          Every drop, every piece. Catch them before they sell out.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
