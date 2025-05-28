"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Mail, Phone, MapPin, FileText, Video,
  Calendar, Target, Download, Play, User, FileSearch
} from "lucide-react"

const JobSeekerCard = ({ seeker, interestId, showMatch = false }) => {
  const navigate = useNavigate()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [interviewStatus, setInterviewStatus] = useState({ interviewed: false, interviewId: null })

  const cvUrl = seeker.cvFilePath ? `http://localhost:3001/${seeker.cvFilePath.replace(/\\/g, "/")}` : null
  const videoUrl = seeker.videoFilePath ? `http://localhost:3001/${seeker.videoFilePath.replace(/\\/g, "/")}` : null
  const matchScore = seeker.matchPercentage ?? seeker.tfidfScore ?? 0
  const initials = `${seeker.nom.charAt(0)}${seeker.prenom.charAt(0)}`

  const getMatchColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
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
    <div className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 rounded-xl overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">{initials}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {seeker.prenom} {seeker.nom}
              </h3>
              <p className="text-gray-500 font-medium">Job Candidate</p>
            </div>
          </div>

          {showMatch && (
            <span className={`${getMatchColor(matchScore)} font-semibold px-3 py-1 text-sm rounded-full border flex items-center`}>
              <Target className="w-4 h-4 mr-1" />
              {matchScore.toFixed(1)}% Match
            </span>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
            <Mail className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm text-gray-900">{seeker.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
            <Phone className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-sm text-gray-900">{seeker.phoneNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 md:col-span-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-sm text-gray-900">{seeker.address}</p>
            </div>
          </div>
        </div>

        {/* CV Section */}
        {cvUrl && (
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Resume/CV</h4>
                  <p className="text-sm text-gray-500">View candidate's resume</p>
                </div>
              </div>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}

        {/* Video Section */}
        {videoUrl && (
          <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Introduction Video</h4>
                <p className="text-sm text-gray-500">Candidate's video presentation</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                src={videoUrl}
                controls
                className="w-full max-h-64 object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="p-4 bg-white bg-opacity-90 rounded-full">
                    <Play className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          {interviewStatus.interviewed ? (
            <button
              onClick={() => navigate(`/recruiter/interview/view/${interviewStatus.interviewId}`)}
              className="flex-1 inline-flex items-center justify-center bg-green-100 text-green-800 font-semibold py-3 px-4 rounded-lg hover:bg-green-200 transition"
            >
              <FileSearch className="w-5 h-5 mr-2" />
              View Interview
            </button>
          ) : (
            <button
              onClick={() => navigate(`/recruiter/interview/${interestId}`)}
              className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Conduct Interview
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobSeekerCard
