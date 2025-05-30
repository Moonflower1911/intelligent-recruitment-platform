"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import JobSeekerCard from "../components/JobSeekerCard"
import { ArrowLeft, Users, SortAsc, Briefcase, Sparkles } from "lucide-react"

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
      const sortedJobSeekers = (response.data.sortedApplicants || []).map((sortedSeeker) => {
        const original = listOfJobSeekerForms.find(
          (entry) => entry.jobSeekerForm?.id === sortedSeeker.id
        )
        return {
          ...sortedSeeker,
          interestId: original?.interestId || null, // attach the correct interestId
        }
      })

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
      <div className="min-h-screen flex flex-col bg-[#F8F5F0]">
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574] mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">Loading Applicants</h2>
            <p className="text-[#1E3A8A]/80">Please wait while we fetch the applicant data</p>
          </div>
        </main>
        <footer className="bg-[#1E3A8A] text-white py-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} TalentConnect. All rights reserved.</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* New Navbar - Starts Here */}
      <header className="bg-white shadow-sm border-b border-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Left Side - Back button and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-[#1E3A8A] hover:text-[#1E3A8A]/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#1E3A8A]">
                    Interested Applicants
                  </h1>
                  <p className="text-[#1E3A8A]/70">
                    {listOfJobSeekerForms.length}{" "}
                    {listOfJobSeekerForms.length === 1 ? "applicant" : "applicants"} found
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - AI Sort Button or Badge */}
            <div className="flex items-center justify-end sm:justify-normal">
              {listOfJobSeekerForms.length > 0 && (
                sorted ? (
                  <div className="inline-flex items-center gap-2 bg-[#D4A574]/20 text-[#1E3A8A] px-4 py-2 rounded-xl font-medium border border-[#D4A574]/30">
                    <Sparkles className="w-5 h-5 text-[#1E3A8A]" />
                    AI-Sorted by Match Score
                  </div>
                ) : (
                  <button
                    onClick={fetchSortedJobSeekers}
                    disabled={sortLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sortLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        AI-Powered Sort
                      </>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>


      <main className="flex-grow px-4 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Content Area */}
          {listOfJobSeekerForms.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-[#F8F5F0] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-[#D4A574]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2">No Applicants Yet</h3>
                <p className="text-[#1E3A8A]/70 mb-6 text-sm">
                  No applicants have expressed interest in this job offer. Check back later or promote your job posting.
                </p>
                <button
                  onClick={handleBackToHome}
                  className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-5 py-2.5 rounded-lg hover:bg-[#142A5E] transition-colors duration-200 font-medium text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-6">
                {listOfJobSeekerForms.map((seeker, index) => (
                  <div
                    key={index}
                    className="transition-all duration-200 hover:shadow-md hover:border-[#D4A574] min-w-[300px] flex-1 basis-[calc(33.333%-1.5rem)] bg-white"
                    style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}
                  >
                    <JobSeekerCard
                      seeker={sorted ? seeker : seeker.jobSeekerForm}
                      interestId={seeker.interestId}
                      showMatch={sorted}
                    />

                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default OfferInterested