"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/images/logo-white.png";
import { FaGlobe } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageOption {
  code: "en" | "de" | "pl";
  name: string;
}

const NavbarComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, changeLanguage } = useLanguage();

  const languages: LanguageOption[] = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "pl", name: "Polski" },
  ];

  const handleLanguageChange = (lang: "en" | "de" | "pl") => {
    changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    if (showLanguageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguageMenu]);

  // Helper function to get active link classes
  const getLinkClasses = (path: string): string => {
    const baseClasses = "text-white font-medium rounded-lg transition-all duration-300 hover:scale-105";
    const isActive = pathname === path
      ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50 px-4 py-2"
      : "hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-pink-600/40 px-4 py-2";

    return `${isActive} ${baseClasses}`;
  };

  const getDesktopLinkClasses = (path: string): string => {
    return `${getLinkClasses(path)} md:ml-6`;
  };

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-purple-950/80 via-pink-950/80 to-purple-950/80 border-b border-purple-500/30 shadow-lg shadow-purple-900/20 relative z-50">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-1 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-purple-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-end md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-end" href="/">
              <Image className="h-10 w-auto" src={logo} alt="Mila's Birthday Website" />
            </Link>
            <Link
              href="/"
              className={`${getDesktopLinkClasses("/")} hidden md:block`}
            >
              Home
            </Link>
          </div>

          {/* <!-- Desktop Menu --> */}
          <div className="flex flex-1 items-end justify-end md:items-stretch md:justify-end">
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
            <Link
              href="/cards"
              className={getLinkClasses("/cards")}
            >
              Cards
            </Link>

            {/* Language Dropdown */}
            <div className="relative" ref={languageMenuRef}>
              <button
                className="text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-pink-600/40 px-3 py-2"
                aria-label="Change language"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <FaGlobe className="size-7" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 backdrop-blur-md bg-gradient-to-b from-purple-950/95 to-pink-950/95 rounded-lg border border-purple-500/30 shadow-xl z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-3 text-white transition-all duration-200 ${
                        language === lang.code
                          ? "bg-gradient-to-r from-purple-600/50 to-pink-600/50"
                          : "hover:bg-purple-600/20"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="relative z-50 backdrop-blur-md bg-gradient-to-b from-purple-950/90 to-pink-950/90 border-t border-purple-500/30">
          <div className="space-y-2 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${getLinkClasses("/")} block px-3 py-2 text-base`}
            >
              Home
            </Link>
            <Link
              href="/cards"
              className={`${getLinkClasses("/cards")} block px-3 py-2 text-base`}
            >
              Cards
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
