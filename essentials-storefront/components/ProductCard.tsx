"use client";
import React from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/medusa";
import { useCartStore } from "@/lib/cart-store";
import { Plus } from "lucide-react";

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCartStore();

  const firstVariant = product.variants?.[0];
  const price = firstVariant?.prices?.[0]?.amount || 0;
  const currency = firstVariant?.prices?.[0]?.currency_code || "inr";

  const size = firstVariant?.options?.Size || "M";
  const color = firstVariant?.options?.Color || "Black";

  const primaryImage = product.thumbnail || product.images?.[0]?.url;
  const secondaryImage = product.images?.[1]?.url;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      title: product.title,
      thumbnail: primaryImage || null,
      price,
      currency,
      size,
      color,
      handle: product.handle,
    });
  };

  return (
    <Link
      href={`/product/${product.handle}`}
      className="card block cursor-none md:cursor-pointer group"
    >
      <div className="card-media">
        {primaryImage ? (
          <>
            <img
              src={primaryImage}
              alt={product.title}
              loading="lazy"
              className="main"
            />
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.title} alternate`}
                loading="lazy"
                className="alt absolute inset-0 w-full h-full"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-10 select-none bg-ink2">
            🛍
          </div>
        )}

        {/* Flags */}
        <div className="card-flags">
          {product.collection?.title ? (
            <span className="flag new">{product.collection.title}</span>
          ) : (
            <span className="flag hot">HOT</span>
          )}
        </div>

        {/* Wishlist icon placeholder */}
        <div className="wish" onClick={(e) => { e.preventDefault(); e.currentTarget.classList.toggle('on'); }}>
          <svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </div>

        {/* Quick Add */}
        <button className="quick ripple" onClick={handleQuickAdd}>
          <Plus className="w-4 h-4 stroke-2" />
          QUICK ADD
        </button>
      </div>

      <div className="card-info">
        <div>
          <h3>{product.title}</h3>
          <p className="card-sub">{product.collection?.title || "Essentials"}</p>
          <div className="swatches">
            <span className="sw" style={{ background: '#0a0a0a' }}></span>
            <span className="sw" style={{ background: '#F2EEE4' }}></span>
          </div>
        </div>
        <div className="price">
          {formatPrice(price, currency)}
        </div>
      </div>
    </Link>
  );
}
