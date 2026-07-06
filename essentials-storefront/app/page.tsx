"use client";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { useReveal } from "@/hooks/useReveal";
import { useEffect, useState, useRef } from "react";
import { Activity, Truck, Star } from "lucide-react";
import { ComicBurstOverlay } from "@/components/sections/ComicBurstOverlay";
import { ProductScroller } from "@/components/ProductScroller";

export default function Home() {
  const revealRef = useReveal();
  const [products, setProducts] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  // Fade out video volume on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollY = window.scrollY;
        const newVolume = Math.max(0, 1 - scrollY / 600);
        videoRef.current.volume = newVolume;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize volume
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-transparent" ref={revealRef}>
      {/* ===== HERO: Night District Portal ===== */}
      <section className="relative max-w-[1480px] mx-auto px-4 md:px-8 py-10 md:py-20 flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-16 items-center min-h-[calc(100vh-120px)]">
        
        <ComicBurstOverlay />

        <div className="order-2 lg:order-1 text-center lg:text-left z-10 pointer-events-none">
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-steel block reveal">
            Night District / Drop 07 · Kerala, India
          </span>
          <h1 className="reveal delay-1 mt-4 font-bangers leading-[0.86] tracking-[0.05em] text-[clamp(42px,12vw,140px)] uppercase drop-shadow-[0_8px_0_rgba(0,0,0,0.6)]">
            <span className="text-white">GAG</span><br/>
            ORIGI<span className="text-flame">NALS</span>
          </h1>
          <p className="reveal delay-2 max-w-[44ch] text-boneDim text-[15px] md:text-[18px] leading-[1.6] mt-6 mx-auto lg:mx-0">
            Aesthetic & Passion. Community-driven streetwear based in Kerala. Oversized, high neck, and distinct silhouettes. Built to move after dark.
          </p>
          <div className="reveal delay-2 flex flex-wrap gap-3.5 mt-8 justify-center lg:justify-start pointer-events-auto">
            <Link href="/shop" className="btn btn-flame px-6 py-4 rounded-[13px] font-bold text-sm bg-flame text-white hover:bg-[#ff5030] shadow-[0_10px_30px_-10px_rgba(255,59,30,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,59,30,0.75)] transition-all flex items-center gap-2">
              Shop the drop
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-2 fill-none"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/lookbook" className="btn btn-out px-6 py-4 rounded-[13px] font-bold text-sm bg-transparent border-[1.5px] border-[rgba(242,238,228,0.12)] text-bone hover:border-bone hover:bg-[rgba(242,238,228,0.05)] transition-all">
              Watch lookbook
            </Link>
          </div>
          
          <div className="reveal delay-3 flex flex-wrap gap-8 mt-12 font-mono text-xs tracking-[0.14em] text-steel uppercase justify-center lg:justify-start pointer-events-auto">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-full bg-ink2 border border-flame/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] text-flame">
                <Activity size={18} />
              </div>
              <div className="text-center lg:text-left"><b className="text-bone block font-anton text-xl tracking-[0.02em] mb-0.5">07</b>Active drops</div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-full bg-ink2 border border-flame/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] text-flame">
                <Truck size={18} />
              </div>
              <div className="text-center lg:text-left"><b className="text-bone block font-anton text-xl tracking-[0.02em] mb-0.5">48H</b>Ship window</div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-full bg-ink2 border border-flame/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] text-flame">
                <Star size={18} />
              </div>
              <div className="text-center lg:text-left"><b className="text-bone block font-anton text-xl tracking-[0.02em] mb-0.5">4.9</b>Rated / 5</div>
            </div>
          </div>
        </div>

        {/* Portal Animation */}
        <div className="order-1 lg:order-2 w-full max-w-[560px] mx-auto pointer-events-none">
          <div className="relative aspect-square w-full grid place-items-center animate-[portalIn_1.1s_cubic-bezier(0.16,1,0.3,1)_both] delay-200">
            {/* Glow */}
            <div className="absolute -inset-[8%] rounded-full blur-[30px]" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(0,240,255,0.35), rgba(0,102,255,0.16) 45%, transparent 70%)' }}></div>
            {/* Rings */}
            <div className="absolute -inset-[2%] rounded-full border-[1.5px] border-dashed border-[rgba(242,238,228,0.28)] animate-[spinSlow_26s_linear_infinite]"></div>
            <div className="absolute inset-[4%] rounded-full border-[1.5px] border-solid border-[rgba(0,240,255,0.25)] animate-[spinSlow_40s_linear_infinite_reverse]"></div>
            
            {/* Core Video */}
            <div className="relative w-[88%] aspect-square rounded-full overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9),inset_0_0_0_2px_rgba(242,238,228,0.14)]">
              <video 
                ref={videoRef} 
                src="/can_u_show_these_products_in_h.mp4" 
                autoPlay 
                loop
                muted={isMuted} 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover scale-[1.18]" 
              />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 46%, transparent 55%, rgba(10,12,16,0.55) 100%)' }}></div>
            </div>

            {/* Badge */}
            <div className="absolute top-[6%] left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-[0.24em] text-bone bg-ink/60 border border-[rgba(242,238,228,0.12)] px-3 py-1.5 rounded-full backdrop-blur-md uppercase">
              WORN AFTER DARK
            </div>

            {/* Audio Toggle */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-20 w-[42px] h-[42px] rounded-full bg-ink/70 backdrop-blur-md border border-[rgba(242,238,228,0.15)] flex items-center justify-center hover:bg-flame hover:border-flame transition-all"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-bone stroke-2 fill-none"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-bone stroke-2 fill-none"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              )}
            </button>

            {/* Animated Product Scroller */}
            <ProductScroller />

            {/* Scroll Indicator */}
            <div className="absolute -right-[2%] bottom-[2%] z-10 font-mono text-[11px] tracking-[0.28em] text-steel flex items-center gap-3 hidden md:flex" style={{ writingMode: 'vertical-rl' }}>
              SCROLL TO EXPLORE
              <div className="w-[1px] h-[34px] bg-steel relative overflow-hidden">
                <div className="absolute left-0 top-[-100%] w-full h-full bg-flame animate-[drip_1.8s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="border-y border-[rgba(242,238,228,0.12)] mt-10 md:mt-20 py-12 md:py-24" style={{ background: 'radial-gradient(circle at 12% 20%, rgba(0,240,255,0.08), transparent 40%), radial-gradient(circle at 88% 80%, rgba(0,102,255,0.08), transparent 40%)' }}>
        <div className="max-w-[1480px] mx-auto px-4 md:px-8">
          <p className="font-anton text-3xl md:text-5xl lg:text-6xl leading-[1] uppercase max-w-[20ch] reveal">
            Aesthetic & Passion. We engineer <em className="not-italic text-flame">uniforms</em> for the night.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-11">
            <div className="reveal delay-1">
              <h4 className="font-mono text-[13px] tracking-[0.1em] text-azure mb-2.5">01 // HEAVYWEIGHT</h4>
              <p className="text-boneDim text-sm leading-[1.65]">
                Built with 380gsm loopback cotton. Thick, durable, and structured. It holds its shape no matter what the night brings.
              </p>
            </div>
            <div className="reveal delay-2">
              <h4 className="font-mono text-[13px] tracking-[0.1em] text-azure mb-2.5">02 // ARCHITECTURAL FIT</h4>
              <p className="text-boneDim text-sm leading-[1.65]">
                Dropped shoulders, cropped hems, and boxy silhouettes. We spent months perfecting the cut so it drapes exactly right.
              </p>
            </div>
            <div className="reveal delay-3">
              <h4 className="font-mono text-[13px] tracking-[0.1em] text-azure mb-2.5">03 // LIMITED RUNS</h4>
              <p className="text-boneDim text-sm leading-[1.65]">
                Once a drop sells out, it's archived forever. We don't do restocks. We move forward. Wear it like a badge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL BENTO GRID ===== */}
      <section className="py-24 px-4 md:px-8 max-w-[1480px] mx-auto">
        <div className="flex justify-between items-end gap-5 py-10 md:py-20 mb-6">
          <div className="reveal">
            <span className="font-mono text-xs tracking-[0.2em] text-flame block mb-3 uppercase">Drop 07 Archive</span>
            <h2 className="font-anton text-4xl md:text-6xl lg:text-[74px] leading-[0.9] uppercase">Curated<br/>Collections</h2>
          </div>
          <Link href="/shop" className="reveal delay-1 font-mono text-xs tracking-[0.14em] text-boneDim uppercase whitespace-nowrap hover:text-bone hover:gap-3 flex items-center gap-2 transition-all">
            See all
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-2 fill-none"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3.5">
          <Link href="/shop?type=polo" className="relative rounded-[18px] overflow-hidden bg-ink2 border border-[rgba(242,238,228,0.12)] flex flex-col justify-end p-5 isolate transition-transform duration-500 hover:-translate-y-1 col-span-2 row-span-2 group reveal">
            <img src="/images/gag-polo-butterfly-front.jpg" alt="Polos" className="absolute inset-0 -z-[2] w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-6" />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"></div>
            <div className="absolute top-4 right-[18px] font-anton text-3xl text-[rgba(242,238,228,0.35)]">01</div>
            <h3 className="font-anton text-[24px] md:text-[34px] uppercase leading-[0.95]">GAG High Neck</h3>
            <span className="font-mono text-[11px] tracking-[0.16em] text-flame mt-1.5 flex items-center gap-1.5">DROP 07</span>
            <div className="absolute top-4 left-[18px] w-[34px] h-[34px] rounded-full bg-ink/50 border border-[rgba(242,238,228,0.12)] grid place-items-center opacity-0 -translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-bone stroke-2 fill-none"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
          </Link>
          
          <Link href="/shop?type=hoodie" className="relative rounded-[18px] overflow-hidden bg-ink2 border border-[rgba(242,238,228,0.12)] flex flex-col justify-end p-5 isolate transition-transform duration-500 hover:-translate-y-1 col-span-2 md:col-span-1 row-span-2 group reveal delay-1">
            <img src="/images/gag-polo-butterfly-back.jpg" alt="Outerwear" className="absolute inset-0 -z-[2] w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-6" />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"></div>
            <div className="absolute top-4 right-[18px] font-anton text-3xl text-[rgba(242,238,228,0.35)]">02</div>
            <h3 className="font-anton text-[20px] md:text-[24px] uppercase leading-[0.95]">Oversized Full</h3>
            <span className="font-mono text-[11px] tracking-[0.16em] text-flame mt-1.5 flex items-center gap-1.5">HEAVYWEIGHT</span>
          </Link>

          <Link href="/shop?type=oversized-tee" className="relative rounded-[18px] overflow-hidden bg-ink2 border border-[rgba(242,238,228,0.12)] flex flex-col justify-end p-5 isolate transition-transform duration-500 hover:-translate-y-1 col-span-2 md:col-span-1 row-span-1 group reveal delay-2">
            <img src="/images/gag-tee-cupid-back.jpg" alt="Tees" className="absolute inset-0 -z-[2] w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-6" />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"></div>
            <div className="absolute top-4 right-[18px] font-anton text-3xl text-[rgba(242,238,228,0.35)]">03</div>
            <h3 className="font-anton text-[20px] md:text-[24px] uppercase leading-[0.95]">5 Sleeves</h3>
          </Link>

          <Link href="/shop" className="relative rounded-[18px] overflow-hidden bg-ink2 border border-[rgba(242,238,228,0.12)] flex flex-col justify-end p-5 isolate transition-transform duration-500 hover:-translate-y-1 col-span-2 md:col-span-1 row-span-1 group reveal delay-3">
            <img src="/images/gag-polo-doberman-front.jpg" alt="Archive" className="absolute inset-0 -z-[2] w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-6" />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"></div>
            <div className="absolute top-4 right-[18px] font-anton text-3xl text-[rgba(242,238,228,0.35)]">04</div>
            <h3 className="font-anton text-[20px] md:text-[24px] uppercase leading-[0.95]">Collor Neck</h3>
          </Link>
        </div>
      </section>

      {/* ===== NEW ARRIVALS GRID ===== */}
      <section className="py-12 px-4 md:px-8 max-w-[1480px] mx-auto border-t border-[rgba(242,238,228,0.12)]">
        <div className="flex justify-between items-end gap-5 py-10 md:py-16">
          <div className="reveal">
            <h2 className="font-anton text-3xl md:text-5xl uppercase">New Arrivals</h2>
          </div>
          <Link href="/shop" className="reveal delay-1 font-mono text-xs tracking-[0.14em] text-boneDim uppercase whitespace-nowrap hover:text-bone hover:gap-3 flex items-center gap-2 transition-all">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.slice(0, 4).map((p: any, idx: number) => (
              <div key={p.id} className={`reveal delay-${idx + 1}`}>
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 border border-dashed border-[rgba(242,238,228,0.12)] bg-ink2/30 reveal">
              <p className="text-boneDim text-xs uppercase tracking-widest font-bold">
                Loading drops...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-8 mb-20">
        <div className="relative rounded-[24px] overflow-hidden p-8 md:p-16 my-10 md:my-20 bg-gradient-to-br from-ink2 to-ink3 border border-[rgba(242,238,228,0.12)] reveal">
          <div className="absolute -right-[2%] -bottom-[30%] font-anton text-[160px] md:text-[30vw] text-[rgba(0,240,255,0.07)] pointer-events-none select-none">
            GAG
          </div>
          <div className="relative z-10">
            <h2 className="font-anton text-3xl md:text-5xl lg:text-[72px] leading-[0.9] uppercase">Early Access</h2>
            <p className="text-boneDim max-w-[44ch] mt-3.5">Join the Night District. Get notified before drops go public. No spam, only signals.</p>
            
            <form className="flex flex-wrap gap-2.5 mt-6 max-w-[460px]" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="YOUR EMAIL" className="flex-1 min-w-[200px] px-4 py-3.5 rounded-xl bg-ink/60 border border-[rgba(242,238,228,0.12)] text-bone focus:outline-none focus:border-flame transition-colors font-mono text-sm" />
              <button type="submit" className="px-6 py-3.5 rounded-xl bg-flame text-white font-bold text-sm uppercase tracking-wider hover:bg-[#ff5030] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
