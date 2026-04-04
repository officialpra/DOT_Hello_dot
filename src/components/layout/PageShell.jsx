"use client";

import { useState } from "react";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

export default function PageShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
