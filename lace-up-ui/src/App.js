"use client"

import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"

// Import all your page components
import HomePage from "./components/HomePage"
import SneakerDetailPage from "./components/SneakerDetailPage"
import AddSneakerPage from "./components/AddSneakerPage"
import EditSneakerPage from "./components/EditSneakerPage"

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* PERSISTENT HEADER (The App Shell) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-cyan-500/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Branding */}
            <Link
              to="/"
              className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Lace Up
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 relative group"
              >
                <span>Browse</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* Add Sneaker Button - Desktop */}
            <div className="hidden md:block">
              <Link to="/add-sneaker" className="relative px-6 py-2 font-semibold overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg px-6 py-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform group-hover:scale-105">
                  Add Sneaker
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 border-t border-cyan-500/10 pt-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Browse
              </Link>
              <Link
                to="/add-sneaker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200"
              >
                Add Sneaker
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* DYNAMIC PAGE CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* 1. READ: All Sneakers (Homepage) */}
          <Route path="/" element={<HomePage />} />

          {/* 2. READ: Single Sneaker (Detail Page) */}
          <Route path="/sneaker/:id" element={<SneakerDetailPage />} />

          {/* 3. CREATE: Form for new sneakers */}
          <Route path="/add-sneaker" element={<AddSneakerPage />} />

          {/* 4. UPDATE: Form to edit existing sneakers */}
          <Route path="/edit-sneaker/:id" element={<EditSneakerPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
