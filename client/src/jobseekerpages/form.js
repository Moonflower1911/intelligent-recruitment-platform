import React from "react";
import Navbar from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/navbar.jsx";
import CreateCVForm from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/CreateCVForm.jsx";

function CreateCV() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />
      <CreateCVForm />
    </div>
  );
}

export default CreateCV;
