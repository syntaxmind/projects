"use client";
import React, { useEffect, useState } from "react";
import { X, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LeadCaptureModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the user has already seen or closed the lead capture modal
    const hasSeen = localStorage.getItem("gag_lead_shown");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("gag_lead_shown", "true");
      }, 5000); // Trigger 5 seconds after page load

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitted(true);
    localStorage.setItem("gag_lead_captured", "true");

    // Close the modal after a short delay to let success animation play out
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Modal Card */}
      <div className="bg-gag-dark border border-gag-border p-8 md:p-12 max-w-md w-full relative shadow-2xl flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gag-concrete hover:text-gag-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Tagline */}
            <span className="text-[10px] font-black tracking-widest text-gag-yellow border border-gag-yellow/30 px-3 py-1 bg-gag-black/50 mb-6 uppercase">
              10% Off Your First Drop
            </span>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gag-white uppercase mb-4 leading-none">
              JOIN THE GAG SYNDICATE
            </h2>

            {/* Description */}
            <p className="text-gag-concrete text-xs md:text-sm leading-relaxed mb-8">
              Enter your email to secure early access codes to future drops, exclusive designs, and restocking notifications.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gag-black border border-gag-border text-gag-white px-4 py-3 text-xs font-bold tracking-widest uppercase placeholder-gag-concrete/50 focus:outline-none focus:border-gag-yellow transition-colors"
                />
              </div>
              <Button type="submit" variant="yellow" className="flex items-center justify-center gap-2">
                Subscribe <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center">
            {/* Success icon check */}
            <div className="w-16 h-16 bg-gag-yellow text-gag-black flex items-center justify-center rounded-full mb-6 text-3xl font-bold animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-gag-white tracking-widest uppercase mb-2">
              YOU ARE IN
            </h3>
            <p className="text-gag-concrete text-xs uppercase tracking-widest">
              Check your inbox for the 10% discount code
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
