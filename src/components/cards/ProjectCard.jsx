import React, { useRef, useState } from "react";
import Image from "next/image";
import LiquidMedia from "@/components/effects/LiquidMedia";

export default function ProjectCard({ project }) {
  const isPortrait = project.size === "portrait";
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // WebGL needs normalized coordinates (0.0 to 1.0)
    const x = (e.clientX - rect.left) / rect.width;
    // WebGL's Y-axis is flipped compared to the browser DOM
    const y = 1.0 - ((e.clientY - rect.top) / rect.height);

    setMousePos({ x, y });
  };

  return (
    <div className="relative w-full group">
      {/*  INVISIBLE SENSOR (Expands hover trigger area by 50px) */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="absolute -inset-[50px] z-10 cursor-pointer"
      />

      {/*VISUAL CARD (Safe from layout shifts) */}
      <div
        ref={cardRef}
        className="relative w-full pointer-events-none"
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden  mb-4 transition-all duration-500 ease-out`}
          style={{ aspectRatio: isPortrait ? "4/4.5" : "1.5/0.8" }}
        >
          {/* Liquid WebGL Effect replaces static next/image */}
          <LiquidMedia
            hovered={hovered}
            mousePos={mousePos}
            imagePath={project.image}
          />

          {/* Fallback/Overlay for SEO - Opacity 0 but technically present */}
          <div className="opacity-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="relative inline-block">
            {/* Signature Dot (Appears on card hover) */}
            <div
              className="absolute -left-[18px] top-[14px] w-[5px] h-[5px]  rounded-full opacity-0 scale-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100 group-hover:scale-100"
            />
            <h3 className="text-[23px] font-garamond font-light text-black tracking-tight leading-[1.2]">
              {project.title}
            </h3>
          </div>

          <div className="flex gap-2 text-[13px] font-sans text-black/40">
            {project.tags.map((tag, i) => (
              <span key={i}>{tag}{i < project.tags.length - 1 ? "," : ""}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
