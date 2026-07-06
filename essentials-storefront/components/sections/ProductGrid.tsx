import { ProductCard } from "@/components/ProductCard";

interface ProductGridProps {
  title?: string;
  products: any[];
}

export function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="py-16 px-4 md:px-8 max-w-[1440px] mx-auto bg-gag-black">
      {title && (
        <div className="flex justify-between items-end mb-8 border-b border-gag-border pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tight text-gag-white">
            {title}
          </h2>
        </div>
      )}
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-gag-border bg-gag-card/30">
          <div className="text-5xl mb-4">🛍</div>
          <p className="text-gag-concrete text-xs uppercase tracking-widest font-black">
            No pieces found in this category
          </p>
        </div>
      )}
    </section>
  );
}
