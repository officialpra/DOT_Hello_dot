"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import Image from "next/image";
import { OFFICES } from "@/data/offices";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-8 md:px-12 bg-white scroll-mt-20 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left: Illustration */}
        <div className="hidden md:flex md:col-span-4 justify-start items-start">
          <ScrollReveal delay={100} y={40}>
            <div className="relative w-[300px] h-[300px] mix-blend-multiply grayscale">
              <Image 
                src="/assets/images/footerAnimationgif.gif" 
                alt="Contact Illustration" 
                fill 
                className="object-contain"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Office List */}
        <div className="col-span-full md:col-span-8 flex flex-col gap-24">
          {OFFICES.map((office, i) => (
            <ScrollReveal key={office.city} delay={200 + i * 100}>
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-[48px] md:text-[80px] font-garamond font-normal leading-tight tracking-tight">
                  {office.city}
                </h2>
                <div className="flex flex-col gap-2 text-[14px] md:text-[16px] leading-[1.6] text-black/80 font-normal">
                  <p className="whitespace-pre-line">{office.address}</p>
                  <p className="font-bold opacity-60">Tel: {office.tel}</p>
                  <a 
                    href={`mailto:hello@hellomonday.com`} 
                    className="text-black border-b border-black w-fit hover:opacity-50 transition-opacity mt-4 font-bold"
                  >
                    hello@hellomonday.com
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
