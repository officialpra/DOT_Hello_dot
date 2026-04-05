"use client";

import AboutHero from "@/sections/about/AboutHero";
import ContactSection from "@/sections/about/ContactSection";
import CodeOfHonorSection from "@/sections/about/CodeOfHonorSection";
import MondayteersSection from "@/sections/about/MondayteersSection";

export default function AboutPage() {
  return (
    <main className="bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Contact / Offices */}
      <ContactSection />

      {/* 3. Code of Honor */}
      <CodeOfHonorSection />

      {/* 4. Mondayteers / Team */}
      <MondayteersSection />
    </main>
  );
}
