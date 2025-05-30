"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react"

export default function Login({ title, onSubmit, email, password, setEmail, setPassword, signupLink }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-gradient-to-br from-[#D4A574]/90 to-[#D4A574]/70 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat opacity-90"
            style={{
              backgroundImage: "url('/image.svg')",
            }}
          ></div>
        </div>
        
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <div className="mb-8">
              <span className="font-bold text-3xl tracking-tight">
                <span className="text-[#1E3A8A]">Job</span>
                <span className="text-[#D4A574]">Connect</span>
              </span>
            </div>
            <h1 className="text-2xl xl:text-3xl font-extrabold text-center text-gray-900">{title}</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center"></div>

              <form onSubmit={onSubmit} className="mx-auto max-w-xs">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white transition-all duration-200"
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative mt-5">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-12 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white transition-all duration-200"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-[#1E3A8A] text-white w-full py-4 rounded-lg hover:bg-[#D4A574] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <LogIn className="w-6 h-6 -ml-2" />
                  <span className="ml-3">Login</span>
                </button>

                <p className="mt-6 text-sm text-gray-600 text-center">
                  Don't have an account?
                  <Link
                    to={signupLink}
                    className="text-[#1E3A8A] font-medium hover:text-[#D4A574] transition-colors ml-1"
                  >
                    Sign up here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
