import React from "react";
import { Link } from "react-router-dom";

export default function SidebarJobSeeker({ onSortJobOffers }) {
  return (
    <div className="group fixed top-20 left-4 w-16 hover:w-48 bg-gradient-to-b from-[#0b444d] to-[#175d69] text-white transition-all duration-300 overflow-hidden z-50 rounded-2xl p-2 mt-8 shadow-lg">
      <div className="flex flex-col items-center mt-4">
        <Link
          to="/accountjobseeker"
          className="flex items-center w-full h-12 px-3 mt-8 rounded hover:bg-gray-700"
        >
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.534 0 4.89.707 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">My Account</span>
        </Link>

        <button
          onClick={onSortJobOffers}
          className="flex items-center w-full h-12 px-3 mt-8 rounded hover:bg-gray-700 text-[#df9500] font-semibold"
        >
          <svg className="w-6 h-6 stroke-current text-[#df9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h13M3 16h7" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">Sort Offers</span>
        </button>

        <Link
          to="/my-applications"
          className="flex items-center w-full h-12 px-3 mt-8 mb-12 rounded hover:bg-gray-700 text-green-300 font-semibold"
        >
          <svg className="w-6 h-6 stroke-current text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2l4-4M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">My Applications</span>
        </Link>
      </div>
    </div>
  );
}
