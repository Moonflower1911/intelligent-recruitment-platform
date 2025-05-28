import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginTemplate from "../components/login";

function LoginJobSeeker() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/authjobseeker/login", {
        username,
        password,
      });
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
    <LoginTemplate
      title="Job Seeker Login"
      email={username}
      setEmail={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      signupLink="/authjobseeker"
    />
  );
}

export default LoginJobSeeker;
