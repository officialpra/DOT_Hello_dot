
"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import FeaturedProjectsSection from "@/sections/home/FeaturedProjectsSection";
import { fadeUp } from "@/lib/animations";

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState("Experiences");

  const filters = ["Products", "Experiences", "Branding"];

  return <div className="min-h-screen">

    <div className="w-full flex justify-between items-start px-8 md:px-12 py-10 uppercase select-none">
      <motion.div 
        {...fadeUp(0.1)}
        className="font-bold text-[13px] leading-[1.05] tracking-tight"
      >
        HELLO<br />MONDAY<br />/DEPT.
      </motion.div>

      <motion.div 
        {...fadeUp(0.25)}
        className="flex gap-12 md:gap-20 items-start justify-end"
      >
        <span className="text-[11px] font-medium opacity-40 tracking-wider pt-[3px]">
          Filter:
        </span>

        <ul className="flex flex-col gap-1 text-[13px] font-bold tracking-tight">
          {filters.map((filter) => (
            <li
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`relative flex items-center group cursor-pointer transition-all duration-300 ${
                selectedFilter === filter ? "opacity-100" : "opacity-40 hover:opacity-100"
              }`}
            >
              {selectedFilter === filter && (
                <span className="absolute -left-4 w-[6px] h-[6px] rounded-full bg-black"></span>
              )}
              <span>{filter}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <div></div>
    </div>
    
    <FeaturedProjectsSection filter={selectedFilter} />

  </div>;
}
