"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const AboutHero = () => {
  const jumpAheadItems = ["Contact", "Code of Honor", "Mondayteers"];

  const scrollToSection = (id) => {
    const sectionId = id.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(sectionId);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -50, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="pt-24 pb-32 px-8 md:px-12 bg-white">
      {/* Top Header Row (Logo + Jump ahead) */}
      <div className="flex justify-between items-start mb-32 md:mb-48">
        <motion.div
          {...fadeUp(0.1)}
          className="font-bold text-[13px] leading-[1.05] tracking-tight uppercase"
        >
          HELLO<br />MONDAY<br />/DEPT.
        </motion.div>

        <motion.div
          {...fadeUp(0.2)}
          className="flex gap-8 md:gap-16 items-start"
        >
          <span className="text-[11px] font-medium opacity-40 uppercase tracking-widest pt-[2px]">Jump ahead:</span>
          <ul className="flex flex-col gap-1 text-[13px] font-bold uppercase tracking-tight">
            {jumpAheadItems.map((item) => (
              <li
                key={item}
                onClick={() => scrollToSection(item)}
                className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <div></div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto">
        <motion.h1
          {...fadeUp(0.35)}
          className="text-[11vw] font-garamond font-normal tracking-[-0.03em] leading-[0.85] mb-12"
        >
          Who we are
        </motion.h1>

        <div className="flex justify-end pr-0 md:pr-[10%]">
          <motion.div
            {...fadeUp(0.5)}
            className="max-w-[650px]"
          >
            <p className="text-[20px] md:text-[28px] font-normal leading-[1.3] text-black tracking-tight mb-8">
              HELLO MONDAY/DEPT® is a creative studio that makes digital (and magical) ideas, products and experiences.
            </p>
            <p className="text-[18px] md:text-[22px] font-normal leading-[1.5] text-black/80 tracking-tight">
              We're called Hello Monday because we aim to make Mondays better. Better for the people and organizations we collaborate with, better for their users, better for us, and better for our planet. That might be a lot of pressure to put on design and technology, but we asked them and they're totally okay with it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
