"use client";
import React, { useEffect, useState } from "react";

export function ShootingStars() {
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState<{ id: number; top: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!scrolled) {
      setStars([]);
      return;
    }
    
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setStars(prev => [
          ...prev.slice(-4), // keep max 5 stars at a time
          {
            id: Date.now(),
            top: Math.random() * 50, // Mostly in top half
            left: 20 + Math.random() * 80, // Start more towards the right to shoot left-down
            delay: 0,
            duration: 1.5 + Math.random() * 1.5
          }
        ]);
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, [scrolled]);

  if (!scrolled) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: '150px',
            transformOrigin: '0 0',
            animation: `shootingStar ${star.duration}s ease-in forwards`,
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-white shadow-[0_0_10px_#00f0ff]"></div>
        </div>
      ))}
    </div>
  );
}
