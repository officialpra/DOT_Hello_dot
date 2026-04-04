// src/components/cards/ProjectCard.jsx

import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-medium">{project.title}</h3>

        <div className="flex gap-2 text-sm text-neutral-500">
          {project.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
