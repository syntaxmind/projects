import { listProducts } from "../lib/medusa";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products = [];
  try {
    const result = await listProducts({ limit: 4 });
    products = result.products;
  } catch (err) {
    console.error("Medusa fetch error:", err.message);
  }

  return <HomeClient products={products} />;
}
