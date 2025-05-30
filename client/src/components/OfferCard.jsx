import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Building,
  Clock,
  GraduationCap,
  User,
  Trash2,
  Eye,
  Users
} from "lucide-react";

export default function OfferCard({ offer, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-[#1E3A8A]/30 transition-all duration-300 p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {offer.poste}
          </h3>
          <div className="flex items-center text-gray-600 mb-1">
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
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm leading-relaxed">{offer.description}</p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
        {offer.experience && (
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-[#1E3A8A]" />
            <span><strong>Experience:</strong> {offer.experience}</span>
          </div>
        )}
        {offer.formations && (
          <div className="flex items-center text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2 text-[#1E3A8A]" />
            <span><strong>Education:</strong> {offer.formations}</span>
          </div>
        )}
      </div>

      {/* Skills, Keywords, Languages */}
      <div className="space-y-3 mb-4">
        {offer.skills && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-1 block">Skills:</span>
            <div className="flex flex-wrap gap-2">
              {offer.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#F3E8D0]/50 text-[#1E3A8A] text-sm rounded-full font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {offer.keywords && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-1 block">Keywords:</span>
            <p className="text-sm text-gray-600">{offer.keywords}</p>
          </div>
        )}

        {offer.langues && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-1 block">Languages:</span>
            <p className="text-sm text-gray-600">{offer.langues}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 mt-4">
        <button
          onClick={() => onDelete(offer.id)}
          className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <button
          onClick={() => navigate(`/OfferInterested/${offer.id}`)}
          className="flex items-center gap-2 bg-[#175d69]/10 text-[#175d69] px-4 py-2 rounded-lg hover:bg-[#175d69]/20 transition"
        >
          <Eye className="w-4 h-4" />
          View Interested
        </button>

        <button
          onClick={() => navigate(`/recruiter/offers/${offer.id}/interviews`)}
          className="flex items-center gap-2 bg-[#175d69]/10 text-[#175d69] px-4 py-2 rounded-lg hover:bg-[#175d69]/20 transition"
        >
          <Users className="w-4 h-4" />
          View Interviewees
        </button>
      </div>
    </div>
  );
}
