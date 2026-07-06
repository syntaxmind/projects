"use client";
import React from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay with fade animation */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1400] transition-opacity duration-300"
        onClick={() => setOpen(false)}
      />

      {/* Cart Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gag-dark border-l border-gag-border z-[1500] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gag-border flex justify-between items-center bg-gag-black">
          <h2 className="text-lg font-black tracking-widest uppercase text-gag-white flex items-center gap-2">
            YOUR BAG <span className="text-xs bg-gag-yellow text-gag-black px-2 py-0.5 font-bold rounded-full">{items.length}</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gag-concrete hover:text-gag-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length > 0 ? (
            items.map((item) => {
              const emoji = ["🖤", "⚡", "🔥", "👁", "❄️", "🌟", "✨", "🎽"][
                Math.abs(item.title.charCodeAt(0)) % 8
              ];
              return (
                <div key={item.id} className="flex gap-4 border-b border-gag-border pb-6">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-gag-card border border-gag-border flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="opacity-30 select-none">{emoji}</span>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gag-white line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex gap-3 text-[10px] text-gag-concrete tracking-widest uppercase mt-1">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gag-border bg-gag-black">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gag-concrete hover:text-gag-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono text-gag-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gag-concrete hover:text-gag-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price and Delete */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-gag-white">
                          {formatPrice((item.price * item.quantity) / 100, item.currency)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gag-concrete hover:text-gag-yellow transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center pb-12">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-sm uppercase tracking-widest font-bold text-gag-white">
                Your bag is empty
              </p>
              <p className="text-xs text-gag-concrete mt-2 max-w-[200px]">
                Fill it with the latest limited drops.
              </p>
              <Button
                variant="yellow"
                className="mt-6 !w-auto"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Drawer Footer Subtotal */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gag-border bg-gag-black space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold tracking-widest text-gag-concrete uppercase">Subtotal</span>
              <span className="text-lg font-black text-gag-white">
                {formatPrice(subtotal / 100, items[0]?.currency)}
              </span>
            </div>
            <p className="text-[10px] text-gag-concrete uppercase tracking-wider leading-relaxed">
              Shipping & taxes calculated at checkout. Free shipping on orders over ₹1500.
            </p>
            <Button variant="yellow" size="lg" className="mt-2">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
