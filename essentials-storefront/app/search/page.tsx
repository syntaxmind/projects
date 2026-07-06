"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Find Your Piece
        </p>
        <h1 className="text-gag-white font-display text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-10">
          Search
        </h1>

        <div className="mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent border-b-2 border-gag-border text-gag-white text-lg px-2 py-4 focus:border-gag-blue focus:outline-none transition-colors placeholder:text-gag-concrete/50"
          />
        </div>

        <div className="border border-gag-border rounded-lg p-8 md:p-12 text-center">
          <p className="text-gag-concrete text-sm leading-relaxed mb-6">
            Full search functionality is coming soon. For now, browse our collections.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gag-white text-gag-black font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-gag-blue hover:text-gag-white transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
