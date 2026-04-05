"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const CodeOfHonorSection = () => {
  const honorItems = [
    { num: "01", title: "Be nice" },
    { num: "02", title: "Use our powers for good" },
    { num: "03", title: "Try the truth" },
    { num: "04", title: "Enjoy the ride" },
    { num: "05", title: "Speak up and listen" },
    { num: "06", title: "Solve the problem" },
    { num: "07", title: "Help each other" },
    { num: "08", title: "Team up" },
  ];

  return (
    <section id="code-of-honor" className="py-24 md:py-48 px-8 md:px-12 bg-white border-t border-black/5 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="md:ml-[33%] mb-24 md:mb-32">
          <ScrollReveal delay={100}>
            <span className="text-[11px] font-medium opacity-40 tracking-widest block mb-4">
              Yes, we have a Code of Honor
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2 className="text-[60px] md:text-[110px] font-garamond font-normal leading-[0.8] mb-12 tracking-tight">
              Code of Honor
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="max-w-[700px] text-[18px] md:text-[22px] leading-[1.4] font-normal text-black tracking-tight">
              We are here to make Monday a happy place. The day when you get excited about returning to work and achieving great things together. Mostly that happens on instinct. But we find it helps to write some of it down. Here are eight things we have learned – think of it as the source code for Hello Monday.
            </p>
          </ScrollReveal>
        </div>

        {/* 3-Column Grid for Honor Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-black/5">
          {honorItems.map((item, i) => (
            <ScrollReveal key={item.num} delay={400 + i * 50}>
              <div 
                className="group border-b border-black/5 p-8 md:p-12 hover:bg-black/5 transition-colors cursor-default relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-12">
                   <span className="text-[14px] font-bold opacity-30 tracking-tight">{item.num}</span>
                   <span className="text-[20px] font-light opacity-30 group-hover:opacity-100 transition-opacity">+</span>
                </div>
                <h3 className="text-[32px] md:text-[36px] font-garamond italic leading-[1] tracking-tight group-hover:pl-4 transition-all duration-500">
                  {item.title}
                </h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodeOfHonorSection;
