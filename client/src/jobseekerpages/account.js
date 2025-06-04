import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAccountJobSeeker from "../components/SidebarJobseeker2";
import ResumeCard from "../components/ResumeCard";
import VideoSection from "../components/VideoSection";
import Footer from "../components/dashboard-footer";
import { User, FileText, Loader2 } from "lucide-react";

function AccountJobSeeker() {
  const [userData, setUserData] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
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
            navigate("/");
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
    navigate("/");
  };

  if (!isLoggedIn && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to access your account and manage your profile.
            </p>
            <button
              onClick={() => navigate("/authjobseeker/login")}
              className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors font-medium"
            >
              Login to Continue
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading your account...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarAccountJobSeeker
          onCreateCV={createResume}
          onLogout={logout}
          onDeleteAccount={deleteAccount}
          resume={resumes[0]}
        />

        {/* Main Content */}
        <div className="flex-1 ml-80 p-8 pt-2">

          {/* User Info Card */}
          {userData && (
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                  <div className="px-3 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full text-sm font-medium">
                    Active Account
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#D4A574] rounded-full"></div>
                    <span className="text-gray-700">
                      <strong className="text-gray-900">Username:</strong> {userData.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resume Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-[#1E3A8A]" />
                <h2 className="text-2xl font-bold text-gray-900">My Information</h2>
              </div>
              <div className="text-sm text-gray-600">
                {resumes.length} resume{resumes.length !== 1 ? 's' : ''} saved
              </div>
            </div>

            <div className="space-y-6">
              {resumes.length > 0 ? (
                resumes.map((resume, index) => (
                  <ResumeCard key={index} resume={resume} onDelete={deleteResume} />
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
                  <p className="text-gray-600 mb-6">
                    Create your first resume to start applying for jobs
                  </p>
                  <button
                    onClick={createResume}
                    className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors font-medium"
                  >
                    Create Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Video Section */}
          {resumes.length > 0 && (
            <div className="mb-8">
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
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AccountJobSeeker;