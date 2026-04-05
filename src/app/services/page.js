"use client";

import ServicesHero from "@/sections/services/ServicesHero";
import ServiceSection from "@/sections/services/ServiceSection";
import AwardsSection from "@/sections/services/AwardsSection";
import { PROJECTS } from "@/data/projects";

export default function ServicesPage() {
  // Filter projects for each section
  const productProjects = PROJECTS.filter(p => p.tags.includes("Product"));
  const experienceProjects = PROJECTS.filter(p => p.tags.includes("Experience"));
  const brandingProjects = PROJECTS.filter(p => p.tags.includes("Branding"));

  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* 2. Products Section */}
      <ServiceSection
        id="products"
        label="We make (digital)"
        title="Products"
        description="We make better products and make products better. From design and innovation sprints to UX design sprints and marathons, we create things that work for users and brands. Our approach was agile before they called it agile, finding innovation through structured ideation, prototyping and user-testing."
        linkText="View Digital Products"
        projects={productProjects}
        illustration="/assets/images/branding_GIF.gif"
      />

      {/* 3. Experiences Section */}
      <ServiceSection
        id="experiences"
        label="We make (digital)"
        title="Experiences"
        description="We tell stories with images, film, 360, virtual reality, augmented reality, 3D graphics and that magical technology called language. We don't see a dividing line between 'digital' and 'real' – do it right and digital is real. Immersive, emotional, joyful, memorable, magical."
        linkText="View Digital Experiences"
        projects={experienceProjects}
        illustration="/assets/images/branding_GIF.gif"
      />

      {/* 4. Branding Section */}
      <ServiceSection
        id="branding"
        label="We make"
        title="Branding"
        description="Brands are ideas that keep growing. We think of them like machine learning. When you build a brand, you build in the power to adapt and evolve. We create the building blocks: the strategy, symbol, logotype, typography, color scheme, iconography, illustration style, visuals, animations, photography style, and tone of voice."
        linkText="View Branding"
        projects={brandingProjects}
        illustration="/assets/images/branding_GIF.gif"
      />

      {/* 5. Awards Section */}
      <AwardsSection />
    </main>
  );
}
