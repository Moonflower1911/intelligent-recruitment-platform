"use client"

import React, { useState, useCallback } from "react"
import { Upload, Video, X, CheckCircle, AlertCircle, Star } from "lucide-react"

const scoreLabels = {
  1: "Poor",
  2: "Below Average",
  3: "Average",
  4: "Good",
  5: "Excellent",
}

const scoreColors = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-blue-500",
  5: "bg-green-500",
}

export default function CreateInterviewForm({ interestId, onSubmit }) {
  const [formData, setFormData] = useState({
    communication_score: 3,
    technical_score: 3,
    motivation_score: 3,
    notes: "",
  })

  const [errors, setErrors] = useState({})
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")
  const [dragActive, setDragActive] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (formData.communication_score < 1 || formData.communication_score > 5) {
      newErrors.communication_score = "Score must be between 1 and 5"
    }
    if (formData.technical_score < 1 || formData.technical_score > 5) {
      newErrors.technical_score = "Score must be between 1 and 5"
    }
    if (formData.motivation_score < 1 || formData.motivation_score > 5) {
      newErrors.motivation_score = "Score must be between 1 and 5"
    }
    if (formData.notes.length < 10) {
      newErrors.notes = "Notes must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const averageScore = (
    formData.communication_score +
    formData.technical_score +
    formData.motivation_score
  ) / 3

  const formProgress =
    (Object.values(formData).filter((value) => {
      return (
        value !== "" &&
        value !== undefined &&
        value !== null &&
        (typeof value === "string" ? value.length > 0 : true)
      )
    }).length /
      4) *
    100

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleVideoChange = useCallback((file) => {
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
    } else {
      alert("Only video files are accepted.")
    }
  }, [])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleVideoChange(e.dataTransfer.files[0])
      }
    },
    [handleVideoChange]
  )

  const removeVideo = useCallback(() => {
    setVideoFile(null)
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
      setVideoPreview(null)
    }
  }, [videoPreview])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      if (onSubmit) {
        await onSubmit({ ...formData, videoFile: videoFile || undefined })
      } else {
        const submitFormData = new FormData()
        submitFormData.append("date", new Date().toISOString())

        Object.entries(formData).forEach(([key, value]) => {
          submitFormData.append(key, value.toString())
        })

        if (videoFile) {
          submitFormData.append("videoFile", videoFile)
        }

        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(`http://localhost:3001/interview/${interestId}`, {
          method: "POST",
          headers: { accessToken: token || "" },
          body: submitFormData,
        })

        if (!response.ok) throw new Error("Submission failed")
      }

      setSubmitStatus("success")
      setTimeout(() => {}, 2000)
    } catch (error) {
      console.error("Error submitting interview:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const ScoreSlider = ({ label, field, description, value }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base font-medium text-gray-900">{label}</label>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${scoreColors[value]}`}>
          {value}/5 - {scoreLabels[value]}
        </span>
      </div>
      <div className="px-2">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => handleInputChange(field, parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <span key={num} className="flex items-center">
              <Star className="w-3 h-3 mr-1" />
              {num}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border-0">
        <div className="text-center space-y-4 p-8 border-b border-gray-100">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interview Evaluation Form
          </h1>
          <p className="text-lg text-gray-600">Provide comprehensive feedback for the candidate interview</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Form Progress</span>
              <span>{Math.round(formProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${formProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Overall Score</h3>
                <div className="text-4xl font-bold text-blue-600">{averageScore.toFixed(1)}/5</div>
                <span className="inline-block px-3 py-1 text-sm border border-gray-300 rounded-full">
                  {averageScore >= 4 ? "Excellent" : averageScore >= 3 ? "Good" : averageScore >= 2 ? "Average" : "Needs Improvement"}
                </span>
              </div>
            </div>

            <div className="space-y-8">
              <ScoreSlider
                label="Communication Skills"
                field="communication_score"
                description="Evaluate clarity, articulation, and interpersonal communication"
                value={formData.communication_score}
              />
              <ScoreSlider
                label="Technical Competency"
                field="technical_score"
                description="Assess technical knowledge, problem-solving, and expertise"
                value={formData.technical_score}
              />
              <ScoreSlider
                label="Motivation & Cultural Fit"
                field="motivation_score"
                description="Rate enthusiasm, cultural alignment, and career motivation"
                value={formData.motivation_score}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-gray-900">Interview Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Provide detailed feedback..."
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600">Minimum 10 characters required. Be specific and constructive.</p>
              {errors.notes && <p className="text-sm text-red-600">{errors.notes}</p>}
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 mb-2">Interview Recording (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">Upload a video recording of the interview for future reference</p>

              {!videoFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("video-upload").click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2 text-gray-900">Drop video file here or click to browse</p>
                  <p className="text-sm text-gray-500">Supports MP4, MOV, AVI files up to 100MB</p>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleVideoChange(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <Video className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{videoFile.name}</p>
                        <button type="button" onClick={removeVideo} className="text-red-500 hover:text-red-700 p-1">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      {videoPreview && <video src={videoPreview} controls className="w-full max-w-md rounded-lg shadow-sm" />}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {submitStatus === "success" && (
              <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <p className="text-green-800">Interview evaluation submitted successfully!</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-red-800">Failed to submit evaluation. Please try again.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Submitting Evaluation...</span>
                </>
              ) : (
                <span>Submit Interview Evaluation</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
