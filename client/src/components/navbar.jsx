import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between relative">

        {/* Logo */}
        <div className="flex items-center">
          <span className="font-bold text-2xl">
            <span style={{ color: '#175d69' }}>Job</span>
            <span style={{ color: '#df9500' }}>Connect</span>
          </span>
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="text-gray-800"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Links */}
        <ul
          className={`sm:flex sm:space-x-6 absolute sm:static top-full left-0 w-full sm:w-auto bg-white sm:bg-transparent z-10 shadow-md sm:shadow-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li className="border-b sm:border-none">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-indigo-600"
            >
              Home
            </Link>
          </li>
          <li className="border-b sm:border-none">
            <Link
              to="/faq"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-indigo-600"
            >
              FAQ
            </Link>
          </li>
          <li className="border-b sm:border-none">
            <Link
              to="/services"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-indigo-600"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-indigo-600"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
