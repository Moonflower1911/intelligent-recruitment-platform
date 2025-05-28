// src/pages/CreateJobOffer.jsx

import React from "react";
import JobOfferForm from "../components/JobOfferForm";
import Navbar from "../components/navbar";

function CreateJobOffer() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />
      <JobOfferForm />
    </div>
  );
}

export default CreateJobOffer;
