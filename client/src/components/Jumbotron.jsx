import React from "react";
import { Link } from "react-router-dom";

export default function Jumbotron() {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between max-w-7xl mx-auto py-12 px-6 gap-10">
      {/* Left - Text & Buttons */}
      <div className="sm:w-1/2 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span style={{ color: '#175d69' }}>Job</span><span style={{ color: '#df9500' }}>Connect</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Unlock new opportunities – whether you're hiring top talent or searching for your dream job, JobConnect is with you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link
            to="/authRecruiter/login"
            className="bg-[#175d69] text-white px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Recruiter
          </Link>
          <Link
            to="/authJobSeeker/login"
            className="bg-[#175d69] text-white px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Job Seeker
          </Link>
        </div>
      </div>

      {/* Right - Image */}
      <div className="sm:w-1/2">
        <img
          src="./Resume-amico.png"
          alt="JobConnect illustration"
          className="w-[500px] h-auto mx-auto"
        />
      </div>
    </div>
  );
}
