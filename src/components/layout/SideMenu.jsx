"use client";

import Link from "next/link";
import { useEffect } from "react";

const navLinks = [
  { label: "Work", num: "01", href: "/work" },
  { label: "Services", num: "02", href: "/services" },
  { label: "About", num: "03", href: "/about" },
  { label: "Stories", num: "04", href: "/stories" },
  { label: "Product", num: "05", href: "/product" },
];

const SideMenu = ({ isOpen, onClose, onOpen }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Desktop: Iconic Curved Slice (always visible on right edge) ── */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={onOpen}
          className="
            group relative
            bg-black text-white
            w-8 h-[500px] lg:h-[700px]
            rounded-l-[100%_50%]
            flex items-center justify-center
            hover:w-11 lg:hover:w-12
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          aria-label="Open navigation menu"
        >
          {/* Hamburger Icon */}
          <div className="flex flex-col gap-[4px] items-center -mr-1">
            <span className="block w-4 h-[1px] bg-white group-hover:w-5 transition-all duration-500" />
            <span className="block w-4 h-[1px] bg-white group-hover:w-5 transition-all duration-500" />
            <span className="block w-3 h-[1px] bg-white group-hover:w-4 transition-all duration-500" />
          </div>
        </button>
      </div>

      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm
          transition-opacity duration-500
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Full-screen sliding menu panel ── */}
      <div
        className={`
          fixed top-0 right-0 h-full z-[100]
          w-full md:w-[55vw] lg:w-[45vw]
          bg-[#0d0d0d]
          flex flex-col
          transition-transform duration-700
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* Close Button */}
        <div className="flex items-center justify-end px-8 py-8 md:px-12">
          <button
            onClick={onClose}
            className="text-white w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-white/60 transition-colors duration-300"
            aria-label="Close menu"
          >
            <span className="text-base leading-none">✕</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col justify-center flex-1 px-10 md:px-16">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="
                group flex items-baseline gap-4
                py-4 md:py-5 border-b border-white/10
                transition-all duration-500
              "
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                transitionDelay: isOpen ? `${i * 80 + 150}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span className="text-white/30 text-xs font-mono tracking-widest">
                {link.num}
              </span>
              <span className="font-garamond text-4xl md:text-5xl lg:text-6xl text-white italic group-hover:text-[#E8521A] transition-colors duration-300">
                {link.label}
              </span>
              <span className="ml-auto text-white/30 text-sm opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Menu Footer */}
        <div
          className="px-10 md:px-16 py-8 flex items-center justify-between"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.5s ease",
            transitionDelay: isOpen ? "600ms" : "0ms",
          }}
        >
          <p className="text-white/30 text-xs tracking-widest uppercase font-sans">
            DOT Studio
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/30 hover:text-white text-xs transition-colors duration-200 font-sans tracking-wider"
            >
              IG
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-white text-xs transition-colors duration-200 font-sans tracking-wider"
            >
              TW
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-white text-xs transition-colors duration-200 font-sans tracking-wider"
            >
              LI
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
