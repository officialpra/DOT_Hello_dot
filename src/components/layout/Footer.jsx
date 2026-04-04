"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
    // Simulate lazy loading for the footer image
    const timer = setTimeout(() => {
      setIsLazyLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f8f6f5] pt-[60px] md:pt-[71px]">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Section - Logo/Image */}
          <div className="md:col-span-4 relative pb-[37px] hidden md:block">
            <Image
              src="/assets/images/footerAnimationgif.gif"
              alt="Logo"
              width={250}
              height={197}
              className={`absolute right-0 md:top-[-20px] top-[77px] transition-opacity duration-1000 ${isLazyLoaded ? 'opacity-100' : 'opacity-1'}`}
            />
          </div>

          {/* Right Section - Contact and Office Info */}
          <div className="md:col-span-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-2">
              {/* Left Column */}
              <div>
                {/* Collaboration Section */}
                <div className="border-t border-[#cacaca] pt-[9px] pb-[60px] md:pb-[50px] cursor-pointer select-none">
                  <p className="text-[14px] leading-[1.43] text-black opacity-50 mb-[25px] md:mb-[16px] font-sans">
                    Want to collaborate?
                  </p>
                  <p className="text-[14px] leading-[1.57] text-black pointer-events-none">
                    Work with us<br />
                    <span className="font-[ClarendonBTWXX-Light] text-[18px] leading-[1.39] text-black pointer-events-none">
                      newbusiness@hellomonday.com
                    </span>
                  </p>
                </div>

                {/* Join Us Section */}
                <div className="border-t border-[#cacaca] pt-[9px] pb-[60px] md:pb-[50px] cursor-pointer select-none">
                  <p className="text-[14px] leading-[1.43] text-black opacity-50 mb-[25px] md:mb-[16px] font-sans">
                    Want to join us?
                  </p>
                  <p className="text-[14px] leading-[1.57] text-black pointer-events-none">
                    Become a Mondayteer<br />
                    <span className="font-[ClarendonBTWXX-Light] text-[18px] leading-[1.39] text-black pointer-events-none">
                      Apply here
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* General Inquiries Section */}
                <div className="border-t border-[#cacaca] pt-[9px] pb-[60px] md:pb-[50px] cursor-pointer select-none">
                  <p className="text-[14px] leading-[1.43] text-black opacity-50 mb-[25px] md:mb-[16px] font-sans">
                    Want to say hi?
                  </p>
                  <p className="text-[14px] leading-[1.57] text-black pointer-events-none">
                    General inquiries<br />
                    <span className="font-[ClarendonBTWXX-Light] text-[18px] leading-[1.39] text-black pointer-events-none">
                      hello@hellomonday.com
                    </span>
                  </p>
                </div>

                {/* Intern Section */}
                <div className="border-t border-[#cacaca] pt-[9px] pb-[60px] md:pb-[50px] mb-[10px] cursor-pointer select-none">
                  <p className="text-[14px] leading-[1.43] text-black opacity-50 mb-[25px] md:mb-[16px] font-sans">
                    Want to learn?
                  </p>
                  <p className="text-[14px] leading-[1.57] text-black pointer-events-none">
                    Become an intern<br />
                    <span className="font-[ClarendonBTWXX-Light] text-[18px] leading-[1.39] text-black pointer-events-none">
                      Apply here
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Visit Section - Office Locations */}
            <div className="w-full relative">
              <p className="text-[14px] leading-[1.43] text-black opacity-50 mb-[25px] md:mb-[16px] font-sans">
                View on maps
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-4">
                {/* Left Column - Offices */}
                <div>
                  {/* New York Office */}
                  <a 
                    className="min-w-[180px] w-full pb-[27px] md:pb-[47px] cursor-pointer block"
                    // href="https://www.google.com/maps/place/Hello+Monday/@40.7385487,-73.9908801,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2598a2e1e0395:0x59d0e9a5cd05d207!8m2!3d40.7385487!4d-73.9886861"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-[ClarendonBTWXX-Light] text-[18px] font-light leading-[1.39] text-[#2c2d2e] mb-[7px]">
                      New York
                    </p>
                    <p className="text-[14px] leading-[1.29] text-black opacity-50">
                      36 East 20th St, 6th Floor<br />
                      New York, NY 10003<br />
                      Tel: +1 917 818-4282
                    </p>
                  </a>

                  {/* Aarhus Office */}
                  <a 
                    className="min-w-[180px] w-full pb-[27px] md:pb-[47px] cursor-pointer block"
                    // href="https://www.google.com/maps/place/Hello+Monday/@56.1500968,10.2030539,17z/data=!4m13!1m7!3m6!1s0x464c3f8dc17e752d:0x89536a5252bed856!2sBaneg%C3%A5rdspladsen+20A,+1.tv,+8000+Aarhus!3b1!8m2!3d56.150078!4d10.2027439!3m4!1s0x464c3f8dc17e752d:0x62f4201f2d2c96e!8m2!3d56.150078!4d10.2027439"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-[ClarendonBTWXX-Light] text-[18px] font-light leading-[1.39] text-[#2c2d2e] mb-[7px]">
                      Aarhus
                    </p>
                    <p className="text-[14px] leading-[1.29] text-black opacity-50">
                      Banegardspladsen 20A, 1.TV<br />
                      8000 Aarhus C<br />
                      Tel: +45 6015 4515
                    </p>
                  </a>
                </div>

                {/* Right Column - Offices */}
                <div>
                  {/* Copenhagen Office */}
                  <a 
                    className="min-w-[180px] w-full pb-[27px] md:pb-[47px] cursor-pointer block"
                    // href="https://www.google.com/maps/place/Hello+Monday/@55.6658995,12.5783361,17z/data=!3m1!4b1!4m5!3m4!1s0x46525311dc95031f:0x653c028e0411e843!8m2!3d55.6658995!4d12.5805301"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-[ClarendonBTWXX-Light] text-[18px] font-light leading-[1.39] text-[#2c2d2e] mb-[7px]">
                      Copenhagen
                    </p>
                    <p className="text-[14px] leading-[1.29] text-black opacity-50">
                      Langebrogade 6E, 2nd floor<br />
                      1411 Copenhagen<br />
                      Tel: +45 3145 6035
                    </p>
                  </a>

                  {/* Amsterdam Office */}
                  <a 
                    className="min-w-[180px] w-full pb-[27px] md:pb-[47px] cursor-pointer block"
                    // href="https://www.google.com/maps/place/Generaal+Vetterstraat+66,+1059+BW+Amsterdam,+Netherlands/@52.3444874,4.8455721,18.3z/data=!4m6!3m5!1s0x47c5e1f6f430fd65:0x43b4cc85953ad884!8m2!3d52.3444757!4d4.8461934!16s%2Fg%2F11b8v6ztj3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-[ClarendonBTWXX-Light] text-[18px] font-light leading-[1.39] text-[#2c2d2e] mb-[7px]">
                      Amsterdam
                    </p>
                    <p className="text-[14px] leading-[1.29] text-black opacity-50">
                      Generaal Vetterstraat 66<br />
                      1059 BW Amsterdam<br />
                      Netherlands
                    </p>
                  </a>
                </div>
              </div>

              {/* Mobile Privacy Link */}
              <div className="md:hidden pt-8">
                <a 
                  className="block w-full pt-[20px] pb-[40px] whitespace-nowrap text-[14px] leading-[1.43] text-black opacity-50 underline"
                  // href="https://www.deptagency.com/en-nl/privacy-policy/" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Global Privacy Statement
                </a>
              </div>

              {/* Desktop Privacy Link */}
              <a 
                className="hidden md:block absolute bottom-0 left-[54.62962963%] text-[14px] leading-[1.43] text-black opacity-50 underline"
                // href="https://www.deptagency.com/en-nl/privacy-policy/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Global Privacy Statement
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Back to Top */}
        <div className="relative h-[55px] overflow-hidden">
          <svg 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink"
            onClick={scrollToTop}
            className="absolute bottom-0 h-[55px] w-[545px] md:left-[calc(35.32934%-229px)] left-[calc(50%-272px)] cursor-pointer"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <path
                d="M0,55 C107.57331,55 172.397965,0 261.914001,0 C351.430038,0 418.082695,55 524.041347,55 C630,55 -108,55 0,55 Z"
                className="cursor-pointer" 
                fill="#000000"
              />
            </g>
          </svg>

          <p className="font-sans text-[14px] absolute left-0 md:left-[35.3293413248%] top-[18px] text-center text-white select-none pointer-events-none w-full md:w-auto">
            Back to top
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
