import React from "react";
import { FileText, Download, Trash2, User, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function ResumeCard({ resume, onDelete }) {
  const fileUrl = `http://localhost:3001/${resume.cvFilePath?.replace(/\\/g, '/')}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/5 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">My Resume</h3>
              <p className="text-sm text-gray-600">Personal information and CV</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full text-sm font-medium">
            Active Profile
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Personal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-[#1E3A8A]" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Full Name</p>
              <p className="text-gray-900 font-medium">{resume.prenom} {resume.nom}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-[#1E3A8A]" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Email</p>
              <p className="text-gray-900 font-medium break-all">{resume.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-[#1E3A8A]" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Phone</p>
              <p className="text-gray-900 font-medium">{resume.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-[#1E3A8A]" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Address</p>
              <p className="text-gray-900 font-medium">{resume.address}</p>
            </div>
          </div>
        </div>

        {/* CV Download Section */}
        {resume.cvFilePath && (
          <div className="bg-[#D4A574]/10 border border-[#D4A574]/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#D4A574] rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Resume Document</h4>
                  <p className="text-sm text-gray-600">Your uploaded CV is ready to share</p>
                </div>
              </div>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Profile is complete and visible to recruiters</span>
          </div>
          <button
            onClick={() => onDelete(resume.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}