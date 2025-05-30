"use client";
import { Link } from "react-router-dom";
import {
  User,
  Sparkles,
  FileText,
  Home,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SidebarJobSeeker({ onSortJobOffers }) {
  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-sm z-40 overflow-y-auto">
      <div className="p-4">
        {/* Logo */}
        <div className="mb-6">
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#1E3A8A]">Job</span>
            <span className="text-[#D4A574]">Connect</span>
          </span>
        </div>

        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-medium text-gray-900 text-sm">
                Welcome back!
              </h2>
              <p className="text-xs text-gray-500">
                Find your next opportunity
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-900 mb-3 uppercase tracking-wide">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={onSortJobOffers}
              className="w-full flex items-center p-3 bg-gradient-to-r from-[#D4A574]/10 to-[#D4A574]/5 rounded-lg hover:from-[#D4A574]/20 hover:to-[#D4A574]/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#D4A574] rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900 group-hover:text-[#D4A574] text-sm">
                  Get AI Recommendations
                </div>
                <div className="text-xs text-gray-500">
                  Personalized job matches
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-900 mb-3 uppercase tracking-wide">
            Navigation
          </h3>
          <nav className="space-y-1">
            <NavLink
              to="/jobseeker"
              className={({ isActive }) =>
                `flex items-center p-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-[#1E3A8A]/5 text-[#1E3A8A]"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                }`
              }
            >
              <Home className="w-4 h-4 mr-3" />
              Job Search
            </NavLink>

            <NavLink
              to="/my-applications"
              className={({ isActive }) =>
                `flex items-center p-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-[#1E3A8A]/5 text-[#1E3A8A]"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                }`
              }
            >
              <FileText className="w-4 h-4 mr-3 text-green-600" />
              My Applications
            </NavLink>

            <NavLink
              to="/accountjobseeker"
              className={({ isActive }) =>
                `flex items-center p-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-[#1E3A8A]/5 text-[#1E3A8A]"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                }`
              }
            >
              <User className="w-4 h-4 mr-3" />
              My Profile
            </NavLink>
          </nav>
        </div>

        {/* Help */}
        <div className="p-3 bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/5 rounded-lg mb-4">
          <div className="flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-[#1E3A8A] mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">
                Need Help?
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Get tips on how to improve your job search success rate.
              </p>
              <button className="text-xs text-[#1E3A8A] font-medium hover:text-[#D4A574] transition-colors">
                View Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
