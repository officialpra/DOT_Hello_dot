import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import PageShell from "@/components/layout/PageShell";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
