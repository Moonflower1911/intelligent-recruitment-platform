"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Mail, Phone, MapPin, FileText, Video,
  Calendar, Download, Play, FileSearch,
  Sparkles, User, Star, ChevronRight
} from "lucide-react"

const JobSeekerCard = ({ seeker, interestId, showMatch = false }) => {
  const navigate = useNavigate()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [interviewStatus, setInterviewStatus] = useState({ interviewed: false, interviewId: null })

  const cvUrl = seeker.cvFilePath ? `http://localhost:3001/${seeker.cvFilePath.replace(/\\/g, "/")}` : null
  const videoUrl = seeker.videoFilePath ? `http://localhost:3001/${seeker.videoFilePath.replace(/\\/g, "/")}` : null
  const matchScore = seeker.matchPercentage ?? seeker.tfidfScore ?? 0
  const initials = `${seeker.nom?.charAt(0) || ''}${seeker.prenom?.charAt(0) || ''}`

  const getMatchColor = (score) => {
    if (score >= 80) return "bg-[#D4A574]/20 text-[#1E3A8A] border border-[#D4A574]/30"
    if (score >= 60) return "bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20"
    return "bg-gray-100 text-gray-800"
  }

  useEffect(() => {
    const checkInterview = async () => {
      try {
        const res = await fetch(`http://localhost:3001/interview/status/${interestId}`)
        const data = await res.json()
        setInterviewStatus(data)
      } catch (err) {
        console.error("Failed to fetch interview status", err)
      }
    }
    checkInterview()
  }, [interestId])

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 hover:shadow-lg transition-shadow duration-200 border border-[#F8F5F0] hover:border-[#D4A574]/50  h-full">
      {/* Profile Header */}
      <div className="px-4 py-5 sm:px-6 bg-[#F8F5F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white font-medium">
              {initials || <User className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#1E3A8A]">
                {seeker.prenom} {seeker.nom}
              </h3>
              <p className="text-sm text-[#1E3A8A]/70">Applied recently</p>
            </div>
          </div>
          
          {showMatch && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchColor(matchScore)}`}>
              {matchScore >= 80 ? (
                <Star className="mr-1 h-3 w-3 text-[#D4A574]" />
              ) : (
                <Sparkles className="mr-1 h-3 w-3 text-[#1E3A8A]" />
              )}
              {matchScore.toFixed(0)}%
            </span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-4 py-5 sm:p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-[#1E3A8A]/80 flex items-center">
              <Mail className="mr-2 h-4 w-4 text-[#D4A574]" />
              Email
            </dt>
            <dd className="mt-1 text-sm text-[#1E3A8A] truncate">{seeker.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[#1E3A8A]/80 flex items-center">
              <Phone className="mr-2 h-4 w-4 text-[#D4A574]" />
              Phone
            </dt>
            <dd className="mt-1 text-sm text-[#1E3A8A]">{seeker.phoneNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[#1E3A8A]/80 flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-[#D4A574]" />
              Location
            </dt>
            <dd className="mt-1 text-sm text-[#1E3A8A] truncate">{seeker.address}</dd>
          </div>
        </dl>
      </div>

      {/* Documents Section */}
      <div className="px-4 py-4 sm:px-6 space-y-4">
        {cvUrl && (
          <div className="flex items-center justify-between bg-[#F8F5F0] rounded-md p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#D4A574]/20 rounded-md p-2">
                <FileText className="h-5 w-5 text-[#1E3A8A]" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-[#1E3A8A]">Resume</p>
              </div>
            </div>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 border border-[#D4A574] shadow-sm text-sm leading-4 font-medium rounded-md text-[#1E3A8A] bg-white hover:bg-[#F8F5F0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A574]"
            >
              <Download className="mr-2 h-4 w-4 text-[#D4A574]" />
              Download
            </a>
          </div>
        )}

        {videoUrl && (
          <div className="rounded-md overflow-hidden bg-black">
            <div className="relative aspect-video">
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
            
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="px-4 py-4 sm:px-6">
        {interviewStatus.interviewed ? (
          <button
            onClick={() => navigate(`/recruiter/interview/view/${interviewStatus.interviewId}`)}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-[#D4A574] shadow-sm text-sm font-medium rounded-md text-[#1E3A8A] bg-white hover:bg-[#F8F5F0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A574]"
          >
            <FileSearch className="mr-2 h-4 w-4 text-[#D4A574]" />
            View Interview
          </button>
        ) : (
          <button
            onClick={() => navigate(`/recruiter/interview/${interestId}`)}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A574] transition-all duration-200"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Evaluate Interview
          </button>
        )}
      </div>
    </div>
  )
}

export default JobSeekerCard