"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-[#F3E8D0] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <span className="font-bold text-3xl tracking-tight">
                <span className="text-[#1E3A8A] drop-shadow-sm">Job</span>
                <span className="text-[#D4A574] drop-shadow-sm">Connect</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a
                href="#hero"
                className="relative text-gray-700 hover:text-[#1E3A8A] font-medium transition-all duration-300 group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1E3A8A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="relative text-gray-700 hover:text-[#1E3A8A] font-medium transition-all duration-300 group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1E3A8A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="relative text-gray-700 hover:text-[#1E3A8A] font-medium transition-all duration-300 group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1E3A8A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="relative text-gray-700 hover:text-[#1E3A8A] font-medium transition-all duration-300 group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1E3A8A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#1E3A8A]/90 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#F3E8D0]/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:ring-opacity-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="pt-4 pb-2 space-y-2">
            <li>
              <a
                href="#hero"
                className="block px-4 py-3 text-gray-700 hover:text-[#1E3A8A] hover:bg-[#F3E8D0]/30 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
                  setMenuOpen(false)
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="block px-4 py-3 text-gray-700 hover:text-[#1E3A8A] hover:bg-[#F3E8D0]/30 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                  setMenuOpen(false)
                }}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="block px-4 py-3 text-gray-700 hover:text-[#1E3A8A] hover:bg-[#F3E8D0]/30 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                  setMenuOpen(false)
                }}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="block px-4 py-3 text-gray-700 hover:text-[#1E3A8A] hover:bg-[#F3E8D0]/30 rounded-lg font-medium transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
                  setMenuOpen(false)
                }}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block mx-4 mt-2 px-4 py-3 bg-[#1E3A8A] text-white text-center rounded-lg font-medium hover:bg-[#1E3A8A]/90 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  setMenuOpen(false)
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
