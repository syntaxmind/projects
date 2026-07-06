"use client";
import { useReveal, useOnVisible } from "@/hooks/useReveal";
import { useState, useCallback } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const startCount = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  }, [target, hasAnimated]);

  const ref = useOnVisible(startCount);

  return (
    <div ref={ref} className="text-center">
      <p className="text-gag-white font-display text-4xl md:text-5xl font-black count-animate">
        {count}{suffix}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Title Block */}
          <div className="mb-16">
            <p className="reveal text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
              The Story
            </p>
            <h1 className="reveal delay-1 text-gag-white font-display text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              About GAG<br />Originals
            </h1>
          </div>

          {/* Staggered Paragraphs */}
          <div className="space-y-8 mb-20">
            <p className="reveal delay-2 text-gag-concrete text-sm leading-relaxed">
              GAG Originals was born from a simple belief: AESTHETIC & PASSION.
              Founded in Kerala, built for the bold — we create premium streetwear that
              carries attitude in every stitch.
            </p>
            <p className="reveal delay-3 text-gag-concrete text-sm leading-relaxed">
              Our drops are limited. Our quality isn&apos;t. Every piece is designed with intention,
              printed on heavyweight cotton, and cut for the oversized silhouette that defines
              modern street culture.
            </p>
            <p className="reveal delay-4 text-gag-concrete text-sm leading-relaxed">
              From our high neck pieces to 5 sleeves and oversized full fits, each design tells
              a story. We don&apos;t follow trends — we set them alongside our community, one drop at a time.
            </p>
          </div>

          {/* Animated Stats Counter Grid */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gag-border">
            <div className="reveal delay-1">
              <AnimatedCounter target={56} suffix="+" />
              <p className="text-gag-concrete text-[10px] uppercase tracking-[0.2em] mt-2 text-center">Drops</p>
            </div>
            <div className="reveal delay-2">
              <AnimatedCounter target={10} suffix="K+" />
              <p className="text-gag-concrete text-[10px] uppercase tracking-[0.2em] mt-2 text-center">Pieces Sold</p>
            </div>
            <div className="reveal delay-3">
              <AnimatedCounter target={422} suffix="+" />
              <p className="text-gag-concrete text-[10px] uppercase tracking-[0.2em] mt-2 text-center">Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
