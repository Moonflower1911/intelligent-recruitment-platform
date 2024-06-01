import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AuthRecruiter.css";

function RegisterRecruiter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/authRecruiter", {
        username,
        password,
      });
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <body className="auth">
      <div className="form-container">
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
          <button type="submit">Je m'inscris</button>
        </form>
        <p>
          Vous avez déjà un compte?{" "}
          <Link to="/authRecruiter/login">Connectez-vous ici</Link>
        </p>
      </div>
    </body>
  );
}

export default RegisterRecruiter;
