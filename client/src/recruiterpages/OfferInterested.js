"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import JobSeekerCard from "../components/JobSeekerCard"
import Navbar from "../components/navbar"
import { ArrowLeft, Users, SortAsc, Briefcase } from "lucide-react"

function OfferInterested() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([])
  const [sorted, setSorted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sortLoading, setSortLoading] = useState(false)

  useEffect(() => {
    const fetchInterestedJobSeekers = async () => {
      const accessToken = sessionStorage.getItem("accessToken")
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3001/interest/${id}`, { headers: { accessToken } })
        setListOfJobSeekerForms(response.data)
      } catch (error) {
        console.error("Error fetching interested job seekers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterestedJobSeekers()
  }, [id])

  const fetchSortedJobSeekers = async () => {
    const accessToken = sessionStorage.getItem("accessToken")
    try {
      setSortLoading(true)
      const response = await axios.get(`http://localhost:3001/interest/recommendations/${id}`, {
        headers: { accessToken },
      })
      const sortedJobSeekers = response.data.sortedApplicants || []
      setListOfJobSeekerForms(sortedJobSeekers)
      setSorted(true)
    } catch (error) {
      console.error("Error fetching sorted job seekers:", error)
    } finally {
      setSortLoading(false)
    }
  }

  const handleBackToHome = () => {
    navigate("/recruiter")
  }

  if (loading) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/18705217_v1016-a-08.jpg')",
        }}
      >
        <Navbar />
        <div className="pl-16 py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#175d69] mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading applicants...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />

      {/* Content */}
      <div className="pl-16 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title and Back Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToHome}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#175d69] rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#175d69]">Interested Applicants</h1>
                    <p className="text-gray-600 mt-1">
                      {listOfJobSeekerForms.length} {listOfJobSeekerForms.length === 1 ? "applicant" : "applicants"}{" "}
                      found
                    </p>
                  </div>
                </div>
              </div>

              {/* Sort Button */}
              {listOfJobSeekerForms.length > 0 && !sorted && (
                <button
                  onClick={fetchSortedJobSeekers}
                  disabled={sortLoading}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#175d69] to-[#124b55] text-white px-6 py-3 rounded-xl hover:from-[#124b55] hover:to-[#0f3d47] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sortLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sorting...
                    </>
                  ) : (
                    <>
                      <SortAsc className="w-5 h-5" />
                      Sort by Match Percentage
                    </>
                  )}
                </button>
              )}

              {/* Sorted Indicator */}
              {sorted && (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-xl font-medium">
                  <SortAsc className="w-5 h-5" />
                  Sorted by Match Score
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          {listOfJobSeekerForms.length === 0 ? (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-12">
              <div className="text-center">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applicants Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  No applicants have expressed interest in this job offer. Check back later or promote your job posting
                  to attract more candidates.
                </p>
                <button
                  onClick={handleBackToHome}
                  className="mt-6 inline-flex items-center gap-2 bg-[#175d69] text-white px-6 py-3 rounded-lg hover:bg-[#124b55] transition-colors duration-200 font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {listOfJobSeekerForms.map((seeker, index) => (
                <div key={index} className="transform transition-all duration-200 hover:scale-[1.02]">
                  <JobSeekerCard seeker={seeker.jobSeekerForm} interestId={seeker.interestId} showMatch={sorted} />
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          {listOfJobSeekerForms.length > 0 && (
            <div className="mt-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-gray-600">
                    Showing {listOfJobSeekerForms.length} applicant{listOfJobSeekerForms.length !== 1 ? "s" : ""}
                    {sorted && " (sorted by match score)"}
                  </p>
                </div>
                <button
                  onClick={handleBackToHome}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OfferInterested
