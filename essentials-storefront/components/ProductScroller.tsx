"use client";
import React, { useEffect, useState } from "react";

const PRODUCTS = [
  { img: "/images/gag-polo-butterfly-flatlay.jpg", name: "GAG Polo 06", price: "₹1299" },
  { img: "/images/gag-polo-doberman-front.jpg", name: "11 Tee", price: "₹999" },
  { img: "/images/gag-polo-butterfly-back.jpg", name: "Outerwear", price: "₹1499" },
  { img: "/images/gag-tee-cupid-back.jpg", name: "5 Sleeves", price: "₹1099" },
];

export function ProductScroller() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start vanishing
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PRODUCTS.length);
        setFade(true); // reappear and revolve
      }, 700); // Wait for fade out and motion
    }, 3500); // 3.5 seconds per product
    return () => clearInterval(interval);
  }, []);

  const currentProduct = PRODUCTS[index];

  return (
    <div className="absolute z-10 w-[clamp(70px,15vw,110px)] bottom-[-5%] left-[5%] md:bottom-[10%] md:-left-[12%] pointer-events-none">
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          fade ? "opacity-100 scale-100 rotate-6 translate-y-0" : "opacity-0 scale-75 -rotate-12 translate-y-10"
        }`}
      >
        <img src={currentProduct.img} alt="" className="w-full aspect-square object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] rounded-xl" />
        <div className="text-[12px] font-bangers tracking-wider mt-2 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-white">
          {currentProduct.name}
        </div>
        <div className="font-bangers text-[13px] text-[#ffd23f] mt-0.5 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          {currentProduct.price}
        </div>
      </div>
    </div>
  );
}
