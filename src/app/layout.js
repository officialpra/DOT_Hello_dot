
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import PageShell from "@/components/layout/PageShell";
import SmoothScroll from "@/components/effects/Smoothscroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "DOT — We make digital (and magical)...",
  description: "A creative studio making digital and magical experiences.",
};

// Silence the THREE.Clock deprecation warning if it's coming from library internals
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

import LoaderScreen from "@/components/layout/LoaderScreen";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`} suppressHydrationWarning>
      <body>
        <LoaderScreen />
        <SmoothScroll>
          <PageShell>{children}</PageShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
