import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import SidebarAccountJobSeeker from "../components/SidebarJobseeker2";
import ResumeCard from "../components/ResumeCard";
import VideoSection from "../components/VideoSection";

function AccountJobSeeker() {
  const [userData, setUserData] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:3001/jobseeker/account", {
          headers: { accessToken: token },
        })
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.error);
          } else {
            setUserData(response.data.user);
            setResumes(response.data.resume);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, []);

  const createResume = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/jobseeker/account",
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      );

      if (response.data.resume.length > 0) {
        const confirmDelete = window.confirm(
          "You already have a resume. Do you want to replace it?"
        );
        if (confirmDelete) {
          const existingResumeId = resumes.find(
            (resume) => resume.UserJobSeekerId === userData.id
          )?.id;
          if (existingResumeId) {
            await deleteResume(existingResumeId, true); // pass flag to skip confirm
            navigate("/createCV");
          }
        }
      } else {
        navigate("/createCV");
      }
    } catch (error) {
      console.error("Error checking if user has a resume:", error);
    }
  };

  const deleteResume = async (id, skipConfirm = false) => {
    if (
      skipConfirm ||
      window.confirm("Are you sure you want to delete this resume?")
    ) {
      try {
        await axios.delete(`http://localhost:3001/jobseeker/${id}`, {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        });
        setResumes(resumes.filter((resume) => resume.id !== id));
      } catch (error) {
        console.error("There was an error deleting the resume!", error);
      }
    }
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://localhost:3001/authJobSeeker/delete`, {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.error);
          } else {
            sessionStorage.removeItem("accessToken");
            setIsLoggedIn(false);
            setUserData(null);
            setResumes([]);
            navigate("/landingpage");
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the account!", error);
        });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUserData(null);
    setResumes([]);
    navigate("/landingpage");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#175d69] to-[#07142b] text-white p-8">
        <h2 className="text-2xl font-semibold mb-6 bg-black bg-opacity-50 p-4 rounded shadow-lg">
          Please log in to access this page
        </h2>
        <button
          onClick={() => navigate("/authjobseeker/login")}
          className="px-6 py-2 bg-[#df9500] text-white rounded-md hover:bg-yellow-600"
        >
          Login
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
        Loading...
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
      <SidebarAccountJobSeeker
        onCreateCV={createResume}
        onLogout={logout}
        onDeleteAccount={deleteAccount}
      />

      <div className="max-w-6xl mx-auto p-8 pl-48">
        {/* User Info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-[#175d69]">My Account</h2>
          <p className="text-gray-700 mb-2">
            <strong>Username:</strong> {userData.username}
          </p>
        </div>

        {/* Resume Section */}
        <h2 className="text-2xl font-bold text-[#175d69] mb-6">
          My Information
        </h2>
        
        <div className="space-y-8">
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <ResumeCard key={index} resume={resume} onDelete={deleteResume} />
            ))
          ) : (
            <p className="text-gray-600">No resumes saved yet.</p>
          )}
        </div>

        {/* Video Section */}
        {resumes.length > 0 && (
          <VideoSection
            resume={resumes[0]}
            onUpdate={() => {
              // Re-fetch updated resume data after upload/delete
              axios
                .get("http://localhost:3001/jobseeker/account", {
                  headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                  },
                })
                .then((response) => setResumes(response.data.resume))
                .catch(console.error);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AccountJobSeeker;
