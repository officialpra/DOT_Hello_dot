"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const AwardsSection = () => {
  const awards = [
    { name: "Cannes Lion", count: 8 },
    { name: "Webby Awards", count: 14 },
    { name: "D&AD", count: 5 },
    { name: "Creative Circle Awards", count: 48 },
    { name: "Eurobest awards", count: 2 },
    { name: "Awwwards", count: 58 },
  ];

  return (
    <section id="shiny-things" className="py-24 md:py-40 px-8 md:px-12 bg-white border-t border-black/10 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="md:ml-[33%] mb-32">
          <ScrollReveal delay={100}>
            <span className="text-[11px] font-medium opacity-40 uppercase tracking-widest block mb-4">
              We Got
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2 className="text-[60px] md:text-[110px] font-garamond font-normal leading-[0.8] mb-12 tracking-tight">
              Shiny Things
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="max-w-[700px] text-[18px] md:text-[22px] leading-[1.4] font-normal text-black tracking-tight">
              We’re supposed to say we’re humbled, but we’re actually proud when we win awards. They’re not a perfect measure of creativity (it's about happy users, not happy judges) but they’re a sign we’re doing something right.
            </p>
          </ScrollReveal>
        </div>

        {/* Awards List Grid - Matches Screenshot Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 md:ml-[33%] mb-12">
          {awards.map((award, i) => (
            <ScrollReveal key={award.name} delay={400 + i * 50}>
              <div className="flex justify-between items-end border-b border-black/10 pb-6 mb-12 group">
                <span className="text-[18px] md:text-[22px] font-sans font-light tracking-tight pb-3">
                  {award.name}
                </span>
                <span className="text-[60px] md:text-[110px] font-garamond font-normal leading-[0.7] text-black">
                  {award.count}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Giant FWA Count */}
        <div className="md:ml-[33%] border-b border-black/10 pb-6">
          <ScrollReveal delay={800}>
            <div className="flex justify-between items-end">
                <div className="pb-3">
                    <p className="text-[14px] md:text-[16px] font-bold uppercase tracking-tight leading-[1.2] opacity-60">FWA SOTD</p>
                    <p className="text-[14px] md:text-[16px] font-bold uppercase tracking-tight leading-[1.2] opacity-60">FWA Hall of Fame</p>
                </div>
                <span className="text-[70px] md:text-[140px] font-garamond font-normal leading-[0.7] tracking-tight">
                  121
                </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
