"use client";

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gag-black">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <p className="text-gag-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Get In Touch
        </p>
        <h1 className="text-gag-white font-display text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-transparent border border-gag-border text-gag-white text-sm px-4 py-3 focus:border-gag-blue focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent border border-gag-border text-gag-white text-sm px-4 py-3 focus:border-gag-blue focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gag-concrete text-[10px] font-black tracking-[0.2em] uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full bg-transparent border border-gag-border text-gag-white text-sm px-4 py-3 focus:border-gag-blue focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gag-white text-gag-black font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-gag-blue hover:text-gag-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-gag-white font-display text-sm font-black tracking-tight uppercase mb-2">
                WhatsApp
              </h3>
              <p className="text-gag-concrete text-sm">+91 6238-252068</p>
            </div>
            <div>
              <h3 className="text-gag-white font-display text-sm font-black tracking-tight uppercase mb-2">
                Location
              </h3>
              <p className="text-gag-concrete text-sm">Kerala, India</p>
            </div>
            <div>
              <h3 className="text-gag-white font-display text-sm font-black tracking-tight uppercase mb-2">
                Response Time
              </h3>
              <p className="text-gag-concrete text-sm">
                We typically respond within 24 hours. For fastest support, reach out on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
