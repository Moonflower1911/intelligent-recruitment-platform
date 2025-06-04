"use client"
import { MapPin, Building, Clock, GraduationCap, Users, Calendar, DollarSign, Heart, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function JobOfferDetail({ offer, liked, onApply }) {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-[#1E3A8A] transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="text-sm">Back to Job Search</span>
      </button>

      {/* Main Job Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/5 p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{offer.poste}</h1>
              <div className="flex items-center text-base text-gray-700 mb-2">
                <Building className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                <span className="font-semibold">{offer.nomEntreprise}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#1E3A8A]" />
                <span>{offer.city}</span>
                {offer.address && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{offer.address}</span>
                  </>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={onApply}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                liked
                  ? "bg-red-500 text-white hover:bg-red-600 hover:scale-105"
                  : "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 hover:scale-105"
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
              {liked ? "Withdraw Application" : "Apply Now"}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{offer.description}</p>
            </div>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {offer.experience && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-[#1E3A8A] mr-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Experience Required</h3>
                </div>
                <p className="text-gray-700 text-sm">{offer.experience}</p>
              </div>
            )}

            {offer.formations && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <GraduationCap className="w-4 h-4 text-[#1E3A8A] mr-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Education Requirements</h3>
                </div>
                <p className="text-gray-700 text-sm">{offer.formations}</p>
              </div>
            )}

            {offer.salaire && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-4 h-4 text-[#1E3A8A] mr-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Salary</h3>
                </div>
                <p className="text-gray-700 text-sm">{offer.salaire}</p>
              </div>
            )}

            {offer.typeContrat && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 text-[#1E3A8A] mr-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Contract Type</h3>
                </div>
                <p className="text-gray-700 text-sm">{offer.typeContrat}</p>
              </div>
            )}
          </div>

          {/* Skills Section */}
          {offer.skills && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h2>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">{offer.skills}</p>
            </div>
          )}

          {/* Keywords Section */}
          {offer.keywords && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {offer.keywords.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#F3E8D0]/50 text-[#1E3A8A] rounded-full font-medium border border-[#F3E8D0] text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {offer.langues && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Language Requirements</h2>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">{offer.langues}</p>
            </div>
          )}

          {/* Company Information */}
          <div className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#D4A574]/5 rounded-lg p-4 border border-[#F3E8D0]">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About the Company</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Building className="w-4 h-4 text-[#1E3A8A] mr-2" />
                <span className="font-medium text-gray-900 text-sm">{offer.nomEntreprise}</span>
              </div>
              {offer.secteurActivite && (
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-[#1E3A8A] mr-2" />
                  <span className="text-gray-700 text-sm">Sector: {offer.secteurActivite}</span>
                </div>
              )}
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-[#1E3A8A] mr-2" />
                <span className="text-gray-700 text-sm">
                  {offer.city}
                  {offer.address && `, ${offer.address}`}
                </span>
              </div>
              {offer.createdAt && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-[#1E3A8A] mr-2" />
                  <span className="text-gray-700 text-sm">
                    Posted: {new Date(offer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Ready to apply?</h3>
            <p className="text-gray-600 text-sm">Join {offer.nomEntreprise} and take the next step in your career.</p>
          </div>
          <button
            onClick={onApply}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              liked
                ? "bg-red-500 text-white hover:bg-red-600 hover:scale-105"
                : "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 hover:scale-105"
            }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
            {liked ? "Withdraw Application" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  )
}
