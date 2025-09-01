"use client"

import Link from "next/link"

export default function LandingPage() {
  const bgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhZMs6NNZ94-YdE0CXV8YWNCwslypSc9ZyQ&s"

  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-4 sm:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs font-semibold">Powered by Bitcoin & Stacks</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Verify Skills. Earn SBTs. Join the Future of Talent.
        </h1>
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/90">
          TalentChain Pro is a Web3 talent verification and matching platform. Build your on-chain reputation with
          zero-knowledge verified skills and unlock opportunities.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:shadow-primary/40 transition-shadow"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white border border-white/30 backdrop-blur hover:bg-white/20 transition"
          >
            Explore Dashboard
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white/80 text-sm">
          <div className="backdrop-blur bg-white/10 rounded-lg p-3">Bitcoin-anchored</div>
          <div className="backdrop-blur bg-white/10 rounded-lg p-3">ZK-verified skills</div>
          <div className="backdrop-blur bg-white/10 rounded-lg p-3">DAO governance</div>
          <div className="backdrop-blur bg-white/10 rounded-lg p-3">Job Pools</div>
        </div>
      </div>
    </div>
  )
}
