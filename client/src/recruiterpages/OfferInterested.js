import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./interested.css";

function OfferInterested() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchInterestedJobSeekers = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:3001/interest/${id}`,
          {
            headers: {
              accessToken: accessToken,
            },
          }
        );
        setListOfJobSeekerForms(response.data);
      } catch (error) {
        console.error("Error fetching interested job seekers:", error);
      }
    };

    fetchInterestedJobSeekers();
  }, [id]);

  const fetchSortedJobSeekers = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3001/interest/${id}/match`,
        {
          headers: {
            accessToken: accessToken,
          },
        }
      );
      const sortedJobSeekers = response.data.sort((a, b) => b.matchPercentage - a.matchPercentage);
      setListOfJobSeekerForms(sortedJobSeekers);
      setSorted(true);
    } catch (error) {
      console.error("Error fetching sorted job seekers:", error);
    }
  };

  return (
    <div className="interested">
      <div className="offer-container">
        <h2>Postulants Intéressés</h2>
        {listOfJobSeekerForms.length === 0 ? (
          <p>Aucun postulant n'a manifesté d'intérêt pour cette offre d'emploi.</p>
        ) : (
          listOfJobSeekerForms.map((value, index) => (
            <div key={index} className="job-seeker">
              <div className="text1">Nom : {value.nom}</div>
              <div className="text1">Prénom : {value.prenom}</div>
              <div className="text">Email : {value.email}</div>
              <div className="text">Téléphone : {value.phoneNumber}</div>
              <div className="text">Adresse : {value.address}</div>
              <div className="text">Formations : {value.formations}</div>
              <div className="text">Expériences : {value.experiences}</div>
              <div className="text">Projets Académiques : {value.projetsAcademiques}</div>
              <div className="text">Langues : {value.langues}</div>
              <div className="text">Langages : {value.langages}</div>
              <div className="text">Logiciels : {value.logiciels}</div>
              {sorted && (
                <div className="text">Pourcentage de Correspondance : {value.matchPercentage}%</div>
              )}
            </div>
          ))
        )}
        {!sorted && (
          <button onClick={fetchSortedJobSeekers} className="sort-button">
            Trier par Correspondance
          </button>
        )}
        <button onClick={() => navigate(`/recruiter/`)} className="goback">
          Accueil
        </button>
      </div>
    </div>
  );
}

export default OfferInterested;

