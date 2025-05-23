import React from "react";
import { useNavigate } from "react-router-dom";

export default function OfferCard({ offer, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 break-words overflow-hidden">

      <h3 className="text-xl font-semibold text-[#175d69] mb-4">{offer.poste}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
        <p><strong>Company:</strong> {offer.nomEntreprise}</p>
        <p><strong>Address:</strong> {offer.address}</p>
        <p><strong>City:</strong> {offer.city}</p>
        <p><strong>Experience:</strong> {offer.experience}</p>
        <p><strong>Education:</strong> {offer.formations}</p>
        <p><strong>Skills:</strong> {offer.skills}</p>
        <p><strong>Keywords:</strong> {offer.keywords}</p>
        <p><strong>Languages:</strong> {offer.langues}</p>
        <p className="md:col-span-2"><strong>Description:</strong> {offer.description}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onDelete(offer.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/OfferInterested/${offer.id}`)}
          className="bg-[#175d69] text-white px-4 py-2 rounded hover:bg-[#124b55] transition"
        >
          View Interested
        </button>
      </div>
    </div>
  );
}
