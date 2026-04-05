"use client";

import ProjectCard from "@/components/cards/ProjectCard";
import { PROJECTS } from "@/data/projects";

const FeaturedProjectsSection = () => {
  // Distribute projects into 3 columns
  const col1 = PROJECTS.filter((_, i) => i % 3 === 0);
  const col2 = PROJECTS.filter((_, i) => i % 3 === 1);
  const col3 = PROJECTS.filter((_, i) => i % 3 === 2);

  return (
    <section className=" pt-20 pb-24 px-8 md:px-10 mt-[100px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        {/* <div className="mb-20">
          <h2 className="font-garamond text-[ clamp(32px,5vw,72px) ] text-black font-normal leading-none tracking-tight">
            Branding
          </h2>
        </div> */}

        {/* Masonry-style Grid (3 Flex Columns with 83px gap) */}
        <div className="flex flex-col md:flex-row gap-[83px]">
          <div className="flex-1 flex flex-col gap-[83px]">
            {col1.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
          <div className="flex-1 flex flex-col gap-[83px]">
            {col2.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
          <div className="flex-1 flex flex-col gap-[83px]">
            {col3.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
