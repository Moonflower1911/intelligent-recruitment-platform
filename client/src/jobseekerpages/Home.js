import React, { useEffect, useState } from "react";
import axios from "axios";
import JobOfferCard from "../components/JobOfferCard.jsx";
import SidebarJobSeeker from "../components/SidebarJobseeker.jsx";
import SearchBar from "../components/searchBar.jsx";
import { Briefcase, ArrowUpDown } from "lucide-react"
import Footer from "../components/dashboard-footer"
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function JobSeekerHome() {
  const [listOfRecruiters, setListOfRecruiters] = useState([])
  const [showScores, setShowScores] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("recent")

  // Load all offers by default
  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:3001/recruiter")
      .then((response) => {
        setListOfRecruiters(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching job offers:", error)
        setLoading(false)
      })
  }, [])

  // Call the recommendation engine
  const getRecommendedJobOffers = async () => {
    try {
      setLoading(true);
      setShowScores(true);
      setSortBy("relevance");

      // Clear existing offers while loading
      setListOfRecruiters([]);

      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:3001/jobseeker/recommendations",
        { headers: { accessToken } }
      );

      setListOfRecruiters(response.data.recommendedOffers);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };


  // Filter and sort job offers
  const filteredAndSortedOffers = listOfRecruiters
    .filter((offer) => offer.poste?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "relevance" && showScores) {
        return (b.score || b.matchPercentage || 0) - (a.score || a.matchPercentage || 0)
      }
      if (sortBy === "company") {
        return a.nomEntreprise?.localeCompare(b.nomEntreprise || "") || 0
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarJobSeeker onSortJobOffers={getRecommendedJobOffers} />

        {/* Main Content */}
        <div className="flex-1 ml-80 p-8">

          {/* Search Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Stats and Controls */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-[#1E3A8A]" />
                <span className="text-lg font-semibold text-gray-900">{filteredAndSortedOffers.length} Jobs Found</span>
              </div>
              {showScores && (
                <div className="px-3 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded-full text-sm font-medium">
                  ✨ Personalized Results
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white"
                >
                  <option value="recent">Most Recent</option>
                  {showScores && <option value="relevance">Best Match</option>}
                  <option value="company">Company Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Offers */}
          {loading ? (
            <div className="space-y-8">
              {/* AI Loading Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-center space-x-4">
                  <Sparkles className="w-6 h-6 text-[#D4A574] animate-pulse" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Generating Personalized Recommendations...
                  </h3>
                </div>
                <p className="text-center text-gray-600 mt-2">
                  Our AI is analyzing your profile to find the best matches
                </p>

                {/* Animated Progress */}
                <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
              </motion.div>

              {/* Animated Placeholder Cards */}
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 bg-gray-200 rounded ${i === 3 ? 'w-5/6' : 'w-full'}`}
                      ></div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : filteredAndSortedOffers.length > 0 ? (
            <div className="space-y-4">
              {filteredAndSortedOffers.map((offer, index) => (
                <JobOfferCard key={index} offer={offer} showScore={showScores} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? `No jobs match your search for "${searchTerm}"`
                    : "No job offers are currently available"}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors"
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

export default JobSeekerHome
