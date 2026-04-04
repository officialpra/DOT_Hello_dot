"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#f5f5f5] overflow-hidden px-6">
      {/* ── Top Navigation Area ── */}
      <div className="absolute top-0 left-0 right-0 p-8 md:p-10 flex justify-between items-start z-10">
        {/* Top-Left: Logo */}
        <div className="select-none">
          <p className="text-black font-sans font-bold leading-[1.2] text-[11px] md:text-[13px] tracking-tight">
            HELLO<br />MONDAY<br />/DEPT.
          </p>
        </div>

        {/* Top-Right: Info Label */}
        <div className="flex items-center gap-2 opacity-60">
          <div className="w-4 h-4 border border-black/80 flex items-center justify-center p-[2px]">
            <div className="w-full h-full bg-black/10" />
          </div>
          <p className="text-black font-sans text-[10px] md:text-[11px] font-medium tracking-wide">
            2 days until Monday
          </p>
        </div>
      </div>

      {/* ── Center Content ── */}
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Center Illustration (Video) */}
        <div className="relative w-[320px] md:w-[480px] lg:w-[560px] aspect-square flex items-center justify-center mb-10 md:mb-14">
          <video
            src="/assets/images/hm-hero-mobile-non-retina.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain select-none mix-blend-multiply"
          />
        </div>

        {/* Tagline */}
        <p className="text-[12px] md:text-[14px] text-black/60 font-sans tracking-wide text-center mb-4">
          We make digital (and magical)...
        </p>

        {/* Main Heading */}
        <div className="flex flex-col items-center">
          <h1
            className="font-garamond text-black text-center select-none"
            style={{
              fontSize: "clamp(64px, 12vw, 160px)",
              lineHeight: 0.9,
              fontWeight: 400,
              letterSpacing: "-0.01em"
            }}
          >
            Experiences
          </h1>

          {/* Decorative Dot */}
          <div className="mt-6 md:mt-8">
            <span className="block w-[6px] h-[6px] rounded-full bg-black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
