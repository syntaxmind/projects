import type { Metadata } from "next";
import { Rajdhani, Archivo, Space_Grotesk, Space_Mono, Bangers } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { LeadCaptureModal } from "@/components/sections/LeadCaptureModal";
import { GlobalEffects } from "@/components/GlobalEffects";
import { ShootingStars } from "@/components/sections/ShootingStars";
import { TopBanner } from "@/components/TopBanner";
import Link from "next/link";

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-anton", // Keeping variable name so we don't have to change all tailwind configs
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "GAG ORIGINALS - Aesthetic & Passion",
  description: "GAG ORIGINALS - Aesthetic & Passion. Community-driven streetwear based in Kerala. Oversized, high neck, and distinct silhouettes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${archivo.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${bangers.variable}`}>
      <body className="font-grotesk antialiased bg-gradient-to-b from-[#0a1532] via-[#030612] to-black text-white min-h-screen flex flex-col">
        {/* Night District Effects (Cursor, Grain, Preloader) */}
        <GlobalEffects />
        <ShootingStars />

        {/* Minimal Disappearing Banner */}
        <TopBanner />

        {/* Navigation sticky header */}
        <Nav />

        {/* Slide-out cart drawer overlay */}
        <CartDrawer />

        {/* Timed / exit-intent popup modal */}
        <LeadCaptureModal />

        {/* Main application page content */}
        <main className="flex-1">{children}</main>

        {/* Dynamic Contrasting Footer */}
        <footer className="relative overflow-hidden bg-white text-black mt-20 pt-20 pb-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-[1480px] mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
              {/* Brand details - Oversized */}
              <div className="w-full md:w-1/2">
                <span className="font-bangers text-[60px] md:text-[100px] leading-[0.85] block">
                  GAG <br/><span className="text-[#0a1532]">ORIGINALS</span>
                </span>
                <p className="font-mono text-[11px] uppercase tracking-widest text-black/60 mt-6 max-w-sm leading-relaxed">
                  Aesthetic & Passion. Community-driven streetwear based in Kerala. Built to move after dark.
                </p>
              </div>

              {/* Links - Asymmetrical right side */}
              <div className="w-full md:w-1/2 flex flex-col sm:flex-row md:justify-end gap-12 md:gap-24 mt-4 md:mt-0">
                <div>
                  <h5 className="font-bangers text-2xl tracking-widest text-flame mb-6 border-b-[3px] border-black pb-2 inline-block drop-shadow-[0_2px_0_rgba(0,0,0,1)]">NAVIGATE</h5>
                  <ul className="space-y-4 font-black text-[13px] tracking-widest uppercase">
                    <li><Link href="/shop" className="hover:text-flame transition-colors">ALL APPAREL</Link></li>
                    <li><Link href="/drops" className="hover:text-flame transition-colors">LATEST DROPS</Link></li>
                    <li><Link href="/lookbook" className="hover:text-flame transition-colors">LOOKBOOK</Link></li>
                    <li><Link href="/about" className="hover:text-flame transition-colors">ABOUT BRAND</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bangers text-2xl tracking-widest text-flame mb-6 border-b-[3px] border-black pb-2 inline-block drop-shadow-[0_2px_0_rgba(0,0,0,1)]">CONNECT</h5>
                  <ul className="space-y-4 font-black text-[13px] tracking-widest uppercase">
                    <li><a href="#" className="hover:text-flame transition-colors">WHATSAPP GROUP</a></li>
                    <li><Link href="/shipping" className="hover:text-flame transition-colors">SHIPPING</Link></li>
                    <li><Link href="/size-guide" className="hover:text-flame transition-colors">SIZE GUIDE</Link></li>
                    <li><Link href="/contact" className="hover:text-flame transition-colors">CONTACT</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Copyright and Payments */}
            <div className="pt-8 border-t-[3px] border-black flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-[0.1em] font-bold">
              <div className="flex flex-col md:flex-row md:gap-6 items-center text-black/70">
                <span>© {new Date().getFullYear()} GAG ORIGINALS. AESTHETIC & PASSION.</span>
                <span className="text-[#0a1532] mt-2 md:mt-0 font-black">WhatsApp: +91 6238-252068</span>
              </div>
              <div className="flex gap-4 text-black/40 text-[13px]">
                <span>VISA</span>
                <span>MASTERCARD</span>
                <span>APPLE PAY</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
