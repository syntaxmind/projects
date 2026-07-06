"use client";

import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          My Account
        </p>
        <h1 className="text-gag-white font-display text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
          Account
        </h1>

        <div className="border border-gag-border rounded-lg p-8 md:p-12 text-center">
          <p className="text-gag-concrete text-sm leading-relaxed mb-6">
            Account management is coming soon. Sign in to track orders, save your
            addresses, and manage your wishlist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/login"
              className="inline-block bg-gag-white text-gag-black font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-gag-blue hover:text-gag-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/account/register"
              className="inline-block border border-gag-white text-gag-white font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-gag-white hover:text-gag-black transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
