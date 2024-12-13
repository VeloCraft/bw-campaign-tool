'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">Bike Worcester Campaigns</Link>
          </div>

          {/* Menu (hidden on small screens) */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:bg-blue-600 px-3 py-2 rounded-md">Home</Link>
            <Link href="/campaigns" className="hover:bg-blue-600 px-3 py-2 rounded-md">Campaigns</Link>
            <Link href="/admin" className="hover:bg-blue-600 px-3 py-2 rounded-md">Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <Link href="/" className="block px-3 py-2 hover:bg-blue-600">Home</Link>
          <Link href="/campaigns" className="block px-3 py-2 hover:bg-blue-600">Campaigns</Link>
          <Link href="/admin" className="block px-3 py-2 hover:bg-blue-600">Admin</Link>
        </div>
      )}
    </nav>
  );
}
