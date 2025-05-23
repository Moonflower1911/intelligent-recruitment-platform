import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/navbar.jsx";
import SidebarJobSeeker from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/SidebarJobseeker.jsx";
import JobOfferCard from "C:/Users/ASUS/Desktop/GestionCV/client/src/components/JobOfferCard.jsx";

function JobOffer() {
  const { id } = useParams();
  const [offreEmploi, setOffreEmploi] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/recruiter/byId/${id}`).then((response) => {
      setOffreEmploi(response.data);
    });

    axios.get(`http://localhost:3001/interest/check/${id}`, {
      headers: { accessToken: sessionStorage.getItem('accessToken') }
    }).then((response) => {
      setLiked(response.data.liked);
    });
  }, [id]);

  const handleLike = () => {
    axios.post("http://localhost:3001/interest", { OfferId: id }, {
      headers: { accessToken: sessionStorage.getItem('accessToken') }
    })
    .then((response) => {
      setLiked(response.data.liked);
    })
    .catch((error) => {
      console.error("Error while expressing interest:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Failed to express interest.");
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 pl-48">
        {/* Display JobOfferCard */}
        <JobOfferCard offer={offreEmploi} showScore={false} />

        {/* Apply / Withdraw Application Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLike}
            className={`px-6 py-2 rounded-md font-semibold ${
              liked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#df9500] text-white hover:bg-yellow-600"
            }`}
          >
            {liked ? 'Withdraw my application' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobOffer;
