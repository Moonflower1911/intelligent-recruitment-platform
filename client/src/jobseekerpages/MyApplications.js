"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import SidebarJobSeeker from "../components/SidebarJobseeker.jsx";
import Footer from "../components/dashboard-footer"
import { FileText, Search, AlertCircle } from "lucide-react"

function MyApplications() {
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const accessToken = sessionStorage.getItem("accessToken")
        const response = await axios.get("http://localhost:3001/jobseeker/myApplications", {
          headers: { accessToken },
        })
        setApplications(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error while fetching applications:", error)
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  // Dummy function for sidebar - not used on this page
  const getRecommendedJobOffers = () => {
    console.log("Recommendations not available on applications page")
  }

  // Filter applications based on search term
  const filteredApplications = applications.filter((offer) =>
    offer.poste?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarJobSeeker onSortJobOffers={getRecommendedJobOffers} />

        {/* Main Content */}
        <div className="flex-1 ml-80 p-8">

          {/* Search Section */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <div className="flex items-center">
                <div className="mr-4">
                  <FileText className="w-8 h-8 text-[#1E3A8A]" />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">My Applications</h1>
                  <p className="text-sm text-gray-600">Track and manage all your job applications in one place</p>
                </div>
                <div className="text-sm font-medium text-[#1E3A8A] bg-[#1E3A8A]/5 px-3 py-1 rounded-full">
                  {applications.length} Applications
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm"
                placeholder="Search your applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map((offer, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">{offer.poste}</h2>
                        <div className="flex items-center text-sm text-gray-700 mb-2">
                          <FileText className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                          <span className="font-medium">{offer.nomEntreprise}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>Applied on: {new Date(offer.createdAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            Application Submitted
                          </span>
                        </div>
                      </div>
                      <button
                        className="text-sm text-[#1E3A8A] hover:text-[#D4A574] font-medium transition-colors"
                        onClick={() => (window.location.href = `/jobOffer/${offer.id}`)}
                      >
                        View Details →
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{offer.description}</p>

                    {offer.keywords && (
                      <div className="flex flex-wrap gap-2">
                        {offer.keywords
                          .split(",")
                          .slice(0, 3)
                          .map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-[#F3E8D0]/50 text-[#1E3A8A] rounded-full text-xs font-medium"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        {offer.keywords.split(",").length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            +{offer.keywords.split(",").length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? `No applications match your search for "${searchTerm}"`
                    : "You haven't applied to any job offers yet."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors text-sm"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MyApplications
