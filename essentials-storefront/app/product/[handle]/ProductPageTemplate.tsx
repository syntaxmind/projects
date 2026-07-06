"use client";
import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export function ProductPageTemplate({ product }: { product: any }) {
  const { addItem } = useCartStore();
  const revealRef = useReveal();

  const sizeOption = product.options?.find((o: any) => o.title.toLowerCase() === "size");
  const colorOption = product.options?.find((o: any) => o.title.toLowerCase() === "color");

  const [selectedSize, setSelectedSize] = useState(sizeOption?.values?.[0]?.value || "M");
  const [selectedColor, setSelectedColor] = useState(colorOption?.values?.[0]?.value || "Black");

  const primaryImage = product.thumbnail || product.images?.[0]?.url;
  const [activeImage, setActiveImage] = useState(primaryImage || "");
  const [imageKey, setImageKey] = useState(0);

  const price = product.variants?.[0]?.prices?.[0]?.amount || 0;
  const currency = product.variants?.[0]?.prices?.[0]?.currency_code || "INR";

  const handleImageChange = (url: string) => {
    setActiveImage(url);
    setImageKey((prev) => prev + 1); // triggers crossfade animation
  };

  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      title: product.title,
      thumbnail: primaryImage || null,
      price,
      currency,
      size: selectedSize,
      color: selectedColor,
      handle: product.handle,
    });
  };

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black" ref={revealRef}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <Link
          href="/shop"
          className="reveal inline-flex items-center gap-2 text-gag-concrete text-xs hover:text-gag-blue transition-colors mb-10 uppercase tracking-[0.2em] font-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Left: Image Gallery with crossfade */}
          <div className="space-y-4 reveal delay-1">
            <div className="relative aspect-[3/4] bg-neutral-900 border border-gag-border overflow-hidden">
              {activeImage ? (
                <img
                  key={imageKey}
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover crossfade-enter"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl opacity-10 select-none">🛍</div>
              )}
            </div>

            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: any) => (
                  <button
                    key={img.id}
                    onClick={() => handleImageChange(img.url)}
                    className={`relative aspect-square overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      activeImage === img.url
                        ? "border-gag-blue scale-95"
                        : "border-gag-border hover:border-gag-blue/50"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details — staggered reveal */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
            {product.collection && (
              <span className="reveal delay-1 text-[10px] font-black tracking-[0.3em] text-gag-blue border border-gag-blue/30 px-3 py-1 bg-gag-black/50 inline-block uppercase">
                {product.collection.title}
              </span>
            )}

            <h1 className="reveal delay-2 text-gag-white font-display text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              {product.title}
            </h1>

            <p className="reveal delay-3 text-gag-white text-3xl font-black font-mono tracking-tight border-b border-gag-border pb-8">
              {formatPrice(price / 100, currency)}
            </p>

            {product.description && (
              <p className="reveal delay-4 text-gag-concrete text-sm leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Option Selectors */}
            <div className="space-y-6 pt-4 border-t border-gag-border reveal delay-4">
              {colorOption && (
                <div className="space-y-3">
                  <p className="text-gag-concrete text-[10px] uppercase tracking-[0.2em] font-black">
                    Color: <span className="text-gag-white">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colorOption.values.map((v: any) => (
                      <button
                        key={v.id || v.value}
                        onClick={() => setSelectedColor(v.value)}
                        className={`ripple px-5 py-3 border text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                          selectedColor === v.value
                            ? "border-gag-blue text-gag-blue bg-gag-blue/5"
                            : "border-gag-white/20 text-gag-white hover:border-gag-blue hover:text-gag-blue"
                        }`}
                      >
                        {v.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizeOption && (
                <div className="space-y-3">
                  <p className="text-gag-concrete text-[10px] uppercase tracking-[0.2em] font-black">
                    Size: <span className="text-gag-white">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizeOption.values.map((v: any) => (
                      <button
                        key={v.id || v.value}
                        onClick={() => setSelectedSize(v.value)}
                        className={`ripple px-5 py-3 border text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                          selectedSize === v.value
                            ? "border-gag-blue text-gag-blue bg-gag-blue/5"
                            : "border-gag-white/20 text-gag-white hover:border-gag-blue hover:text-gag-blue"
                        }`}
                      >
                        {v.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Bag */}
            <div className="pt-6 border-t border-gag-border space-y-4 reveal delay-5">
              <button
                onClick={handleAddToBag}
                className="ripple w-full bg-gag-blue text-white hover:bg-white hover:text-gag-black font-black py-5 text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 cursor-pointer transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
              <p className="text-gag-concrete/50 text-[10px] uppercase tracking-widest font-bold text-center">
                Free shipping on orders over ₹1500
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
