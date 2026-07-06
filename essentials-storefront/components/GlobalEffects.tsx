"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function GlobalEffects() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Iris preloader reveal
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Custom cursor logic
    const dot = document.getElementById("cDot");
    const ring = document.getElementById("cRing");
    
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      ring.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a") || target.closest("button") || target.closest(".card");
      if (isClickable) {
        ring.classList.add("hot");
      } else {
        ring.classList.remove("hot");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    
    // Scroll progress logic
    const progress = document.getElementById("progress");
    const handleScroll = () => {
      if (!progress) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      progress.style.width = `${scrolled}%`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" id="cDot"></div>
      <div className="cursor-ring hidden md:block" id="cRing"></div>

      {/* Scroll Progress & Grain */}
      <div id="progress" className="fixed top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-flame to-ember z-[120]"></div>
      <div className="grain fixed inset-0 z-[119] pointer-events-none opacity-5 mix-blend-overlay"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }}
      ></div>

      {/* Preloader */}
      <div id="preloader" className={`fixed inset-0 z-[150] bg-ink flex flex-col items-center justify-center gap-6 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.2,1)] ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none [clip-path:circle(0%_at_50%_42%)]'}`} style={{ clipPath: loading ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 42%)' }}>
        <div className="flex gap-1 font-anton text-4xl md:text-6xl tracking-wide">
          <span className="animate-[flapdrop_0.5s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: '0.1s' }}>G</span>
          <span className="animate-[flapdrop_0.5s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: '0.2s' }}>A</span>
          <span className="animate-[flapdrop_0.5s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: '0.3s' }}>G</span>
          <span className="animate-[flapdrop_0.5s_cubic-bezier(0.16,1,0.3,1)_both] text-flame" style={{ animationDelay: '0.4s' }}>07</span>
        </div>
        <div className="w-48 md:w-64 h-[3px] bg-ink3 rounded-sm overflow-hidden">
          <div className="h-full bg-gradient-to-r from-flame to-ember transition-all duration-[1200ms] ease-out w-full" style={{ transform: loading ? 'translateX(-100%)' : 'translateX(0)' }}></div>
        </div>
        <div className="flex gap-4 font-mono text-[11px] tracking-[0.22em] color-steel">
          <span>000</span>
          <span>ENTERING NIGHT DISTRICT</span>
        </div>
      </div>
    </>
  );
}
