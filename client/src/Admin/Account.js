import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        <h2 className="acces-requis">
          Pour accéder à la page veuillez vous connectez
        </h2>
        <button
          className="login-button"
          onClick={() => navigate("/authjobseeker/login")}
        >
          Login
        </button>
      </div>
    );
  }

  if (!userData) {
    return <div className="loading10">Loading...</div>;
  }

  return (
    <body className="account10">
      <div className="container10">
        <div className="compte10">
          <div className="user10">
            <div className="userInfo10">
              <div className="img10"></div>
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
