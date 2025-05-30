"use client"
import { Link } from "react-router-dom"
import { ArrowRight, Users, Briefcase, Star } from "lucide-react"

export default function Jumbotron() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-[#F3E8D0]/30 via-white to-[#F3E8D0]/50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#1E3A8A]/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#F3E8D0]/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between max-w-6xl mx-auto py-12 lg:py-16 px-6 gap-8 lg:gap-12">
        {/* Left - Text & Buttons */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-[#F3E8D0] shadow-sm">
            <Star className="w-3 h-3 text-[#1E3A8A] mr-1.5" />
            <span className="text-xs font-medium text-gray-600">Trusted by 50,000+ professionals</span>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to{" "}
              <span className="relative">
                <span className="text-[#1E3A8A]">Job</span>
                <span className="text-[#D4A574]">Connect</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full"></div>
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Unlock new opportunities – whether you're hiring top talent or searching for your dream job,
              <span className="font-semibold text-gray-800"> JobConnect is with you every step of the way.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              to="/authRecruiter/login"
              className="group relative bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
              <Users className="w-4 h-4" />
              For Recruiters
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/authJobSeeker/login"
              className="group relative bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
              <Briefcase className="w-4 h-4" />
              For Job Seekers
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#1E3A8A]">10K+</div>
              <div className="text-xs text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#1E3A8A]">5K+</div>
              <div className="text-xs text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#1E3A8A]">50K+</div>
              <div className="text-xs text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-[#1E3A8A]/10 rounded-2xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-[#F3E8D0]/50 rounded-2xl transform -rotate-3"></div>

            {/* Image container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#F3E8D0]">
              <img
                src="./Resume-amico.png"
                alt="JobConnect illustration - Professional connecting talent with opportunities"
                className="w-full h-auto max-w-md mx-auto drop-shadow-md"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-3 -left-3 bg-white rounded-full p-2 shadow-md animate-bounce border border-[#F3E8D0]">
              <Users className="w-4 h-4 text-[#1E3A8A]" />
            </div>
            <div
              className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-md animate-bounce border border-[#F3E8D0]"
              style={{ animationDelay: "1s" }}
            >
              <Briefcase className="w-4 h-4 text-[#1E3A8A]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}