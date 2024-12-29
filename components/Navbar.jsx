"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/images/logo-white.png";
import { FaLanguage } from "react-icons/fa";

const NavbarComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-fuchsia-950">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-1 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
              <Image className="h-10 w-auto" src={logo} alt="Tiny Libraries" />
            </Link>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-[#420b27] hidden md:ml-6 md:block" : ""
              } ${
                pathname === "/cards"
                  ? "bg-[#420b27] hidden md:ml-6 md:block"
                  : ""
              } text-white hover:bg-[#6f1340] hover:text-white rounded-md px-3 py-2`}
            >
              Home
            </Link>
          </div>
          {/* <!-- Desktop Menu Hidden below md screens --> */}
          <div className="flex flex-1 items-end justify-end md:items-stretch md:justify-end">
            <div className="hidden md:ml-6 md:block ">
              <div className="flex space-x-2 ">
                <Link
                  href="/cards"
                  className={`${
                    pathname === "/cards" ? "bg-[#420b27]" : ""
                  } text-white hover:bg-[#6f1340] hover:text-white rounded-md px-3 py-2`}
                >
                  Cards
                </Link>
                <Link
                  href="/cards"
                  className={`${
                    pathname === "/cards" ? "bg-[#420b27]" : ""
                  } text-white hover:bg-[#6f1340] hover:text-white rounded-md px-3 py-1`}
                >
                  <FaLanguage className="size-8"></FaLanguage>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-[#420b27]" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Home
            </Link>
            <Link
              href="/cards"
              className={`${
                pathname === "/cards" ? "bg-[#420b27]" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
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
