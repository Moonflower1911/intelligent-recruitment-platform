import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarRecruiter from "../components/SidebarRecruiter";
import OfferCard from "../components/OfferCard";
import Footer from "../components/dashboard-footer";
import SearchBar from "../components/searchBar";
import { Briefcase, Plus } from "lucide-react";
import { motion } from "framer-motion";

function AccountRecruiter() {
  const [userData, setUserData] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      setLoading(true);
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
        .catch(console.error)
        .finally(() => setLoading(false));
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
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#1E3A8A] to-[#D4A574] text-white p-8">
        <h2 className="text-2xl font-semibold mb-6">Please log in to access this page</h2>
        <button
          onClick={() => navigate("/authrecruiter/login")}
          className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        <SidebarRecruiter onLogout={logout} onDeleteAccount={deleteAccount} />
        
        {/* Main Content */}
        <div className="flex-1 ml-80 p-8">
        
          {/* Search Bar */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Offers Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Briefcase className="w-5 h-5 text-[#1E3A8A] mr-2" />
                My Job Offers
              </h2>
              <span className="text-sm text-gray-500">
                {jobOffers.length} {jobOffers.length === 1 ? "offer" : "offers"}
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-pulse"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : jobOffers.filter((offer) =>
                offer.poste?.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No matching offers found" : "No job offers yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? `No offers match your search for "${searchTerm}"`
                    : "Create your first job offer to get started"}
                </p>
                <button
                  onClick={() => navigate("/create-offer")}
                  className="px-6 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90"
                >
                  Create New Offer
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobOffers
                  .filter((offer) =>
                    offer.poste?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((offer) => (
                    <motion.div
                      key={offer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <OfferCard
                        offer={offer}
                        onDelete={deleteJobOffer}
                      />
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountRecruiter;