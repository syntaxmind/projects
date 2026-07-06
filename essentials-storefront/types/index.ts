/** Shared TypeScript types for the GAG Originals storefront */

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  thumbnail: string | null;
  price: number;
  currency: string;
  quantity: number;
  size: string;
  color: string;
  handle: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  type: { value: string } | null;
  collection: { handle: string; title: string } | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  prices: ProductPrice[];
  options: { value: string }[];
  inventory_quantity?: number;
}

export interface ProductPrice {
  amount: number;
  currency_code: string;
}

export interface ProductOption {
  id: string;
  title: string;
  values: { value: string }[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
}
