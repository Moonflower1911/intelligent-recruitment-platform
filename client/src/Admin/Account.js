import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminAccount.css";
function AdminAccount() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cvCount, setCvCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:3001/admin/account", {
          headers: {
            accessToken: token,
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.error);
          } else {
            setUserData(response.data.admin); // Changed from response.data.user to response.data.admin
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });

        axios
        .get("http://localhost:3001/admin/cv/count")
        .then((response) => {
          setCvCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching CV count:", error);
        });

      axios
        .get("http://localhost:3001/admin/offer/count")
        .then((response) => {
          setOfferCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching offer count:", error);
        });

      axios
        .get("http://localhost:3001/admin/users/count")
        .then((response) => {
          setUserCount(response.data.totalCount);
        })
        .catch((error) => {
          console.error("Error fetching user count:", error);
        });
    }
  }, []);
  

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/admin/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2 className="acces-requis">Pour accéder à la page veuillez vous connectez</h2>
        <button onClick={() => navigate("/admin/login")}>Login</button>
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
          <button onClick={() => navigate("/admin/offres")}>
            Voir les offres postées
          </button>
          <button onClick={() => navigate("/admin/cv")}>
            Voir les CV postés
          </button>
          {isLoggedIn && <button onClick={logout}>Se déconnecter</button>}
        </div>
        <div className="statistics">
    <h2>Statistiques</h2>
    <div className="statistic-box">
        <div className="statistic-item">
            <div className="statistic-label">CVs postés</div>
            <div className="statistic-value">
                <span className="statistic-number">{cvCount}</span>
            </div>
        </div>
        <div className="statistic-item">
            <div className="statistic-label">Offres postées</div>
            <div className="statistic-value">
                <span className="statistic-number">{offerCount}</span>
            </div>
        </div>
        <div className="statistic-item">
            <div className="statistic-label">Utilisateurs</div>
            <div className="statistic-value">
                <span className="statistic-number">{userCount}</span>
            </div>
        </div>
    </div>
</div>

      </div>
    </body>
  );
}

export default AdminAccount;
