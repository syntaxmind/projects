import { LookbookGrid } from "@/components/sections/LookbookGrid";

export default function LookbookPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <h1 className="text-gag-white font-display text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">
          Lookbook
        </h1>
        <p className="text-gag-concrete text-xs uppercase tracking-widest">
          Editorial campaigns and brand highlights
        </p>
      </div>
      <LookbookGrid />
    </div>
  );
}
