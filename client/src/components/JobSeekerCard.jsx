import React from "react";

const JobSeekerCard = ({ seeker, showMatch }) => {
  const cvUrl = seeker.cvFilePath
    ? `http://localhost:3001/${seeker.cvFilePath.replace(/\\/g, "/")}`
    : null;

  const videoUrl = seeker.videoFilePath
    ? `http://localhost:3001/${seeker.videoFilePath.replace(/\\/g, "/")}`
    : null;

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-6 break-words">
      <h3 className="text-xl font-bold text-[#175d69] mb-4">
        {seeker.nom} {seeker.prenom}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 break-words">
        <p><strong>Email:</strong> {seeker.email}</p>
        <p><strong>Phone:</strong> {seeker.phoneNumber}</p>
        <p><strong>Address:</strong> {seeker.address}</p>

        {showMatch && (
          <p className="md:col-span-2 font-semibold text-green-700">
            🎯 Match: {(seeker.matchPercentage ?? seeker.tfidfScore ?? 0).toFixed(2)}%
          </p>
        )}
        {/* ✅ CV Button */}
        {cvUrl && (
          <div className="md:col-span-2 mt-4">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#175d69] text-white rounded hover:bg-[#124b55] transition"
            >
              View / Download CV
            </a>
          </div>
        )}
      </div>

      {/* ✅ Video Player */}
      {videoUrl && (
        <div className="flex justify-center mt-6">
          <video
            src={videoUrl}
            controls
            className="w-full max-w-lg rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default JobSeekerCard;
