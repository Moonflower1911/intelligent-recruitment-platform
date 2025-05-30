"use client"
import { Search } from "lucide-react"

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center space-x-3">
        {/* Main Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id="q"
            name="q"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm"
            placeholder="Search jobs, companies, or keywords..."
            type="search"
            value={value}
            onChange={onChange}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] transition-colors font-medium text-sm"
        >
          Search Jobs
        </button>
      </div>
    </form>
  )
}

export default SearchBar