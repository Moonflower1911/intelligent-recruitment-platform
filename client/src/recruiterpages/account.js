import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarRecruiter from "../components/SidebarRecruiter";
import OfferCard from "../components/OfferCard";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";



function AccountRecruiter() {
  const [userData, setUserData] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 👉 New search state
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:3001/recruiter/account", {
          headers: { accessToken: token },
        })
        .then((res) => {
          if (!res.data.error) {
            setUserData(res.data.user);
            setJobOffers(res.data.jobOffers);
          }
        })
        .catch(console.error);
    }
  }, []);

  const deleteJobOffer = (id) => {
    if (window.confirm("Delete this job offer?")) {
      axios
      .delete(`http://localhost:3001/recruiter/${id}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then(() => {
        setJobOffers((prev) => prev.filter((offer) => offer.id !== id));
      })
      .catch(console.error);
    }
  };

  const deleteAccount = () => {
    if (window.confirm("Delete your account?")) {
      axios
      .delete("http://localhost:3001/authRecruiter/delete", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then(() => {
        sessionStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/authrecruiter/login");
      })
      .catch(console.error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/authrecruiter/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#175d69] to-[#07142b] text-white text-center px-4">
        <h2 className="text-xl bg-black bg-opacity-60 p-4 rounded shadow">
        Please log in to access this page
        </h2>
        <button
          className="mt-4 bg-white text-[#175d69] px-6 py-2 rounded hover:bg-gray-200"
          onClick={() => navigate("/authrecruiter/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/18705217_v1016-a-08.jpg')",
      }}
    >
      <Navbar />
      <SidebarRecruiter onLogout={logout} onDeleteAccount={deleteAccount} />
      <div className="pl-16 max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#175d69] mb-8">
          Welcome {userData?.username}
        </h1>

        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={(e) => e.preventDefault()} // prevent page reload on submit
        />


        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Job Offers
        </h2>

        {jobOffers.length === 0 ? (
          <p className="text-gray-500">No offers at the moment.</p>
        ) : (
          jobOffers
            .filter((offer) =>
              offer.poste?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onDelete={deleteJobOffer}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default AccountRecruiter;
