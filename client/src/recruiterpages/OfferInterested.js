import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./interested.css";

function OfferInterested() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([]);

  useEffect(() => {
    const fetchInterestedJobSeekers = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log(accessToken);
      try {
        const response = await axios.get(
          `http://localhost:3001/interest/${id}`,
          {
            headers: {
              accessToken: accessToken,
            },
          }
        );
        setListOfJobSeekerForms(response.data); // Update state with response.data
      } catch (error) {
        console.error("Error fetching interested job seekers:", error);
      }
    };

    fetchInterestedJobSeekers();
  }, [id]);

  return (
    <div className="interested">
      <div className="offer-container">
        <h2>Postulants Intéressés</h2>
        {listOfJobSeekerForms.length === 0 ? (
          <p>
            Aucun postulant n'a manifesté d'intérêt pour cette offre d'emploi.
          </p>
        ) : (
          listOfJobSeekerForms.map((value, index) => (
            <div key={index} className="job-seeker">
              <div className="nom"> Nom : {value.nom}</div>
              <div className="prenom"> Prénom : {value.prenom} </div>
              <div className="email"> Email : {value.email} </div>
              <div className="phoneNumber">
                {" "}
                Téléphone : {value.phoneNumber}{" "}
              </div>
              <div className="address"> Adresse : {value.address} </div>
              <div className="formations"> Formations : {value.formations}</div>
              <div className="experiences">
                {" "}
                Expériences : {value.experiences}
              </div>
              <div className="projetsAcademiques">
                {" "}
                Projets Académiques : {value.projetsAcademiques}
              </div>
              <div className="langues"> Langues : {value.langues}</div>
              <div className="langages"> Langages : {value.langages}</div>
              <div className="logiciels"> Logiciels : {value.logiciels}</div>
            </div>
          ))
        )}
        <button onClick={() => navigate(`/recruiter/`)} className="goback">
          Accueil
        </button>
      </div>
    </div>
  );
}

export default OfferInterested;
