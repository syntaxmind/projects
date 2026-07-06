"use client";
import React, { useEffect, useState } from "react";

const MESSAGES = [
  "FREE SHIPPING OVER ₹1500",
  "GAG ORIGINALS DROP 07 LIVE NOW",
  "STUDENT DISCOUNT 15%",
  "AESTHETIC & PASSION"
];

export function TopBanner() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 4000); // 4 seconds per message
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-[90] bg-transparent text-white/50 h-8 flex items-center justify-center overflow-hidden pointer-events-none border-b border-white/5">
      <div
        className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-700 ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {MESSAGES[index]}
      </div>
    </div>
  );
}
