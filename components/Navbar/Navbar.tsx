"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Add this to detect client-side rendering

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component has mounted
  }, []);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // this avoids hydration error due to user being on the client side and not the server
  if (!mounted) {
    // Don't render anything until the component has mounted on the client
    return null;
  }

  return (
    <nav className="bg-teal-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="flex items-center text-white">
            <span className="text-lg">Eco blog</span>
          </Link>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* <Link href="/" className="hover:text-gray-400">
            Blog
          </Link> */}
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>

          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-800 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              About
            </Link>
            <Link
              href="/write"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              Write
            </Link>
            <Link
              href="/contact"
              className="block py-2 px-4 text-white hover:bg-teal-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
