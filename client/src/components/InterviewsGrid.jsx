"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  User,
  Mail,
  Phone,
  FileText,
  Video,
  Play,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  EyeOff,
  MessageSquare,
  Award,
  TrendingUp,
  ArrowLeft,
  Users,
  Briefcase,
} from "lucide-react"

const InterviewsGrid = () => {
  const { offerId } = useParams()
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedCards, setExpandedCards] = useState(new Set())
  const [visibleVideos, setVisibleVideos] = useState(new Set())

  useEffect(() => {
    axios
      .get(`http://localhost:3001/interview/offer/${offerId}`)
      .then((res) => {
        setInterviews(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching interviews:", err)
        setError("Failed to load interviews")
        setLoading(false)
      })
  }, [offerId])

  const handleBackToDashboard = () => {
    navigate("/recruiter")
  }

  const toggleCardExpansion = (interviewId) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(interviewId)) {
      newExpanded.delete(interviewId)
    } else {
      newExpanded.add(interviewId)
    }
    setExpandedCards(newExpanded)
  }

  const toggleVideoVisibility = (videoId) => {
    const newVisible = new Set(visibleVideos)
    if (newVisible.has(videoId)) {
      newVisible.delete(videoId)
    } else {
      newVisible.add(videoId)
    }
    setVisibleVideos(newVisible)
  }

  const getScoreColor = (score) => {
    if (!score) return "bg-gray-500"
    if (score >= 4) return "bg-green-500"
    if (score >= 3) return "bg-blue-500"
    if (score >= 2) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreLabel = (score) => {
    if (!score) return "N/A"
    if (score >= 4) return "Excellent"
    if (score >= 3) return "Good"
    if (score >= 2) return "Average"
    return "Poor"
  }

  const calculateAverageScore = (interview) => {
    const scores = [interview.communication_score, interview.technical_score, interview.motivation_score].filter(
      (score) => score !== undefined && score !== null,
    )

    if (scores.length === 0) return null
    return scores.reduce((sum, score) => sum + score, 0) / scores.length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Interview Results</h1>
                  <p className="text-gray-500">Loading interviews...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-lg text-gray-600">Loading interviews...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Interview Results</h1>
                  <p className="text-red-500">Error loading data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Error Loading Interviews</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (interviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Interview Results</h1>
                  <p className="text-gray-500">0 interviews found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto mt-8 px-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900">No Interviews Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  No interviews have been conducted for this job offer. Check back later or start scheduling interviews
                  with interested candidates.
                </p>
              </div>
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Interview Results</h1>
                <p className="text-gray-500">
                  {interviews.length} interview{interviews.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {interviews.map((interview) => {
            const jobSeeker = interview.Interest?.JobSeekerForm
            const videoUrl = interview.video_path?.replace(/\\/g, "/")
            const cvUrl = jobSeeker?.cvFilePath?.replace(/\\/g, "/")
            const pitchVideoUrl = jobSeeker?.videoFilePath?.replace(/\\/g, "/")
            const isExpanded = expandedCards.has(interview.id)
            const averageScore = calculateAverageScore(interview)

            return (
              <div
                key={interview.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {jobSeeker?.prenom} {jobSeeker?.nom}
                        </h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{new Date(interview.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {averageScore && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">{averageScore.toFixed(1)}</div>
                        <div className="text-xs text-gray-500">Overall</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4 text-teal-500" />
                    <span className="text-sm">{jobSeeker?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{jobSeeker?.phoneNumber}</span>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { label: "Communication", score: interview.communication_score, icon: MessageSquare },
                      { label: "Technical", score: interview.technical_score, icon: Award },
                      { label: "Motivation", score: interview.motivation_score, icon: TrendingUp },
                    ].map(({ label, score, icon: Icon }) => (
                      <div key={label} className="text-center p-3 bg-gray-50 rounded-lg">
                        <Icon className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                        <div className="text-xs text-gray-500 mb-1">{label}</div>
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-lg font-bold text-gray-900">{score ?? "N/A"}</span>
                          {score && <div className={`w-2 h-2 rounded-full ${getScoreColor(score)}`} />}
                        </div>
                        {score && <div className="text-xs text-gray-500 mt-1">{getScoreLabel(score)}</div>}
                      </div>
                    ))}
                  </div>

                  {/* Expandable Content */}
                  <div className="mt-4">
                    <button
                      onClick={() => toggleCardExpansion(interview.id)}
                      className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{isExpanded ? "Hide Details" : "Show Details"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {/* Notes */}
                        {interview.notes && (
                          <div className="p-4 bg-teal-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <MessageSquare className="w-4 h-4 mr-2 text-teal-600" />
                              Interview Notes
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{interview.notes}</p>
                          </div>
                        )}

                        {/* Media Files */}
                        <div className="space-y-3">
                          {/* CV Link */}
                          {cvUrl && (
                            <a
                              href={`http://localhost:3001/${cvUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                            >
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-800">View CV</span>
                              </div>
                              <Download className="w-4 h-4 text-green-600 group-hover:translate-y-0.5 transition-transform" />
                            </a>
                          )}

                          {/* Interview Video */}
                          {videoUrl && (
                            <div className="space-y-2">
                              <button
                                onClick={() => toggleVideoVisibility(`interview-${interview.id}`)}
                                className="flex items-center justify-between w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <Video className="w-5 h-5 text-purple-600" />
                                  <span className="font-medium text-purple-800">Interview Recording</span>
                                </div>
                                {visibleVideos.has(`interview-${interview.id}`) ? (
                                  <EyeOff className="w-4 h-4 text-purple-600" />
                                ) : (
                                  <Eye className="w-4 h-4 text-purple-600" />
                                )}
                              </button>
                              {visibleVideos.has(`interview-${interview.id}`) && (
                                <video
                                  src={`http://localhost:3001/${videoUrl}`}
                                  controls
                                  className="w-full rounded-lg shadow-sm"
                                />
                              )}
                            </div>
                          )}

                          {/* Pitch Video */}
                          {pitchVideoUrl && (
                            <div className="space-y-2">
                              <button
                                onClick={() => toggleVideoVisibility(`pitch-${interview.id}`)}
                                className="flex items-center justify-between w-full p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <Play className="w-5 h-5 text-orange-600" />
                                  <span className="font-medium text-orange-800">Candidate Pitch</span>
                                </div>
                                {visibleVideos.has(`pitch-${interview.id}`) ? (
                                  <EyeOff className="w-4 h-4 text-orange-600" />
                                ) : (
                                  <Eye className="w-4 h-4 text-orange-600" />
                                )}
                              </button>
                              {visibleVideos.has(`pitch-${interview.id}`) && (
                                <video
                                  src={`http://localhost:3001/${pitchVideoUrl}`}
                                  controls
                                  className="w-full rounded-lg shadow-sm"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InterviewsGrid
