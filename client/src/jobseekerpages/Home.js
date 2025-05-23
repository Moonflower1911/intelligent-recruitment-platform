import React, { useEffect, useState } from "react";
import axios from "axios";
import JobOfferCard from "../components/JobOfferCard.jsx";
import Navbar from "../components/navbar.jsx";
import SidebarJobSeeker from "../components/SidebarJobseeker.jsx";
import SearchBar from "../components/searchBar.jsx";

function JobSeekerHome() {
  const [listOfRecruiters, setListOfRecruiters] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load all offers by default
  useEffect(() => {
    axios.get("http://localhost:3001/recruiter").then((response) => {
      setListOfRecruiters(response.data);
    });
  }, []);

  // Call the recommendation engine
  const getRecommendedJobOffers = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:3001/jobseeker/recommendations",
        {
          headers: { accessToken },
        }
      );
      setListOfRecruiters(response.data.recommendedOffers);
      setShowScores(true);
    } catch (error) {
      console.error("Error while fetching recommendations:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/18705217_v1016-a-08.jpg')" }}
    >
      <Navbar />
      <SidebarJobSeeker onSortJobOffers={getRecommendedJobOffers} />

      <div className="max-w-7xl mx-auto p-4 pl-48">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />

        <div className="flex flex-wrap gap-6">

          {listOfRecruiters
            .filter((offer) =>
              offer.poste?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((offer, index) => (
              <JobOfferCard key={index} offer={offer} showScore={showScores} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default JobSeekerHome;
