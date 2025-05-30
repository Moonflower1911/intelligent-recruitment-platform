import React, { useState } from "react";
import axios from "axios";
import { Video, Upload, Trash2, Play, AlertCircle, Loader2 } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#1E3A8A] to-[#D4A574] rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Pitch Video</h2>
            <p className="text-sm text-gray-600">Stand out with a personal introduction</p>
          </div>
        </div>
        {resume.videoFilePath && (
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-1">
            <Play className="w-3 h-3" />
            <span>Video Ready</span>
          </div>
        )}
      </div>

      {resume.videoFilePath ? (
        /* Video Display Section */
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <video
              src={`http://localhost:3001/${resume.videoFilePath.replace(/\\/g, "/")}`}
              controls
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
              style={{ maxHeight: "400px" }}
            />
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              <span>Your video helps recruiters get to know you better</span>
            </div>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Upload Section */
        <div className="space-y-4">
          {/* Info Banner */}
          <div className="bg-[#D4A574]/10 border border-[#D4A574]/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Video className="w-5 h-5 text-[#D4A574] mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Why add a video?</h4>
                <p className="text-sm text-gray-600">
                  A short introduction video can increase your visibility to recruiters by up to 3x. 
                  Show your personality and communication skills!
                </p>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1E3A8A] transition-colors">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Pitch Video</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Record a 30-60 second introduction about yourself and your career goals
                </p>
              </div>

              <div className="relative">
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <button
                  disabled={uploading}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Choose Video File</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Supported formats: MP4, MOV, AVI • Max size: 50MB
              </p>
            </div>
          </div>

          {uploading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="text-blue-800 font-medium">Uploading your video...</p>
                  <p className="text-blue-600 text-sm">This may take a moment depending on file size</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoSection;