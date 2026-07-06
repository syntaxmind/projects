const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL ||
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  "http://127.0.0.1:9003";

const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

const DEFAULT_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID || "";

async function medusaFetch(path, { searchParams } = {}) {
  const isBrowser = typeof window !== "undefined";
  const url = isBrowser
    ? new URL(`/api/store${path.replace(/^\/store/, "")}`, window.location.origin)
    : new URL(path, MEDUSA_BACKEND_URL);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value != null && value !== "") url.searchParams.set(key, value);
    });
  }

  const headers = { "Content-Type": "application/json" };
  if (MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY;
  }

  const res = await fetch(url.toString(), { headers, cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Medusa ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export async function getRegions() {
  const { regions } = await medusaFetch("/store/regions");
  return regions || [];
}

export async function getDefaultRegionId() {
  if (DEFAULT_REGION_ID) return DEFAULT_REGION_ID;
  const regions = await getRegions();
  return regions[0]?.id || "";
}

export async function listProducts({ limit = 12, offset = 0, regionId } = {}) {
  const region = regionId || (await getDefaultRegionId());
  const searchParams = {
    limit: String(limit),
    offset: String(offset),
    fields:
      "id,title,handle,subtitle,description,thumbnail,*images,*variants,*variants.calculated_price",
  };
  if (region) searchParams.region_id = region;

  const { products, count } = await medusaFetch("/store/products", { searchParams });
  return { products: products || [], count: count || 0 };
}

export async function getProductByHandle(handle, { regionId } = {}) {
  const region = regionId || (await getDefaultRegionId());
  const searchParams = {
    handle,
    limit: "1",
    fields:
      "id,title,handle,subtitle,description,thumbnail,*images,*variants,*variants.calculated_price,*variants.options,*options",
  };
  if (region) searchParams.region_id = region;

  const { products } = await medusaFetch("/store/products", { searchParams });
  return products?.[0] || null;
}

export async function getTestimonials() {
  const { testimonials } = await medusaFetch("/store/testimonials");
  return testimonials || [];
}

export { MEDUSA_BACKEND_URL };
