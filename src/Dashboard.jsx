// Dashboard.jsx (only relevant parts)
import React, { useState } from "react"
import {
  Sun,
  Moon,
  Brain,
  TrendingUp,
  History,
  Home,
  PlusCircle,
  User,
  Search,
  Trash2,
} from "lucide-react"
import HomeSection from "./dashboard/HomeSection"
import LogDecisionSection from "./dashboard/LogDecisionSection"
import HistorySection from "./dashboard/HistorySection"
import OutcomesSection from "./dashboard/OutcomesSection"
import ProfileSection from "./dashboard/ProfileSection"

export default function Dashboard(props) {
  const {
    darkMode,
    setDarkMode,
    decisions,
    newDecision,
    setNewDecision,
    saveDecision,
    deleteDecision,
    updateOutcome,
    editingOutcome,
    setEditingOutcome,
    searchQuery,
    setSearchQuery,
    successRate,
    showToast,
    onLogout,
  } = props

  const [activeSection, setActiveSection] = useState("home")
  const [profileOpen, setProfileOpen] = useState(false)

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "log", icon: PlusCircle, label: "Log Decision" },
    { id: "history", icon: History, label: "History" },
    { id: "outcomes", icon: TrendingUp, label: "Outcomes" },
  ]

  const filteredDecisions = decisions.filter(
    (d) =>
      d.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.decision.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Top nav */}
      <nav
        className={`sticky top-0 z-40 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg px-6 py-3 flex items-center justify-between`}
      >
        {/* left: brand */}
        <div className="flex items-center gap-3">
          <Brain
            className={`w-7 h-7 ${
              darkMode ? "text-orange-400" : "text-orange-600"
            }`}
          />
          <span
            className={`text-lg font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            DecisionIQ
          </span>
        </div>

        {/* center: tabs */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* right: dark mode + profile + sign out */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-400"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Profile opens sidebar */}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-100"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <span className="hidden sm:inline text-sm font-medium">Profile</span>
          </button>

          
        </div>
      </nav>

      {/* main content */}
      <main className="p-6 md:p-8 w-full">
        {activeSection === "home" && (
          <HomeSection
            darkMode={darkMode}
            decisions={decisions}
            successRate={successRate}
            showToast={showToast}
          />
        )}
        {activeSection === "log" && (
          <LogDecisionSection
            darkMode={darkMode}
            newDecision={newDecision}
            setNewDecision={setNewDecision}
            saveDecision={saveDecision}
          />
        )}
        {activeSection === "history" && (
          <HistorySection
            darkMode={darkMode}
            SearchIcon={Search}
            TrashIcon={Trash2}
            decisions={decisions}
            filteredDecisions={filteredDecisions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            deleteDecision={deleteDecision}
            successRate={successRate}
          />
        )}
        {activeSection === "outcomes" && (
          <OutcomesSection
            darkMode={darkMode}
            decisions={decisions}
            editingOutcome={editingOutcome}
            setEditingOutcome={setEditingOutcome}
            updateOutcome={updateOutcome}
          />
        )}
      </main>

      {/* profile sidebar overlapping dashboard */}
      <ProfileSection
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        darkMode={darkMode}
        decisions={decisions}
        successRate={successRate}
        onLogout={() => {
          setProfileOpen(false)
          onLogout()
        }}
      />
    </div>
  )
}