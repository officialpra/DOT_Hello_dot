"use client";

import ProjectCard from "@/components/cards/ProjectCard";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { PROJECTS } from "@/data/projects";

const FeaturedProjectsSection = () => {
  // Distribute projects into 3 columns
  const col1 = PROJECTS.filter((_, i) => i % 3 === 0);
  const col2 = PROJECTS.filter((_, i) => i % 3 === 1);
  const col3 = PROJECTS.filter((_, i) => i % 3 === 2);

  return (
    <section className="pt-[120px] pb-24 px-8 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Masonry-style Grid (3 Flex Columns with 83px gap) */}
        <div className="flex flex-col md:flex-row gap-[83px]">

          {/* Column 1 — base delay */}
          <div className="flex-1 flex flex-col gap-[83px]">
            {col1.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 80} duration={800} y={50}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>

          {/* Column 2 — slight stagger offset */}
          <div className="flex-1 flex flex-col gap-[83px]">
            {col2.map((p, i) => (
              <ScrollReveal key={p.slug} delay={120 + i * 80} duration={800} y={50}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>

          {/* Column 3 — furthest stagger */}
          <div className="flex-1 flex flex-col gap-[83px]">
            {col3.map((p, i) => (
              <ScrollReveal key={p.slug} delay={240 + i * 80} duration={800} y={50}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
