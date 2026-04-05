"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import ProjectCard from "@/components/cards/ProjectCard";
import Image from "next/image";

const ServiceSection = ({ id, label, title, description, linkText, projects, illustration }) => {
  // Only show the first two "portrait" projects as requested
  const displayProjects = projects
    .filter(p => p.size === "portrait")
    .slice(0, 2);

  return (
    <section id={id} className="py-24 md:py-32 px-8 md:px-12 bg-white scroll-mt-20">
      <div className="max-w-[1400px] mx-auto border-t border-black/10 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Illustration Column - Hidden on mobile as per design reference */}
          <div className="hidden md:flex md:col-span-4 justify-start">
            <ScrollReveal delay={100} y={40}>
              <div className="relative w-[350px] h-[350px] md:mt-[-40px]">
                <Image 
                  src={illustration} 
                  alt={title} 
                  fill 
                  className="object-contain"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Content Column - Full width on mobile, col-span-8 on tablet+ */}
          <div className="col-span-full md:col-span-8 flex flex-col items-start pt-4 md:pt-0">
            <ScrollReveal delay={150}>
              <span className="text-[11px] font-medium opacity-40 uppercase tracking-widest block mb-4">
                {label}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <h2 className="text-[60px] md:text-[8vw] font-garamond font-normal leading-[0.85] mb-8 md:mb-12 tracking-tight">
                {title}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <p className="max-w-[700px] text-[18px] md:text-[22px] leading-[1.5] mb-8 md:mb-12 font-normal text-black/85 tracking-tight">
                {description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={450}>
              <a 
                href="#" 
                className="text-[13px] font-bold uppercase border-b-[3px] border-black pb-1 hover:opacity-50 transition-all duration-300 mb-12 md:mb-16"
              >
                {linkText}
              </a>
            </ScrollReveal>

            {/* Always 2-Column Card Grid (matches mobile reference image) */}
            <div className="w-full grid grid-cols-2 gap-4 md:gap-12 mt-4">
               {displayProjects.map((p, i) => (
                 <ScrollReveal key={p.slug} delay={500 + i * 100} duration={800} y={50}>
                   <ProjectCard project={p} />
                 </ScrollReveal>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
