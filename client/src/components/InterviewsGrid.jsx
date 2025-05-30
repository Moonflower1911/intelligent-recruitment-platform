"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  BarChart2,
  ListOrdered,
  Sparkles,
} from "lucide-react";

const InterviewsGrid = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [visibleVideos, setVisibleVideos] = useState(new Set());
  const [isRanked, setIsRanked] = useState(false);
  const [isRanking, setIsRanking] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, [offerId]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/interview/offer/${offerId}`
      );
      setInterviews(response.data);
      setIsRanked(false);
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setError("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  const handleRankCandidates = async () => {
    try {
      setIsRanking(true);
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `http://localhost:3001/interview/rank/${offerId}`,
        {},
        { headers: { accessToken } }
      );
      console.log(
        "[RANKING RESPONSE] Data received from backend:",
        response.data
      );
      setInterviews(response.data.rankedCandidates);
      setIsRanked(true);
    } catch (err) {
      console.error("Error ranking candidates:", err);
      setError("Failed to rank candidates");
    } finally {
      setIsRanking(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/recruiter");
  };

  const toggleCardExpansion = (interviewId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(interviewId)) {
      newExpanded.delete(interviewId);
    } else {
      newExpanded.add(interviewId);
    }
    setExpandedCards(newExpanded);
  };

  const toggleVideoVisibility = (videoId) => {
    const newVisible = new Set(visibleVideos);
    if (newVisible.has(videoId)) {
      newVisible.delete(videoId);
    } else {
      newVisible.add(videoId);
    }
    setVisibleVideos(newVisible);
  };

  const getScoreColor = (score) => {
    if (!score) return "bg-gray-500";
    if (score >= 4) return "bg-green-500";
    if (score >= 3) return "bg-[#1E3A8A]";
    if (score >= 2) return "bg-[#D4A574]";
    return "bg-red-500";
  };

  const getScoreLabel = (score) => {
    if (!score) return "N/A";
    if (score >= 4) return "Excellent";
    if (score >= 3) return "Good";
    if (score >= 2) return "Average";
    return "Poor";
  };

  const HeaderBadge = () => {
    if (isRanked) {
      return (
        <div className="inline-flex items-center gap-2 bg-[#D4A574]/20 text-[#1E3A8A] px-4 py-2 rounded-xl font-medium ml-4 border border-[#D4A574]/30">
          <ListOrdered className="w-5 h-5 text-[#1E3A8A]" />
          Ranked by AI Analysis
        </div>
      );
    }
    return null;
  };

  const RankingIndicator = ({ index }) => {
    if (!isRanked) return null;
    return (
      <div className="absolute top-4 right-4 bg-[#1E3A8A] text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
        {index + 1}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0]">
        <div className="bg-white shadow-sm border-b border-[#F8F5F0]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
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
                    Interview Results
                  </h1>
                  <p className="text-[#1E3A8A]/70">Loading interviews...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574] mx-auto"></div>
            <p className="text-lg text-[#1E3A8A]/80">Loading interviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-[#F8F5F0]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
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
                    Interview Results
                  </h1>
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
            <h3 className="text-xl font-semibold text-[#1E3A8A]">
              Error Loading Interviews
            </h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F5F0]">
        <div className="bg-white shadow-sm border-b border-[#F8F5F0]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
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
                    Interview Results
                  </h1>
                  <p className="text-[#1E3A8A]/70">0 interviews found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 px-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#F8F5F0] p-12">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-[#F8F5F0] rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-12 h-12 text-[#D4A574]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[#1E3A8A]">
                  No Interviews Yet
                </h3>
                <p className="text-[#1E3A8A]/70 max-w-md mx-auto leading-relaxed">
                  No interviews have been conducted for this job offer. Check
                  back later or start scheduling interviews with interested
                  candidates.
                </p>
              </div>
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-30">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left Side - Back button and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
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
                    Interview Results
                  </h1>
                  <p className="text-[#1E3A8A]/70">
                    {interviews.length} interview
                    {interviews.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Rank Button or Badge */}
            <div className="flex items-center justify-end sm:justify-normal">
              {isRanked ? (
                <div className="inline-flex items-center gap-2 bg-[#D4A574]/20 text-[#1E3A8A] px-4 py-2 rounded-xl font-medium border border-[#D4A574]/30">
                  <ListOrdered className="w-5 h-5 text-[#1E3A8A]" />
                  Ranked by AI Analysis
                </div>
              ) : (
                interviews.length > 0 && (
                  <button
                    onClick={handleRankCandidates}
                    disabled={isRanking}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isRanking ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Ranking...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Rank Candidates
                      </>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {interviews.map((interview, index) => {
            const jobSeeker = interview.Interest?.JobSeekerForm;
            const videoUrl = interview.video_path?.replace(/\\/g, "/");
            const cvUrl = jobSeeker?.cvFilePath?.replace(/\\/g, "/");
            const pitchVideoUrl = jobSeeker?.videoFilePath?.replace(/\\/g, "/");
            const isExpanded = expandedCards.has(interview.id);

            return (
              <div
                key={interview.id}
                className="bg-white rounded-xl shadow-lg border border-[#F8F5F0] overflow-hidden hover:shadow-xl transition-all duration-300 relative"
              >
                <RankingIndicator index={index} />

                <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/10 p-6 border-b border-[#F8F5F0]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E3A8A]">
                          {jobSeeker?.prenom} {jobSeeker?.nom}
                        </h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-4 h-4 text-[#D4A574]" />
                          <span className="text-sm text-[#1E3A8A]/70">
                            {new Date(interview.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[#1E3A8A]/80">
                    <Mail className="w-4 h-4 text-[#D4A574]" />
                    <span className="text-sm">{jobSeeker?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#1E3A8A]/80">
                    <Phone className="w-4 h-4 text-[#D4A574]" />
                    <span className="text-sm">{jobSeeker?.phoneNumber}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      {
                        label: "Communication",
                        score: interview.communication_score,
                        icon: MessageSquare,
                      },
                      {
                        label: "Technical",
                        score: interview.technical_score,
                        icon: Award,
                      },
                      {
                        label: "Motivation",
                        score: interview.motivation_score,
                        icon: TrendingUp,
                      },
                    ].map(({ label, score, icon: Icon }) => (
                      <div
                        key={label}
                        className="text-center p-3 bg-[#F8F5F0] rounded-lg"
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1 text-[#1E3A8A]" />
                        <div className="text-xs text-[#1E3A8A]/70 mb-1">
                          {label}
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-lg font-bold text-[#1E3A8A]">
                            {score ?? "N/A"}
                          </span>
                          {score && (
                            <div
                              className={`w-2 h-2 rounded-full ${getScoreColor(
                                score
                              )}`}
                            />
                          )}
                        </div>
                        {score && (
                          <div className="text-xs text-[#1E3A8A]/70 mt-1">
                            {getScoreLabel(score)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => toggleCardExpansion(interview.id)}
                      className="flex items-center justify-between w-full p-3 bg-[#F8F5F0] rounded-lg hover:bg-[#1E3A8A]/5 transition-colors"
                    >
                      <span className="font-medium text-[#1E3A8A]">
                        {isExpanded ? "Hide Details" : "Show Details"}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#D4A574]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#D4A574]" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {interview.notes && (
                          <div className="p-4 bg-[#1E3A8A]/5 rounded-lg border border-[#1E3A8A]/10">
                            <h4 className="font-semibold text-[#1E3A8A] mb-2 flex items-center">
                              <MessageSquare className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                              Interview Notes
                            </h4>
                            <p className="text-[#1E3A8A]/80 text-sm leading-relaxed">
                              {interview.notes}
                            </p>
                          </div>
                        )}

                        <div className="space-y-3">
                          {cvUrl && (
                            <a
                              href={`http://localhost:3001/${cvUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-[#D4A574]/10 rounded-lg hover:bg-[#D4A574]/20 transition-colors group border border-[#D4A574]/20"
                            >
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-[#1E3A8A]" />
                                <span className="font-medium text-[#1E3A8A]">
                                  View CV
                                </span>
                              </div>
                              <Download className="w-4 h-4 text-[#1E3A8A] group-hover:translate-y-0.5 transition-transform" />
                            </a>
                          )}

                          {videoUrl && (
                            <div className="space-y-2">
                              <button
                                onClick={() =>
                                  toggleVideoVisibility(
                                    `interview-${interview.id}`
                                  )
                                }
                                className="flex items-center justify-between w-full p-3 bg-[#1E3A8A]/5 rounded-lg hover:bg-[#1E3A8A]/10 transition-colors border border-[#1E3A8A]/10"
                              >
                                <div className="flex items-center space-x-3">
                                  <Video className="w-5 h-5 text-[#1E3A8A]" />
                                  <span className="font-medium text-[#1E3A8A]">
                                    Interview Recording
                                  </span>
                                </div>
                                {visibleVideos.has(
                                  `interview-${interview.id}`
                                ) ? (
                                  <EyeOff className="w-4 h-4 text-[#1E3A8A]" />
                                ) : (
                                  <Eye className="w-4 h-4 text-[#1E3A8A]" />
                                )}
                              </button>
                              {visibleVideos.has(
                                `interview-${interview.id}`
                              ) && (
                                <video
                                  src={`http://localhost:3001/${videoUrl}`}
                                  controls
                                  className="w-full rounded-lg shadow-sm"
                                />
                              )}
                            </div>
                          )}

                          {pitchVideoUrl && (
                            <div className="space-y-2">
                              <button
                                onClick={() =>
                                  toggleVideoVisibility(`pitch-${interview.id}`)
                                }
                                className="flex items-center justify-between w-full p-3 bg-[#D4A574]/10 rounded-lg hover:bg-[#D4A574]/20 transition-colors border border-[#D4A574]/20"
                              >
                                <div className="flex items-center space-x-3">
                                  <Play className="w-5 h-5 text-[#1E3A8A]" />
                                  <span className="font-medium text-[#1E3A8A]">
                                    Candidate Pitch
                                  </span>
                                </div>
                                {visibleVideos.has(`pitch-${interview.id}`) ? (
                                  <EyeOff className="w-4 h-4 text-[#1E3A8A]" />
                                ) : (
                                  <Eye className="w-4 h-4 text-[#1E3A8A]" />
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

                          {isRanked && (
                            <div className="mt-4 p-4 bg-[#1E3A8A]/5 rounded-lg border border-[#1E3A8A]/10">
                              <h4 className="font-semibold text-[#1E3A8A] mb-3 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-[#D4A574]" />
                                AI Evaluation Scores
                              </h4>
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  {
                                    label: "Notes Analysis",
                                    score: interview.notes_score,
                                    icon: FileText,
                                  },
                                  {
                                    label: "Video Analysis",
                                    score: interview.video_score,
                                    icon: Video,
                                  },
                                  {
                                    label: "Overall Score",
                                    score: interview.overall_score,
                                    icon: BarChart2,
                                  },
                                ].map(({ label, score, icon: Icon }) => (
                                  <div
                                    key={label}
                                    className="text-center p-3 bg-white rounded-lg shadow-xs"
                                  >
                                    <Icon className="w-5 h-5 mx-auto mb-1 text-[#1E3A8A]" />
                                    <div className="text-xs text-[#1E3A8A]/70 mb-1">
                                      {label}
                                    </div>
                                    <div className="text-lg font-bold text-[#1E3A8A]">
                                      {score ?? "N/A"}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InterviewsGrid;
