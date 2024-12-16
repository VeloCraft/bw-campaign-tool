'use client';
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '@/components/admin/avatar';
import { signOut, useSession } from 'next-auth/react';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let closeMenuTimeout: NodeJS.Timeout | null = null;

  const session = useSession();

  const status = session.status === 'authenticated' ? true : false;

  const handleMouseLeave = () => {
    closeMenuTimeout = setTimeout(() => {
      setIsAvatarMenuOpen(false);
    }, 200); // 200ms delay before closing
  };

  const handleMouseEnter = () => {
    if (closeMenuTimeout) {
      clearTimeout(closeMenuTimeout); // Cancel the timeout if user re-enters
      closeMenuTimeout = null;
    }
    setIsAvatarMenuOpen(true);
  };

  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Bike Worcester Campaigns
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Avatar with Submenu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Avatar />
              {isAvatarMenuOpen && status && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => signOut()} // Replace with your sign-out logic
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            <Link href="/" className="hover:bg-blue-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link
              href="/campaigns"
              className="hover:bg-blue-600 px-3 py-2 rounded-md"
            >
              Campaigns
            </Link>
            <Link
              href="/admin"
              className="hover:bg-blue-600 px-3 py-2 rounded-md"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <Link href="/" className="block px-3 py-2 hover:bg-blue-600">
            Home
          </Link>
          <Link href="/campaigns" className="block px-3 py-2 hover:bg-blue-600">
            Campaigns
          </Link>
          <Link href="/admin" className="block px-3 py-2 hover:bg-blue-600">
            Admin
          </Link>
          {/* Avatar Submenu for Mobile */}
          <div className="border-t border-blue-600 mt-2">
            <div
              className="flex items-center px-3 py-2 hover:bg-blue-600"
              onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
            >
              <Avatar />
              <span className="ml-2">Menu</span>
            </div>
            {isAvatarMenuOpen && (
              <div className="bg-blue-600">
                <Link
                  href="/account"
                  className="block px-4 py-2 hover:bg-blue-700"
                >
                  Account
                </Link>
                <button
                  onClick={() => signOut()} // Replace with your sign-out logic
                  className="block w-full text-left px-4 py-2 hover:bg-blue-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
