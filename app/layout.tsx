import type { Metadata } from "next";
import { Fraunces, Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Grain } from "@/components/atmosphere/Grain";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-italic",
  weight: ["300", "400", "500"],
  style: ["italic", "normal"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Avenues — Kuwait · Interactive Sales Deck",
  description:
    "The world's second-largest mall. 13 million square feet. 12 districts. One destination.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body className="bg-ink text-bone antialiased">
        {children}
        <Grain />
      </body>
    </html>
  );
}
