"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function SneakerList() {
  const [sneakers, setSneakers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sneakers")
      .then((response) => {
        setSneakers(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("CRITICAL ERROR FETCHING SNEAKERS:", error)
        setError("Failed to load sneakers")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
              Sneaker{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-slate-400 text-lg">Loading premium footwear...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 animate-pulse">
                <div className="aspect-square bg-slate-700/50 rounded-xl mb-6" />
                <div className="h-6 bg-slate-700/50 rounded mb-3 w-3/4" />
                <div className="h-4 bg-slate-700/30 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-black text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text mb-4">
            ⚠️
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (sneakers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-4">👟</div>
          <h2 className="text-3xl font-bold text-white mb-2">No Sneakers Yet</h2>
          <p className="text-slate-400 mb-6">Start building your collection by adding the first sneaker</p>
          <a
            href="/add"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
          >
            Add First Sneaker
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
              Sneaker{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Collection
              </span>
            </h1>
            <p className="text-slate-400 text-lg flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full"></span>
              {sneakers.length} exclusive sneakers available
            </p>
          </div>
        </div>

        {/* Filter/Stats Bar */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-md rounded-xl border border-slate-700/50">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Total Items:</span>
              <span className="text-xl font-bold text-cyan-400">{sneakers.length}</span>
            </div>
          </div>
          <div className="text-sm text-slate-500">Curated for you</div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sneakers.map((sneaker, index) => (
            <div
              key={sneaker.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              <style>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

              {/* Card Container with Glow */}
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/40 border border-slate-700/50 hover:border-cyan-500/30 flex flex-col h-full">
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                {/* Image Section */}
                <div className="relative overflow-hidden bg-gradient-to-b from-slate-700 to-slate-800 p-6 group-hover:p-4 transition-all duration-500">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

                  {/* Image Container with Shine */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={sneaker.imageUrl || "/placeholder.svg"}
                      alt={sneaker.name}
                      className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Glass Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative flex-1 px-6 py-5 flex flex-col justify-between z-10">
                  {/* Brand Badge */}
                  <div className="inline-block mb-3">
                    <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase px-3 py-1 bg-cyan-400/10 rounded-full group-hover:bg-cyan-400/20 transition-all duration-300">
                      {sneaker.brand}
                    </span>
                  </div>

                  {/* Sneaker Name */}
                  <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                    {sneaker.name}
                  </h3>

                  {/* Info Row */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-700/30 text-sm">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Released</p>
                      <p className="text-slate-200 font-semibold">{sneaker.releaseDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">ID</p>
                      <p className="text-slate-200 font-mono">#{sneaker.id}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="group/btn relative w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 overflow-hidden bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white hover:from-cyan-400 hover:to-blue-400 hover:text-slate-950 hover:border-cyan-400">
                    <span className="relative flex items-center justify-center gap-2">
                      View Details
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
