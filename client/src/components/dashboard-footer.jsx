export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-8 ml-80">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#1E3A8A]">Job</span>
            <span className="text-[#D4A574]">Connect</span>
          </span>
        </div>

        <div className="text-sm text-gray-500">© {new Date().getFullYear()} JobConnect. All rights reserved.</div>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-[#1E3A8A] text-sm transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-500 hover:text-[#1E3A8A] text-sm transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-gray-500 hover:text-[#1E3A8A] text-sm transition-colors">
            Help Center
          </a>
        </div>
      </div>
    </footer>
  )
}
