"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WalletConnect } from "@/components/wallet/wallet-connect"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SkillBadges } from "@/components/dashboard/skill-badges"
import { JobPoolsPreview } from "@/components/dashboard/job-pools-preview"
import { DAOProposalsPreview } from "@/components/dashboard/dao-proposals-preview"
import { QuickActions } from "@/components/dashboard/quick-actions"

// Mock data - in real app this would come from APIs
const mockStats = {
  totalUsers: 12847,
  totalSBTs: 34521,
  activeJobPools: 156,
  daoProposals: 23,
}

const mockSkills = [
  {
    id: "1",
    skill: "React",
    level: 92,
    issuedAt: "2024-01-15",
    proofHash: "0xabc123...",
    bitcoinAnchor: true,
  },
  {
    id: "2",
    skill: "TypeScript",
    level: 88,
    issuedAt: "2024-01-10",
    proofHash: "0xdef456...",
    bitcoinAnchor: true,
  },
  {
    id: "3",
    skill: "Solidity",
    level: 75,
    issuedAt: "2024-01-05",
    proofHash: "0xghi789...",
    bitcoinAnchor: false,
  },
]

const mockJobPools = [
  {
    id: "1",
    title: "Senior React Developer",
    reward: 0.5,
    requiredSkills: ["React", "TypeScript", "Next.js"],
    deadline: "2024-02-15",
    applicants: 12,
  },
  {
    id: "2",
    title: "Smart Contract Auditor",
    reward: 1.2,
    requiredSkills: ["Solidity", "Security", "Web3"],
    deadline: "2024-02-20",
    applicants: 8,
  },
]

const mockProposals = [
  {
    id: "1",
    title: "Increase skill verification rewards",
    status: "active" as const,
    votesFor: 145,
    votesAgainst: 23,
    totalVotes: 168,
    deadline: "2024-02-10",
  },
  {
    id: "2",
    title: "Add new programming languages",
    status: "active" as const,
    votesFor: 89,
    votesAgainst: 45,
    totalVotes: 134,
    deadline: "2024-02-12",
  },
]

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [showDemoOption, setShowDemoOption] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated or in demo mode
    const userDataString = localStorage.getItem("talentchain_user")
    const demoModeFlag = localStorage.getItem("talentchain_demo_mode")

    if (userDataString) {
      const user = JSON.parse(userDataString)
      if (user.isVerified) {
        setIsAuthenticated(true)
        setUserData(user)
      }
    } else if (demoModeFlag === "true") {
      setDemoMode(true)
      setIsAuthenticated(true)
      setUserData({
        username: "Demo User",
        address: "SP1052M5CKZ3XX7QSPH6SK9CAC0WGCCGXWJ29HB6V",
        isVerified: true,
      })
    } else {
      setShowDemoOption(true)
    }

    setIsLoading(false)
  }, [])

  const handleWalletConnect = (address: string) => {
    const userData = {
      username: "Connected User",
      address,
      isVerified: true,
      connectedAt: new Date().toISOString(),
    }

    localStorage.setItem("talentchain_user", JSON.stringify(userData))
    setUserData(userData)
    setIsAuthenticated(true)
    setShowWalletConnect(false)
  }

  const handleSkipWallet = () => {
    localStorage.setItem("talentchain_demo_mode", "true")
    setDemoMode(true)
    setIsAuthenticated(true)
    setUserData({
      username: "Demo User",
      address: "SP1052M5CKZ3XX7QSPH6SK9CAC0WGCCGXWJ29HB6V",
      isVerified: true,
    })
    setShowWalletConnect(false)
    setShowDemoOption(false)
  }

  const handleConnectWallet = () => {
    setShowDemoOption(false)
    setShowWalletConnect(true)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse glow-primary" />
          <p className="text-muted-foreground">Loading TalentChain Pro...</p>
        </div>
      </div>
    )
  }

  if (showDemoOption) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary glow-primary flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold">Welcome to TalentChain Pro</h1>
            <p className="text-muted-foreground text-lg">
              The Web3 talent verification and matching platform powered by Bitcoin and Stacks
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSkipWallet}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 glow-primary"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>Explore Demo</span>
              </div>
              <p className="text-xs mt-1 opacity-90">Try all features with sample data</p>
            </button>

            <button
              onClick={handleConnectWallet}
              className="w-full px-6 py-4 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Connect Wallet</span>
              </div>
              <p className="text-xs mt-1 text-muted-foreground">Connect your Stacks wallet</p>
            </button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              New to Web3? Start with the demo to explore features without a wallet.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showWalletConnect) {
    console.log("[v0] Rendering WalletConnect with props:", {
      onConnect: !!handleWalletConnect,
      onSkip: !!handleSkipWallet,
    })
    return <WalletConnect onConnect={handleWalletConnect} onSkip={handleSkipWallet} />
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-heading text-3xl font-bold mb-2">
                    Welcome back, {userData?.username || "Developer"}
                  </h1>
                  <p className="text-muted-foreground">
                    Track your skills, explore opportunities, and participate in governance
                  </p>
                </div>
                {demoMode && (
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Demo Mode</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Overview */}
            <StatsCards stats={mockStats} />

            {/* Main Dashboard Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Skills and Quick Actions */}
              <div className="lg:col-span-2 space-y-6">
                <SkillBadges skills={mockSkills} onAddSkill={() => handleNavigation("/skills")} />
                <QuickActions
                  onVerifySkill={() => handleNavigation("/skills")}
                  onCreateJobPool={() => handleNavigation("/jobs/create")}
                  onCreateProposal={() => handleNavigation("/dao/create")}
                  onSearchTalent={() => handleNavigation("/search")}
                />
              </div>

              {/* Right Column - Job Pools and DAO */}
              <div className="space-y-6">
                <JobPoolsPreview
                  jobPools={mockJobPools}
                  onViewAll={() => handleNavigation("/jobs")}
                  onCreatePool={() => handleNavigation("/jobs/create")}
                />
                <DAOProposalsPreview
                  proposals={mockProposals}
                  onViewAll={() => handleNavigation("/dao")}
                  onCreateProposal={() => handleNavigation("/dao/create")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
