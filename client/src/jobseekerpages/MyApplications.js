import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/navbar.jsx";
import JobOfferCard from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/JobOfferCard.jsx";
import SearchBar from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/searchBar.jsx";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3001/jobseeker/myApplications", {
          headers: { accessToken }
        });
        setApplications(response.data);
      } catch (error) {
        console.error("Error while fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />
      <div className="pl-16 max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#175d69] mb-8">My Applications</h1>

        {/* 👇 Add Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />

        {/* Applications List */}
        {applications.length === 0 ? (
          <p className="text-gray-700">You haven't applied to any job offers yet.</p>
        ) : (
          <div className="columns-1 lg:columns-2 gap-6 space-y-6">
            {applications
              .filter((offer) =>
                offer.poste?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((offer, index) => (
                <JobOfferCard key={index} offer={offer} showScore={false} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
