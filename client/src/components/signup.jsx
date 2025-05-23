import React from "react";
import { Link } from "react-router-dom";

export default function RegisterTemplate({
  title,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  loginLink,
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        
        {/* Image section moved to the left */}
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/image2.svg')",
            }}
          ></div>
        </div>

        {/* Form section now on the right */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-center">{title}</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mt-4 mb-12 border-b text-center"></div>
              <form onSubmit={onSubmit} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 mb-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                <button
                  type="submit"
                  className="mt-3 tracking-wide font-semibold bg-[#df9500] text-white w-full py-4 rounded-lg hover:bg-[#124b55] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Sign Up
                </button>
                <p className="mt-6 text-sm text-gray-600 text-center">
                  Already have an account?
                  <Link to={loginLink} className="text-[#df9500] font-medium hover:underline ml-1">
                    Log in here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
