const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

const DEFAULT_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID || "";

async function medusaFetch(path, { searchParams, ...init } = {}) {
  const url = new URL(path, MEDUSA_BACKEND_URL);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value != null && value !== "") url.searchParams.set(key, value);
    });
  }

  const headers = {
    "Content-Type": "application/json",
    ...(init.headers || {}),
  };

  if (MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY;
  }

  const res = await fetch(url.toString(), { ...init, headers });
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
  const { products, count } = await medusaFetch("/store/products", {
    searchParams: {
      limit: String(limit),
      offset: String(offset),
      region_id: region,
      fields: "id,title,handle,subtitle,description,thumbnail,*images,*variants,*variants.calculated_price",
    },
  });
  return { products: products || [], count: count || 0 };
}

export async function getProductByHandle(handle, { regionId } = {}) {
  const region = regionId || (await getDefaultRegionId());
  const { products } = await medusaFetch("/store/products", {
    searchParams: {
      handle,
      limit: "1",
      region_id: region,
      fields: "id,title,handle,subtitle,description,thumbnail,*images,*variants,*variants.calculated_price,*variants.options,*options",
    },
  });
  return products?.[0] || null;
}

export { MEDUSA_BACKEND_URL };
