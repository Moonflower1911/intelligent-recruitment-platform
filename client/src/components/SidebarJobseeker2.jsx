"use client";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FilePlus,
  LogOut,
  Trash2,
  User,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export default function SidebarAccountJobSeeker({
  onCreateCV,
  onLogout,
  onDeleteAccount,
  resume,
}) {
  const baseCompletion = 25;
  const cvCompletion = resume?.cvFilePath ? 50 : 0;
  const videoCompletion = resume?.videoFilePath ? 25 : 0;
  const completionPercentage = baseCompletion + cvCompletion + videoCompletion;

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-sm z-40 overflow-y-auto">
      <div className="p-4 pb-2">
        {/* Logo */}
        <div className="mb-1">
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#1E3A8A]">Job</span>
            <span className="text-[#D4A574]">Connect</span>
          </span>
        </div>

        {/* Profile Section */}
        <div className="bg-gradient-to-r from-[#1E3A8A]/10 to-[#D4A574]/5 rounded-xl p-4 mb-2 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">My Account</h2>
              <p className="text-xs text-gray-600">Member Profile</p>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Profile Completion</span>
              <span className="font-medium text-[#1E3A8A]">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className="bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] h-1.5 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            {completionPercentage < 100 && (
              <div className="mt-2 text-xs text-gray-500">
                {!resume?.cvFilePath && <p>+50% - Upload your CV</p>}
                {resume?.cvFilePath && !resume?.videoFilePath && (
                  <p>+25% - Add a pitch video</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-2">
          <h3 className="text-xs mb-2 font-medium text-gray-900 uppercase tracking-wide">
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
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                }`
              }
            >
              <Briefcase className="w-4 h-4 mr-3 text-green-600" />
              My Applications
            </NavLink>

            <button
              onClick={onCreateCV}
              className="w-full flex items-center p-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
            >
              <FilePlus className="w-5 h-5 mr-3 text-[#D4A574] group-hover:text-[#D4A574]/80" />
              Create New CV
            </button>

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
        <div className="p-2 bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/5 rounded-lg">
          <div className="flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-[#1E3A8A] mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">Need Help?</h4>
              <p className="text-xs text-gray-600 mb-1">
                Get tips on how to improve your job search success rate.
              </p>
              <button className="text-xs text-[#1E3A8A] font-medium hover:text-[#D4A574] transition-colors">
                View Guide →
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onLogout}
            className="flex items-center w-full p-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Log Out
          </button>
          <button
            onClick={onDeleteAccount}
            className="flex items-center w-full p-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors "
          >
            <Trash2 className="w-4 h-4 mr-3" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
