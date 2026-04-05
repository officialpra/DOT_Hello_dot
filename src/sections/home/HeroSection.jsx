"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const words = ["Experiences", "Products", "Branding"];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Force video play — safety net for browsers with strict autoPlay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // If play() fails (e.g. browser policy), wait for user interaction
      const resume = () => { video.play(); document.removeEventListener("click", resume); };
      document.addEventListener("click", resume, { once: true });
    });
  }, []);

  return (
    <section className="relative h-screen w-full bg-white overflow-hidden px-6 flex flex-col">

      {/* Top Nav */}
      <div className="absolute top-0 left-0 right-0 px-8 md:px-10 py-8 flex justify-between items-start z-10">
        <p className="font-bold text-[12px] leading-[1.1]">
          HELLO<br />MONDAY<br />/DEPT.
        </p>

        <p className="text-[11px] opacity-60">
          2 days until Monday
        </p>
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* Video */}
        <div className="w-[260px] md:w-[420px] lg:w-[500px] mb-8">
          <video
            ref={videoRef}
            src="/assets/images/hm-hero-mobile-non-retina.mp4"
            autoPlay
            loop
            muted
            playsInline
            onEnded={(e) => e.target.play()} // extra loop fallback
            className="w-full mix-blend-multiply"
          />
        </div>

        {/* Tagline */}
        <p className="text-[12px] text-black/60 mb-3">
          We make digital (and magical)...
        </p>

        <div className="relative h-[160px] md:h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute text-black text-center font-garamond"
              style={{
                fontSize: "clamp(32px, 11vw, 100px)",
                lineHeight: 0.85,
                fontWeight: 400,
                letterSpacing: "-0.02em"
              }}
            >
              {words[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Dot */}
        {/* <div className="mt-6">
          <span className="block w-[5px] h-[5px] bg-black rounded-full" />
        </div> */}

      </div>
    </section>
  );
};

export default HeroSection;