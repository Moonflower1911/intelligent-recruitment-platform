import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobOfferCard({ offer, showScore }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobOffer/${offer.id}`)}
      className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 cursor-pointer hover:shadow-lg transition break-words overflow-hidden"
    >
      <h3 className="text-xl font-semibold text-[#175d69] mb-4">
        {offer.poste}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <p>
          <strong>Company:</strong> {offer.nomEntreprise}
        </p>
        <p>
          <strong>Address:</strong> {offer.address}
        </p>
        <p>
          <strong>City:</strong> {offer.city}
        </p>
        <p>
          <strong>Experience:</strong> {offer.experience}
        </p>
        <p>
          <strong>Education:</strong> {offer.formations}
        </p>
        <p>
          <strong>Skills:</strong> {offer.skills}
        </p>
        <p>
          <strong>Keywords:</strong> {offer.keywords}
        </p>
        <p>
          <strong>Languages:</strong> {offer.langues}
        </p>
      </div>

      <p className="text-gray-600 text-sm mb-2">
        <strong>Description:</strong> {offer.description}
      </p>

      {showScore && (offer.score || offer.matchPercentage) && (
        <p className="text-sm font-semibold text-green-500">
          Relevance: {(offer.score ?? offer.matchPercentage).toFixed(2)}%
        </p>
      )}

    </div>
  );
}
