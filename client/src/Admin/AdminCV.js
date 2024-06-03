import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './AdminCV.css';


function AdminCV() {
  const [listCV, setListCV] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of jobseeker CVs
    axios.get("http://localhost:3001/admin/CV")
      .then((response) => {
        setListCV(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobseeker CVs:", error);
      });
  }, []);

  const fetchCVDetails = (id) => {
    // Fetch CV details by ID
    axios.get(`http://localhost:3001/jobseeker/byId/${id}`)
      .then((response) => {
        setSelectedCV(response.data);
        setShowDetails(true); // Show details after fetching
      })
      .catch((error) => {
        console.error(`Error fetching CV ${id} details:`, error);
      });
  };

  const deleteCV = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce CV ?")) {
      axios.delete(`http://localhost:3001/admin/CV/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          // Remove the deleted CV from the list
          setListCV(listCV.filter((cv) => cv.id !== id));
          setSelectedCV(null); // Clear selected CV details after deletion
          setShowDetails(false); // Hide details after deletion
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the CV!", error);
      });
    }
  };

  const deleteUser = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`http://localhost:3001/admin/jobseeker/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          // Remove the deleted CV from the list
          setListCV(listCV.filter((cv) => cv.UserJobSeekerId !== id));
          setSelectedCV(null); // Clear selected CV details after deletion
          setShowDetails(false); // Hide details after deletion
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
    }
  };

  return (
    <div className="Home11">
      <div className="container11">
        <div className="compte11">
        <Link to="/admin/account" className="backButton11">
            Accueil
          </Link>
          <h2>CV des Chercheurs d'emploi</h2>
        </div>
        <div className="resumes11">
          {/* List of jobseeker CVs */}
          {listCV.map((cv) => (
            <div className="resume11" key={cv.id}>
              <h3>{cv.poste}</h3>
              <p><strong>ID du chercheur  :</strong> {cv.UserJobSeekerId}</p>
              <p><strong>ID du CV :</strong> {cv.id}</p>
              <p><strong>Nom :</strong> {cv.nom}</p>
              <p><strong>Prénom :</strong> {cv.prenom}</p>
              
              {/* Toggle between "Voir Détails" and "Cacher Détails" */}
              {showDetails && selectedCV && selectedCV.id === cv.id ? (
                <div>
                  <button onClick={() => setShowDetails(false)}>Cacher Détails</button>
                  <button onClick={() => deleteCV(cv.id)} className="deleteButton11">Supprimer le CV</button>
                  <button onClick={() => deleteUser(cv.UserJobSeekerId)} className="deleteButton11">Supprime l'utilisateur</button>
                  {/* Display selected CV details */}
                  <div>
                    <h4>Détails du CV</h4>
                    <p><strong>Nom :</strong> {selectedCV.nom}</p>
                    <p><strong>Email :</strong> {cv.email}</p>
                    <p><strong>Numéro :</strong> {cv.phoneNumber}</p>
                    <p><strong>Adresse :</strong> {cv.address}</p>
                    <p><strong>Formations :</strong> {cv.formations}</p>
                    <p><strong>Expérience :</strong> {cv.experiences}</p>
                    <p><strong>Projets académiques :</strong> {cv.projetsAcademiques}</p>
                    <p><strong>Langues :</strong> {cv.langues}</p>
                    <p><strong>Langages :</strong> {cv.langages}</p>
                    <p><strong>Logiciels :</strong> {cv.logiciels}</p>
                    {/* Add more details here */}
                  </div>
                </div>
              ) : (
                <button onClick={() => fetchCVDetails(cv.id)}>Voir Détails</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminCV;
