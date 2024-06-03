import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './AdminCV';

function AdminOffers() {
  const [listOfOffers, setListOfOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of job offers
    axios.get("http://localhost:3001/admin/offres")
      .then((response) => {
        setListOfOffers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job offers:", error);
      });
  }, []);

  const fetchOfferDetails = (id) => {
    // Fetch offer details by ID
    axios.get(`http://localhost:3001/recruiter/byId/${id}`)
      .then((response) => {
        setSelectedOffer(response.data);
        setShowDetails(true); // Show details after fetching
      })
      .catch((error) => {
        console.error(`Error fetching job offer ${id} details:`, error);
      });
  };

  const hideDetails = () => {
    setSelectedOffer(null); // Clear selected offer details
    setShowDetails(false); // Hide details
  };

  const deleteJobOffer = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cette offre d'emploi ?")) {
      axios.delete(`http://localhost:3001/admin/offres/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          // Remove the deleted offer from the list
          setListOfOffers(listOfOffers.filter((offer) => offer.id !== id));
          setSelectedOffer(null); // Clear selected offer details after deletion
          setShowDetails(false); // Hide details after deletion
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the job offer!", error);
      });
    }
  };

  const deleteUser = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`http://localhost:3001/admin/recruiter/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          // Remove the deleted offer from the list
          setListOfOffers(listOfOffers.filter((offer) => offer.UserRecruiterId !== id));
          setSelectedOffer(null); // Clear selected offer details after deletion
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
          <h2>Offres des Chercheurs d'emploi</h2>
          <Link to="/admin/account" className="backButton11">
            Accueil
          </Link>
        </div>
        <div className="resumes11">
          {/* List of job offers */}
          {listOfOffers.map((offer) => (
            <div className="resume11" key={offer.id}>
              <h3>{offer.poste}</h3>
              <p><strong>ID de l'utilisateur :</strong> {offer.UserRecruiterId}</p>
              <p><strong>ID de l'Offre :</strong> {offer.id}</p>
              <p><strong>Nom de l'entreprise :</strong> {offer.nomEntreprise}</p>
              {/* Toggle between "Voir Détails" and "Cacher Détails" */}
              {showDetails && selectedOffer && selectedOffer.id === offer.id ? (
                <div>
                  <button onClick={hideDetails}>Cacher Détails</button>
                  <button onClick={() => deleteJobOffer(offer.id)} className="deleteButton11">Supprimer l'offre</button>
                  <button onClick={() => deleteUser(offer.UserRecruiterId)} className="deleteButton11">Supprime l'utilisateur</button>

                  {/* Display selected offer details */}
                  <div>
                    <h4>Détails de l'Offre</h4>
                    <p><strong>Nom de l'entreprise :</strong> {selectedOffer.nomEntreprise}</p>
                    <p><strong>Description :</strong> {selectedOffer.description}</p>
                    <p><strong>Expérience :</strong> {selectedOffer.experience}</p>
                    <p><strong>Addresse :</strong> {selectedOffer.address}</p>
                    <p><strong>Formations :</strong> {selectedOffer.formations}</p>
                    <p><strong> Skills:</strong> {selectedOffer.skills}</p>
                    <p><strong>Keywords:</strong> {selectedOffer.keywords}</p>
                    <p><strong> Langues:</strong> {selectedOffer.langues}</p>
                    {/* Add more details here */}
                  </div>
                </div>
              ) : (
                <button onClick={() => fetchOfferDetails(offer.id)}>Voir Détails</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOffers;
