"use client"
import { useNavigate } from "react-router-dom"
import { MapPin, Building, Clock, GraduationCap, Star, ArrowRight } from "lucide-react"

export default function JobOfferCard({ offer, showScore }) {
  const navigate = useNavigate()

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div
      onClick={() => navigate(`/jobOffer/${offer.id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-[#1E3A8A]/30 transition-all duration-300 cursor-pointer group p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#1E3A8A] transition-colors mb-2">
            {offer.poste}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="w-4 h-4 mr-2" />
            <span className="font-medium">{offer.nomEntreprise}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{offer.city}</span>
            {offer.address && (
              <>
                <span className="mx-2">•</span>
                <span>{offer.address}</span>
              </>
            )}
          </div>
        </div>

        {showScore && (offer.score || offer.matchPercentage) && (
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                offer.score ?? offer.matchPercentage,
              )}`}
            >
              {(offer.score ?? offer.matchPercentage).toFixed(0)}% match
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm leading-relaxed">{offer.description}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        {offer.experience && (
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-[#1E3A8A]" />
            <span>
              <strong>Experience:</strong> {offer.experience}
            </span>
          </div>
        )}
        {offer.formations && (
          <div className="flex items-center text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2 text-[#1E3A8A]" />
            <span>
              <strong>Education:</strong> {offer.formations}
            </span>
          </div>
        )}
      </div>

      {/* Skills and Languages */}
      <div className="space-y-3 mb-4">
        {offer.skills && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-2 block">Required Skills:</span>
            <p className="text-sm text-gray-600">{offer.skills}</p>
          </div>
        )}

        {offer.keywords && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-2 block">Keywords:</span>
            <div className="flex flex-wrap gap-2">
              {offer.keywords.split(",").map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-[#F3E8D0]/50 text-[#1E3A8A] text-sm rounded-full font-medium">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {offer.langues && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-2 block">Languages:</span>
            <p className="text-sm text-gray-600">{offer.langues}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">Click to view full details</div>
        <div className="flex items-center text-[#1E3A8A] group-hover:text-[#D4A574] transition-colors">
          <span className="text-sm font-medium mr-2">Apply Now</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
