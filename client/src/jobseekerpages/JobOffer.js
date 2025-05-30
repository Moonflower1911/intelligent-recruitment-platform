"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import SidebarJobSeeker from "../components/SidebarJobseeker.jsx";
import Footer from "../components/dashboard-footer"
import JobOfferDetail from "../components/job-offer-detail"

function JobOffer() {
  const { id } = useParams()
  const [offreEmploi, setOffreEmploi] = useState({})
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    // Fetch job offer details
    axios
      .get(`http://localhost:3001/recruiter/byId/${id}`)
      .then((response) => {
        setOffreEmploi(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching job offer:", error)
        setLoading(false)
      })

    // Check if user has already applied
    axios
      .get(`http://localhost:3001/interest/check/${id}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        setLiked(response.data.liked)
      })
      .catch((error) => {
        console.error("Error checking application status:", error)
      })
  }, [id])

  const handleLike = () => {
    axios
      .post(
        "http://localhost:3001/interest",
        { OfferId: id },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        },
      )
      .then((response) => {
        setLiked(response.data.liked)
      })
      .catch((error) => {
        console.error("Error while expressing interest:", error)
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error)
        } else {
          alert("Failed to express interest.")
        }
      })
  }

  const getRecommendedJobOffers = async () => {
    // This function is required by the sidebar but not used on this page
    console.log("Recommendations not available on job detail page")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarJobSeeker onSortJobOffers={getRecommendedJobOffers} />

        {/* Main Content */}
        <div className="flex-1 ml-80 p-8">

          {/* Job Offer Detail */}
          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          ) : (
            <JobOfferDetail offer={offreEmploi} liked={liked} onApply={handleLike} />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default JobOffer
