import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegisterTemplate from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/signup.jsx";

function RegisterJobSeeker() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      await axios.post("http://localhost:3001/authjobseeker", {
        username,
        password,
      });
      alert("Registration successful");
      navigate("/landingpage");
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "Username is already taken"
      ) {
        setError("Username is already taken");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <RegisterTemplate
      title="Job Seeker Registration"
      onSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
      loginLink="/authjobseeker/login"
    />
  );
}

export default RegisterJobSeeker;
