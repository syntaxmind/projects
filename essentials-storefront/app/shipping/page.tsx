export default function ShippingPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Delivery Info
        </p>
        <h1 className="text-gag-white font-display text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
          Shipping &amp; Returns
        </h1>

        <div className="space-y-12">
          {/* Shipping */}
          <section>
            <h2 className="text-gag-white font-display text-xl font-black tracking-tight uppercase mb-4">
              Shipping
            </h2>
            <div className="space-y-4 text-gag-concrete text-sm leading-relaxed">
              <p>
                All orders are processed within <span className="text-gag-white font-bold">1-2 business days</span>.
                Once shipped, you will receive a tracking number via WhatsApp or email.
              </p>
              <div className="border border-gag-border rounded-lg overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gag-border/50">
                  <span>India — Standard</span>
                  <span className="text-gag-white font-bold">5-7 days</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-b border-gag-border/50">
                  <span>India — Express</span>
                  <span className="text-gag-white font-bold">2-3 days</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3">
                  <span>Kerala (Local)</span>
                  <span className="text-gag-white font-bold">1-2 days</span>
                </div>
              </div>
              <p>
                Free shipping on orders above <span className="text-gag-white font-bold">&#8377;1,499</span>.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section>
            <h2 className="text-gag-white font-display text-xl font-black tracking-tight uppercase mb-4">
              Returns &amp; Exchanges
            </h2>
            <div className="space-y-4 text-gag-concrete text-sm leading-relaxed">
              <p>
                We accept returns and exchanges within <span className="text-gag-white font-bold">7 days</span> of
                delivery. Items must be unworn, unwashed, and in original packaging with tags attached.
              </p>
              <p>
                To initiate a return or exchange, message us on WhatsApp at{" "}
                <span className="text-gag-white font-bold">+91 6238-252068</span> with
                your order number and reason for return.
              </p>
            </div>
          </section>

          {/* Refunds */}
          <section>
            <h2 className="text-gag-white font-display text-xl font-black tracking-tight uppercase mb-4">
              Refunds
            </h2>
            <p className="text-gag-concrete text-sm leading-relaxed">
              Once your return is received and inspected, refunds are processed within{" "}
              <span className="text-gag-white font-bold">5-7 business days</span> to your original
              payment method.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
