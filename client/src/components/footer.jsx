import { Twitter, Facebook, Youtube, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-bold text-3xl">
                <span className="text-[#1E3A8A]">Job</span>
                <span className="text-[#F3E8D0]">Connect</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              JobConnect connects talent with the best opportunities. Whether you're hiring or job-seeking, our platform
              supports you every step of the way with cutting-edge technology and personalized service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#F3E8D0]">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Services", "About Us", "Pricing", "Blog", "Careers"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-300 hover:text-[#F3E8D0] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#F3E8D0]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-[#1E3A8A]" />
                Rabat, Morocco
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-[#1E3A8A]" />
                contact@jobconnect.com
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-[#1E3A8A]" />
                +212 123 456 789
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">© {new Date().getFullYear()} JobConnect. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#F3E8D0] text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#F3E8D0] text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-[#F3E8D0] text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
