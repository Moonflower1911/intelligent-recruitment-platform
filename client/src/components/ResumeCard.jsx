import React from "react";

export default function ResumeCard({ resume, onDelete }) {
  const fileUrl = `http://localhost:3001/${resume.cvFilePath?.replace(/\\/g, '/')}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200 break-words">
      <h3 className="text-2xl font-bold text-[#175d69] mb-6">My Resume</h3>

      <div className="space-y-2 text-gray-700 text-sm">
        <p><strong>Last Name:</strong> {resume.nom}</p>
        <p><strong>First Name:</strong> {resume.prenom}</p>
        <p><strong>Email:</strong> {resume.email}</p>
        <p><strong>Phone:</strong> {resume.phoneNumber}</p>
        <p><strong>Address:</strong> {resume.address}</p>

        {/* ✅ CV Download Button */}
        {resume.cvFilePath && (
          <div className="mt-4">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#175d69] text-white rounded hover:bg-[#124b55] transition"
            >
              View My Resume
            </a>
          </div>
        )}

      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => onDelete(resume.id)}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Delete Resume
        </button>
      </div>
    </div>
  );
}
