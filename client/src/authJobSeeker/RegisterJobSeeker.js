import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./authJobseeker.css";

function RegisterJobSeeker() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setError("");
      await axios.post("http://localhost:3001/authjobseeker", {
        username,
        password,
      });
      alert("Inscription réussie");
      navigate("/landingpage");
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "Username is already taken"
      ) {
        setError("Le nom d'utilisateur est déjà utilisé");
      } else {
        setError("Échec de l'inscription");
      }
    }
  };

  return (
    <body className="auth2">
      <div className="form-container2">
        <form onSubmit={handleSubmit}>
          <h2>S'inscrire</h2>
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
          <div>
            <label>Confirmer le mot de passe:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message2">{error}</div>}
          <button type="submit">Je m'inscris</button>
        </form>
        <p>
          Vous avez déjà un compte?{" "}
          <Link to="/authjobseeker/login">Connectez-vous ici</Link>
        </p>
      </div>
    </body>
  );
}

export default RegisterJobSeeker;
