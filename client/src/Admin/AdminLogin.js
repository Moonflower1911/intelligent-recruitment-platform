import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { username, password };
      const response = await axios.post(
        "http://localhost:3001/admin/login",
        data
      );
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        navigate("/admin/account");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <body className="auth2">
      <div className="form-container2">
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
      </div>
    </body>
  );
}

export default AdminLogin;
