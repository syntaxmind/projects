export default function SizeGuidePage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Perfect Fit
        </p>
        <h1 className="text-gag-white font-display text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
          Size Guide
        </h1>

        <p className="text-gag-concrete text-sm leading-relaxed mb-10">
          All GAG Originals pieces feature an oversized, relaxed fit. Measurements
          below are in centimeters. When in doubt, size down for a less oversized look.
        </p>

        {/* Oversized Tees */}
        <div className="mb-12">
          <h2 className="text-gag-white font-display text-xl font-black tracking-tight uppercase mb-6">
            Oversized Tees
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gag-border">
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3 pr-6">Size</th>
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3 pr-6">Chest (cm)</th>
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3 pr-6">Length (cm)</th>
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3">Sleeve (cm)</th>
                </tr>
              </thead>
              <tbody className="text-gag-white">
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">S</td><td className="py-3 pr-6">112</td><td className="py-3 pr-6">72</td><td className="py-3">24</td></tr>
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">M</td><td className="py-3 pr-6">118</td><td className="py-3 pr-6">74</td><td className="py-3">25</td></tr>
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">L</td><td className="py-3 pr-6">124</td><td className="py-3 pr-6">76</td><td className="py-3">26</td></tr>
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">XL</td><td className="py-3 pr-6">130</td><td className="py-3 pr-6">78</td><td className="py-3">27</td></tr>
                <tr><td className="py-3 pr-6">XXL</td><td className="py-3 pr-6">136</td><td className="py-3 pr-6">80</td><td className="py-3">28</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hoodies */}
        <div className="mb-12">
          <h2 className="text-gag-white font-display text-xl font-black tracking-tight uppercase mb-6">
            Hoodies &amp; Sweatshirts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gag-border">
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3 pr-6">Size</th>
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3 pr-6">Chest (cm)</th>
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3 pr-6">Length (cm)</th>
                  <th className="text-left text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase py-3">Sleeve (cm)</th>
                </tr>
              </thead>
              <tbody className="text-gag-white">
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">S</td><td className="py-3 pr-6">116</td><td className="py-3 pr-6">68</td><td className="py-3">60</td></tr>
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">M</td><td className="py-3 pr-6">122</td><td className="py-3 pr-6">70</td><td className="py-3">62</td></tr>
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">L</td><td className="py-3 pr-6">128</td><td className="py-3 pr-6">72</td><td className="py-3">64</td></tr>
                <tr className="border-b border-gag-border/50"><td className="py-3 pr-6">XL</td><td className="py-3 pr-6">134</td><td className="py-3 pr-6">74</td><td className="py-3">66</td></tr>
                <tr><td className="py-3 pr-6">XXL</td><td className="py-3 pr-6">140</td><td className="py-3 pr-6">76</td><td className="py-3">68</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gag-border pt-8">
          <p className="text-gag-concrete text-xs leading-relaxed">
            Need help picking a size? DM us on WhatsApp at{" "}
            <span className="text-gag-white font-bold">+91 6238-252068</span>{" "}
            with your height and weight and we&apos;ll recommend the perfect fit.
          </p>
        </div>
      </div>
    </div>
  );
}
