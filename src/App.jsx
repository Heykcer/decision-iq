import React, { useState } from "react"
import Dashboard from "./Dashboard"
import Toast from "./Toast"
import LandingPage from "./LandingPage"
import AuthPage from "./AuthPage"

export default function DecisionJournalApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState("landing")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toast, setToast] = useState(null)

  const [decisions, setDecisions] = useState([
    {
      id: 1,
      date: "2025-01-05",
      situation: "Career change opportunity",
      intent: "Better work-life balance",
      constraints: "Financial stability, family concerns",
      alternatives:
        "Stay in current job, Negotiate remote work, Take the new position",
      decision: "Took the new position with negotiated remote days",
      reasoning: "Better growth potential with flexibility",
      outcome: {
        success: true,
        stress: 4,
        happiness: 8,
        notes: "Great decision, much happier now",
      },
    },
  ])

  const [newDecision, setNewDecision] = useState({
    situation: "",
    intent: "",
    constraints: "",
    alternatives: "",
    decision: "",
    reasoning: "",
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [editingOutcome, setEditingOutcome] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
  }

  const saveDecision = () => {
    if (!newDecision.situation || !newDecision.decision) {
      showToast("Please fill in situation and decision", "error")
      return
    }

    const decision = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      ...newDecision,
      outcome: null,
    }

    setDecisions([decision, ...decisions])
    setNewDecision({
      situation: "",
      intent: "",
      constraints: "",
      alternatives: "",
      decision: "",
      reasoning: "",
    })
    showToast("Decision saved successfully!")
    setCurrentPage("dashboard")
  }

  const updateOutcome = (id, outcome) => {
    setDecisions(decisions.map((d) => (d.id === id ? { ...d, outcome } : d)))
    setEditingOutcome(null)
    showToast("Outcome updated successfully!")
  }

  const deleteDecision = (id) => {
    setDecisions(decisions.filter((d) => d.id !== id))
    showToast("Decision deleted")
  }

  const successRate =
    (decisions.filter((d) => d.outcome?.success).length /
      Math.max(decisions.length, 1)) *
    100

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {currentPage === "landing" && (
        <LandingPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          goToAuth={() => setCurrentPage("auth")}
        />
      )}

      {currentPage === "auth" && (
        <AuthPage
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  goToDashboard={() => setCurrentPage("dashboard")}
  goBack={() => setCurrentPage("landing")}
/>
      )}

      {currentPage === "dashboard" && (
        <Dashboard
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          decisions={decisions}
          newDecision={newDecision}
          setNewDecision={setNewDecision}
          saveDecision={saveDecision}
          deleteDecision={deleteDecision}
          updateOutcome={updateOutcome}
          editingOutcome={editingOutcome}
          setEditingOutcome={setEditingOutcome}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          successRate={successRate}
          showToast={showToast}
          onLogout={() => {
    // clear session data if you want
    setDecisions([])
    setCurrentPage("landing") // go back to landing page
  }}
        />
      )}
    </div>
  )
}