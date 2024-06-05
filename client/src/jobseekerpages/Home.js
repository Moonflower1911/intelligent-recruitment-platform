import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Home.css';

function JobSeekerHome() {
  const [listOfRecruiters, setListOfRecruiters] = useState([]);
  const [showScores, setShowScores] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/recruiter").then((response) => {
      setListOfRecruiters(response.data);
    });
  }, []);

  const sortJobOffers = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3001/recruiter/rankedJobOffers", {
        headers: {
          accessToken: accessToken,
        },
      });
      setListOfRecruiters(response.data);
      setShowScores(true);
    } catch (error) {
      console.error('Error fetching ranked job offers:', error);
    }
  };

  return (
    <div className="Home5">
      <header className="CvNavbar5">
        <Link to="/accountjobseeker">Mon compte</Link>
      </header>
      <div className="container5">
        <button onClick={sortJobOffers} className="sortButton5">Trier</button>
        <div className="jobOffers5">
          {listOfRecruiters.map((value, key) => (
            <div
              className="jobOffer5"
              key={key}
              onClick={() => navigate(`/jobOffer/${value.id}`)}
            >
              <div className="personalInfo5">
                <div className="nomEntreprise5">Nom de l'entreprise: {value.nomEntreprise}</div>
                <div className="address5">Adresse: {value.address}</div>
                <div className="city5">Ville: {value.city}</div>
              </div>
              <div className="body5">
                <div className="poste5">Poste: {value.poste}</div>
                <div className="description5">Description: {value.description}</div>
                <div className="experience5">Expérience: {value.experience}</div>
                <div className="formations5">Formations: {value.formations}</div>
                <div className="skills5">Compétences: {value.skills}</div>
                <div className="keywords5">Mots-clés: {value.keywords}</div>
                <div className="langues5">Langues: {value.langues}</div>
                {showScores && ( // Conditionally render the score based on showScores state
                  <div className="matchScore5">
                    Score de correspondance: {value.matchScore !== undefined ? value.matchScore.toFixed(2) : 'N/A'}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
}

export default JobSeekerHome;
