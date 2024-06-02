import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./authJobseeker.css";

function LoginJobSeeker() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { username, password };
      const response = await axios.post(
        "http://localhost:3001/authjobseeker/login",
        data
      );
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        navigate("/jobseeker");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <body className="auth">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Se connecter</h2>
          <div>
            <label>Nom d'utilisateur:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Je me connecte</button>
        </form>
        <p>
          Vous n'avez pas de compte ?
          <Link to="/authjobseeker"> Inscrivez-vous ici </Link>
        </p>
      </div>
    </body>
  );
}

export default LoginJobSeeker;
