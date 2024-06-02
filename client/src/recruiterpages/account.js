import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./account.css";

function AccountRecruiter() {
  const [userData, setUserData] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:3001/recruiter/account", {
          headers: {
            accessToken: token,
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.error);
          } else {
            setUserData(response.data.user);
            setJobOffers(response.data.jobOffers);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, []);

  const deleteJobOffer = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cette offre d'emploi ?")) {
      axios
        .delete(`http://localhost:3001/recruiter/${id}`, {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.error);
          } else {
            setJobOffers(jobOffers.filter((offer) => offer.id !== id));
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the job offer!", error);
        });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUserData(null);
    setJobOffers([]);
    navigate("/authrecruiter/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <style jsx>{`
          .login-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(to bottom, #175d69 23%, #07142b 95%);
            font-family: Arial, sans-serif;
            color: #fff;
            text-align: center;
            padding: 20px;
          }
  
          .acces-requis {
            font-size: 1.5em;
            margin-bottom: 20px;
            background-color: rgba(0, 0, 0, 0.6);
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            color: #fff;
          }
  
    
        `}</style>
        <h2 className="acces-requis">Pour accéder à la page veuillez vous connectez</h2>
        <button className="login-button" onClick={() => navigate("/authrecruiter/login")}>Login</button>
      </div>
    );
  }
  

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <body className="account">
      <div className="container">
        <div className="compte">
          <div className="user">
            <div className="userInfo">
              <div className="img"></div>
              <p>Nom d'utilisateur: {userData.username}</p>
              <p>ID: {userData.id}</p>
            </div>
          </div>
          <button onClick={() => navigate("/createJobOffer")}>
            Créer une nouvelle offre d'emploi
          </button>
          {isLoggedIn && <button onClick={logout}>Se déconnecter</button>}
        </div>
        <div className="jobOffers">
          <h2 className="title6">Mes Offres d'emploi</h2>
          {jobOffers.map((offer, index) => (
            <div className="jobOffer" key={index}>
              <p>
                <strong>Nom de l'Entreprise:</strong> {offer.nomEntreprise}
              </p>
              <p>
                <strong>Adresse:</strong> {offer.address}
              </p>
              <p>
                <strong>Ville:</strong> {offer.city}
              </p>
              <p>
                <strong>poste:</strong> {offer.poste}
              </p>
              <p>
                <strong>Description:</strong> {offer.description}
              </p>
              <p>
                <strong>Expérience:</strong> {offer.experience}
              </p>
              <p>
                <strong>Formations:</strong> {offer.formations}
              </p>
              <p>
                <strong>Compétences:</strong> {offer.skills}
              </p>
              <p>
                <strong>Mots-clés:</strong> {offer.keywords}
              </p>
              <p>
                <strong>Langues:</strong> {offer.langues}
              </p>
              <button
                onClick={() => deleteJobOffer(offer.id)}
                className="deleteButton"
              >
                Supprimer
              </button>
              <button
                onClick={() => navigate(`/OfferInterested/${offer.id}`)}
                className="eachOffer"
              >
                voir qui est intéressé
              </button>
            </div>
          ))}
        </div>
      </div>
    </body>
  );
}

export default AccountRecruiter;
