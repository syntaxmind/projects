"use client";

import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Secure Checkout
        </p>
        <h1 className="text-gag-white font-display text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
          Checkout
        </h1>

        <div className="border border-gag-border rounded-lg p-8 md:p-12 text-center">
          <p className="text-gag-concrete text-sm leading-relaxed mb-6">
            Checkout is coming soon. We&apos;re integrating secure payment processing
            so you can complete your order seamlessly.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gag-white text-gag-black font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-gag-blue hover:text-gag-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
