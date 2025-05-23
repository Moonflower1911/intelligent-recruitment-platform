import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import JobSeekerCard from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/JobSeekerCard.jsx";
import Navbar from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/navbar.jsx";

function OfferInterested() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchInterestedJobSeekers = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:3001/interest/${id}`,
          { headers: { accessToken } }
        );
        setListOfJobSeekerForms(response.data);
      } catch (error) {
        console.error("Error fetching interested job seekers:", error);
      }
    };

    fetchInterestedJobSeekers();
  }, [id]);

  const fetchSortedJobSeekers = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3001/interest/recommendations/${id}`,
        { headers: { accessToken } }
      );
      const sortedJobSeekers = response.data.sortedApplicants || [];
      setListOfJobSeekerForms(sortedJobSeekers);
      setSorted(true);
    } catch (error) {
      console.error("Error fetching sorted job seekers:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />

      {/* --- Content starts here with padding-left --- */}
      <div className="pl-16 py-10 px-4">

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#175d69] mb-6 text-center">Interested Applicants</h2>

          {listOfJobSeekerForms.length > 0 && !sorted && (
            <div className="mb-6 text-center">
              <button
                onClick={fetchSortedJobSeekers}
                className="bg-[#175d69] text-white px-6 py-2 rounded hover:bg-[#124b55] transition"
              >
                Sort by Match Percentage
              </button>
            </div>
          )}

          {listOfJobSeekerForms.length === 0 ? (
            <p className="text-center text-gray-600">
              No applicants have expressed interest in this job offer.
            </p>
          ) : (
            listOfJobSeekerForms.map((seeker, index) => (
              <JobSeekerCard key={index} seeker={seeker} showMatch={sorted} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default OfferInterested;