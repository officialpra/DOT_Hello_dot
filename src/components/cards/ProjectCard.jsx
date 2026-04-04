"use client";

import Image from "next/image";

export default function ProjectCard({ project }) {
  const isPortrait = project.size === "portrait";

  return (
    <div className="group cursor-pointer w-full">
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-neutral-100 mb-4 transition-all duration-500 ease-out`}
        style={{ aspectRatio: isPortrait ? "4/4.5" : "1.5/0.8" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <div className="relative inline-block">
          {/* Signature Dot (Appears on card hover) */}
          <div
            className="absolute -left-[18px] top-[14px] w-[5px] h-[5px] bg-black rounded-full opacity-0 scale-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100 group-hover:scale-100"
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
  );
}
