import Container from "@/components/common/Container";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/cards/ProjectCard";

const ProductPromoSection = () => {
  return (
    <section className="product-promo-section py-20">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-10">
        {PROJECTS.map((project) => (
          <div key={project.slug} className="mb-10 break-inside-avoid">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPromoSection;
