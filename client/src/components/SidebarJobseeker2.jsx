import React from "react";
import { Link } from "react-router-dom";

export default function SidebarAccountJobSeeker({ onCreateCV, onLogout, onDeleteAccount }) {
  return (
    <div className="group fixed top-20 left-4 w-16 hover:w-48 bg-gradient-to-b from-[#0b444d] to-[#175d69] text-white transition-all duration-300 overflow-hidden z-50 rounded-2xl p-2 mt-8 shadow-lg">
      <div className="flex flex-col items-center mt-4">

        {/* Home */}
        <Link
          to="/jobseeker"
          className="flex items-center w-full h-12 px-3 mt-8 rounded hover:bg-gray-700 text-white font-semibold"
        >
          <svg
            className="w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">
            Home
          </span>
        </Link>

        {/* Create a new CV */}
        <button
          onClick={onCreateCV}
          className="flex items-center w-full h-12 px-3 mt-8 rounded hover:bg-gray-700 text-[#df9500] font-semibold"
        >
          <svg
            className="w-6 h-6 stroke-current text-[#df9500]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">
            New CV
          </span>
        </button>

        {/* Log out */}
        <button
          onClick={onLogout}
          className="flex items-center w-full h-12 px-3 mt-8 rounded hover:bg-gray-700 text-white font-semibold"
        >
          <svg
            className="w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">
            Log Out
          </span>
        </button>

        {/* Delete account */}
        <button
          onClick={onDeleteAccount}
          className="flex items-center w-full h-12 px-3 mt-8 mb-12 text-red-400 rounded hover:bg-gray-700 hover:text-red-300 font-semibold"
        >
          <svg
            className="w-6 h-6 stroke-current text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="ml-2 text-sm font-medium hidden group-hover:inline">
            Delete Account
          </span>
        </button>

      </div>
    </div>
  );
}
