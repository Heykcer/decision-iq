// src/AuthPage.jsx
import React, { useState } from "react"
import {
  ArrowLeft,
  Moon,
  Brain,
  Sun,
  Mail,
  Lock,
  User,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react"

export default function AuthPage({
  darkMode,
  setDarkMode,
  goToDashboard,
  goBack,
}) {
  const [mode, setMode] = useState("signin") // "signin" | "signup"

  const shell = darkMode ? "bg-gray-950" : "bg-[#FFF9EF]"

  const title = mode === "signin" ? "Welcome back" : "Create your account"
  const subtitle =
    mode === "signin"
      ? "Sign in to continue your journey"
      : "Sign up to start making better decisions"

  const primaryButtonLabel = mode === "signin" ? "Sign In" : "Sign Up"

  return (
    <div className={`min-h-screen w-full flex ${shell}`}>
      {/* LEFT: Logo + big auth card */}
      <div className="flex-1 flex flex-col px-6 sm:px-10 lg:px-16 py-6">
        {/* Top row: back + theme toggle */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={goBack}
            className={`inline-flex items-center gap-2 text-sm ${
              darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 text-yellow-300"
                : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
            <Brain className="w-6 h-6" />
          </div>
          <span
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            DecisionIQ
          </span>
        </div>

        {/* BIG Auth card */}
        <div
          className={`max-w-xl w-full rounded-3xl border px-8 py-10 shadow-xl ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-orange-100"
          }`}
        >
          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            <AuthTab
              label="Sign In"
              id="signin"
              mode={mode}
              setMode={setMode}
              darkMode={darkMode}
            />
            <AuthTab
              label="Sign Up"
              id="signup"
              mode={mode}
              setMode={setMode}
              darkMode={darkMode}
            />
          </div>

          <h1
            className={`text-2xl md:text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-sm mb-8 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>

          {/* FORM FIELDS */}
          <div className="space-y-4 mb-6">
            {mode === "signup" && (
              <Field
                label="Full name"
                placeholder="Your name"
                icon={User}
                darkMode={darkMode}
              />
            )}

            <Field
              label="Email"
              placeholder="you@example.com"
              icon={Mail}
              darkMode={darkMode}
            />

            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              darkMode={darkMode}
            />

            {mode === "signup" && (
              <Field
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                darkMode={darkMode}
              />
            )}
          </div>

          {/* Primary button */}
          <button
            onClick={goToDashboard}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
          >
            {primaryButtonLabel}
          </button>

          {/* Switch link */}
          <p
            className={`mt-6 text-center text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() =>
                setMode(mode === "signin" ? "signup" : "signin")
              }
              className="text-orange-500 font-medium hover:underline"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT: quote + features */}
      <div
        className={`hidden lg:flex flex-1 flex-col justify-center px-12 ${
          darkMode
            ? "bg-gray-950"
            : "bg-gradient-to-br from-[#FFEFE0] via-[#FFEFF5] to-[#FFE7F0]"
        }`}
      >
        <div className="max-w-lg ml-auto space-y-10">
          {/* Quote card */}
          <div
            className={`rounded-3xl shadow-sm border px-8 py-6 ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/80 border-white backdrop-blur-sm"
            }`}
          >
            <p
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              "In any moment of decision, the best thing you can do is the right
              thing."
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              — Theodore Roosevelt
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <FeatureRow
              icon={Sparkles}
              label="AI-powered insights"
              darkMode={darkMode}
            />
            <FeatureRow
              icon={TrendingUp}
              label="Track your progress"
              darkMode={darkMode}
            />
            <FeatureRow
              icon={Shield}
              label="Private & secure"
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----- Helpers ----- */

function AuthTab({ label, id, mode, setMode, darkMode }) {
  const active = mode === id
  return (
    <button
      type="button"
      onClick={() => setMode(id)}
      className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
        active
          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
          : darkMode
          ? "text-gray-300 bg-gray-800/60 hover:bg-gray-800"
          : "text-gray-600 bg-orange-50 hover:bg-orange-100"
      }`}
    >
      {label}
    </button>
  )
}

function Field({ label, placeholder, icon: Icon, darkMode, type = "text" }) {
  return (
    <div className="space-y-2">
      <label
        className={`text-sm font-medium ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-4 h-4" />
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full pl-9 pr-3 py-3 rounded-xl border border-transparent focus:border-orange-400 outline-none text-sm placeholder:text-gray-400 ${
            darkMode ? "bg-gray-800 text-white" : "bg-[#F7EEE3] text-gray-900"
          }`}
        />
      </div>
    </div>
  )
}

function FeatureRow({ icon: Icon, label, darkMode }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-2xl border flex items-center justify-center shadow-sm ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-orange-400"
            : "bg-white/80 border-white text-orange-500"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <p
        className={`text-sm font-medium ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {label}
      </p>
    </div>
  )
}