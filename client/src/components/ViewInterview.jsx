"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Calendar, Video, Star, FileText } from "lucide-react"

export default function ViewInterview() {
  const { id } = useParams()
  const [interview, setInterview] = useState(null)

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(`http://localhost:3001/interview/view/${id}`)
        const data = await response.json()
        setInterview(data)
      } catch (err) {
        console.error("Failed to fetch interview", err)
      }
    }

    fetchInterview()
  }, [id])

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading interview data...</div>
      </div>
    )
  }

  const {
    date,
    communication_score,
    technical_score,
    motivation_score,
    notes,
    video_path,
  } = interview

  const videoUrl = video_path ? `http://localhost:3001/${video_path.replace(/\\/g, "/")}` : null

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8 space-y-6">
      <h2 className="text-3xl font-bold text-[#175d69] flex items-center gap-2">
        <FileText className="w-6 h-6" />
        Interview Review
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Communication Score</p>
          <p className="text-lg font-bold text-gray-800 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" /> {communication_score}/5
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Technical Score</p>
          <p className="text-lg font-bold text-gray-800 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" /> {technical_score}/5
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Motivation Score</p>
          <p className="text-lg font-bold text-gray-800 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" /> {motivation_score}/5
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Interview Date</p>
          <p className="text-lg font-bold text-gray-800 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-blue-500" /> {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500 mb-1">Notes</p>
        <p className="text-gray-800">{notes}</p>
      </div>

      {videoUrl && (
        <div>
          <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Video className="w-4 h-4 text-purple-500" /> Interview Video
          </p>
          <video controls className="w-full rounded-lg shadow">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  )
}
