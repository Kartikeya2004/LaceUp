"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function SneakerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sneaker, setSneaker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:8080/api/sneakers/${id}`)
      .then((response) => {
        setSneaker(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching sneaker:", error)
        setSneaker(null)
        setLoading(false)
      })
  }, [id])

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this sneaker?")) {
      axios
        .delete(`http://localhost:8080/api/sneakers/${id}`)
        .then((response) => {
          alert("Sneaker deleted successfully!")
          navigate("/")
        })
        .catch((error) => {
          console.error("Error deleting sneaker:", error)
          alert("Error deleting sneaker.")
        })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin"></div>
          <p className="text-slate-400 text-sm">Loading sneaker details...</p>
        </div>
      </div>
    )
  }

  if (!sneaker) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Sneaker Not Found</h2>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  const colors = ["#06b6d4", "#a855f7", "#ec4899", "#f59e0b"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* BACK BUTTON */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
            </svg>
            Back to Collection
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN: IMAGE SHOWCASE */}
          <div className="space-y-6">
            {/* PRIMARY IMAGE */}
            <div className="group relative">
              {/* Background Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Image Container */}
              <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
                <div className="aspect-square flex items-center justify-center relative">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse"></div>
                  )}
                  <img
                    src={sneaker.imageUrl || "/placeholder.svg"}
                    alt={sneaker.name}
                    className="w-full h-full object-cover transition duration-500"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {/* Shine Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              </div>
            </div>

            {/* COLOR SELECTOR */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-400">Available Colors:</span>
              <div className="flex gap-3">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-lg transition-all duration-300 ${selectedColor === idx ? "ring-2 ring-offset-2 ring-offset-slate-900 scale-110" : "hover:scale-105"}`}
                    style={{
                      backgroundColor: color,
                      boxShadow: selectedColor === idx ? `0 0 20px ${color}` : "none",
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS & ACTIONS */}
          <div className="space-y-8">
            {/* BRAND & NAME */}
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">{sneaker.brand}</p>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">{sneaker.name}</h1>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Release Date</p>
                <p className="text-lg font-semibold text-white">{sneaker.releaseDate}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Status</p>
                <p className="text-lg font-semibold text-cyan-400">In Stock</p>
              </div>
            </div>

            {/* DESCRIPTION CARD */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">About</h3>
                <p className="text-slate-300 leading-relaxed text-base">{sneaker.description}</p>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* EDIT BUTTON */}
              <Link
                to={`/edit-sneaker/${sneaker.id}`}
                className="group relative overflow-hidden rounded-lg px-6 py-4 font-semibold transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-100 group-hover:opacity-110 transition duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                <span className="relative text-white font-semibold flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Details
                </span>
              </Link>

              {/* DELETE BUTTON */}
              <button
                onClick={handleDelete}
                className="group relative overflow-hidden rounded-lg px-6 py-4 font-semibold transition-all duration-300 border-2 border-red-500/50 hover:border-red-500"
              >
                <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition duration-300"></div>
                <span className="relative text-red-400 group-hover:text-red-300 font-semibold flex items-center justify-center gap-2 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
