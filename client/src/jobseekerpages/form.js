import React from "react";
import { Link } from "react-router-dom";
import CreateCVForm from "../components/CreateCVForm";

function CreateCV() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back Button and Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link 
            to="/accountjobseeker" 
            className="flex items-center text-[#1E3A8A] hover:text-[#D4A574] transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to My account
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-[#1E3A8A] mb-6">
              Create Your CV
            </h1>
            <CreateCVForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCV;