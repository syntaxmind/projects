"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-md mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Welcome Back
        </p>
        <h1 className="text-gag-white font-display text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] mb-10">
          Sign In
        </h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent border border-gag-border text-gag-white text-sm px-4 py-3 focus:border-gag-blue focus:outline-none transition-colors"
              disabled
            />
          </div>
          <div>
            <label className="block text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full bg-transparent border border-gag-border text-gag-white text-sm px-4 py-3 focus:border-gag-blue focus:outline-none transition-colors"
              disabled
            />
          </div>
          <button
            type="submit"
            disabled
            className="w-full bg-gag-white/30 text-gag-white font-black text-xs tracking-widest uppercase px-8 py-3 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </form>

        <p className="text-gag-concrete text-xs mt-8 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-gag-blue hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
