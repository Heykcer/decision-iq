// src/dashboard/ProfileSidePanel.jsx
import React from "react"
import { X, User, Star, Crown, Check } from "lucide-react"

export default function ProfileSection({
  open,
  onClose,
  darkMode,
  decisions,
  successRate,
  onLogout,
}) {
  const outcomes = decisions.filter((d) => d.outcome)
  const avgStress =
    outcomes.reduce((sum, d) => sum + (d.outcome.stress || 0), 0) /
      Math.max(outcomes.length, 1) || 0
  const avgHappiness =
    outcomes.reduce((sum, d) => sum + (d.outcome.happiness || 0), 0) /
      Math.max(outcomes.length, 1) || 0

  const panelBg = darkMode ? "bg-gray-900" : "bg-[#FFF9EF]"

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          open ? "bg-black/40 opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* sidebar panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-xl transform transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        } ${panelBg} shadow-2xl border-l ${
          darkMode ? "border-gray-800" : "border-orange-100"
        } flex flex-col`}
      >
        {/* header row with close */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100/60 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white">
              <User className="w-5 h-5" />
              <span className="font-semibold text-sm">Profile</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-white"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-8">
          {/* Account card */}
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Decision Maker</p>
                <p className="text-sm text-gray-500">
                  mdtanjilalam69@gmail.com
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2">
                Edit
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Insights */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Your Insights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <InsightCard
                title="Decision Success Rate"
                value={`${successRate.toFixed(0)}%`}
                subtitle="Based on logged outcomes"
              />
              <InsightCard
                title="Average Stress Level"
                value={`${avgStress.toFixed(1)}/10`}
                subtitle="Lower is better"
              />
              <InsightCard
                title="Total Decisions"
                value={decisions.length}
                subtitle="Logged in your journal"
              />
              <InsightCard
                title="Average Happiness"
                value={`${avgHappiness.toFixed(1)}/10`}
                subtitle="Higher is better"
              />
            </div>
          </section>

          {/* Behavioral patterns */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <h2 className="text-lg font-semibold text-gray-900">
                Behavioral Patterns
              </h2>
            </div>
            <div className="bg-gradient-to-b from-[#FFEBDD] to-[#FFEFF5] rounded-3xl border border-orange-100 px-6 py-4 space-y-2">
              {[
                "You make better decisions in the morning",
                "Low-risk decisions have higher success rates",
                "Discussing with others improves outcomes",
              ].map((pattern) => (
                <div key={pattern} className="flex items-start gap-3">
                  <span className="mt-1 text-orange-500">✓</span>
                  <p className="text-sm text-gray-800">{pattern}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing plans */}
          <section className="space-y-4 pb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Pricing Plans
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Free */}
              <div className="bg-white rounded-3xl border border-orange-100 px-5 py-5 shadow-sm flex flex-col gap-3">
                <div>
                  <p className="text-base font-semibold text-gray-900">Free</p>
                  <p className="text-3xl font-bold text-gray-900">
                    $0
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      forever
                    </span>
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <PlanItem text="Up to 50 decisions/month" />
                  <PlanItem text="Basic AI suggestions" />
                  <PlanItem text="Decision history" />
                  <PlanItem text="Outcome tracking" />
                </ul>
                <button className="mt-4 w-full py-3 rounded-xl bg-gray-100 text-gray-500 text-sm font-semibold cursor-default">
                  Current Plan
                </button>
              </div>

              {/* Premium */}
              <div className="bg-white rounded-3xl border border-orange-200 px-5 py-5 shadow-sm relative flex flex-col gap-3">
                <span className="absolute -top-3 left-5 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold shadow-sm">
                  Recommended
                </span>
                <div className="mt-1">
                  <p className="text-base font-semibold text-gray-900">
                    Premium
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    $9
                    <span className="text-sm font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <PlanItem text="Unlimited decisions" />
                  <PlanItem text="Advanced AI analysis" />
                  <PlanItem text="Pattern recognition" />
                  <PlanItem text="Export & backup" />
                  <PlanItem text="Priority support" />
                  <PlanItem text="Custom insights" />
                </ul>
                <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all">
                  Upgrade to Premium
                </button>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}

function InsightCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 px-5 py-4 shadow-sm flex flex-col gap-2">
      <p className="text-xs font-semibold text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}

function PlanItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-4 h-4 text-orange-500 mt-0.5" />
      <span>{text}</span>
    </li>
  )
}