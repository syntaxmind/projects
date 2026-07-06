"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { items, setOpen } = useCartStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll-aware background opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/shop?type=${encodeURIComponent(searchQuery.trim().toLowerCase().replace(/\s+/g, "-"))}`);
    setSearchQuery("");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "About", href: "/about" }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-[100] transition-all duration-350 border-b ${
          scrolled ? "bg-black/20 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"
        }`}
      >
        <div className={`max-w-[1480px] mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-350 ${scrolled ? 'py-2.5' : 'py-4'}`}>
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-anton text-[22px] tracking-[0.02em] hover:text-flame transition-colors duration-300"
          >
            <span className="w-[11px] h-[11px] rounded-full bg-flame shadow-[0_0_0_4px_rgba(255,59,30,0.18)]"></span>
            <span className="font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "1px black" }}>GAG ORIGINALS</span>
          </Link>
          
          {/* Center navigation links */}
          <nav className="hidden md:flex gap-[30px]" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`nav-link-indicator text-sm tracking-[0.02em] py-1 transition-colors duration-250 ${
                    isActive ? "text-bone active" : "text-boneDim hover:text-bone"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Actions bar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-[42px] h-[42px] grid place-items-center rounded-[11px] transition-all duration-250 hover:bg-ink3 hover:-translate-y-0.5"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-bone stroke-[1.7]" />
            </button>
            
            <button
              className="w-[42px] h-[42px] grid place-items-center rounded-[11px] transition-all duration-250 hover:bg-ink3 hover:-translate-y-0.5 hidden md:grid"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-bone stroke-[1.7]" />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="relative w-[42px] h-[42px] grid place-items-center rounded-[11px] transition-all duration-250 hover:bg-ink3 hover:-translate-y-0.5"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-bone stroke-[1.7]" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-[5px] rounded-full bg-flame text-white font-mono text-[11px] font-bold grid place-items-center bounce-in pulse-glow">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-[42px] h-[42px] grid place-items-center rounded-[11px] transition-all duration-250 hover:bg-ink3 md:hidden"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-bone stroke-[1.7]" /> : <Menu className="w-6 h-6 text-bone stroke-[1.7]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-x-0 top-0 h-32 bg-ink/98 backdrop-blur-xl border-b border-[rgba(242,238,228,0.12)] z-[1100] p-6 flex flex-col justify-center">
          <div className="max-w-[1480px] mx-auto w-full flex items-center justify-between gap-4">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3">
              <Search className="w-5 h-5 text-boneDim" />
              <input
                type="text"
                autoFocus
                placeholder="SEARCH APPAREL"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-bone placeholder-boneDim/50 font-mono text-sm tracking-widest uppercase focus:outline-none"
              />
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-boneDim hover:text-bone transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-black/95 backdrop-blur-3xl z-[90] p-6 flex flex-col md:hidden">
          <nav className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-bangers tracking-widest text-4xl text-white hover:text-flame transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
