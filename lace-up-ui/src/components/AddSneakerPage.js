// click on play in front of public static void in "ApiApplication" to start backend
// use "yarn start" in terminal to start frontend
"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddSneakerPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    releaseDate: "2025-01-01",
    imageUrl: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    axios
      .post("http://localhost:8080/api/sneakers", formData)
      .then((response) => {
        alert("Sneaker successfully added!")
        navigate("/")
      })
      .catch((error) => {
        console.error("Error creating sneaker:", error)
        alert("Error adding sneaker. Please check the console.")
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Add Your Sneaker
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Contribute to our exclusive sneaker collection</p>
        </div>

        <div className="relative group">
          {/* Glow effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Form container */}
          <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sneaker Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Sneaker Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Air Max 90"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Brand</label>
                <input
                  required
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g., Nike"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>

              {/* Grid: Release Date and Image URL */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Release Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Release Date</label>
                  <input
                    required
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Image URL</label>
                  <input
                    required
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Description</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the sneaker in detail..."
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full relative group/btn mt-8">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-75 group-hover/btn:opacity-100 group-disabled/btn:opacity-50 transition-opacity duration-300"></div>

                {/* Button content */}
                <div className="relative px-6 py-3 bg-slate-950 rounded-lg font-bold text-white group-hover/btn:bg-slate-900 transition-colors duration-300 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Add Sneaker to Collection
                    </>
                  )}
                </div>
              </button>

              {/* Back to home link */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  ← Back to Collection
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>All fields are required to add a new sneaker to our exclusive collection</p>
        </div>
      </div>
    </div>
  )
}
