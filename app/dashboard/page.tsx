"use client"

import { useRouter } from "next/navigation"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SkillBadges } from "@/components/dashboard/skill-badges"
import { JobPoolsPreview } from "@/components/dashboard/job-pools-preview"
import { DAOProposalsPreview } from "@/components/dashboard/dao-proposals-preview"

const mockStats = {
  totalUsers: 12847,
  totalSBTs: 34521,
  activeJobPools: 156,
  daoProposals: 23,
}

const mockSkills = [
  { id: "1", skill: "React", level: 92, issuedAt: "2024-01-15", proofHash: "0xabc123...", bitcoinAnchor: true },
  { id: "2", skill: "TypeScript", level: 88, issuedAt: "2024-01-10", proofHash: "0xdef456...", bitcoinAnchor: true },
  { id: "3", skill: "Solidity", level: 75, issuedAt: "2024-01-05", proofHash: "0xghi789...", bitcoinAnchor: false },
]

const mockJobPools = [
  { id: "1", title: "Senior React Developer", reward: 0.5, requiredSkills: ["React", "TypeScript", "Next.js"], deadline: "2024-02-15", applicants: 12 },
  { id: "2", title: "Smart Contract Auditor", reward: 1.2, requiredSkills: ["Solidity", "Security", "Web3"], deadline: "2024-02-20", applicants: 8 },
]

const mockProposals = [
  { id: "1", title: "Increase skill verification rewards", status: "active" as const, votesFor: 145, votesAgainst: 23, totalVotes: 168, deadline: "2024-02-10" },
  { id: "2", title: "Add new programming languages", status: "active" as const, votesFor: 89, votesAgainst: 45, totalVotes: 134, deadline: "2024-02-12" },
]

export default function DashboardPage() {
  const router = useRouter()
  const handleNavigation = (path: string) => router.push(path)

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="mb-4">
        <h1 className="font-heading text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track your skills, explore opportunities, and participate in governance</p>
      </div>

      {/* Stats */}
      <StatsCards stats={mockStats} />

      {/* Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SkillBadges skills={mockSkills} onAddSkill={() => handleNavigation("/skills")} />
        </div>
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
  )
}
