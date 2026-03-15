"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

export default function FlashySneakerCard({ sneaker }) {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className="group relative w-full h-full max-w-sm mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-cyan-500/40 hover:shadow-2xl cursor-pointer flex flex-col justify-between p-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.2) 0%, transparent 80%)`,
        }}
      />

      <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-8 shadow-inner mx-4 mt-4">
        {/* Glass-like overlay layer 1 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent rounded-2xl pointer-events-none" />

        <img
          src={sneaker.imageUrl || "/placeholder.svg"}
          alt={sneaker.name}
          className="relative w-full aspect-square object-cover rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3"
        />

        {/* Glass-like overlay layer 2 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 rounded-2xl pointer-events-none" />

        {isHovering && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl animate-pulse pointer-events-none" />
        )}
      </div>

      <div className="relative px-6 pb-4 z-10">
        {/* Brand badge with glow */}
        <div className="inline-block mb-3">
          <div
            className={`text-xs font-bold text-cyan-400 tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-300 ${
              isHovering ? "bg-cyan-400/20 shadow-lg shadow-cyan-400/30" : "bg-cyan-400/10"
            }`}
          >
            {sneaker.brand}
          </div>
        </div>

        <h1 className="text-5xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-lg bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent transition-all duration-300">
          {sneaker.name}
        </h1>

        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-700/50">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Released</p>
            <p className="text-sm font-semibold text-slate-200">{sneaker.releaseDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Rating</p>
            <div className="flex gap-1 justify-end">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < 4 ? "text-yellow-400" : "text-slate-600"}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link to={`/sneaker/${sneaker.id}`} className="block group/btn">
          <button
            className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 overflow-hidden font-sans ${
              isHovering
                ? "text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 shadow-xl"
                : "text-white bg-gradient-to-r from-slate-700 to-slate-800 border border-cyan-500/50 hover:border-cyan-400"
            }`}
          >
            {isHovering && (
              <>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 rounded-xl blur-lg opacity-60 -z-10 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </>
            )}

            <span className="relative flex items-center justify-center gap-3">
              <span>Explore Now</span>
              <svg
                className={`w-6 h-6 transition-all duration-300 ${
                  isHovering ? "translate-x-2 rotate-12" : "translate-x-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </Link>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-300 ${
          isHovering ? "opacity-100 h-2" : "opacity-30"
        }`}
      />

      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-20 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
    </div>
  )
}
