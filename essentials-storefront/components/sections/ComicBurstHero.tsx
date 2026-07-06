"use client";
import React, { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

export function ComicBurstHero() {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef(0);
  const revealRef = useReveal();

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!layerRef.current) return;
    const now = Date.now();
    if (now - lastRef.current < 300) return;
    lastRef.current = now;

    const stage = e.currentTarget;
    const r = stage.getBoundingClientRect();
    const size = 90 + Math.random() * 46;
    const words = ["POW", "BANG", "WOW", "BOOM", "COOL", "GAG", "ZAP", "ZOK"];
    const colors = ["#ffd23f", "#ff6b6b", "#4ade80", "#c084fc", "#38bdf8"];
    
    const b = document.createElement("div");
    b.className = "comic-burst absolute";
    
    const left = e.clientX - r.left;
    const top = e.clientY - r.top;
    const rotation = (Math.random() * 26 - 13).toFixed(1);
    const word = words[Math.floor(Math.random() * words.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const fontSize = Math.floor(size * 0.24);

    b.style.cssText = `left:${left}px;top:${top}px;width:${size}px;height:${size}px;--r:${rotation}deg;transform:translate(-50%,-50%)`;
    
    b.innerHTML = `
      <div class="b-back absolute inset-0 bg-[#0f1a52]"></div>
      <div class="b-front absolute inset-[5px] bg-white"></div>
      <span class="absolute inset-0 flex items-center justify-center -rotate-3 font-bangers"
        style="color:${color};font-size:${fontSize}px;text-shadow:1.5px 1.5px 0 rgba(15,26,82,.9)">${word}</span>
    `;
    
    layerRef.current.appendChild(b);
    setTimeout(() => {
      if (layerRef.current && layerRef.current.contains(b)) {
        layerRef.current.removeChild(b);
      }
    }, 880);
  };

  return (
    <section 
      id="comic-stage" 
      ref={revealRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-[calc(100vh-120px)] overflow-hidden cursor-crosshair bg-[radial-gradient(120%_120%_at_50%_0%,#2a52e0_0%,#1a37ad_55%,#142a86_100%)]"
    >
      <div className="comic-dots absolute inset-0 opacity-50 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_70%_at_50%_45%,transparent_55%,rgba(9,18,64,.55)_100%)]"></div>

      <div className="relative z-10 min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p className="uppercase tracking-[0.32em] text-[13px] font-semibold text-indigo-200 mb-5 reveal delay-1">Move your mouse anywhere</p>
        <h1 className="text-white font-extrabold font-anton leading-none text-[clamp(44px,11vw,150px)] drop-shadow-[0_6px_0_rgba(0,0,0,.28)] reveal delay-2">GAG<br/>ORIGINALS</h1>
      </div>

      <div id="comic-layer" ref={layerRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden"></div>
    </section>
  );
}
