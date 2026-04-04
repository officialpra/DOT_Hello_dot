"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const words = [
  "Branding",
  "Design",
  "Products",
  "Strategy",
  "Digital",
  "Creative",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      // After fade out, change word & fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 450);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] w-full flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="pt-20 md:pt-16 flex flex-col items-center w-full px-6">
        {/* ── Hero Animation Video ── */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: "min(360px, 72vw)" }}
        >
          <video
            src="/assets/images/hm-hero-mobile-non-retina.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain select-none"
          />
        </div>

        {/* ── Subtitle ── */}
        <p className="mt-8 mb-2 text-[11px] md:text-sm text-gray-400 tracking-wide text-center">
          <span className="text-[#E8521A]">W</span>
          {"e make digital "}
          <span className="text-[#E8521A]">(and magical)</span>
          {"..."}
        </p>

        {/* ── Rotating Word ── */}
        <div
          className="flex items-center justify-center"
          style={{ height: "clamp(72px, 10vw, 120px)" }}
        >
          <h1
            className="font-garamond font-normal text-black text-center select-none"
            style={{
              fontSize: "clamp(56px, 8.5vw, 108px)",
              lineHeight: 1.05,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0px)" : "translateY(14px)",
              transition:
                "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {words[currentIndex]}
          </h1>
        </div>

        {/* ── Dot indicator ── */}
        <div className="mt-5">
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-black" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
