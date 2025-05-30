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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1E3A8A]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F3E8D0]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 lg:py-24 px-6 gap-12 lg:gap-16">
        {/* Left - Text & Buttons */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#F3E8D0] shadow-sm">
            <Star className="w-4 h-4 text-[#1E3A8A] mr-2" />
            <span className="text-sm font-medium text-gray-600">Trusted by 50,000+ professionals</span>
          </div>

          {/* Main heading */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to{" "}
              <span className="relative">
                <span className="text-[#1E3A8A]">Job</span>
                <span className="text-[#D4A574]">Connect</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Unlock new opportunities – whether you're hiring top talent or searching for your dream job,
              <span className="font-semibold text-gray-800"> JobConnect is with you every step of the way.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/authRecruiter/login"
              className="group relative bg-[#1E3A8A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E3A8A]/90 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              For Recruiters
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/authJobSeeker/login"
              className="group relative bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] px-8 py-4 rounded-xl font-semibold hover:bg-[#1E3A8A] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              For Job Seekers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E3A8A]">10K+</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E3A8A]">5K+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E3A8A]">50K+</div>
              <div className="text-sm text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-[#1E3A8A]/10 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-[#F3E8D0]/50 rounded-3xl transform -rotate-3"></div>

            {/* Image container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#F3E8D0]">
              <img
                src="./Resume-amico.png"
                alt="JobConnect illustration - Professional connecting talent with opportunities"
                className="w-full h-auto max-w-lg mx-auto drop-shadow-lg"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-bounce border border-[#F3E8D0]">
              <Users className="w-6 h-6 text-[#1E3A8A]" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce border border-[#F3E8D0]"
              style={{ animationDelay: "1s" }}
            >
              <Briefcase className="w-6 h-6 text-[#1E3A8A]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
