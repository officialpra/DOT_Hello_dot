"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import Image from "next/image";

const team = [
  { name: "Savine", loc: "Amsterdam", img: "/assets/images/0871864f-3af3-4261-b66d-1aaa97256d3c.jpg" },
  { name: "Jeppe", loc: "Aarhus", img: "/assets/images/1eac3a48-0d56-45b8-9606-f21cfcd91cf0.jpeg" },
  { name: "Erin", loc: "New York", img: "/assets/images/c9e296b7-6f82-486f-9929-e978f38a7853.jpeg" },
  { name: "Mads", loc: "Copenhagen", img: "/assets/images/Thumbnail_-_Image_-_Landscape.jpeg" },
  { name: "Andreas", loc: "Aarhus", img: "/assets/images/Thumbnail_-_Image_-_Landscape.jpg" },
  { name: "Johanne", loc: "Copenhagen", img: "/assets/images/39919464-0f7f-4b79-8d8f-1f877df7d599.png" },
];

const MondayteersSection = () => {
  return (
    <section id="mondayteers" className="py-24 md:py-48 px-8 md:px-12 bg-white border-t border-black/5 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="md:ml-[33%] mb-24 md:mb-32">
          <ScrollReveal delay={100}>
            <span className="text-[11px] font-medium opacity-40 uppercase tracking-widest block mb-4">
              We are the
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2 className="text-[60px] md:text-[110px] font-garamond font-normal leading-[0.8] mb-12 tracking-tight">
              Mondayteers
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="max-w-[800px] text-[18px] md:text-[22px] leading-[1.4] font-normal text-black tracking-tight opacity-90">
              If you are a true fan and combed your way through our website, you know from the first rule of our Code of Honour that Mondayteers are nice people. This is your chance to meet them:
            </p>
          </ScrollReveal>
        </div>

        {/* 3-Column Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={400 + i * 80} y={40}>
              <div className="flex flex-col group cursor-pointer">
                <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-black/5">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <h3 className="text-[28px] md:text-[32px] font-garamond italic leading-[1] mb-2">{member.name}</h3>
                <span className="text-[12px] font-bold opacity-40 uppercase tracking-widest">{member.loc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MondayteersSection;
