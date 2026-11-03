import type { Metadata } from "next";
import { Caveat, Gelasio, UnifrakturMaguntia } from "next/font/google";
import { ReactNode } from "react";

const hand = Caveat({ subsets: ["latin", "latin-ext"], weight: ["500", "700"], variable: "--font-hand" });
const serif = Gelasio({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-serif" });
const fraktur = UnifrakturMaguntia({ subsets: ["latin"], weight: "400", variable: "--font-fraktur" });

export const metadata: Metadata = {
  title: { absolute: "Für Mila · 04.11.2026" },
  description: "Ein kleines Geburtstagsbuch für Mila.",
};

export default function Birthday2026Layout({ children }: { children: ReactNode }) {
  return <div className={`${hand.variable} ${serif.variable} ${fraktur.variable}`}>{children}</div>;
}
