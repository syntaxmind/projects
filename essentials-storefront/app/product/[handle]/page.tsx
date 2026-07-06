import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/medusa";
import { ProductPageTemplate } from "./ProductPageTemplate";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductPageTemplate product={product} />;
}
