"use client";

import { useMemo } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { PROJECTS } from "@/data/projects";

const FeaturedProjectsSection = ({ filter }) => {
  const filteredProjects = useMemo(() => {
    if (!filter) return PROJECTS;

    const normalizedFilter = filter.toLowerCase().endsWith('s') 
      ? filter.slice(0, -1).toLowerCase() 
      : filter.toLowerCase();

    return PROJECTS.filter(project =>
      project.tags.some(tag => tag.toLowerCase() === normalizedFilter)
    );
  }, [filter]);

  // Distribute projects into 3 columns
  const col1 = filteredProjects.filter((_, i) => i % 3 === 0);
  const col2 = filteredProjects.filter((_, i) => i % 3 === 1);
  const col3 = filteredProjects.filter((_, i) => i % 3 === 2);

  return (
    <section className="pt-[120px] pb-24 px-8 md:px-10 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[83px]">
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-[83px]">
            {col1.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 80} duration={800} y={50}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-[83px]">
            {col2.map((p, i) => (
              <ScrollReveal key={p.slug} delay={120 + i * 80} duration={800} y={50}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>

          {/* Column 3 */}
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
