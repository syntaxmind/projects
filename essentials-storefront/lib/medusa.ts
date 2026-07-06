const BASE = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://31.97.235.122:9001";
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

const headers = () => ({
  "Content-Type": "application/json",
  "x-publishable-api-key": PUB_KEY,
});

export async function getProducts(params: { limit?: number; type?: string; collection?: string } = {}) {
  // Fetch up to 100 products to perform clean in-memory filtering for GAG streetwear collections
  const limitVal = params.limit ? Math.max(params.limit, 100) : 100;
  const qs = new URLSearchParams({ limit: String(limitVal) });
  
  const r = await fetch(`${BASE}/store/products?${qs}`, {
    headers: headers(),
    next: { revalidate: 60 },
  });
  if (!r.ok) return [];
  const d = await r.json();
  let products = d.products || [];

  if (params.type) {
    products = products.filter((p: any) => p.type?.value === params.type);
  }
  if (params.collection) {
    products = products.filter((p: any) => p.collection?.handle === params.collection);
  }

  if (params.limit) {
    products = products.slice(0, params.limit);
  }

  return products;
}

export async function getProduct(handle: string) {
  const r = await fetch(`${BASE}/store/products?handle=${handle}`, {
    headers: headers(),
    next: { revalidate: 60 },
  });
  if (!r.ok) return null;
  const d = await r.json();
  return d.products?.[0] || null;
}

export async function getProductByHandle(handle: string) {
  return getProduct(handle);
}

export function formatPrice(amount: number, currency = "inr") {
  return `₹${(amount / 100).toFixed(0)}`;
}
