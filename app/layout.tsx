import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "Happy Birthday Mila",
    template: "%s | Happy Birthday Mila"
  },
  description: "A special birthday tribute website for Mila, celebrating with love, memories, and birthday wishes in multiple languages.",
  keywords: ["birthday", "tribute", "celebration", "memories"],
  authors: [{ name: "Christof Börmel" }],
  creator: "Christof Börmel",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE", "pl_PL"],
    siteName: "Happy Birthday Mila",
    title: "Happy Birthday Mila",
    description: "A special birthday tribute website celebrating Mila with love and memories.",
    images: [
      {
        url: "/images/Mila.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Birthday Mila"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Mila",
    description: "A special birthday tribute website celebrating Mila with love and memories.",
    images: ["/images/Mila.jpg"]
  },
  robots: {
    index: false,
    follow: false
  },
  icons: {
    icon: "/images/logo-white.png",
    apple: "/images/logo-white.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Macondo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-900">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
};

export default MainLayout;
