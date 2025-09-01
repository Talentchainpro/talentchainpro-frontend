"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProposalCard } from "@/components/dao/proposal-card"
import { VotingStats } from "@/components/dao/voting-stats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Vote } from "lucide-react"

// Mock data
const mockProposals = [
  {
    id: "1",
    title: "Increase skill verification rewards",
    description:
      "Proposal to increase the base reward for skill verification from 0.1 sBTC to 0.2 sBTC to incentivize more developers to join the platform and verify their skills.",
    category: "Rewards",
    status: "active" as const,
    votesFor: 145,
    votesAgainst: 23,
    totalVotes: 168,
    quorum: 200,
    deadline: "2024-02-15",
    creator: { name: "DevDAO", verified: true },
    userVote: null,
    votingWeight: 5,
  },
  {
    id: "2",
    title: "Add new programming languages",
    description:
      "Expand the skill verification system to include Rust, Go, and Kotlin. This will attract more developers from different backgrounds and increase platform diversity.",
    category: "Platform",
    status: "active" as const,
    votesFor: 89,
    votesAgainst: 45,
    totalVotes: 134,
    quorum: 150,
    deadline: "2024-02-20",
    creator: { name: "TechCollective", verified: true },
    userVote: "for" as const,
    votingWeight: 5,
  },
  {
    id: "3",
    title: "Implement reputation system",
    description:
      "Create a reputation system based on successful job completions, peer reviews, and community contributions to help employers identify top talent.",
    category: "Platform",
    status: "passed" as const,
    votesFor: 234,
    votesAgainst: 56,
    totalVotes: 290,
    quorum: 200,
    deadline: "2024-01-30",
    creator: { name: "CommunityBuilder", verified: false },
    userVote: "for" as const,
    votingWeight: 5,
  },
  {
    id: "4",
    title: "Reduce job pool creation fees",
    description:
      "Lower the minimum sBTC requirement for creating job pools from 0.5 to 0.3 sBTC to make it more accessible for smaller projects and startups.",
    category: "Governance",
    status: "failed" as const,
    votesFor: 67,
    votesAgainst: 156,
    totalVotes: 223,
    quorum: 200,
    deadline: "2024-01-25",
    creator: { name: "StartupDAO", verified: true },
    userVote: "against" as const,
    votingWeight: 5,
  },
]

const mockStats = {
  totalProposals: 47,
  activeProposals: 8,
  totalVoters: 1247,
  yourVotingPower: 5,
  participationRate: 68,
  avgQuorum: 180,
}

export default function DAOPage() {
  const [proposals, setProposals] = useState(mockProposals)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const router = useRouter()

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter
    const matchesCategory = categoryFilter === "all" || proposal.category.toLowerCase() === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleVote = (proposalId: string, vote: "for" | "against") => {
    setProposals(
      proposals.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedProposal = { ...proposal }
          updatedProposal.userVote = vote
          updatedProposal.totalVotes += updatedProposal.votingWeight

          if (vote === "for") {
            updatedProposal.votesFor += updatedProposal.votingWeight
          } else {
            updatedProposal.votesAgainst += updatedProposal.votingWeight
          }

          return updatedProposal
        }
        return proposal
      }),
    )

    alert(`Voted ${vote} on proposal "${proposals.find((p) => p.id === proposalId)?.title}"`)
  }

  const handleViewDetails = (proposalId: string) => {
    router.push(`/dao/${proposalId}`)
  }

  const handleCreateProposal = () => {
    router.push("/dao/create")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">DAO Governance</h1>
                <p className="text-muted-foreground">Participate in community decision-making and shape the platform</p>
              </div>
              <Button
                onClick={handleCreateProposal}
                className="gradient-border bg-transparent hover:glow-primary transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Proposal
              </Button>
            </div>

            {/* Stats */}
            <VotingStats stats={mockStats} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search proposals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-muted/50 border-border">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-muted/50 border-border">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="platform">Platform</SelectItem>
                  <SelectItem value="rewards">Rewards</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(statusFilter !== "all" || categoryFilter !== "all" || searchTerm) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    Status: {statusFilter}
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    Category: {categoryFilter}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setCategoryFilter("all")
                  }}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Proposals Grid */}
            {filteredProposals.length === 0 ? (
              <div className="text-center py-20">
                <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-accent to-primary opacity-20 flex items-center justify-center mb-4">
                  <Vote className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">No proposals found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or create the first proposal</p>
                <Button onClick={handleCreateProposal} className="gradient-border bg-transparent hover:glow-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Proposal
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredProposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onVote={handleVote}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
