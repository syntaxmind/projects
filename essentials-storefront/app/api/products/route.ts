import { NextResponse } from "next/server";
import { getProducts } from "@/lib/medusa";

export async function GET() {
  const products = await getProducts({ limit: 8 }).catch(() => []);
  return NextResponse.json(products);
}
