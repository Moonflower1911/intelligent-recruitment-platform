import React, { useState } from "react";
import axios from "axios";

const VideoSection = ({ resume, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      alert("Only video files are accepted.");
      return;
    }

    const formData = new FormData();
    formData.append("videoFile", file);

    setUploading(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:3001/jobseeker/video/${resume.id}`,
        formData,
        {
          headers: {
            accessToken: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUpdate(); // refresh parent component
    } catch (error) {
      console.error("Error uploading the video:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete the video?")) return;
    setDeleting(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.delete(`http://localhost:3001/jobseeker/video/${resume.id}`, {
        headers: { accessToken: token },
      });
      onUpdate(); // refresh parent component
    } catch (error) {
      console.error("Error deleting the video:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold text-[#175d69] mb-4">
        🎤 Pitch Video 
      </h2>

      {resume.videoFilePath ? (
        <div className="space-y-4">
          <video
            src={`http://localhost:3001/${resume.videoFilePath.replace(
              /\\/g,
              "/"
            )}`}
            controls
            className="w-[600px]  rounded shadow ml-20"
          />
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Video"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 italic">
            🎥 Adding a short introduction video can increase your visibility to recruiters.
          </p>
          <label className="block">
            <span className="text-gray-700 font-medium">
              No video uploaded yet. Upload one:
            </span>
            <div className="relative w-fit">
              <label
                htmlFor="video-upload"
                className="inline-block bg-[#175d69] text-white text-sm px-4 py-2 rounded cursor-pointer hover:bg-[#124b55] transition"
              >
                Choose a Video
              </label>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={uploading}
                className="hidden"
              />
            </div>
          </label>
          {uploading && (
            <p className="text-gray-500 text-sm">Uploading in progress...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoSection;
