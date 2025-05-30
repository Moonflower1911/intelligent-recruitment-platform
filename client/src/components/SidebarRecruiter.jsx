"use client";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Home,
  PlusCircle,
  LogOut,
  Trash2,
  User,
  HelpCircle,
} from "lucide-react";

export default function SidebarRecruiter({ onLogout, onDeleteAccount }) {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-sm z-40 overflow-y-auto">
      <div className="p-4">
        {/* Logo */}
        <div className="mb-2">
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#1E3A8A]">Job</span>
            <span className="text-[#D4A574]">Connect</span>
          </span>
        </div>

        {/* Profile Section */}
        <div className="bg-gradient-to-r from-[#1E3A8A]/10 to-[#D4A574]/5 rounded-xl p-4 mb-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Recruiter Panel</h2>
              <p className="text-xs text-gray-600">Manage your offers</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-2">
          <h3 className="text-xs mb-2 font-medium text-gray-900 uppercase tracking-wide">
            Actions
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => navigate("/createJobOffer")}
              className="w-full flex items-center p-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#F3E8D0]/50 hover:text-gray-900 transition"
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              New Job Offer
            </button>

            <NavLink
              to="/recruiter"
              className={({ isActive }) =>
                `w-full flex items-center p-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-[#1E3A8A]/5 text-[#1E3A8A]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Home className="w-5 h-5 mr-3" />
              My Offers
            </NavLink>
          </nav>
        </div>

        {/* Help Section */}
        <div className="p-3 bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/5 rounded-lg">
          <div className="flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-[#1E3A8A] mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">
                Need Help?
              </h4>
              <p className="text-xs text-gray-600 mb-1">
                Learn how to write better job descriptions.
              </p>
              <button className="text-xs text-[#1E3A8A] font-medium hover:text-[#D4A574] transition-colors">
                View Guide →
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={onLogout}
            className="flex items-center w-full p-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Log Out
          </button>
          <button
            onClick={onDeleteAccount}
            className="flex items-center w-full p-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition mt-1"
          >
            <Trash2 className="w-4 h-4 mr-3" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
