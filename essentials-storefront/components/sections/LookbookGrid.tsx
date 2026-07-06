import Link from "next/link";

interface LookbookItem {
  title: string;
  season: string;
  description: string;
  tag: string;
  color: string;
  link: string;
}

export function LookbookGrid() {
  const lookbooks: LookbookItem[] = [
    {
      title: "Drop 05 — Raw Rebellion",
      season: "SPRING/SUMMER 2026",
      description: "A tribute to street-level resilience. Features bold back-prints and hand-drawn classical statue graphics overlaid with warning elements.",
      tag: "AVAILABLE NOW",
      color: "from-amber-600/30 to-gag-black",
      link: "/shop?collection=drop-05"
    },
    {
      title: "Winter Edition — Heavyweight Armor",
      season: "WINTER 2026",
      description: "Designed to combat cold drafts. 420gsm loopback cotton hoodies and double-layered sweatpants built with a structured oversized fit.",
      tag: "LIMITED DROPS",
      color: "from-zinc-700/30 to-gag-black",
      link: "/shop?collection=winter-edition"
    },
    {
      title: "Drop 06 — Neon Paranoia",
      season: "SUMMER 2026",
      description: "Vibrant yellow accents colliding with deep mineral black bases. Redefining modern fit ratios with dropping shoulders and short cuffs.",
      tag: "NEW RELEASE",
      color: "from-yellow-600/20 to-gag-black",
      link: "/shop?collection=drop-06"
    },
    {
      title: "Essentials — Core Silhouettes",
      season: "PERMANENT COLLECTION",
      description: "The baseline of GAG streetwear. Plain heavyweight tees in white, vintage grey, and obsidian black. Built to last multiple wash cycles.",
      tag: "STAPLES",
      color: "from-neutral-800/40 to-gag-black",
      link: "/shop?collection=essentials"
    }
  ];

  return (
    <section className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lookbooks.map((lb, index) => (
            <Link
              key={index}
              href={lb.link}
              className="group relative block aspect-[16/10] bg-gag-card border border-gag-border overflow-hidden transition-all duration-500 hover:border-gag-yellow"
            >
              {/* Background gradient structure acting as an abstract editorial graphic */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${lb.color} opacity-60 transition-opacity duration-500 group-hover:opacity-80`} />
              
              {/* Grid graphic decoration */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black tracking-widest text-gag-yellow border border-gag-yellow/30 px-3 py-1 bg-gag-black/50">
                    {lb.tag}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-gag-concrete">
                    {lb.season}
                  </span>
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gag-white uppercase mb-4 transition-transform duration-500 group-hover:translate-x-1">
                    {lb.title}
                  </h2>
                  <p className="text-gag-concrete text-xs md:text-sm leading-relaxed max-w-lg mb-6 line-clamp-3">
                    {lb.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-gag-white uppercase group-hover:text-gag-yellow transition-colors duration-300">
                    Explore Drop <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
