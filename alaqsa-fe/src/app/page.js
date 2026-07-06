import { getTestimonials, listProducts } from "../lib/medusa";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products = [];
  let testimonials = [];

  try {
    const result = await listProducts({ limit: 4 });
    products = result.products;
  } catch (err) {
    console.error("Medusa fetch error:", err.message);
  }

  try {
    testimonials = await getTestimonials();
  } catch (err) {
    console.error("Testimonials fetch error:", err.message);
  }

  return <HomeClient products={products} testimonials={testimonials} />;
}
