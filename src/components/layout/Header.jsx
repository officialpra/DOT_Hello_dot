"use client";

import Image from "next/image";
import Link from "next/link";

const Header = ({ onMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8">
      {/* Logo — top left, always visible */}
      <Link href="/" className="relative z-50">
        <div className="w-14 md:w-16">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </Link>

      {/* Mobile hamburger — only on small screens */}
      {/* Desktop hamburger is handled by the floating SideMenu pill */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 mt-1"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
      >
        <span className="block w-6 h-[1.5px] bg-black rounded-full" />
        <span className="block w-6 h-[1.5px] bg-black rounded-full" />
        <span className="block w-4 h-[1.5px] bg-black rounded-full" />
      </button>
    </header>
  );
};

export default Header;
