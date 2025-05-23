// src/components/CVCard.jsx
import React from "react";

const CVCard = ({ cv }) => {
  if (!cv || Object.keys(cv).length === 0) return null;

  return (
    <div className="bg-white max-w-3xl mx-auto p-6 mt-10 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-[#175d69] mb-4">Profil du Candidat</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
        <p><strong>Nom:</strong> {cv.nom}</p>
        <p><strong>Prénom:</strong> {cv.prenom}</p>
        <p><strong>Email:</strong> {cv.email}</p>
        <p><strong>Téléphone:</strong> {cv.telephone}</p>
        <p><strong>Adresse:</strong> {cv.adresse}</p>
        <p><strong>Ville:</strong> {cv.ville}</p>
        <p><strong>Niveau d'études:</strong> {cv.niveauEtude}</p>
        <p><strong>Années d'expérience:</strong> {cv.experience}</p>
        <p className="md:col-span-2"><strong>Compétences:</strong> {cv.competences}</p>
        <p className="md:col-span-2"><strong>Résumé:</strong> {cv.resume}</p>
      </div>
    </div>
  );
};

export default CVCard;
