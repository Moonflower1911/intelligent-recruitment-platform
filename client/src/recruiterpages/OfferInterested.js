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
    <div className="interested9">
      <div className="offer-container9">
        <h2>Postulants Intéressés</h2>
        {listOfJobSeekerForms.length === 0 ? (
          <p>Aucun postulant n'a manifesté d'intérêt pour cette offre d'emploi.</p>
        ) : (
          listOfJobSeekerForms.map((value, index) => (
            <div key={index} className="job-seeker9">
              <div className="text99">Nom : {value.nom}</div>
              <div className="text99">Prénom : {value.prenom}</div>
              <div className="text9">Email : {value.email}</div>
              <div className="text9">Téléphone : {value.phoneNumber}</div>
              <div className="text9">Adresse : {value.address}</div>
              <div className="text9">Formations : {value.formations}</div>
              <div className="text9">Expériences : {value.experiences}</div>
              <div className="text9">Projets Académiques : {value.projetsAcademiques}</div>
              <div className="text9">Langues : {value.langues}</div>
              <div className="text9">Langages : {value.langages}</div>
              <div className="text9">Logiciels : {value.logiciels}</div>
              {sorted && (
                <div className="text9">Pourcentage de Correspondance : {value.matchPercentage}%</div>
              )}
            </div>
          ))
        )}
        {listOfJobSeekerForms.length > 0 && !sorted &&(
          <button onClick={fetchSortedJobSeekers} className="sort-button9">
            Trier
          </button>
        )}
        <button onClick={() => navigate(`/recruiter/`)} className="goback9">
          Accueil
        </button>
      </div>
    </div>
  );
}

export default OfferInterested;

